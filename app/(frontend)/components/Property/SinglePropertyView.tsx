"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import DownloadPPTModal from "@/app/(frontend)/components/models/DownloadPPTModal";
import SaleOfferModal from "@/app/(frontend)/components/models/SaleOfferModal";
import DownloadPropertyPPTModal from "../models/DownloadPropertyPPTModal";
import DownloadBrochure from "@/app/(frontend)/components/models/DownloadBrochure";
import MortgageModel from "../models/MortgageModel";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { createRoot } from "react-dom/client";

import { getFontAwesomeSvgPath } from "@/src/utils/helpers/common";
import Location from "./Location";
import { useGetSinglePropertyData } from "@/src/services/PropertyService";
import DatePicker from "react-datepicker";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalenderModel from "../models/calenderModel";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import GallaryModalImg from "@/app/(frontend)/components/models/GallaryModalImg";
import GallaryModalVideo from "@/app/(frontend)/components/models/GallaryModalVideo";
import DownloadProjectPPTModal from "../models/DownloadProjectPPTModal";
import DownloadProjectSaleOfferModel from '@/app/(frontend)/components/models/DownloadProjectSaleOfferModel'
import "@/public/css/single-project-view-styles.css";

import MortgageCalculator from "./MortgageCalculator";
function SinglePropertyView({ params }) {
  const slug = params.slug[0];

  const [nearByLocations, setNearByLocations] = useState([]);
  const [type, setType] = useState("property");
  const [icon, setIcon] = useState("");
  const [iconPath, setIconPath] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const { propertyData } = useGetSinglePropertyData(slug);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    libraries: ["geometry", "places", "marker"],
  });
  const CommunitySwiperRef = useRef<SwiperCore>();
  const PropertySwiperRef = useRef<SwiperCore>();
  const similiarPropertySwiperRef = useRef<SwiperCore>();
  const amentitiesSwiperRef = useRef<SwiperCore>();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const onMapLoad = (map) => {
    mapRef.current = map;
    setMap(map);
  };

  const getNearByPlacesByTypeMap = (locType, data) => {
    setNearByLocations([]);
    const requestData = prepareRequestData(
      locType,
      data.address_latitude,
      data.address_longitude
    );
    let service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(requestData, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const resultData = prepareMapData(results);
        setNearByLocations(resultData);
        setType(locType);
      }
    });
  };

  const prepareMapData = (results, limit = null) => {
    const locationData = [];
    let limitIteration = limit ?? results.length;
    for (var i = 0; i < limitIteration; i++) {
      locationData.push({
        name: results[i]?.name,
        lat: results[i]?.geometry?.location?.lat(),
        lng: results[i]?.geometry?.location?.lng(),
        icon: results[i]?.icon,
      });
    }
    return locationData;
  };

  const prepareRequestData = (searchType, lat, lng) => {
    let request = {
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      radius: 5000,
      type: searchType,
    };
    return request;
  };

  useEffect(() => {
    let path = getFontAwesomeSvgPath(icon);
    setIconPath(path);
  }, [icon]);

  const AdvanceMarker = ({ map, position, children, onClick }) => {
    const rootRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
      if (!rootRef.current) {
        const container = document.createElement("div");
        container.classList.add("mapMarker");
        rootRef.current = createRoot(container);
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          position,
          content: container,
        });
      }

      return () => (markerRef.current.map = null);
    }, []);

    useEffect(() => {
      rootRef.current.render(children);
      markerRef.current.position = position;
      markerRef.current.map = map;
      const listener = markerRef.current.addListener("click", onClick);
      return () => listener.remove();
    }, [map, position, children, onClick]);
    return <>{children}</>;
  };
  const [propertyPrice, setPropertyPrice] = useState(propertyData?.price);
  const [downpaymentPer, setDownpaymentPer] = useState(20);
  const [downpaymentMoney, setDownpaymentMoney] = useState(0);
  const [duration, setDuration] = useState(25);
  const [mortgage, setMortgage] = useState();

  useEffect(() => {
    setPropertyPrice(propertyData?.price);
    setDownpaymentMoney((downpaymentPer / 100) * propertyPrice);
  }, [propertyData?.price]);

  useEffect(() => {
    setDownpaymentMoney((downpaymentPer / 100) * propertyPrice);
  }, [downpaymentPer]);
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-12 col-lg-8 col-md-8">
                  <div className="mb-3">
                    {
                      propertyData?.gallery &&
                      <Swiper
                      // observer={true}
                      loop={true}
                      spaceBetween={10}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      onSwiper={(swiper) => {
                        PropertySwiperRef.current = swiper;
                      }}
                      className="swiper swiperThumb2"
                    >
                      {propertyData?.gallery?.map((image, index) => {
                        return (
                          <SwiperSlide key={image.id + index + "gallery"}>
                            <img src={image.path} alt="range" style={{ height: "500px" }}/>
                          </SwiperSlide>
                        );
                      })}
                      <div
                        className="swiper-button-next text-white"
                        onClick={() => PropertySwiperRef.current?.slideNext()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev text-white"
                        onClick={() => PropertySwiperRef.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      </Swiper>
                    }
                    
                    <div className="sliderThumbnailArea">
                      {propertyData?.gallery && 
                       <Swiper
                       onSwiper={(swiper) => {
                         setThumbsSwiper(swiper);
                         PropertySwiperRef.current = swiper;
                       }}
                       loop={true}
                       spaceBetween={10}
                       slidesPerView={3}
                       loopedSlides={3}
                       freeMode={true}
                       watchSlidesProgress={true}
                       modules={[FreeMode, Navigation, Thumbs]}
                       className="swiper   "
                     >
                       {propertyData?.gallery?.map((image, index) => {
                         return (
                           <SwiperSlide key={image.id + index + "gallery2"}>
                             <img
                               src={image.path}
                               alt="range"
                               className="img-fluid"
                             />
                           </SwiperSlide>
                         );
                       })}
                     </Swiper>
                     }
                      <div className="sliderModalBox">
                        {
                          propertyData?.floorplans &&
                          <GallaryModalImg images={propertyData?.floorplans} />
                        }
                       
                        <GallaryModalVideo video={propertyData?.youtube_video} />
                      </div>
                    </div>
                    
                  </div>
                  <div className="mb-3">
                    {/* <div className="py-3">
                      <div className="row">
                        <div className="col-12 col-lg-6 my-auto">
                          <a href="#" className="text-decoration-none">
                            <div className="mainHead text-primary">
                              <h4 className="mb-0">
                                {propertyData && propertyData.name}
                              </h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-12 col-lg-6 my-auto">
                          <div
                            className="videoPlaywrapper cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#videoModal"
                          >
                            <div className="circle pulse"></div>
                            <div className="circle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="80"
                                height="50"
                                fill="currentColor"
                                className="bi bi-play-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="py-2">
                        <div className="text-blue">
                              <h4 className="mb-2">
                                {propertyData && propertyData.name}
                              </h4>
                          </div>
                      <div>
                        <div className="fs-14">
                          {propertyData &&
                            parse(propertyData?.description ?? "")}
                        </div>
                      </div>
                      
                      {/*
                      {
                        propertyData && 
                        <DownloadBrochure brochureLink={propertyData?.brochureLink} fileName={propertyData?.name+" Brochure.pdf"}></DownloadBrochure>
                      }
                      */}
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 col-md-4 propertyMobItemLink">
                    <div className=" px-2">
                        <div className="rowFlexBar border-bottom border-2">
                          <div className="mdColBar">
                            <div className=" py-3">
                              <p className="text-primary fw-500 mb-1 fs-16">
                              REFERENCE NUMBER
                              </p>
                              <p className="fw-500 mb-0 fs-16">
                                {propertyData && propertyData?.reference_number}
                              </p>
                            </div>
                          </div>
                          <div className="mdColBar">
                            <div className=" py-3">
                              <p className="text-primary fw-500 mb-1 fs-16">
                                PERMIT NUMBER
                              </p>
                              <p className="fw-500 mb-0 fs-16">
                                {propertyData && propertyData.permit_number}
                              </p>
                            </div>
                          </div>
                        </div>

                      <div className="rowFlexBar border-bottom border-2">
                        <div className="mdColBar">
                          <div className=" py-3">
                            <p className="text-primary fw-500 mb-1 fs-16">
                              PROPERTY STATUS
                            </p>
                            <p className="fw-500 mb-0 fs-16">
                              {propertyData && propertyData.category}
                              {
                                propertyData?.category === 'Rent' && 
                                <small> ({propertyData?.rental_period}) </small>
                              }
                              {
                                propertyData?.category === 'Buy' && 
                                <small> ({propertyData?.completionStatus}) </small>
                              }
                              
                            </p>
                          </div>
                        </div>
                        <div className="mdColBar">
                          <div className=" py-3">
                            <p className="text-primary fw-500 mb-1 fs-16">
                              PROPERTY TYPE
                            </p>
                            <p className="fw-500 mb-0 fs-16">
                              {propertyData && propertyData.accommodation}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rowFlexBar border-bottom border-2">
                        <div className="mdColBar">
                          <div className=" py-3">
                            <p className="text-primary fw-500 mb-1 fs-16">
                              PRICE
                            </p>
                          </div>
                        </div>
                        <div className="mdColBar">
                          <div className=" py-3">
                            <p className="fw-500 mb-0 fs-16">
                              AED{" "}
                              {propertyData &&
                                new Intl.NumberFormat().format(
                                  propertyData.price
                                )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom border-2 py-3">
                        <ul className="list-unstyled proInfoList">
                          <li className="liBar">
                            <small>
                              <img
                                src="/images/icons/bed-blue.png"
                                alt="Range"
                                className="img-fluid"
                                width="30px"
                              />
                              <span className="align-text-top ms-2 fs-14 fw-500">
                                {propertyData && propertyData.bedrooms}
                              </span>
                            </small>
                          </li>
                          <li className="liBar">
                            <small>
                              <img
                                src="/images/icons/bath-blue.png"
                                alt="Range"
                                className="img-fluid"
                                width="30px"
                              />
                              <span className="align-text-top ms-2 fs-14 fw-500">
                                {propertyData && propertyData.bathrooms}
                              </span>
                            </small>
                          </li>

                          <li className="liBar">
                            <small>
                              <img
                                src="/images/icons/area-blue.png"
                                alt="Range"
                                className="img-fluid"
                                width="30px"
                              />
                              <span className="align-text-top ms-2 fs-14 fw-500">
                                {propertyData && propertyData.area}{" "}
                                {propertyData?.unit_measure}
                              </span>
                            </small>
                          </li>
                          {propertyData &&
                            propertyData.developer &&
                            
                              <li className="liBar">
                                <small>
                                  <img
                                    src="/images/icons/building.png"
                                    alt="Range"
                                    className="img-fluid"
                                    width="30px"
                                  />
                                  <span className="align-text-top ms-2 fs-16 fw-500">
                                    <Link
                                      href={`/developers/${propertyData?.developer.slug}`}
                                      className="text-decoration-none"
                                    >
                                      {propertyData?.developer.name}
                                    </Link>
                                  </span>
                                </small>
                              </li>
                            }
                        </ul>
                      </div>
                      {propertyData?.agent && (
                        <>
                        <div className="py-3 proUserBox">
                      <div className="d-flex justify-content-start py-2 border-bottom border-2 ">
                        <div className="my-auto projctSpecIMg me-3 mb-3">
                          <center>
                            <img
                              src={
                                propertyData?.agent && propertyData.agent?.image
                              }
                              className="img-fluid"
                              width="60"
                              alt={
                                propertyData?.agent && propertyData.agent?.name
                              }
                            />
                          </center>
                        </div>
                        <div className="proUserBoxContent mb-3">
                          <div className="projectSpec  text-uppercase">
                            <p className="text-primary fw-500 mb-0 fs-16">
                              {propertyData?.agent && propertyData?.agent?.name}
                            </p>
                            <p className="fw-500 mb-2 fs-14">
                              {propertyData?.agent &&
                                propertyData?.agent?.designation}
                            </p>
                            <a
                              href={"tel:" + propertyData?.agent?.contact}
                              className="Probtn bg-primary"
                            >
                              <img
                                src="/images/icons/phone.png"
                                className="proPhoneIcon"
                              />
                              CALL NOW
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                        <div className="py-3">
                        <div className="BtnsflexBar mb-3">
                          <a
                            className="Probtn whatsappBtn wd50pr"
                            href={
                              "https://wa.me/" +
                              propertyData?.agent?.whatsapp +
                              "?text=Hi, " +
                              propertyData?.agent?.name +
                              " Please let me know more about the following property "+getCurrentUrl() 
                            }
                          >
                            <i className="fa fa-whatsapp"></i>
                            WHATSAPP
                          </a>
                          <a
                            className="Probtn bg-primary wd50pr"
                            href={"mailto:" + propertyData?.agent?.email}
                          >
                            <i className="fa fa-envelope"></i>
                            Email
                          </a>
                        </div>

                        <div className="text-center mb-3">
                          <a
                            className="Probtn bg-primary scheduleBtn"
                            data-bs-toggle="modal"
                            data-bs-target="#bookAmeeting"
                          >
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            SCHEDULE VIEWING
                          </a>
                        </div>
                      </div>
                        </>
                      
                      )}
                      
                      {/*                     
                      {propertyData && (
                        <div className="py-3">
                          <div>
                            Share on:&nbsp;
                            <WhatsappShareButton
                              title={propertyData?.name}
                              separator=","
                              url={getCurrentUrl()}
                              className="text-decoration-none  text-black"
                            >
                              <small>
                                <img
                                  src="/images/icons/whatsapp.png"
                                  alt="Range"
                                  className="img-fluid"
                                  width="25px"
                                />
                              </small>
                            </WhatsappShareButton>
                            <EmailShareButton url={getCurrentUrl()}>
                              <small>
                                <img
                                  src="/images/icons/gmail.png"
                                  alt="Range"
                                  className="img-fluid"
                                  width="25px"
                                />
                              </small>
                            </EmailShareButton>
                          </div>
                        </div>
                      )} */}
                    </div>
                    {
                      propertyData?.category != 'Rent' &&
                      <MortgageCalculator property={propertyData} />
                    }
                  {propertyData && propertyData.community && (
                    <div className="bg-light px-3 py-2 mb-5">

                        <div className="py-3">
                          <p className="text-primary fw-500 mb-0 fs-20">
                            <Link
                              href={`/communities/${propertyData.community["slug"]}`}
                              className="text-decoration-none"
                            >
                              {propertyData &&
                                propertyData.community &&
                                propertyData.community["name"]}
                            </Link>
                            {/* Community */}
                          </p>
                        </div>
                      

                      <div>
                        {propertyData?.community["gallery"] && 
                        <Swiper
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={{
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                        }}
                        breakpoints={{
                          640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                          1024: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                        }}
                        modules={[Navigation]}
                        onSwiper={(swiper) => {
                          CommunitySwiperRef.current = swiper;
                        }}
                        className="swiper pb-2 communityProjectSwiperr"
                      >
                        {propertyData?.community["gallery"].map(
                          (community, index) => {
                            return (
                              <SwiperSlide
                                key={community.id + index + "community"}
                              >
                                <div className="swiper-slide">
                                  <Link
                                    href={`/communities/${propertyData.community["slug"]}`}
                                    className="text-decoration-none communityImgCont"
                                  >
                                  <img
                                      src={community["path"]}
                                      alt="community1"
                                      className="img-fluid"
                                      style={{ height: "300px", width: "500px" }}
                                    />
                                    {/* <div className="communityImgOverlay"> */}
                                      {/* <div className="text-white"></div> */}
                                    {/* </div> */}
                                  </Link>
                                </div>
                              </SwiperSlide>
                            );
                          }
                        )}
                        <div
                          className="swiper-button-prev swiperUniquePrev text-white"
                          onClick={() => CommunitySwiperRef.current?.slidePrev()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-next swiperUniqueNext text-white"
                          onClick={() => CommunitySwiperRef.current?.slideNext()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-right fs-1"></i>
                          </span>
                        </div>
                        </Swiper>
                      }
                        
                      </div>
                      <div className="">
                        <p className="mb-0 fs-14">
                          {propertyData &&
                            propertyData.community &&
                            parse(propertyData.community["description"] ?? "")}
                        </p>
                      </div>
                    </div>
                    )}
                  </div>
                 
                  {propertyData && propertyData.amenities && (
                    <div className="mb-3">
                      <div className="py-3">
                        <div className="mainHead text-primary">
                          <h4 className="mb-0">AMENITIES</h4>
                        </div>
                      </div>
                      <div className="">
                        <div className="row">
                          <div className="row propertyDesktopItemLink">
                            {propertyData?.amenities?.slice(0, 8).map((amenity, index) => {
                                  return (
                                      <div className="col-md-3" key={amenity.id + index + "amentity"}>
                                        <div className="py-3">
                                          <div className="mb-2">
                                            <div className="amenityImg mx-auto">
                                              <img
                                                src={amenity.image}
                                                alt="Range"
                                                className="img-fluid"
                                                width="40px"
                                              />
                                            </div>
                                          </div>
                                          <div className="text-center">
                                            <small className="fs-20">
                                              {amenity.name}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                  )
                            })}
                            </div>



                          <div className="col-12 col-lg-12 col-md-12 propertyMobItemLink">
                            <Swiper
                            slidesPerView={1}
                            spaceBetween={50}
                            pagination={{
                              el: ".swiper-pagination",
                              clickable: true,
                            }}
                            navigation={{
                              nextEl: ".swiper-button-next",
                              prevEl: ".swiper-button-prev",
                            }}
                            breakpoints={{
                              640: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                              },
                              768: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                              },
                              1024: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                              },
                            }}
                            modules={[Navigation]}
                            onSwiper={(swiper) => {
                              amentitiesSwiperRef.current = swiper;
                            }}
                            className="swiper amenitiesSwiper px-5"
                          >
                            {propertyData?.amenities?.slice(0, 8)?.map((amenity, index) => {
                              return (
                                <SwiperSlide key={amenity.id + index + "amentity"}>
                                  <div className="swiper-slide">
                                    <div className="py-3">
                                      <div className="mb-2">
                                        <div className="amenityImg mx-auto">
                                          <img
                                            src={amenity.image}
                                            alt="Range"
                                            className="img-fluid"
                                            width="40px"
                                          />
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <small className="fs-20">
                                          {amenity.name}
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              );
                            })}
                            <div
                              className="swiper-button-next text-primary"
                              onClick={() => amentitiesSwiperRef.current?.slideNext()}
                            >
                              <span className="">
                                <i className="bi bi-chevron-right fs-1"></i>
                              </span>
                            </div>
                            <div
                              className="swiper-button-prev text-primary"
                              onClick={() => amentitiesSwiperRef.current?.slidePrev()}
                            >
                              <span className="">
                                <i className="bi bi-chevron-left fs-1"></i>
                              </span>
                            </div>
                            
                            </Swiper>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}


                  {propertyData &&
                    propertyData.project &&
                    Object.keys(propertyData.project).length > 0 && (
                      <div className="mb-3">
                        <div className="py-3">
                          <div className="mainHead text-primary">
                            <h4 className="mb-0">ABOUT PROJECT</h4>
                          </div>
                        </div>
                        
                          
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="proColImgBox">
                                <Link
                              href={`/projects/${propertyData?.project?.slug}`}
                              className="text-decoration-none"
                            >
                                <img
                                  src={propertyData?.project?.image}
                                  alt={propertyData?.project?.name}
                                  className="img-fluid"
                                />
                                </Link>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="clBoxList">
                                       <div className="clBoxitem">
                                             <div className="circleImgBox">
                                                  <img src="/images/icons/pro-icon-1.webp" className="iconImg"/>
                                             </div>
                                             <div className="clBoxitemitem">
                                                   <h5>{propertyData?.project?.handOver}</h5>
                                                   <p>HANDOVER</p>
                                             </div>
                                       </div>
                                       <div className="clBoxitem">
                                             <div className="circleImgBox">
                                                  <img src="/images/icons/pro-icon-2.webp" className="iconImg"/>
                                             </div>
                                             <div className="clBoxitemitem">
                                                   <h5>{propertyData?.developer.name}</h5>
                                                   <p>DEVELOPER</p>
                                             </div>
                                       </div>
                                       <div className="clBoxitem">
                                             <div className="circleImgBox">
                                                  <img src="/images/icons/pro-icon-3.webp" className="iconImg"/>
                                             </div>
                                             <div className="clBoxitemitem">
                                                   <h5>{propertyData?.community["name"]}</h5>
                                                   <p>COMMUNITY</p>
                                             </div>
                                       </div>
                                </div>
                            </div>
                       

                            {/* <div className="col-12 col-lg-12 my-auto">
                              <div className="aboutProImg">
                                <img
                                  src={propertyData?.project?.image}
                                  alt={propertyData?.project?.name}
                                  className="img-fluid"
                                />
                              </div>
                            </div> */}

                        </div>
                       
                        <div className="">
                          <h5 className="mainHead text-primary">
                            <Link
                              href={`/projects/${propertyData?.project?.slug}`}
                              className="text-decoration-none"
                            >
                              {propertyData?.project?.name}
                            </Link>
                          </h5>
                          <div>
                            <div className="fs-14">
                              {propertyData &&
                                parse(propertyData?.project?.description ?? "")}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                </div>
                
                <div className="col-12 col-lg-4 col-md-4 propertyDesktopItemLink">
                  <div className=" px-2">

                 
                    
                      <div className="rowFlexBar border-bottom border-2">
                        <div className="mdColBar">
                          <div className=" py-3">
                            <p className="text-primary fw-500 mb-1 fs-16">
                            REFERENCE NUMBER
                            </p>
                            <p className="fw-500 mb-0 fs-16">
                              {propertyData && propertyData?.reference_number}
                            </p>
                          </div>
                        </div>
                        <div className="mdColBar">
                          <div className=" py-3">
                            <p className="text-primary fw-500 mb-1 fs-16">
                              PERMIT NUMBER
                            </p>
                            <p className="fw-500 mb-0 fs-16">
                              {propertyData && propertyData.permit_number}
                            </p>
                          </div>
                        </div>
                      </div>

                    <div className="rowFlexBar border-bottom border-2">
                      <div className="mdColBar">
                        <div className=" py-3">
                          <p className="text-primary fw-500 mb-1 fs-16">
                            PROPERTY STATUS
                          </p>
                          <p className="fw-500 mb-0 fs-16">
                            For {propertyData && propertyData.category}
                              {
                                propertyData?.category === 'Rent' && 
                                <small> ({propertyData?.rental_period}) </small>
                              }
                              {
                                propertyData?.category === 'Buy' && 
                                <small> ({propertyData?.completionStatus}) </small>
                              }
                          </p>
                        </div>
                      </div>
                      <div className="mdColBar">
                        <div className=" py-3">
                          <p className="text-primary fw-500 mb-1 fs-16">
                            PROPERTY TYPE
                          </p>
                          <p className="fw-500 mb-0 fs-16">
                            {propertyData && propertyData.accommodation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rowFlexBar border-bottom border-2">
                      <div className="mdColBar">
                        <div className=" py-3">
                          <p className="text-primary fw-500 mb-1 fs-16">
                            PRICE
                          </p>
                        </div>
                      </div>
                      <div className="mdColBar">
                        <div className=" py-3">
                          <p className="fw-500 mb-0 fs-16">
                            AED{" "}
                            {propertyData &&
                              new Intl.NumberFormat().format(
                                propertyData.price
                              )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom border-2 py-3">
                      <ul className="list-unstyled proInfoList">
                        <li className="liBar">
                          <small>
                            <img
                              src="/images/icons/bed-blue.png"
                              alt="Range"
                              className="img-fluid"
                              width="30px"
                            />
                            <span className="align-text-top ms-2 fs-14 fw-500">
                              {propertyData && propertyData.bedrooms}
                            </span>
                          </small>
                        </li>
                        <li className="liBar">
                          <small>
                            <img
                              src="/images/icons/bath-blue.png"
                              alt="Range"
                              className="img-fluid"
                              width="30px"
                            />
                            <span className="align-text-top ms-2 fs-14 fw-500">
                              {propertyData && propertyData.bathrooms}
                            </span>
                          </small>
                        </li>

                        <li className="liBar">
                          <small>
                            <img
                              src="/images/icons/area-blue.png"
                              alt="Range"
                              className="img-fluid"
                              width="30px"
                            />
                            <span className="align-text-top ms-2 fs-14 fw-500">
                              {propertyData && propertyData.area}{" "}
                              {propertyData?.unit_measure}
                            </span>
                          </small>
                        </li>
                        {propertyData &&
                          propertyData.developer &&
                          
                            <li className="liBar">
                              <small>
                                <img
                                  src="/images/icons/building.png"
                                  alt="Range"
                                  className="img-fluid"
                                  width="30px"
                                />
                                <span className="align-text-top ms-2 fs-16 fw-500">
                                  <Link
                                    href={`/developers/${propertyData?.developer.slug}`}
                                    className="text-decoration-none"
                                  >
                                    {propertyData?.developer.name}
                                  </Link>
                                </span>
                              </small>
                            </li>
                          }
                      </ul>
                    </div>
                    {propertyData?.agent && (
                      <>
                      <div className="py-3 proUserBox">
                    <div className="d-flex justify-content-start py-2 border-bottom border-2 ">
                      <div className="my-auto projctSpecIMg me-3 mb-3">
                        <center>
                          <img
                            src={
                              propertyData?.agent && propertyData.agent?.image
                            }
                            className="img-fluid"
                            width="60"
                            alt={
                              propertyData?.agent && propertyData.agent?.name
                            }
                          />
                        </center>
                      </div>
                      <div className="proUserBoxContent mb-3">
                        <div className="projectSpec  text-uppercase">
                          <p className="text-primary fw-500 mb-0 fs-16">
                            {propertyData?.agent && propertyData?.agent?.name}
                          </p>
                          <p className="fw-500 mb-2 fs-14">
                            {propertyData?.agent &&
                              propertyData?.agent?.designation}
                          </p>
                          <a
                            href={"tel:" + propertyData?.agent?.contact}
                            className="Probtn bg-primary"
                          >
                            <img
                              src="/images/icons/phone.png"
                              className="proPhoneIcon"
                            />
                            CALL NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                      <div className="py-3">
                      <div className="BtnsflexBar mb-3">
                        <a
                          className="Probtn whatsappBtn wd50pr"
                          href={
                            "https://wa.me/" +
                            propertyData?.agent?.whatsapp +
                            "?text=Hi, " +
                            propertyData?.agent?.name +
                            " Please let me know more about the following property "+getCurrentUrl() 
                          }
                        >
                          <i className="fa fa-whatsapp"></i>
                          WHATSAPP
                        </a>
                        <a
                          className="Probtn bg-primary wd50pr"
                          href={"mailto:" + propertyData?.agent?.email}
                        >
                          <i className="fa fa-envelope"></i>
                          Email
                        </a>
                      </div>

                      <div className="text-center mb-3">
                        <a
                          className="Probtn bg-primary scheduleBtn"
                          data-bs-toggle="modal"
                          data-bs-target="#bookAmeeting"
                        >
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                          SCHEDULE VIEWING
                        </a>
                      </div>
                    </div>
                      </>
                    
                    )}
                    
                    {/*                     
                    {propertyData && (
                      <div className="py-3">
                        <div>
                          Share on:&nbsp;
                          <WhatsappShareButton
                            title={propertyData?.name}
                            separator=","
                            url={getCurrentUrl()}
                            className="text-decoration-none  text-black"
                          >
                            <small>
                              <img
                                src="/images/icons/whatsapp.png"
                                alt="Range"
                                className="img-fluid"
                                width="25px"
                              />
                            </small>
                          </WhatsappShareButton>
                          <EmailShareButton url={getCurrentUrl()}>
                            <small>
                              <img
                                src="/images/icons/gmail.png"
                                alt="Range"
                                className="img-fluid"
                                width="25px"
                              />
                            </small>
                          </EmailShareButton>
                        </div>
                      </div>
                    )} */}
                  </div>
                  {
                    propertyData?.category != 'Rent' &&
                    <MortgageCalculator property={propertyData} />
                  }
                  
                  
                  {/* <div>
                    {propertyData && (
                      <>
                        <p>Share this property on:</p>
                        <div className="text-center mb-3">
                          <WhatsappShareButton
                            title={propertyData?.name}
                            separator=","
                            url={getCurrentUrl()}
                            className=" Probtn whatsappBtn  scheduleBtn"
                          >
                            <i
                              className="fa fa-whatsapp"
                              aria-hidden="true"
                            ></i>
                            Whatsapp
                          </WhatsappShareButton>
                        </div>
                        <div className="text-center mb-3">
                          <EmailShareButton
                            url={getCurrentUrl()}
                            className="Probtn bg-primary scheduleBtn"
                          >
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            ></i>
                            Email
                          </EmailShareButton>
                        </div>
                      </>
                    )}
                  </div> */}
                {propertyData && propertyData.community && (
                  <div className="bg-light px-3 py-2 mb-5">

                      <div className="py-3">
                        <p className="text-primary fw-500 mb-0 fs-20">
                          <Link
                            href={`/communities/${propertyData.community["slug"]}`}
                            className="text-decoration-none"
                          >
                            {propertyData &&
                              propertyData.community &&
                              propertyData.community["name"]}
                          </Link>
                          {/* Community */}
                        </p>
                      </div>
                    

                    <div>
                       {propertyData?.community["gallery"] && 
                      <Swiper
                      loop={true}
                      slidesPerView={1}
                      spaceBetween={10}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                      }}
                      modules={[Navigation]}
                      onSwiper={(swiper) => {
                        CommunitySwiperRef.current = swiper;
                      }}
                      className="swiper pb-2 communityProjectSwiperr"
                    >
                      {propertyData?.community["gallery"].map(
                        (community, index) => {
                          return (
                            <SwiperSlide
                              key={community.id + index + "community"}
                            >
                              <div className="swiper-slide">
                                <Link
                                  href={`/communities/${propertyData.community["slug"]}`}
                                  className="text-decoration-none communityImgCont"
                                >
                                <img
                                    src={community["path"]}
                                    alt="community1"
                                    className="img-fluid"
                                    style={{ height: "300px", width: "500px" }}
                                  />
                                  {/* <div className="communityImgOverlay"> */}
                                    {/* <div className="text-white"></div> */}
                                  {/* </div> */}
                                </Link>
                              </div>
                            </SwiperSlide>
                          );
                        }
                      )}
                      <div
                        className="swiper-button-prev swiperUniquePrev text-white"
                        onClick={() => CommunitySwiperRef.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-next swiperUniqueNext text-white"
                        onClick={() => CommunitySwiperRef.current?.slideNext()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      </Swiper>
                    }
                       
                    </div>
                    <div className="">
                      <p className="mb-0 fs-14">
                        {propertyData &&
                          propertyData.community &&
                          parse(propertyData.community["description"] ?? "")}
                      </p>
                    </div>
                  </div>
                  )}
                </div>
              
                {propertyData && (
                  <>
                    <div className="col-12 col-lg-12 col-md-8">
                      <div>
                        <div className="py-3">
                          <div className="mainHead text-primary">
                            <h4 className="mb-0">NEARBY</h4>
                          </div>
                        </div>

                        <div className="row g-1">
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "school" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "school",
                                  propertyData
                                );
                                setIcon("school");
                              }}
                            >
                              Education
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "gym" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap("gym", propertyData);
                                setIcon("gym");
                              }}
                            >
                              Gym
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "supermarket" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "supermarket",
                                  propertyData
                                );
                                setIcon("supermarket");
                              }}
                            >
                              Super market
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "hospital" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "hospital",
                                  propertyData
                                );
                                setIcon("hospital");
                              }}
                            >
                              Hospital/Clinic
                            </button>
                          </div>
                          
                        </div>
                        <div className="mapContainer py-3">
                          {isLoaded && (
                            <GoogleMap
                              zoom={15}
                              center={{
                                lat: parseFloat(propertyData?.address_latitude),
                                lng: parseFloat(
                                  propertyData?.address_longitude
                                ),
                              }}
                              options={{ mapId: "4504f8b37365c3d0" }}
                              mapContainerClassName="map-container"
                              onLoad={onMapLoad}
                              onClick={() => {
                                setIsOpen(null);
                              }}
                            >
                              {type == "property" ? (
                                <MarkerF
                                  position={{
                                    lat: parseFloat(
                                      propertyData?.address_latitude
                                    ),
                                    lng: parseFloat(
                                      propertyData?.address_longitude
                                    ),
                                  }}
                                  title={propertyData?.name}
                                />
                              ) : (
                                <>
                                  {nearByLocations.map((location, lIndex) => (
                                    <>
                                      <AdvanceMarker
                                        key={lIndex + "location"}
                                        position={{
                                          lat: location?.lat,
                                          lng: location?.lng,
                                        }}
                                        map={map}
                                        onClick={() => setIsOpen(lIndex)}
                                      >
                                        <div className="icon">
                                          <FontAwesomeIcon icon={iconPath} />
                                        </div>
                                      </AdvanceMarker>
                                      {isOpen == lIndex && (
                                        <InfoWindow
                                          position={{
                                            lat: location?.lat,
                                            lng: location?.lng,
                                          }}
                                          onCloseClick={() => {
                                            setIsOpen(null);
                                          }}
                                        >
                                          <div>{location?.name}</div>
                                        </InfoWindow>
                                      )}
                                    </>
                                  ))}
                                </>
                              )}
                            </GoogleMap>
                          )}
                        </div>
                        <div className="row g-1">
                          
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "pet_store" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "pet_store",
                                  propertyData
                                );
                                setIcon("pet");
                              }}
                            >
                              PET SHOP
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "shopping_mall" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "shopping_mall",
                                  propertyData
                                );
                                setIcon("mall");
                              }}
                            >
                              MALL
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "gas_station" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "gas_station",
                                  propertyData
                                );
                                setIcon("gas_station");
                              }}
                            >
                              GAS STATION
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${
                                type == "restaurant" ? "active" : ""
                              }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "restaurant",
                                  propertyData
                                );
                                setIcon("restaurant");
                              }}
                            >
                              RESTAURANT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-12 col-lg-4 col-md-4">
                      <div className="bg-light px-3 py-2 h-100">
                        <div className="py-3">
                          <p className="text-primary fw-500 mb-1 fs-20">
                            NEARBY LOCATION
                          </p>
                        </div>
                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">BUS STATION</h4>
                          <Location
                            type={"bus_station"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={propertyData}
                            map={map}
                          />
                        </div>

                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">MALL</h4>
                          <Location
                            type={"shopping_mall"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={propertyData}
                            map={map}
                          />
                        </div>
                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">PARK</h4>
                          <Location
                            type={"park"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={propertyData}
                            map={map}
                          />
                        </div>

                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">SALON</h4>
                          <Location
                            type={"beauty_salon"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={propertyData}
                            map={map}
                          />
                        </div>
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
           <div className="socialfixBar">
                <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                          <button className="accordion-button FxBtn" type="button" data-bs-toggle="collapse" data-bs-target="#fixBtn-1" aria-expanded="false" >
                                <img src="/images/icons/btn-icon-5.png" className="fixBtnIcon" />
                                <svg className="crossSvgIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 384 512">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                          </button>
                          <div id="fixBtn-1" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                               <div className="fixBtnContent">
                                     {/* <button className="btnContentItem whatsapp">
                                           <i className="fa fa-whatsapp"></i>
                                            Share on whatsapp
                                      </button> */}

                                      <WhatsappShareButton
                                        title={propertyData?.name}
                                        separator=","
                                        url={getCurrentUrl()}
                                        className="btnContentItem whatsapp"
                                      >
                                        <i
                                          className="fa fa-whatsapp"
                                          aria-hidden="true"
                                        ></i>
                                        Share on whatsapp
                                      </WhatsappShareButton>
{/* 
                                      <button className="btnContentItem">
                                          <img src="/images/icons/btn-icon-3.png" className="fixBtnIcon" />
                                           Share on Email
                                      </button> */}

                                      <EmailShareButton
                                      url={getCurrentUrl()}
                                      className="btnContentItem email"
                                    >
                                      <i
                                        className="fa fa-envelope"
                                        aria-hidden="true"
                                      ></i>
                                      Share on Email
                                    </EmailShareButton>

                               </div>
                          </div>
                      </div>
                      <div className="accordion-item">
                          <button className="accordion-button collapsed FxBtn" type="button" data-bs-toggle="collapse" data-bs-target="#fixBtn-2" aria-expanded="false" >
                               <img src="/images/icons/btn-icon-4.png" className="fixBtnIcon" />
                                <svg className="crossSvgIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 384 512">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                          </button>
                          <div id="fixBtn-2" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                              <div className="fixBtnContent">
                                    {/* <button className="btnContentItem">
                                          <img src="/images/icons/btn-icon-2.png" className="fixBtnIcon" />
                                           download & Share Property Presentation
                                      </button> */}

                                    
                                    <a
                                      className="btnContentItem text-decoration-none"
                                      data-bs-toggle="modal"
                                      data-bs-target="#downloadBrochure"
                                    >
                                      <img src="/images/icons/btn-icon-2.png" className="fixBtnIcon" />
                                      DOWNLOAD BROCHURE
                                    </a>
                                    {/* <a
                                      className="btnContentItem text-decoration-none"
                                      data-bs-toggle="modal"
                                      data-bs-target="#downlaodPPT"
                                    >
                                      <img src="/images/icons/btn-icon-2.png" className="fixBtnIcon" />
                                      CLICK FOR MORE DETAILS
                                    </a> */}

                                    <a
                                      className="btnContentItem text-decoration-none"
                                      data-bs-toggle="modal"
                                      data-bs-target="#projectSaleOffer"
                                    > <img src="/images/icons/btn-icon-1.png" className="fixBtnIcon" /> 
                                      CLICK FOR A SALE OFFER
                                    </a>

                                      {/* <DownloadPPTModal /> */}
                                      {/* <SaleOfferModal
                                        email={propertyData?.agent?.email}
                                        name={propertyData?.agent?.name}
                                        whatsapp={propertyData?.agent?.whatsapp}
                                      /> */}
                                      {/* <button className="btnContentItem">
                                          <img src="/images/icons/btn-icon-1.png" className="fixBtnIcon" />
                                            Download & Share Sale offer
                                      </button> */}
                               </div>
                          </div>
                      </div>
                </div>
           </div>
        </div>
      </section>
      {propertyData && propertyData.similarProperties &&  propertyData.similarProperties.length > 0 && (
      <section className="mt-5 bg-light">
        <div className="container">
          <div className="row g-3 justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div>
                    <div className="mainHead mb-5 text-primary">
                      <h4>SIMILAR PROPERTIES</h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="swiper pb-2 projectSlider">
                    { propertyData?.similarProperties && 
                    <Swiper
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    navigation={{
                      nextEl: ".swiperUniqueNext",
                      prevEl: ".swiperUniquePrev",
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                      similiarPropertySwiperRef.current = swiper;
                    }}
                    className="swiper pb-5"
                  >
                    {propertyData?.similarProperties.map(
                      (similarProperty, index) => {
                        return (
                          <SwiperSlide
                            key={
                              similarProperty.id + index + "similarProperty"
                            }
                          >
                            <div className="swiper-slide">
                              <div>
                                <div className="card propCard rounded-0">
                                  <div>
                                    <div className="">
                                      <a
                                        href=""
                                        className="text-decoration-none"
                                      >
                                        <div className="projectImgCont">
                                          <img
                                            src={
                                              similarProperty.property_banner
                                            }
                                            alt="project1"
                                            className="img-fluid propImg"
                                          />
                                          <div className="projectImgOverlay">
                                            <div></div>
                                            <div>
                                              <span className="badge float-start fs-10 projectType">
                                                {
                                                  similarProperty.accommodation
                                                }
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                    <div className="card-body rounded-3 rounded-top-0">
                                      <Link
                                        href={`/properties/${similarProperty.slug}`}
                                        className="text-decoration-none"
                                      >
                                        <h6 className="text-black fs-16 fw-semibold mb-0">
                                          {similarProperty.name}
                                        </h6>
                                      </Link>
                                      <div className="mb-1">
                                        <small className="text-secondary">
                                          {similarProperty.communityName}
                                        </small>
                                      </div>
                                      <p className="fs-18 mb-2 text-primary fw-semibold">
                                        AED{" "}
                                        {similarProperty &&
                                          new Intl.NumberFormat().format(
                                            similarProperty.price
                                          )}{" "}
                                      </p>
                                      <ul className="list-unstyled mb-0 d-flex justify-content-between">
                                        <li className="d-inline">
                                          <small>
                                            <img
                                              src="/images/icons/bed.png"
                                              alt="Range"
                                              className="img-fluid"
                                              width="25px"
                                            />
                                            <span className="align-text-top ms-1">
                                              {similarProperty.bedrooms}
                                            </span>
                                          </small>
                                        </li>
                                        <li className="d-inline">
                                          <small>
                                            <img
                                              src="/images/icons/bath.png"
                                              alt="Range"
                                              className="img-fluid"
                                              width="20px"
                                            />
                                            <span className="align-text-top ms-1">
                                              {similarProperty.bathrooms}
                                            </span>
                                          </small>
                                        </li>
                                        <li className="d-inline">
                                          <small>
                                            <img
                                              src="/images/icons/area.png"
                                              alt="Range"
                                              className="img-fluid"
                                              width="20px"
                                            />
                                            <span className="align-text-top ms-1">
                                              {" "}
                                              {similarProperty.area}{" "}
                                              {similarProperty.unit_measure}
                                            </span>
                                          </small>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )}

                    <div
                      className="swiper-button-next swiperUniqueNext text-primary"
                      onClick={() =>
                        similiarPropertySwiperRef.current?.slidePrev()
                      }
                    >
                      <span className="">
                        <i className="bi bi-chevron-right fs-1"></i>
                      </span>
                    </div>
                    <div
                      className="swiper-button-prev swiperUniquePrev text-primary"
                      onClick={() =>
                        similiarPropertySwiperRef.current?.slideNext()
                      }
                    >
                      <span className="">
                        <i className="bi bi-chevron-left fs-1"></i>
                      </span>
                    </div>
                  </Swiper>
                  }  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      <MortgageModel></MortgageModel>
      <CalenderModel />
      <DownloadPropertyPPTModal brochureLink={propertyData?.brochureLink} fileName={propertyData?.name+" Brochure.pdf"}/>
      <SaleOfferModal />
      <DownloadProjectSaleOfferModel brochureLink={propertyData?.saleOfferLink} fileName={propertyData?.name+" SaleOffer.pdf"}/>
    </>
  );
}
export default SinglePropertyView;

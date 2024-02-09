"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import parse from "html-react-parser";
import { EmailShareButton, WhatsappShareButton } from "react-share";
// import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import {
  useGetSingleProjectData,
  useGetNearByProjectsData,
} from "@/src/services/ProjectService";
import "@/public/css/responsive.css";
import DownloadFileModel from "../models/DownloadFileModel";
import PaymentPlanModel from "../models/paymentPlanModel";
import FloorPlanModal from "../models/FloorPlanModel";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import DownloadPPTModal from "@/app/(frontend)/components/models/DownloadPPTModal";
import SaleOfferModal from "@/app/(frontend)/components/models/SaleOfferModal";
import GallaryModalImg from "@/app/(frontend)/components/models/GallaryModalImg";
import DownloadBrochure from "@/app/(frontend)/components/models/DownloadBrochure";
import DownloadProjectPPTModal from "../models/DownloadProjectPPTModal";
import DownloadProjectSaleOfferModel from "@/app/(frontend)/components/models/DownloadProjectSaleOfferModel";

import "@/public/css/single-project-view-styles.css";
function SingleProjectView({ params }) {
  const slug = params.slug[0];
  const { projectData } = useGetSingleProjectData(slug);
  const { nearByProjects } = useGetNearByProjectsData(slug);
  const bannerSwiperRef = useRef<SwiperCore>();
  const innerSwiperRef = useRef<SwiperCore>();
  const otherProjectSwiperRef = useRef<SwiperCore>();
  const hightlightSwiperRef = useRef<SwiperCore>();
  const rentSwiperRef = useRef<SwiperCore>();
  const saleSwiperRef = useRef<SwiperCore>();
  const amentitiesSwiperRef = useRef<SwiperCore>();
  const typesSwiperRef = useRef<SwiperCore>();
  const contactSideText =
    "An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  const pageUrl = "Home";
  const [currentUnit, setCurrentUnit] = useState(null);
  const [floorPlanFile, setFloorPlanFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (projectData) {
      document.title = projectData?.meta_title;
      let metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = projectData?.meta_description;
      document.head.appendChild(metaDesc);
      let metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      metaKeywords.content = projectData?.meta_keywords;
      document.head.appendChild(metaKeywords);
    }
  }, [projectData]);



  const [showAll, setShowAll] = useState(false);
  const [linesToShow, setLinesToShow] = useState(5); // Number of lines to show initially

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      {projectData?.exteriorGallery && (
        <header className={`${isMobileDev ? "h-auto" : ""}`}>
          <Swiper
            loop={true}
            modules={[Navigation]}
            onSwiper={(swiper) => {
              bannerSwiperRef.current = swiper;
            }}
            onBeforeInit={(swiper) => {
              bannerSwiperRef.current = swiper;
            }}
            className="swiper projectGallery"
          >
            {projectData?.exteriorGallery?.map((exteriorGallery, index) => {
              return (
                <SwiperSlide
                  className="swiperSilderItem"
                  key={exteriorGallery.id + "exteriorGallery" + index}
                >
                  <img
                    src={exteriorGallery.path}
                    alt={
                      exteriorGallery.title
                        ? exteriorGallery.title
                        : projectData.title
                    }
                    className="sliderCoverImg"
                  />
                  <div className=" sliderContainer">
                    <div className="sliderContentArea">
                      <div className="sliderContent">
                        <h5>{projectData?.sub_title_1}</h5>
                        <h1>{projectData?.sub_title_2}</h1>
                        <p className="mb-5">
                          {projectData &&
                            projectData.shortDescription &&
                            parse(projectData?.shortDescription ?? "")}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            <div className="sliderArrowBar">
              <div
                className="swiper-button-next text-white"
                onClick={() => bannerSwiperRef.current?.slideNext()}
              >
                <span className="">
                  <i className="bi bi-chevron-right fs-1"></i>
                </span>
              </div>
              <div
                className="swiper-button-prev text-white"
                onClick={() => bannerSwiperRef.current?.slidePrev()}
              >
                <span className="">
                  <i className="bi bi-chevron-left fs-1"></i>
                </span>
              </div>
            </div>
          </Swiper>
        </header>
      )}
      {projectData && (
        <section className="mb-3">
          <div className="container">
            {/* {isMobileDev && (
            <div className="row">
              <div className="col-6">
                <div className="vtTextBXox">
                  <p>Starting Price</p>
                  <h3 className="text-primary">
                    AED {new Intl.NumberFormat().format(projectData?.price)}
                  </h3>
                </div>
              </div>
              <div className="col-6">
                <div className="vtTextBXox">
                  <p>Available Units</p>
                  <h3 className="text-primary">{projectData?.availableUnits} </h3>
                </div>
              </div>
              <div className="col-6">
                <div className="vtTextBXox">
                  <p>Handover</p>
                  <h3 className="text-primary">{projectData?.handOver}</h3>
                </div>
              </div>
              <div className="col-6">
                <div className="vtTextBXox">
                  <p>Location</p>
                  
                    <h3 className="text-primary">
                      {projectData?.communityName}
                    </h3>
                  
                </div>
              </div>
            </div>
            )} */}
            {/* {!isMobileDev && ( */}
            <div className="row">
              <div className="col-md-3">
                <div className="vtTextBXox">
                  <p>Starting Price</p>
                  <h3 className="text-primary">
                    AED {new Intl.NumberFormat().format(projectData?.price)}
                  </h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="vtTextBXox">
                  <p>Available Units</p>
                  <h3 className="text-primary">
                    {projectData?.availableUnits}{" "}
                  </h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="vtTextBXox">
                  <p>Handover</p>
                  <h3 className="text-primary">{projectData?.handOver}</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="vtTextBXox">
                  <p>Location</p>

                  <h3 className="text-primary">{projectData?.communityName}</h3>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </section>
      )}
      <section>
        <div className={`tabsListConatiner ${isMobileDev ? "mb-2" : ""}`}>
          <div className={`container ${isMobileDev ? "mb-1 pb-2" : ""}`}>
            <div className="row">
              <div className="col selectTitle">
                <a
                  className={`tabTitle active ${isMobileDev ? "" : ""}`}
                  href="#Hightlights"
                  aria-selected="true"
                >
                  Project Details
                </a>
              </div>
              <div className="col selectTitle ">
                <a
                  className="tabTitle"
                  href="#ProjectDetails"
                  aria-selected="true"
                >
                  Amenities
                </a>
              </div>
              <div className="col selectTitle">
                <a className="tabTitle " href="#NearBy" aria-selected="true">
                  similar PROJECTS
                </a>
              </div>
              {projectData &&
                (projectData?.rentProperties?.length > 0 ||
                  projectData?.buyProperties?.length > 0) && (
                  <div className="col selectTitle">
                    <a
                      className="tabTitle"
                      href="#AvailableProperties"
                      aria-selected="true"
                    >
                      Available Properties
                    </a>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
      {projectData && (
        <section id="Hightlights">
          <div className={`container ${isMobileDev ? "mb-1 pb-2" : ""}`}>
            <div className="row align-items-center ">
              <div className="col-md-8">
                <div className="secTabCntent" id="hightlight">
                  <h4 className="sctionMdTitle text-primary">
                    Project Details
                  </h4>
                  
                  <div className="text-secondary mb-4">
                    {/* {parse(projectData?.hightlightDescription ?? "")} */}
                    {parse(projectData?.longDescription ?? "")}
                  </div>
                </div>
                {/* <button
                className="btn btn-blue text-uppercase btn-lg btnTextWt"
                data-bs-toggle="modal"
                data-bs-target="#floorplan"
                onClick={() => setFloorPlanFile(projectData.brochure)}
              >
                Download Brochure
              </button> */}

                {/* <DownloadBrochure brochureLink={projectData.brochureLink} fileName={projectData.title+" Brochure.pdf"}></DownloadBrochure> */}
              </div>
              <div className="col-md-4">
                {projectData?.interiorGallery && (
                  <Swiper
                    loop={true}
                    pagination={false}
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                      innerSwiperRef.current = swiper;
                    }}
                    onBeforeInit={(swiper) => {
                      innerSwiperRef.current = swiper;
                    }}
                    className="mySwiper singleSlider clmSlider"
                  >
                    {projectData?.interiorGallery?.map(
                      (interiorGallery, index) => {
                        return (
                          <SwiperSlide
                            key={interiorGallery.id + +"interiorGallery"}
                          >
                            <img
                              src={interiorGallery.path}
                              className="clmCoverImg"
                              alt={
                                interiorGallery.title
                                  ? interiorGallery.title
                                  : projectData.title
                              }
                            />
                          </SwiperSlide>
                        );
                      }
                    )}

                    <div className="carouselArrowBar">
                      <div
                        className="swiper-button-next text-white"
                        onClick={() => innerSwiperRef.current?.slideNext()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev text-white"
                        onClick={() => innerSwiperRef.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                    </div>
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {projectData &&
        projectData.amenities &&
        projectData.amenities.length > 0 && (
          <section
            id="ProjectDetails"
            className={` ${isMobileDev ? "my-2" : "my-5"}`}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row ">
                    <div
                      className={`mainHead  text-primary ${
                        isMobileDev ? "mb-1" : "mb-5"
                      }`}
                    >
                      <h4>AMENITIES</h4>
                    </div>
                    {projectData.amenities && (
                      <Swiper
                      slidesPerView={2}
                      spaceBetween={0}
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
                          slidesPerView: 4,
                          spaceBetween: 50,
                        },
                        1024: {
                          slidesPerView: 6,
                          spaceBetween: 50,
                        },
                      }}
                      autoplay={{
                        delay: 3000,
                      }}
                      modules={[Navigation, Pagination, Autoplay]}
                      onSwiper={(swiper) => {
                        amentitiesSwiperRef.current = swiper;
                      }}
                      
                      className={`swiper amenitiesSwiper ${isMobileDev ? "px-2" : "px-5"}`} 
                    >
                      {projectData?.amenities?.map((amenity, index) => {
                        return (
                          <SwiperSlide key={amenity.id + index + "amentity"}>
                            <div className="swiper-slide">
                              <div className="py-3">
                                <div className="mb-2">
                                  <div className="amenityImg mx-auto">
                                    <img
                                      src={amenity.image}
                                      alt={amenity.name}
                                      className="img-fluid"
                                     
                                    />
                                  </div>
                                </div>
                                <div className="text-center">
                                  <small className="fs-16">
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
                      {/* <div className="swiper-pagination"></div> */}
                    </Swiper>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      {projectData && (
        <section className={`tableSection  ${isMobileDev ? 'mb-2' : ''}`}>
          <div className="container">
            <h4
              className={`sctionMdTitle text-primary ${
                isMobileDev ? "my-1" : "my-4"
              }`}
            >
              Property Type
            </h4>
            {!isMobileDev && (
              <div className="tableContainer">
                <table className="priceTable">
                  <thead>
                    <tr>
                      <th>
                        <h5 className="tblThText">Unit Type</h5>
                      </th>
                      <th>
                        <h5 className="tblThText">Property Type</h5>
                      </th>
                      <th>
                        <h5 className="tblThText">Size</h5>
                      </th>
                      <th>
                        <h5 className="tblThText text-center">Bedroom</h5>
                      </th>
                      <th>
                        <h5 className="tblThText text-center">
                          Starting Price
                        </h5>
                      </th>
                      <th>
                        <h5 className="tblThText text-center">Payment Plan</h5>
                      </th>
                      <th>
                        <h5 className="tblThText text-center">Floor Plan</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData?.types?.map((type, index) => {
                      return (
                        <tr key={type.id}>
                          <td>
                            {type.property ? (
                              <Link href={`/properties/${type.property}`}>
                                <p className="tblTdText text-secondary">
                                  {type.name}
                                </p>
                              </Link>
                            ) : (
                              <p className="tblTdText text-secondary">
                                {type.name}
                              </p>
                            )}
                          </td>
                          <td>
                            <p className="tblTdText text-secondary">
                              {type?.accommodation}
                            </p>
                          </td>
                          <td>
                            <p className="tblTdText text-secondary">
                              {type?.area} {type?.areaUnit}
                            </p>
                          </td>
                          <td>
                            <p className="tblTdText text-secondary text-center">
                              {type?.bedrooms}
                            </p>
                          </td>
                          <td>
                            <p className="tblTdText text-secondary text-center">
                              AED{" "}
                              {type &&
                                new Intl.NumberFormat().format(
                                  type?.startingPrice
                                )}{" "}
                            </p>
                          </td>
                          <td>
                            <button
                              className="fillBtn tblBtn mrAuto"
                              data-bs-toggle="modal"
                              data-bs-target="#paymentplan"
                              onClick={() => setCurrentUnit(type)}
                            >
                              view
                            </button>
                          </td>
                          <td>
                            <button
                              className="fillBtn tblBtn mrAuto"
                              data-bs-toggle="modal"
                              //data-bs-target="#floorplan"
                              data-bs-target={"#gallaryModalImg-" + type.id}

                              // onClick={() => setFloorPlanFile(type.floorPlan)}
                            >
                              view
                            </button>
                            {/* <FloorPlanModal images={type?.floorPlan}/> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {isMobileDev && (
              <>
              <div className="tableContainer">
                <table className="priceTable">
                  <thead>
                    <tr>
                    <th>
                        <h5 className="tblThText">Bedroom</h5>
                      </th>
                      <th>
                        <h5 className="tblThText">Size</h5>
                      </th>
                     
                      <th>
                        <h5 className="tblThText text-center">
                          Price (AED)
                        </h5>
                      </th>
                      <th>
                        <h5 className="tblThText text-center">PP</h5>
                      </th>
                      <th>
                        <h5 className="tblThText text-center">FP</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData?.types?.map((type, index) => {
                      return (
                        <tr key={type.id}>
                          
                         
                          <td className="p-0">
                            <p className="tblTdText text-secondary">
                              {type?.bedrooms}
                            </p>
                          </td>
                          
                          <td className="p-0">
                            <p className="tblTdText text-secondary">
                              {type?.area} {type?.areaUnit}
                            </p>
                          </td>
                          <td className="p-0">
                            <p className="tblTdText text-secondary text-center">
                             
                              {type &&
                                new Intl.NumberFormat().format(
                                  type?.startingPrice
                                )}{" "}
                            </p>
                          </td>
                          <td className="p-0 text-center">
                            <button
                              className="fillBtn  mrAuto w-auto"
                              data-bs-toggle="modal"
                              data-bs-target="#paymentplan"
                              onClick={() => setCurrentUnit(type)}
                            >
                              view
                            </button>
                          </td>
                          <td className="p-0 text-center">
                            <button
                              className="fillBtn  mrAuto w-auto"
                              data-bs-toggle="modal"
                              //data-bs-target="#floorplan"
                              data-bs-target={"#gallaryModalImg-" + type.id}

                              // onClick={() => setFloorPlanFile(type.floorPlan)}
                            >
                              view
                            </button>
                            {/* <FloorPlanModal images={type?.floorPlan}/> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* <Swiper
                slidesPerView={1}
                spaceBetween={50}
                loop={true}
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
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                  },
                }}
                modules={[Navigation, Pagination]}
                onSwiper={(swiper) => {
                  typesSwiperRef.current = swiper;
                }}
                className="swiper"
              >
                {projectData?.types?.map((type, index) => {
                  return (
                    <SwiperSlide key={type.id + index + "amentity"}>
                      <div className="tableContainer w-auto">
                        <table className="priceTable">
                          <thead>
                            <tbody>
                              <tr key={type.id}>
                                <th>
                                  <h5 className="tblThText">Unit Type</h5>
                                </th>
                                <td>
                                  {type.property ? (
                                    <Link href={`/properties/${type.property}`}>
                                      <p className="tblTdText text-secondary">
                                        {type.name}
                                      </p>
                                    </Link>
                                  ) : (
                                    <p className="tblTdText text-secondary">
                                      {type.name}
                                    </p>
                                  )}
                                </td>
                                <th>
                                  <h5 className="tblThText">Property Type</h5>
                                </th>
                                <td>
                                  <p className="tblTdText text-secondary">
                                    {type?.accommodation}
                                  </p>
                                </td>
                              </tr>

                              <tr key={type.id}>
                                <th>
                                  <h5 className="tblThText">Size</h5>
                                </th>
                                <td>
                                  <p className="tblTdText text-secondary">
                                    {type?.area} {type?.areaUnit}
                                  </p>
                                </td>

                                <th>
                                  <h5 className="tblThText">Bedroom</h5>
                                </th>
                                <td>
                                  <p className="tblTdText text-secondary">
                                    {type?.bedrooms}
                                  </p>
                                </td>
                              </tr>
                              <tr key={type.id}>
                                <th>
                                  <h5 className="tblThText ">Starting Price</h5>
                                </th>
                                <td>
                                  <p className="tblTdText text-secondary">
                                    AED{" "}
                                    {type &&
                                      new Intl.NumberFormat().format(
                                        type?.startingPrice
                                      )}{" "}
                                  </p>
                                </td>
                              </tr>
                              <tr key={type.id}>
                                <th>
                                  <h5 className="tblThText text-center">
                                    Payment Plan
                                  </h5>
                                </th>
                                <td>
                                  <button
                                    className="fillBtn tblBtn mrAuto  w-auto"
                                    data-bs-toggle="modal"
                                    data-bs-target="#paymentplan"
                                    onClick={() => setCurrentUnit(type)}
                                  >
                                    view
                                  </button>
                                </td>

                                <th>
                                  <h5 className="tblThText text-center">
                                    Floor Plan
                                  </h5>
                                </th>
                                <td>
                                  <button
                                    className="fillBtn tblBtn mrAuto w-auto"
                                    data-bs-toggle="modal"
                                    data-bs-target={
                                      "#gallaryModalImg-" + type.id
                                    }
                                  >
                                    view
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </thead>
                        </table>
                      </div>
                    </SwiperSlide>
                  );
                })}

                <div
                  className="swiper-button-next text-primary"
                  onClick={() => typesSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => typesSwiperRef.current?.slidePrev()}
                >
                  <span className="">
                    <i className="bi bi-chevron-left fs-1"></i>
                  </span>
                </div>
              </Swiper> */}
              </>
              
            )}
          </div>
        </section>
      )}

      {projectData && (
        <div className="socialfixBar">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <button
                className="accordion-button FxBtn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fixBtn-1"
                aria-expanded="false"
              >
                <img
                  src="/images/icons/btn-icon-5.png"
                  className="fixBtnIcon"
                />
                <svg
                  className="crossSvgIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
              <div
                id="fixBtn-1"
                className="accordion-collapse collapse "
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="fixBtnContent">
                  {/* <button className="btnContentItem whatsapp">
                                           <i className="fa fa-whatsapp"></i>
                                            Share on whatsapp
                                      </button> */}

                  <WhatsappShareButton
                    title={projectData?.title}
                    separator=","
                    url={getCurrentUrl()}
                    className="btnContentItem whatsapp"
                    style={{ width: "100%" }}
                  >
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                    Share on whatsapp
                  </WhatsappShareButton>
                  {/* <button className="btnContentItem">
                                          <img src="/images/icons/btn-icon-3.png" className="fixBtnIcon" />
                                           Share on Email
                                      </button> */}

                  <EmailShareButton
                    url={getCurrentUrl()}
                    className="btnContentItem email"
                    style={{ width: "100%" }}
                  >
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    Share on Email
                  </EmailShareButton>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-button collapsed FxBtn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#fixBtn-2"
                aria-expanded="false"
              >
                <img
                  src="/images/icons/btn-icon-4.png"
                  className="fixBtnIcon"
                />
                <svg
                  className="crossSvgIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>

              <div
                id="fixBtn-2"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="fixBtnContent">
                  <a
                    className="btnContentItem text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target="#downloadBrochure"
                  >
                    <img
                      src="/images/icons/btn-icon-2.png"
                      className="fixBtnIcon"
                    />
                    DOWNLOAD BROCHURE
                  </a>

                  {/* <a
                    className="btnContentItem text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target="#projectSaleOffer"
                  >
                    {" "}
                    <img
                      src="/images/icons/btn-icon-1.png"
                      className="fixBtnIcon"
                    />
                    CLICK FOR A SALE OFFER
                  </a> */}
                  {/* <button className="btnContentItem">
                                          <img src="/images/icons/btn-icon-2.png" className="fixBtnIcon" />
                                           download & Share Property Presentation
                                      </button>
                                      <button className="btnContentItem">
                                          <img src="/images/icons/btn-icon-1.png" className="fixBtnIcon" />
                                            Download & Share Sale offer
                                      </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {projectData && (
        <>
          {projectData?.developer &&
            Object.keys(projectData.developer).length > 0 && (
              <section className={`AboutDeveloper  ${isMobileDev ? 'my-2' : 'my-5'}`}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="secContent">
                        <h4 className="sctionMdTitle text-primary mb-4">
                          About the Developer
                        </h4>
                        <p className="fs-14 text-secondary mb-4">
                          {projectData &&
                            parse(projectData?.developer?.description ?? "")}
                        </p>
                        <Link
                          href={`/developers/${projectData?.developer?.slug}`}
                          className="text-decoration-none bdrBtn width-auto-fit"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="colmImgBox">
                        <img
                          src={projectData.developer.logo}
                          alt={projectData.developer.name}
                          className="clmContainImg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
        </>
      )}
      <section className={`${isMobileDev ? 'my-2' : 'my-5'}`} id="NearBy">
        <div className="container">
          <div className="row">
            <div className="secTabCntent">
              <h4 className="sctionMdTitle text-primary">similar</h4>
              <h6 className="sctionSubTitle text-primary"> PROJECTS</h6>
            </div>
            <div className="row g-0">
              {!nearByProjects ? (
                <h1>Loading...</h1>
              ) : (
                <>
                  {nearByProjects && (
                    <Swiper
                      loop
                      slidesPerView={1}
                      spaceBetween={10}
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
                      modules={[Navigation, Pagination]}
                      onSwiper={(swiper) => {
                        otherProjectSwiperRef.current = swiper;
                      }}
                      onBeforeInit={(swiper) => {
                        otherProjectSwiperRef.current = swiper;
                      }}
                      className="swiper pb-5 communitySwiper"
                    >
                      {nearByProjects?.map((project, index) => {
                        return (
                          <SwiperSlide
                            className="col-12 col-lg-3 col-md-3"
                            key={project.id + index}
                          >
                            <div className="projectImgCont">
                              <Link
                                href={`/projects/${project.slug}`}
                                className="fw-bold mb-1 text-decoration-none text-white"
                              >
                                <img
                                  src={project.mainImage}
                                  alt={project.title}
                                  className="img-fluid"
                                />
                                <div className="projectImgOverlay">
                                  <div>
                                    <span className="badge projectType">
                                      {project.accommodation}
                                    </span>
                                  </div>
                                  <div className="text-white">
                                    <p className="fw-bold mb-1">
                                      {project.title}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                      <div
                        className="swiper-button-next text-primary"
                        onClick={() =>
                          otherProjectSwiperRef.current?.slideNext()
                        }
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev text-primary"
                        onClick={() =>
                          otherProjectSwiperRef.current?.slidePrev()
                        }
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                    </Swiper>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {projectData &&
        (projectData?.rentProperties?.length > 0 ||
          projectData?.buyProperties?.length > 0) && (
          <section className="mt-5 bg-light py-3" id="AvailableProperties">
            <div className="container">
              <div className="row g-3 justify-content-center">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="mainHead mb-5 text-primary">
                          <h4 className="sctionMdTitle text-primary">
                            AVAILABLE PROPERTIES
                          </h4>
                          {projectData?.rentProperties.length > 0 && (
                            <div className="row">
                              <h6 className="sctionSubTitle text-primary col-6">
                                FOR RENT
                              </h6>
                              <div className="col-6 text-end">
                                <Link
                                  href={`/rent?project_name=${projectData?.title}&project_detail=${projectData?.id}`}
                                  className="text-decoration-none bdrBtn width-auto-fit"
                                >
                                  View All
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {projectData?.rentProperties.length > 0 && (
                      <div className="col-12 col-lg-12 col-md-12">
                        <div className="swiper pb-3 projectSlider">
                          <Swiper
                            loop
                            slidesPerView={1}
                            spaceBetween={10}
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
                            modules={[Navigation, Pagination]}
                            onSwiper={(swiper) => {
                              rentSwiperRef.current = swiper;
                            }}
                            className="swiper pb-5"
                          >
                            {projectData?.rentProperties?.map(
                              (similarProperty, index) => {
                                return (
                                  <SwiperSlide
                                    key={
                                      similarProperty.id +
                                      index +
                                      "similarProperty"
                                    }
                                  >
                                    <div className="swiper-slide">
                                      <div>
                                        <div className="card propCard rounded-0 projectPropertyCard">
                                          <div>
                                            <div className="">
                                              <a
                                                href={`/properties/${similarProperty.slug}`}
                                                className="text-decoration-none"
                                              >
                                                <div className="projectImgCont">
                                                  <img
                                                    src={
                                                      similarProperty.mainImage
                                                    }
                                                    alt={similarProperty.name}
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
                                            <div className="card-body rounded-3 rounded-top-0 similarPropertyCard">
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
                                                  {
                                                    similarProperty.communityName
                                                  }
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
                                                      {
                                                        similarProperty.bathrooms
                                                      }
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
                                                      {
                                                        similarProperty.area
                                                      }{" "}
                                                      {
                                                        similarProperty.unit_measure
                                                      }
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
                              onClick={() => rentSwiperRef.current?.slidePrev()}
                            >
                              <span className="">
                                <i className="bi bi-chevron-right fs-1"></i>
                              </span>
                            </div>
                            <div
                              className="swiper-button-prev swiperUniquePrev text-primary"
                              onClick={() => rentSwiperRef.current?.slideNext()}
                            >
                              <span className="">
                                <i className="bi bi-chevron-left fs-1"></i>
                              </span>
                            </div>
                          </Swiper>
                        </div>
                      </div>
                    )}
                    {projectData?.buyProperties.length > 0 && (
                      <>
                        <div className="row mb-3">
                          <h6 className="sctionSubTitle text-primary col-6">
                            FOR SALE
                          </h6>
                          <div className="col-6 text-end">
                            <Link
                              href={`/buy?project_name=${projectData?.title}&project_detail=${projectData?.id}`}
                              className="text-decoration-none bdrBtn width-auto-fit"
                            >
                              View All
                            </Link>
                          </div>
                        </div>
                        <div className="col-12 col-lg-12 col-md-12">
                          <div className="swiper pb-3 projectSlider">
                            <Swiper
                              loop
                              slidesPerView={1}
                              spaceBetween={10}
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
                              modules={[Navigation, Pagination]}
                              onSwiper={(swiper) => {
                                saleSwiperRef.current = swiper;
                              }}
                              className="swiper pb-5"
                            >
                              {projectData?.buyProperties?.map(
                                (similarProperty, index) => {
                                  return (
                                    <SwiperSlide
                                      key={
                                        similarProperty.id +
                                        index +
                                        "similarProperty"
                                      }
                                    >
                                      <div className="swiper-slide">
                                        <div>
                                          <div className="card propCard rounded-0">
                                            <div>
                                              <div className="">
                                                <a
                                                  href={`/properties/${similarProperty.slug}`}
                                                  className="text-decoration-none"
                                                >
                                                  <div className="projectImgCont">
                                                    <img
                                                      src={
                                                        similarProperty.mainImage
                                                      }
                                                      alt={similarProperty.name}
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
                                              <div className="card-body rounded-3 rounded-top-0 projectPropertyCard">
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
                                                    {
                                                      similarProperty.communityName
                                                    }
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
                                                        {
                                                          similarProperty.bedrooms
                                                        }
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
                                                        {
                                                          similarProperty.bathrooms
                                                        }
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
                                                        {
                                                          similarProperty.area
                                                        }{" "}
                                                        {
                                                          similarProperty.unit_measure
                                                        }
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
                                  saleSwiperRef.current?.slidePrev()
                                }
                              >
                                <span className="">
                                  <i className="bi bi-chevron-right fs-1"></i>
                                </span>
                              </div>
                              <div
                                className="swiper-button-prev swiperUniquePrev text-primary"
                                onClick={() =>
                                  saleSwiperRef.current?.slideNext()
                                }
                              >
                                <span className="">
                                  <i className="bi bi-chevron-left fs-1"></i>
                                </span>
                              </div>
                            </Swiper>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      {projectData?.types?.map((type, index) => {
        return (
          <div
            key={"type-" + index}
            className="modal fade"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            id={"gallaryModalImg-" + type.id}
            aria-hidden="true"
          >
            <div className="modal-dialog  modal-dialog-centered modal-lg modalBookMeet ">
              <div className="modal-content">
                <div className="modal-header border-0 justify-content-end p-1">
                  <button
                    type="button"
                    className="bg-transparent border-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="bi bi-x-circle text-primary"></i>
                  </button>
                </div>
                <div className="modal-body  p-0 rounded-1 m-2">
                  <div className="row g-0">
                    <div className="col-12 col-lg-12 col-md-12 descricalenderCol">
                      <Swiper
                        pagination={{
                          type: "fraction",
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper galleryMdlSilder"
                      >
                        {type?.floorPlan?.map((image, index) => {
                          return (
                            <SwiperSlide className="sliderItem" key={image.id}>
                              <img
                                src={image.path}
                                alt={image.path}
                                className="sliderGallaryImg floorplans"
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <DownloadFileModel
        sideText={contactSideText}
        pageUrl={pageUrl}
        downloadFile={floorPlanFile}
      ></DownloadFileModel>
      <PaymentPlanModel
        sideText={contactSideText}
        pageUrl={pageUrl}
        currentUnit={currentUnit}
        project={projectData}
      ></PaymentPlanModel>

      <SaleOfferModal />
      <DownloadProjectSaleOfferModel />
      <DownloadProjectPPTModal
        brochureLink={projectData?.brochureLink}
        fileName={projectData?.title}
        slug={projectData?.slug}
      />
    </>
  );
}
export default SingleProjectView;

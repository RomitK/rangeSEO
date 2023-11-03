"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import { useGetSinglePropertyData } from "@/src/services/PropertyService";

function SinglePropertyView({ params }) {
  const slug = params.slug[0];
  const [nearByLocations, setNearByLocations] = useState([]);
  const [type, setType] = useState("property");
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });
  const mapRef = useRef(null);

  const { propertyData } = useGetSinglePropertyData(slug);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    libraries: ["geometry", "places"],
  });

  const swiperRef = useRef<SwiperType>;
  const PropertySwiperRef = useRef<SwiperType>;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const getNearByPlacesByType = (locType, data) => {
    setNearByLocations([]);
    let request = {
      location: {
        lat: parseFloat(data?.address_latitude),
        lng: parseFloat(data?.address_longitude),
      },
      radius: 5000,
      type: locType,
    };

    let service = new google.maps.places.PlacesService(mapRef.current);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const locationData = [];
        for (var i = 0; i < results.length; i++) {
          locationData.push({
            name: results[i]?.name,
            lat: results[i].geometry?.location?.lat(),
            lng: results[i].geometry?.location?.lng(),
            icon: results[i]?.icon,
          });
        }
        setNearByLocations(locationData);
        setType(locType);
      }
    });
  };

  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-12 col-lg-8 col-md-8">
                  <div className="mb-3">
                    <Swiper
                      observer={true}
                      spaceBetween={10}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      thumbs={
                        thumbsSwiper ? { swiper: thumbsSwiper } : undefined
                      }
                      modules={[FreeMode, Navigation, Thumbs]}
                      onBeforeInit={(swiper) => {
                        PropertySwiperRef.current = swiper;
                      }}
                      className="swiper swiperThumb2"
                    >
                      {propertyData?.gallery?.map((image, index) => {
                        return (
                          <SwiperSlide key={image.id + index + "gallery"}>
                            <img src={image.path} alt="range" />
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
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      onBeforeInit={(swiper) => {
                        PropertySwiperRef.current = swiper;
                      }}
                      className="swiper swiperThumb1 pt-3"
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
                  </div>
                  <div className="mb-3">
                    <div className="py-3">
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
                    </div>
                    <div className="py-2">
                      <div>
                        <div className="fs-14">
                          {propertyData &&
                            parse(propertyData?.description ?? "")}
                        </div>
                      </div>
                    </div>
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
                          {propertyData?.amenities?.map((amenity, index) => {
                            return (
                              <div
                                className="col-6 col-lg-3 col-md-4 my-auto"
                                key={amenity.id + index + "amenities"}
                              >
                                <div className="pb-3">
                                  <div className="mb-2">
                                    <div className="amenityImg mx-auto">
                                      <img
                                        src={amenity.image}
                                        alt={amenity.name}
                                        className="img-fluid"
                                        width="40px"
                                      />
                                    </div>
                                  </div>
                                  <div className="text-center px-0 px-lg-5 px-md-3">
                                    <small className="fs-20">
                                      {amenity.name}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
                        <div className="py-3">
                          <div className="row">
                            <div className="col-12 col-lg-12 my-auto">
                              <div className="aboutProImg">
                                <img
                                  src={propertyData?.project?.image}
                                  alt={propertyData?.project?.name}
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <h5 className="mainHead text-primary py-3">
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
                <div className="col-12 col-lg-4 col-md-4">
                  <div className="bg-light px-3 py-2 mb-5">
                    <div className="border-bottom border-2 py-3">
                      <p className="text-primary fw-500 mb-1 fs-20">
                        PROPERTY STATUS
                      </p>
                      <p className="fw-500 mb-0">For Sale</p>
                    </div>
                    <div className="border-bottom border-2 py-3">
                      <p className="text-primary fw-500 mb-1 fs-20">
                        PROPERTY TYPE
                      </p>
                      <p className="fw-500 mb-0">
                        {propertyData && propertyData.accommodation}
                      </p>
                    </div>
                    <div className="border-bottom border-2 py-3">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <small>
                            <img
                              src="/images/icons/bed-blue.png"
                              alt="Range"
                              className="img-fluid"
                              width="30px"
                            />
                            <span className="align-text-top ms-2 fs-16 fw-500">
                              {propertyData && propertyData.bedrooms}
                            </span>
                          </small>
                        </li>
                        <li className="mb-2">
                          <small>
                            <img
                              src="/images/icons/bath-blue.png"
                              alt="Range"
                              className="img-fluid"
                              width="30px"
                            />
                            <span className="align-text-top ms-2 fs-16 fw-500">
                              {propertyData && propertyData.bathrooms}
                            </span>
                          </small>
                        </li>

                        <li className="mb-2">
                          <small>
                            <img
                              src="/images/icons/area-blue.png"
                              alt="Range"
                              className="img-fluid"
                              width="30px"
                            />
                            <span className="align-text-top ms-2 fs-16 fw-500">
                              {propertyData && propertyData.area} Sq.Ft
                            </span>
                          </small>
                        </li>
                        {propertyData &&
                          propertyData.developer &&
                          Object.keys(propertyData.developer).length > 0 && (
                            <li className="mb-2">
                              <small>
                                <img
                                  src="/images/icons/building.png"
                                  alt="Range"
                                  className="img-fluid"
                                  width="30px"
                                />
                                <span className="align-text-top ms-2 fs-16 fw-500">
                                  <Link
                                    href={`/developers/${propertyData.developer.slug}`}
                                    className="text-decoration-none"
                                  >
                                    {propertyData.developer.name}
                                  </Link>
                                </span>
                              </small>
                            </li>
                          )}
                      </ul>
                    </div>
                    <div className="py-3">
                      <div className="d-flex justify-content-start py-3">
                        <div className="my-auto projctSpecIMg me-3">
                          <center>
                            <img
                              src="/images/icons/hand-over.png"
                              className="img-fluid"
                              alt="range"
                              width="60"
                            />
                          </center>
                        </div>
                        <div className="my-auto">
                          <div className="projectSpec  text-uppercase">
                            <p className="mb-0">
                              AED{" "}
                              {propertyData &&
                                new Intl.NumberFormat().format(
                                  propertyData.price
                                )}
                            </p>
                            <p className="text-primary mb-0 fs-20">Price</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="text-center mb-3">
                        <a
                          className="btn text-decoration-none bg-primary text-white  fs-18 fw-500 text-uppercase w-100 btn-lg"
                          data-bs-toggle="modal"
                          data-bs-target="#bookAmeeting"
                        >
                          SCHEDULE VIEWING
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="btn   text-decoration-none btn-success text-uppercase fs-18 fw-500 w-100 btn-lg">
                          <i className="fa fa-whatsapp"></i> &nbsp;CALL WHATSAPP
                        </a>
                      </div>
                    </div>
                    <div className="py-3">
                      <div>
                        Share on:&nbsp;
                        <a href="" className="text-decoration-none  text-black">
                          <small>
                            <img
                              src="/images/icons/whatsapp.png"
                              alt="Range"
                              className="img-fluid"
                              width="25px"
                            />
                          </small>
                        </a>
                        <a href="" className="text-decoration-none  text-black">
                          <small>
                            <img
                              src="/images/icons/gmail.png"
                              alt="Range"
                              className="img-fluid"
                              width="25px"
                            />
                          </small>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="bg-light px-3 py-2 mb-5">
                    <div className="pt-3">
                      <p className="text-primary fw-500 mb-0 fs-20">
                        MORTGAGE CALCULATOR
                      </p>
                    </div>
                    <div className="mortgageForm py-3">
                      <form>
                        <div className="mb-3">
                          <label className="form-label fw-500">
                            Property Value
                          </label>
                          <div className="input-group mb-3">
                            <span className="input-group-text  rounded-0 border-end p-2 bg-white">
                              AED
                            </span>
                            <input
                              type="text"
                              className="form-control border-start-0  rounded-0"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <label className="form-label fw-500">
                              Down payment
                            </label>
                            <label className="form-label fw-500">20%</label>
                          </div>
                          <input
                            type="range"
                            className="form-range mb-3"
                            id="customRange1"
                            min="20"
                            max="80"
                            value="20"
                          />
                          <input
                            type="text"
                            className="form-control rounded-0 mb-2"
                            placeholder="0"
                          />
                          <small>
                            <i>Minimum of 20%</i>
                          </small>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-500">
                            Mortgage Term
                          </label>
                          <input
                            type="range"
                            className="form-range"
                            id="customRange1"
                            min="1"
                            max="25"
                            value="25"
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label fw-500">Year</label>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="customRange1"
                                placeholder="25"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label fw-500">Month</label>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                id="customRange1"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-500">
                            RATE{" "}
                            <small>
                              (choose from the current best options)
                            </small>
                          </label>
                          <div className="input-group bg-white border">
                            <input
                              type="text"
                              className="form-control border-0"
                              placeholder="4.24"
                            />
                            <button
                              className="btn border border-primary text-primary px-2 py-1 rounded-circle m-1 "
                              type="button"
                            >
                              <i className="bi bi-dash-lg"></i>
                            </button>
                            <button
                              className="btn border border-primary text-primary px-2 py-1 rounded-circle m-1 "
                              type="button"
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="p-4 my-2 bg-primary text-white text-center">
                      <p className="fs-14 mb-2">
                        Your monthly payable EMI will be
                      </p>
                      <div className="mainHead">
                        <h4 className=" mb-2">AED 5,327</h4>
                      </div>
                      <div className="mb-2">
                        <a href="" className="text-white fs-16">
                          VIEW CLOSING COSTS
                        </a>
                      </div>
                      <p className="fs-14  mb-2">
                        Estimated monthly payment based on 800,000 AED finance
                        amount with a 6.35% variable finance rate.
                      </p>
                      <p className="fs-14  mb-0">
                        Disclaimer Rates may vary based on bank policies. T&C's
                        apply
                      </p>
                    </div>
                    <div className="py-3">
                      <p className="text-primary fw-500 fs-20">
                        ABOUT MY MORTGAGE
                      </p>

                      <p className="mb-0 fs-14">
                        Leading mortgage brokerage dedicated to helping our
                        clients achieve their dream of home ownership. Our team
                        of experienced professionals are committed to providing
                        exceptional customer service and personalised solutions
                        to meet the specific needs of each of our clients
                      </p>
                    </div>
                  </div>

                  <div className="bg-light px-3 py-2 mb-5">
                    {propertyData && propertyData.community && (
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
                        </p>
                      </div>
                    )}

                    <div>
                      <Swiper
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
                        onBeforeInit={(swiper) => {
                          PropertySwiperRef.current = swiper;
                        }}
                        className="swiper pb-5 communityProjectSwiperr"
                      >
                        {propertyData?.community["gallery"].map(
                          (community, index) => {
                            return (
                              <SwiperSlide key={community.id + +"community"}>
                                <div className="swiper-slide">
                                  <div className="communityImgCont">
                                    <img
                                      src={community["path"]}
                                      alt="community1"
                                      className="img-fluid"
                                    />
                                    <div className="communityImgOverlay">
                                      <div className="text-white"></div>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          }
                        )}
                        <div
                          className="swiper-button-prev swiperUniquePrev text-white"
                          onClick={() => PropertySwiperRef.current?.slidePrev()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-next swiperUniqueNext text-white"
                          onClick={() => PropertySwiperRef.current?.slideNext()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-right fs-1"></i>
                          </span>
                        </div>
                      </Swiper>
                    </div>
                    <div className="">
                      <p className="mb-0 fs-14">
                        {propertyData &&
                          propertyData.community &&
                          parse(propertyData.community["description"] ?? "")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8 col-md-8">
                  <div>
                    <div className="py-3">
                      <div className="mainHead text-primary">
                        <h4 className="mb-0">NEARBY</h4>
                      </div>
                    </div>
                    {propertyData && (
                      <>
                        <div className="row g-1">
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="graduation-cap"
                              btnNearbyKey="School"
                              onClick={() =>
                                getNearByPlacesByType("school", propertyData)
                              }
                            >
                              School
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="building"
                              btnNearbyKey="Gym"
                              onClick={() =>
                                getNearByPlacesByType("gym", propertyData)
                              }
                            >
                              Gym
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="shopping-cart"
                              btnNearbyKey="Super market"
                              onClick={() =>
                                getNearByPlacesByType(
                                  "supermarket",
                                  propertyData
                                )
                              }
                            >
                              Super market
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="h-square"
                              btnNearbyKey="Hospital"
                              onClick={() =>
                                getNearByPlacesByType("hospital", propertyData)
                              }
                            >
                              Hospital
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="paw"
                              btnNearbyKey="pet shop"
                              onClick={() =>
                                getNearByPlacesByType("pet_store", propertyData)
                              }
                            >
                              PET SHOP
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="shopping-bag"
                              btnNearbyKey="mall"
                              onClick={() =>
                                getNearByPlacesByType(
                                  "shopping_mall",
                                  propertyData
                                )
                              }
                            >
                              MALL
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="building-o"
                              btnNearbyKey="Gas Station"
                              onClick={() =>
                                getNearByPlacesByType(
                                  "gas_station",
                                  propertyData
                                )
                              }
                            >
                              GAS STATION
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className="btn btnNearby w-100 h-100"
                              icon="cutlery"
                              btnNearbyKey="Restaurant"
                              onClick={() =>
                                getNearByPlacesByType(
                                  "restaurant",
                                  propertyData
                                )
                              }
                            >
                              RESTAURANT
                            </button>
                          </div>
                        </div>
                        <div className="mapContainer py-3">
                          {isLoaded && (
                            <GoogleMap
                              zoom={10}
                              center={centerRef.current}
                              mapContainerClassName="map-container"
                              onLoad={onMapLoad}
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
                                    <MarkerF
                                      key={lIndex + "location"}
                                      position={{
                                        lat: location?.lat,
                                        lng: location?.lng,
                                      }}
                                      title={location?.name}
                                      icon={location?.icon}
                                    />
                                  ))}
                                </>
                              )}
                            </GoogleMap>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-4 col-md-4">
                  <div className="bg-light px-3 py-2 h-100">
                    <div className="py-3">
                      <p className="text-primary fw-500 mb-1 fs-20">
                        NEARBY LOCATION
                      </p>
                    </div>
                    <div className="border-bottom border-2 py-3">
                      <h4 className="fw-500 mb-1">METRO STATION</h4>
                      <p className="fw-500 mb-0">JVC Bus Station</p>
                    </div>

                    <div className="border-bottom border-2 py-3">
                      <h4 className="fw-500 mb-1">MALL</h4>
                      <p className="fw-500 mb-0">Mall of Emirates</p>
                    </div>
                    <div className="border-bottom border-2 py-3">
                      <h4 className="fw-500 mb-1">PARK</h4>
                      <p className="fw-500 mb-0">Lorem ipsum dolor</p>
                      <p className="fw-500 mb-0">Lorem ipsum dolor</p>
                      <p className="fw-500 mb-0">Lorem ipsum dolor</p>
                    </div>

                    <div className="border-bottom border-2 py-3">
                      <h4 className="fw-500 mb-1">SALON</h4>
                      <p className="fw-500 mb-0">Lorem ipsum dolor</p>
                      <p className="fw-500 mb-0">Lorem ipsum dolor</p>
                      <p className="fw-500 mb-0">Lorem ipsum dolor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SinglePropertyView;

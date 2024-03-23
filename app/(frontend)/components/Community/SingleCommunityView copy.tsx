"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import GoogleMapReact from "google-map-react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useGetSingleCommunityData } from "@/src/services/CommunityService";

function SinglecommunityDataView({ params }) {
  const slug = params.slug[0];
  const { communityData } = useGetSingleCommunityData(slug);
  const [nearByLocations, setNearByLocations] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    libraries: ["geometry", "places", "marker"],
  });

  const onMapLoad = (map) => {
    let request = {
      location: {
        lat: parseFloat(communityData?.address_latitude),
        lng: parseFloat(communityData?.address_longitude),
      },
      radius: 5000,
    };

    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const locationData = [];
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating && results[i].vicinity != communityData.name) {
            locationData.push({
              name: results[i].name,
              lat: results[i].geometry?.location?.lat(),
              lng: results[i].geometry?.location?.lng(),
              distance: await getDistanceMatrix(communityData, {
                lat: results[i].geometry?.location?.lat(),
                lng: results[i].geometry?.location?.lng(),
              }),
            });
          }
        }
        locationData.sort((a, b) => {
          return a.distance[0].value - b.distance[0].value;
        });
        setNearByLocations(locationData);
      }
    });
  };

  const getDistanceMatrix = async (origin, destination) => {
    const distance = [];
    let requestLocation: any = {
      destinations: [
        {
          lat: parseFloat(destination?.lat),
          lng: parseFloat(destination?.lng),
        },
      ],
      origins: [
        {
          lat: parseFloat(origin?.address_latitude),
          lng: parseFloat(origin?.address_longitude),
        },
      ],
      travelMode: "DRIVING",
    };

    let distanceService = new google.maps.DistanceMatrixService();
    await distanceService.getDistanceMatrix(requestLocation, (response) => {
      distance.push(response.rows[0].elements[0].distance);
    });
    return distance;
  };

  const defaultProps = {
    center: {
      lat: 24.2048,
      lng: 56.2708,
    },
    zoom: 13,
  };

  const swiperRef = useRef<SwiperCore>();
  const hightlighSwiperRef = useRef<SwiperCore>();
  const amentitiesSwiperRef = useRef<SwiperCore>();
  const PropertySwiperRef = useRef<SwiperCore>();
  const nearbyCommunitiesSwiperRef = useRef<SwiperCore>();


  useEffect(() => {
    if (communityData) {
      document.title = communityData?.name;
      let metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = communityData?.meta_description;
      document.head.appendChild(metaDesc);
      let metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      metaKeywords.content = communityData?.meta_keywords;
      document.head.appendChild(metaKeywords);
    }
  }, [communityData]);


  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-3 justify-content-center">
                <div className="col-12 col-lg-12 col-md-12">
                  <div>
                    <div className="mainHead mb-3 text-primary text-center">
                      <h4>{communityData && communityData.name}</h4>
                    </div>
                  </div>
                </div>

                {communityData && communityData.imageGallery && (
                  <div className="col-12 col-lg-12 col-md-12">
                    <Swiper
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
                      modules={[Navigation, Pagination]}
                      onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                      className="swiper communityDataMainSwiper"
                    >
                      {communityData?.imageGallery?.map((img, index) => {
                        return (
                          <SwiperSlide key={img.id + index + "gallery"}>
                            <div className="swiper-slide">
                              <div className="communityImgCont">
                                <img loading="lazy"
                                  src={img.path}
                                  alt="communityData1"
                                  className="img-fluid communityGalleryImage"
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                      <div
                        className="swiper-button-next text-white"
                        onClick={() => swiperRef.current?.slideNext()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev text-white"
                        onClick={() => swiperRef.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      <div className="swiper-pagination"></div>
                    </Swiper>
                  </div>
                )}
                <div className="col-12 col-lg-10 col-md-11">
                  <div className="text-center my-5">
                    {communityData &&
                      parse(communityData?.longDescription ?? "")}
                  </div>
                </div>
                <div className="col-12 col-lg-4 col-md-3">
                  <a href="#highlight" className="text-decoration-none">
                    <div className="communityTab">
                      <h3>Highlights</h3>
                    </div>
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-md-3">
                  <a href="#amenities" className="text-decoration-none">
                    <div className="communityTab">
                      <h3>Amenities</h3>
                    </div>
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-md-3">
                  <a href="#properties" className="text-decoration-none">
                    <div className="communityTab">
                      <h3>Available Properties</h3>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {communityData &&
        communityData.highlights &&
        communityData.highlights.length > 0 && (
          <section className="my-5" id="highlight">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row ">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="mainHead mb-5 text-center text-primary">
                          <h4>HIGHLIGHTS</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-12 col-md-12">
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
                            slidesPerView: 3,
                            spaceBetween: 50,
                          },
                          1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                          },
                        }}
                        modules={[Navigation, Pagination]}
                        onSwiper={(swiper) => {
                          hightlighSwiperRef.current = swiper;
                        }}
                        className="swiper pb-5 highlightSwiper px-5"
                      >
                        {communityData?.highlights?.map((highlight, index) => {
                          return (
                            <SwiperSlide
                              key={highlight.id + index + "hightlight"}
                            >
                              <div className="swiper-slide">
                                <div className="card border-0 rounded-0 bg-primary p-5">
                                  <div className="">
                                    <center>
                                      <img loading="lazy"
                                        src={highlight.image}
                                        className="img-fluid"
                                        alt="range"
                                        width="80px"
                                      />
                                    </center>
                                  </div>
                                  <div className="card-body text-center pb-0">
                                    <small className="card-title text-white text-uppercase fs-20">
                                      {highlight.name}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                        <div
                          className="swiper-button-next text-primary"
                          onClick={() => hightlighSwiperRef.current?.slideNext()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-right fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-prev text-primary"
                          onClick={() => hightlighSwiperRef.current?.slidePrev()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
                          </span>
                        </div>
                        <div className="swiper-pagination"></div>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      <section className="my-5 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-md-12">
              <div className="row g-0">
                <div className="col-12 col-lg-6 col-md-6">
                  {/* {communityData && parse(communityData?.location_iframe ?? "")} */}
                  {/* <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyAGZjmTZFO0V8_-_V_A-Dqto1I-FlBhshE",
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onGoogleApiLoaded={({ map, maps }) =>
                      renderMarkers(map, maps)
                    }
                    yesIWantToUseGoogleMapApiInternals
                  /> */}
                  {communityData && isLoaded && (
                    <GoogleMap
                      center={{
                        lat: parseFloat(communityData?.address_latitude),
                        lng: parseFloat(communityData?.address_longitude),
                      }}
                      mapContainerClassName="map-container"
                      zoom={defaultProps.zoom}
                      onLoad={onMapLoad}
                    >
                      <MarkerF
                        position={{
                          lat: parseFloat(communityData?.address_latitude),
                          lng: parseFloat(communityData?.address_longitude),
                        }}
                        title={communityData?.name}
                      />
                    </GoogleMap>
                  )}
                </div>

                {communityData && (
                  <div className="col-12 col-lg-6 col-md-6 bg-white">
                    <div className="p-3 p-md-5 p-lg-5">
                      {nearByLocations.length > 0 && (
                        <>
                          {nearByLocations?.map((location, locIndex) => {
                            return (
                              <>
                                {locIndex < 7 && (
                                  <div
                                    className="border-bottom border-1 border-dark py-2"
                                    key={locIndex + "loc"}
                                  >
                                    <p className="text-black fw-500 mb-0 fs-20">
                                      {location?.name}
                                    </p>
                                    <p className="text-primary fw-500 mb-0 fs-20">
                                      {location?.distance[0]?.text}
                                    </p>
                                  </div>
                                )}
                              </>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {communityData &&
        communityData.amenities &&
        communityData.amenities.length > 0 && (
          <section className="my-5" id="amenities">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row ">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="mainHead mb-5 text-center text-primary">
                          <h4>AMENITIES</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-12 col-md-12">
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
                          amentitiesSwiperRef.current = swiper;
                        }}
                        className="swiper pb-5 amenitiesSwiper px-5"
                      >
                        {communityData?.amenities?.map((amenity, index) => {
                          return (
                            <SwiperSlide key={amenity.id + index + "amentity"}>
                              <div className="swiper-slide">
                                <div className="py-3">
                                  <div className="mb-2">
                                    <div className="amenityImg mx-auto">
                                      <img loading="lazy"
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
                        <div className="swiper-pagination"></div>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      {communityData &&
        communityData.properties &&
        communityData.properties.length > 0 && (
          <section className="my-5" id="properties">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="mainHead mb-5 text-center text-primary">
                          <h4>AVAILABLE PROPERTIES</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-12 col-md-12">
                      <Swiper
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
                          PropertySwiperRef.current = swiper;
                        }}
                        className="swiper pb-5 projectSlider"
                      >
                        {communityData?.properties?.map((property, index) => {
                          return (
                            <SwiperSlide key={property.id + +"property"}>
                              <div className="swiper-slide">
                                <div>
                                  <div className="card propCard rounded-0">
                                    <div>
                                      <div className="">
                                        <Link
                                          href={`/properties/${property.slug}`}
                                          className="text-decoration-none"
                                        >
                                          <div className="projectImgCont">
                                            <img loading="lazy"
                                              src={property.property_banner}
                                              alt="project1"
                                              className="img-fluid propImg"
                                            />
                                            <div className="projectImgOverlay">
                                              <div></div>
                                              <div>
                                                <span className="badge float-start fs-10 projectType">
                                                  {property.accommodation}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                      <div className="card-body rounded-3 rounded-top-0">
                                        <Link
                                          href={`/properties/${property.slug}`}
                                          className="text-decoration-none"
                                        >
                                          <h6 className="text-black fs-16 fw-semibold mb-0">
                                            {property.name}
                                          </h6>
                                        </Link>
                                        <div className="mb-1">
                                          <small className="text-secondary">
                                            {property &&
                                              property.communities &&
                                              property.communities.name}
                                          </small>
                                        </div>
                                        <p className="fs-18 mb-2 text-primary fw-semibold">
                                          AED{" "}
                                          {property &&
                                            new Intl.NumberFormat().format(
                                              property.price
                                            )}{" "}
                                        </p>
                                        <ul className="list-unstyled mb-0 d-flex justify-content-between">
                                          <li className="d-inline">
                                            <small>
                                              <img loading="lazy"
                                                src="/images/icons/bed.png"
                                                alt="Range"
                                                className="img-fluid"
                                                width="25px"
                                              />
                                              <span className="align-text-top ms-1">
                                                {property.bedrooms}
                                              </span>
                                            </small>
                                          </li>
                                          <li className="d-inline">
                                            <small>
                                              <img loading="lazy"
                                                src="/images/icons/bath.png"
                                                alt="Range"
                                                className="img-fluid"
                                                width="20px"
                                              />
                                              <span className="align-text-top ms-1">
                                                {property.bathrooms}
                                              </span>
                                            </small>
                                          </li>
                                          <li className="d-inline">
                                            <small>
                                              <img loading="lazy"
                                                src="/images/icons/area.png"
                                                alt="Range"
                                                className="img-fluid"
                                                width="20px"
                                              />
                                              <span className="align-text-top ms-1">
                                                {" "}
                                                {property.area}{" "}
                                                {property.unit_measure}
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
                        })}

                        <div
                          className="swiper-button-prev swiperUniquePrev text-primary"
                          onClick={() => PropertySwiperRef.current?.slidePrev()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-next swiperUniqueNext text-primary"
                          onClick={() => PropertySwiperRef.current?.slideNext()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-right fs-1"></i>
                          </span>
                        </div>
                        <div className="swiper-pagination"></div>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      {/* <section className="my-5 ">
        <div className="container">
          <div className="row g-3 justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-12 col-md-12">
                  <div>
                    <div className="mainHead mb-5 text-primary">
                      <h4>PROPERTY INSIGHTS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="border-bottom border-dark pb-3">
                    <table className="table table-striped text-center table-lg tableinsights table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">APARTMENT TYPE</th>
                          <th scope="col">AVG SELLING PRICE</th>
                          <th scope="col">AVG SELLING PRICE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>STUDIO</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>1 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>2 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>3 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>4 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="py-3">
                    <table className="table table-striped text-center table-lg tableinsights table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">TOWNHOUSE/ VILLA TYPE</th>
                          <th scope="col">AVG SELLING PRICE</th>
                          <th scope="col">AVG SELLING PRICE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>2 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>3 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>4 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                        <tr>
                          <td>5 BEDROOM</td>
                          <td>AED 1.8 MILLION</td>
                          <td>AED 90,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {communityData && communityData.nearbyCommunities && (
        <section className="mt-5 bg-light py-5">
          <div className="container">
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-12 col-lg-12 col-md-12">
                    <div>
                      <div className="mainHead mb-5 text-primary">
                        <h4>NEIGHBOURHOOD</h4>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-12 col-md-12">
                    <Swiper
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
                        nearbyCommunitiesSwiperRef.current = swiper;
                      }}
                      className="swiper pb-5 projectSlider"
                    >
                      {communityData?.nearbyCommunities.map(
                        (nearbyCommunity, index) => {
                          return (
                            <SwiperSlide key={nearbyCommunity.id + index}>
                              <div className="swiper-slide">
                                <div>
                                  <div className="card propCard rounded-0">
                                    <div>
                                      <div className="">
                                        <Link
                                          href={`/communities/${nearbyCommunity.slug}`}
                                          className="text-decoration-none"
                                        >
                                          <div className="projectImgCont">
                                            <img loading="lazy"
                                              src={nearbyCommunity.mainImage}
                                              alt="project1"
                                              className="img-fluid propImg"
                                            />
                                          </div>
                                        </Link>
                                      </div>
                                      <div className="card-body rounded-3 rounded-top-0">
                                        <Link
                                          href={`/communities/${nearbyCommunity.slug}`}
                                          className="text-decoration-none"
                                        >
                                          <div className="mb-1 text-center">
                                            <h5 className="text-black">
                                              {nearbyCommunity.name}
                                            </h5>
                                          </div>
                                        </Link>
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
                        className="swiper-button-prev swiperUniquePrev text-primary"
                        onClick={() => nearbyCommunitiesSwiperRef.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-next swiperUniqueNext text-primary"
                        onClick={() => nearbyCommunitiesSwiperRef.current?.slideNext()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      {/* <div className="swiper-pagination"></div> */}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default SinglecommunityDataView;

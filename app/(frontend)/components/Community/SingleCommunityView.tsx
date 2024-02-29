"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetSingleCommunityData } from "@/src/services/CommunityService";
import { getFontAwesomeSvgPath } from "@/src/utils/helpers/common";
import Location from "./Location";
import { createRoot } from "react-dom/client";
import { useSearchParams } from "next/navigation";
import "swiper/swiper-bundle.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SinglecommunityDataView({ params }) {
  const [isMobileDev, setIsMobileDev] = useState(false);
  const searchParams = useSearchParams();
  const sliderRef = useRef(null);

  // Define custom arrow components for navigation
  const PrevArrow = (props) => (
    <div {...props} className="custom-prev-arrow text-white">
      <span className="">
        <i className="bi bi-chevron-left fs-1"></i>
      </span>
    </div>
  );
  const NextArrow = (props) => (
    <div {...props} className="custom-next-arrow text-white">
      <span className="">
        <i className="bi bi-chevron-right fs-1"></i>
      </span>
    </div>
  );

  // Settings for desktop and iPad
  const desktopSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    speed: 3000,
    centerPadding: "300px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Settings for mobile
  const mobileSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const [form, setForm] = useState({
    accommodation: "",
    accommodation_id: "",
    completionStatus: "",
    project: "",
    developer: "",
  });

  useEffect(() => {
    if (
      searchParams.has("accommodation") &&
      searchParams.has("completionStatus") &&
      searchParams.has("project") &&
      searchParams.has("developer") &&
      searchParams.has("accommodation_id")
    ) {
      form.accommodation = searchParams.get("accommodation");
      form.completionStatus = searchParams.get("completionStatus");
      form.project = searchParams.get("project");
      form.developer = searchParams.get("developer");
      form.accommodation_id = searchParams.get("accommodation_id");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      if (isMobileDevice) {
        document.body.style.overflow = 'auto';
      }
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
  const slug = params.slug[0];
  const { communityData } = useGetSingleCommunityData(slug, form);
  const [nearByLocations, setNearByLocations] = useState([]);
  const [type, setType] = useState("property");
  const [icon, setIcon] = useState("");
  const [iconPath, setIconPath] = useState(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const swiperRef = useRef<SwiperCore>();
  const hightlighSwiperRef = useRef<SwiperCore>();
  const amentitiesSwiperRef = useRef<SwiperCore>();
  const PropertySwiperRef = useRef<SwiperCore>();
  const PropertySaleSwiperRef = useRef<SwiperCore>();
  const PropertyRentSwiperRef = useRef<SwiperCore>();
  const nearbyCommunitiesSwiperRef = useRef<SwiperCore>();
  const onMapLoad = (map) => {
    mapRef.current = map;
    setMap(map);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    libraries: ["geometry", "places", "marker"],
  });
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

  const AdvanceMarker = ({ map, position, children, onClick }) => {
    const markerRef = useRef(null);

    useEffect(() => {
      const createMarker = () => {
        // Ensure google is available
        if (!window.google || !window.google.maps) {
          console.error('Google Maps API not available.');
          return null;
        }
        return new window.google.maps.Marker({
          position: position,
          map: map,
          icon: {
            url: iconPath, // Set the icon path here
            scaledSize: new window.google.maps.Size(32, 32), // Adjust the size if needed
          },
        });
      };

      if (!markerRef.current) {
        markerRef.current = createMarker();
        if (!markerRef.current) return; // Stop further execution if marker creation failed
      }

      return () => {
        // Clean up resources when component is unmounted
        if (markerRef.current) {
          markerRef.current.setMap(null); // Remove marker from map
        }
      };
    }, [map]); // Dependency array to ensure effect runs only when map changes

    useEffect(() => {
      if (!markerRef.current) return;

      // Update marker position
      markerRef.current.setPosition(position);

      // Add click listener
      markerRef.current.addListener('click', onClick);

      return () => {
        // Clean up event listener when component is unmounted
        if (markerRef.current) {
          window.google.maps.event.clearListeners(markerRef.current, 'click');
        }
      };
    }, [position, onClick]);

    // Render children if any with unique keys
    const renderedChildren = Array.isArray(children) ? children : [children];
    return <>{renderedChildren.map((child, index) => React.cloneElement(child, { key: `marker-${index}` }))}</>;
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

  // useEffect(() => {
  //   if (communityData) {
  //     document.title = communityData?.name;
  //     let metaDesc = document.createElement("meta");
  //     metaDesc.name = "description";
  //     metaDesc.content = communityData?.meta_description;
  //     document.head.appendChild(metaDesc);
  //     let metaKeywords = document.createElement("meta");
  //     metaKeywords.name = "keywords";
  //     metaKeywords.content = communityData?.meta_keywords;
  //     document.head.appendChild(metaKeywords);
  //   }
  // }, [communityData]);

  useEffect(() => {
    let path = getFontAwesomeSvgPath(icon);
    setIconPath(path);
  }, [icon]);

  return (
    <>
      <section className={` ${isMobileDev ? "my-2" : "my-5"}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-3 justify-content-center">
                <div className="col-12 col-lg-12 col-md-12">
                  <div>
                    <div
                      className={`mainHead  text-primary text-center ${isMobileDev ? "" : "mb-3"
                        }`}
                    >
                      <h4>{communityData && communityData.name}</h4>
                    </div>
                  </div>
                </div>

                {communityData && communityData.imageGallery && (
                  <div className="col-12 col-lg-12 col-md-12">
                    <Slider
                      {...(isMobileDev ? mobileSettings : desktopSettings)}
                      ref={sliderRef}
                      className="communityDataMainSwiper px-1"
                    >
                      {communityData?.imageGallery?.map((img, index) => (
                        <div key={img.id + "gallery"} className="slide-item">
                          <div className="communityImgCont">
                            <img
                              src={img.path}
                              alt={img.title ? img.title : communityData.name}
                              className="img-fluid communityGalleryImage"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
                <div className="col-12 col-lg-10 col-md-11">
                  <div className="text-center my-2">
                    {communityData &&
                      parse(communityData?.longDescription ?? "")}
                  </div>
                </div>
                {communityData &&
                  communityData.amenities &&
                  communityData.amenities.length > 0 && (
                    <div className="col-12 col-lg-4 col-md-3">
                      <a href="#highlight" className="text-decoration-none">
                        <div className="communityTab">
                          <h3>Highlights</h3>
                        </div>
                      </a>
                    </div>
                  )}
                {communityData &&
                  communityData.amenities &&
                  communityData.amenities.length > 0 && (
                    <div className="col-12 col-lg-4 col-md-3">
                      <a href="#amenities" className="text-decoration-none">
                        <div className="communityTab">
                          <h3>Amenities</h3>
                        </div>
                      </a>
                    </div>
                  )}
                {communityData &&
                  communityData.properties &&
                  communityData.properties.length > 0 && (
                    <div className="col-12 col-lg-4 col-md-3">
                      <a href="#properties" className="text-decoration-none">
                        <div className="communityTab">
                          <h3>Available Properties</h3>
                        </div>
                      </a>
                    </div>
                  )}
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
                        <div
                          className={`mainHead  text-center text-primary ${isMobileDev ? "mb-2" : "mb-5"
                            }`}
                        >
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
                        autoplay={{
                          delay: 3000,
                        }}
                        modules={[Navigation, Pagination, Autoplay]}
                        onSwiper={(swiper) => {
                          hightlighSwiperRef.current = swiper;
                        }}
                        className={`swiper highlightSwiper ${isMobileDev ? "px-2" : "px-5"
                          }`}
                      >
                        {communityData?.highlights?.map((highlight, index) => {
                          return (
                            <SwiperSlide
                              key={highlight.id + index + "hightlight"}
                            >
                              <div className="swiper-slide p-3 bg-primary ">
                                <div className="card border-0 rounded-0 bg-primary ">
                                  <div className="">
                                    <center>
                                      <img
                                        src={highlight.image}
                                        className="img-fluid"
                                        alt={highlight.name}
                                        width="80px"
                                      />
                                    </center>
                                  </div>
                                </div>
                                <div className="card border-0 rounded-0 bg-primary">
                                  <div className="card-body pb-0 communityhightCardBody">
                                    <p className="text-white  text-center text-uppercase fs-18">
                                      {highlight.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                        <div
                          className="swiper-button-next text-primary"
                          onClick={() =>
                            hightlighSwiperRef.current?.slideNext()
                          }
                        >
                          <span className="">
                            <i className="bi bi-chevron-right fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-prev text-primary"
                          onClick={() =>
                            hightlighSwiperRef.current?.slidePrev()
                          }
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
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
      <section
        className={`bg-light ${isMobileDev ? "my-2 py-2" : "my-5 py-5"}`}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-md-12">
              <div className="row g-0">
                {communityData && (
                  <>
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="py-3">
                          <div className="mainHead text-primary">
                            <h4 className="mb-0">NEARBY</h4>
                          </div>
                        </div>

                        <div className="row g-1">
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "school" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "school",
                                  communityData
                                );
                                setIcon("school");
                              }}
                            >
                              Education
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "gym" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap("gym", communityData);
                                setIcon("gym");
                              }}
                            >
                              Gym
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "supermarket" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "supermarket",
                                  communityData
                                );
                                setIcon("supermarket");
                              }}
                            >
                              Super market
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "hospital" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "hospital",
                                  communityData
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
                              zoom={14}
                              center={{
                                lat: parseFloat(
                                  communityData?.address_latitude
                                ),
                                lng: parseFloat(
                                  communityData?.address_longitude
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
                                      communityData?.address_latitude
                                    ),
                                    lng: parseFloat(
                                      communityData?.address_longitude
                                    ),
                                  }}
                                  title={communityData?.name}
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
                              className={`btn btnNearby w-100 h-100 ${type == "pet_store" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "pet_store",
                                  communityData
                                );
                                setIcon("pet");
                              }}
                            >
                              PET SHOP
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "shopping_mall" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "shopping_mall",
                                  communityData
                                );
                                setIcon("mall");
                              }}
                            >
                              MALL
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "gas_station" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "gas_station",
                                  communityData
                                );
                                setIcon("gas_station");
                              }}
                            >
                              GAS STATION
                            </button>
                          </div>
                          <div className="col-6 col-lg-3 col-md-3">
                            <button
                              className={`btn btnNearby w-100 h-100 ${type == "restaurant" ? "active" : ""
                                }`}
                              onClick={() => {
                                getNearByPlacesByTypeMap(
                                  "restaurant",
                                  communityData
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
                            property={communityData}
                            map={map}
                          />
                        </div>

                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">MALL</h4>
                          <Location
                            type={"shopping_mall"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={communityData}
                            map={map}
                          />
                        </div>
                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">PARK</h4>
                          <Location
                            type={"park"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={communityData}
                            map={map}
                          />
                        </div>

                        <div className="border-bottom border-2 py-3">
                          <h4 className="fw-500 mb-1">SALON</h4>
                          <Location
                            type={"beauty_salon"}
                            prepareRequestData={prepareRequestData}
                            prepareMapData={prepareMapData}
                            property={communityData}
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
        </div>
      </section>
      {communityData &&
        communityData.amenities &&
        communityData.amenities.length > 0 && (
          <section
            id="amenities"
            className={` ${isMobileDev ? "my-2" : "my-5"}`}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row ">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div
                          className={`mainHead  text-center text-primary ${isMobileDev ? "mb-2" : "mb-5"
                            }`}
                        >
                          <h4>AMENITIES</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-12 col-md-12">
                      {!isMobileDev && (
                        <Swiper
                          slidesPerView={2}
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
                          autoplay={{
                            delay: 3000,
                          }}
                          modules={[Navigation, Pagination, Autoplay]}
                          onSwiper={(swiper) => {
                            amentitiesSwiperRef.current = swiper;
                          }}
                          className={`swiper amenitiesSwiper ${isMobileDev ? "px-2" : "px-5"
                            }`}
                        >
                          {communityData?.amenities?.map((amenity, index) => {
                            return (
                              <SwiperSlide
                                key={amenity.id + index + "amentity"}
                              >
                                <div className="swiper-slide">
                                  <div className="py-3">
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
                            onClick={() =>
                              amentitiesSwiperRef.current?.slideNext()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-right fs-1"></i>
                            </span>
                          </div>
                          <div
                            className="swiper-button-prev text-primary"
                            onClick={() =>
                              amentitiesSwiperRef.current?.slidePrev()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-left fs-1"></i>
                            </span>
                          </div>
                          {/* <div className="swiper-pagination"></div> */}
                        </Swiper>
                      )}
                      {isMobileDev && (
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
                              spaceBetween: 0,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 0,
                            },
                            1024: {
                              slidesPerView: 6,
                              spaceBetween: 0,
                            },
                          }}
                          autoplay={{
                            delay: 3000,
                          }}
                          modules={[Navigation, Pagination, Autoplay]}
                          onSwiper={(swiper) => {
                            amentitiesSwiperRef.current = swiper;
                          }}
                          className={`swiper amenitiesSwiper ${isMobileDev ? "px-2" : "px-5"
                            }`}
                        >
                          {communityData?.amenities?.map((amenity, index) => {
                            return (
                              <SwiperSlide
                                key={amenity.id + index + "amentity"}
                              >
                                <div className="swiper-slide">
                                  <div className="py-3">
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
                            onClick={() =>
                              amentitiesSwiperRef.current?.slideNext()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-right fs-1"></i>
                            </span>
                          </div>
                          <div
                            className="swiper-button-prev text-primary"
                            onClick={() =>
                              amentitiesSwiperRef.current?.slidePrev()
                            }
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
            </div>
          </section>
        )}
      {communityData &&
        (communityData?.rentProperties.length > 0 ||
          communityData?.saleProperties.length > 0) && (
          <section
            id="properties"
            className={` ${isMobileDev ? "my-2" : "my-5"}`}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div
                          className={`mainHead  text-center text-primary ${isMobileDev ? "mb-2" : "mb-5"
                            }`}
                        >
                          <h4>AVAILABLE PROPERTIES</h4>
                        </div>
                      </div>
                    </div>
                    {communityData?.rentProperties.length > 0 && (
                      <div className="col-12 col-lg-12 col-md-12">
                        <div className={`row ${isMobileDev ? "mb-2" : "mb-5"}`}>
                          <h6 className="sctionCommunitySubTitle text-primary col-6">
                            FOR RENT
                          </h6>
                          <div className="col-6 text-end">
                            {communityData?.rentProperties.length > 0 && (
                              <Link
                                href={`/rent?community_name=${communityData?.name}&community_detail=${communityData?.id}&property_type=${form.accommodation}&accommodation_id=${form.accommodation_id}`}
                                className="text-decoration-none bdrBtn width-auto-fit"
                                style={{ width: "fit-content" }}
                              >
                                View All
                              </Link>
                            )}
                          </div>
                        </div>
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
                          autoplay={{
                            delay: 3000,
                          }}
                          modules={[Navigation, Pagination, Autoplay]}
                          onSwiper={(swiper) => {
                            PropertyRentSwiperRef.current = swiper;
                          }}
                          className={`swiper projectSlider ${isMobileDev ? "pb-2" : "pb-5"
                            }`}
                        >
                          {communityData?.rentProperties?.map(
                            (property, index) => {
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
                                                <img
                                                  src={property.property_banner}
                                                  alt={property.name}
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
                                          <div className="card-body rounded-3 rounded-top-0 communityPropertyCard">
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
                                                  <img
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
                                                  <img
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
                                                  <img
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
                            }
                          )}

                          <div
                            className="swiper-button-prev swiperUniquePrev text-primary"
                            onClick={() =>
                              PropertyRentSwiperRef.current?.slidePrev()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-left fs-1"></i>
                            </span>
                          </div>
                          <div
                            className="swiper-button-next swiperUniqueNext text-primary"
                            onClick={() =>
                              PropertyRentSwiperRef.current?.slideNext()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-right fs-1"></i>
                            </span>
                          </div>
                          {/* <div className="swiper-pagination"></div> */}
                        </Swiper>
                      </div>
                    )}
                    {communityData?.saleProperties.length > 0 && (
                      <div className="col-12 col-lg-12 col-md-12">
                        <div className={`row ${isMobileDev ? "mb-2" : "mb-5"}`}>
                          <h6 className="sctionCommunitySubTitle text-primary col-6">
                            FOR SALE
                          </h6>
                          <div className="col-6 text-end">
                            {communityData?.saleProperties.length > 0 && (
                              <Link
                                href={`/buy?community_name=${communityData?.name}&community_detail=${communityData?.id}&accommodation_id=${form.accommodation_id}`}
                                className="text-decoration-none bdrBtn width-auto-fit"
                                style={{ width: "fit-content" }}
                              >
                                View All
                              </Link>
                            )}
                          </div>
                        </div>
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
                          autoplay={{
                            delay: 3000,
                          }}
                          modules={[Navigation, Pagination, Autoplay]}
                          onSwiper={(swiper) => {
                            PropertySaleSwiperRef.current = swiper;
                          }}
                          className={`swiper projectSlider ${isMobileDev ? "pb-2" : "pb-5"
                            }`}
                        >
                          {communityData?.saleProperties?.map(
                            (property, index) => {
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
                                                <img
                                                  src={property.property_banner}
                                                  alt={property.name}
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
                                          <div className="card-body rounded-3 rounded-top-0 communityPropertyCard">
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
                                                  <img
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
                                                  <img
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
                                                  <img
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
                            }
                          )}

                          <div
                            className="swiper-button-prev swiperUniquePrev text-primary"
                            onClick={() =>
                              PropertySaleSwiperRef.current?.slidePrev()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-left fs-1"></i>
                            </span>
                          </div>
                          <div
                            className="swiper-button-next swiperUniqueNext text-primary"
                            onClick={() =>
                              PropertySaleSwiperRef.current?.slideNext()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-right fs-1"></i>
                            </span>
                          </div>
                        </Swiper>
                      </div>
                    )}
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
      {communityData &&
        communityData.nearbyCommunities &&
        communityData.nearbyCommunities.length > 0 && (
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
                        autoplay={{
                          delay: 3000,
                        }}
                        modules={[Navigation, Pagination, Autoplay]}
                        onSwiper={(swiper) => {
                          nearbyCommunitiesSwiperRef.current = swiper;
                        }}
                        className={`swiper projectSlider ${isMobileDev ? "pb-2" : "pb-5"
                          }`}
                      >
                        {communityData?.nearbyCommunities.map(
                          (nearbyCommunity, index) => {
                            return (
                              <SwiperSlide key={nearbyCommunity.id + index}>
                                <div className="swiper-slide">
                                  <div className="card propCard rounded-0">
                                    <div className="">
                                      <Link
                                        href={`/communities/${nearbyCommunity.slug}`}
                                        className="text-decoration-none"
                                      >
                                        <div className="projectImgCont">
                                          <img
                                            src={nearbyCommunity.mainImage}
                                            alt="project1"
                                            className="img-fluid propImg"
                                          />
                                        </div>
                                      </Link>
                                    </div>
                                    <div className="card-body rounded-3 rounded-top-0 nearByCommunityCardBody">
                                      <Link
                                        href={`/communities/${nearbyCommunity.slug}`}
                                        className="text-decoration-none"
                                      >
                                        <div className="mb-1 text-center">
                                          <h5 className="text-black text-nowrap">
                                            {nearbyCommunity.name}
                                          </h5>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          }
                        )}

                        <div
                          className="swiper-button-prev swiperUniquePrev text-primary"
                          onClick={() =>
                            nearbyCommunitiesSwiperRef.current?.slidePrev()
                          }
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-next swiperUniqueNext text-primary"
                          onClick={() =>
                            nearbyCommunitiesSwiperRef.current?.slideNext()
                          }
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

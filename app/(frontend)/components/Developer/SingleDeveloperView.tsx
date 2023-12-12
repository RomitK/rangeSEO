"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleDeveloperData } from "@/src/services/DeveloperService";
import Modal from "./Model"
import { useRouter } from "next/navigation";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
  OverlayView,
} from "@react-google-maps/api";
import { useGetAllHomeData } from "@/src/services/HomeService";;
import Project from "./Project";

function SingleDeveloperView({ params }) {
  const slug = params.slug[0];
  const { developerData } = useGetSingleDeveloperData(slug);
  const PropertySwiperRef = useRef<SwiperCore>();
  const swiperRef = useRef<SwiperCore>();

  const router = useRouter();
  const { homeData } = useGetAllHomeData();

  const options = developerData?.newProjects;
  const projectChangeHandle = (event) => {
    router.push("/projects/" + event.value);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
  });
  const [mapRef, setMapRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({
    id: null,
    address: "",
    title: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    starting_price: "",
    mainImage: "",
    slug: "",
    completionStatusName: "",
  });
  const [markers, setMarkers] = useState([]);
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });

  const [minMaxPrice, setMinMaxPrice] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  useEffect(() => {
    if (developerData?.mapProjects) {
      setMarkers(JSON.parse(developerData?.mapProjects));
    }
  }, [developerData]);
  const handleApplyPrice = () => {
    setMinMaxPrice({
      minPrice: minPriceRef.current.value,
      maxPrice: maxPriceRef.current.value,
    });
    const minPrice = minPriceRef.current.value ? minPriceRef.current.value : 0;
    const maxPrice = maxPriceRef.current.value ? maxPriceRef.current.value : 0;

    router.push(`projects?minprice=${minPrice}&maxprice=${maxPrice}`);
  };
  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };
  const handleViewProject = () => {
   // const searchBy = {"name":developerData.name,"type":"developer-"+developerData.id}
    router.push(`/projects?name=${developerData.name}&type=${developerData.id}`);
  }

  const handleMarkerClick = (
    id,
    lat,
    lng,
    address,
    title,
    area,
    bedrooms,
    bathrooms,
    starting_price,
    mainImage,
    slug,
    completionStatusName
  ) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({
      id,
      address,
      title,
      area,
      bedrooms,
      bathrooms,
      starting_price,
      mainImage,
      slug,
      completionStatusName,
    });
    setIsOpen(true);
  };
  const [selectedProject, setSelectedProject] = useState({
    id: "",
    label: "",
    value: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      {developerData && (
        <section className="my-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-12 col-md-12">
                <div className="row g-3 justify-content-center">
                  <div className="col-12 col-lg-12 col-md-12">
                    <div>
                      <div className="mainHead mb-3 text-center">
                        <h4 className=" text-primary">{developerData.name}</h4>
                        {developerData &&
                          developerData.shortDescription &&
                          parse(developerData.shortDescription)}
                      </div>
                    </div>
                  </div>
                  {developerData && developerData.imageGallery && (
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
                        onSwiper={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                        className="swiper communityMainSwiper"
                      >
                        {developerData?.imageGallery?.map((img, index) => {
                          return (
                            <SwiperSlide key={img.id + index + "gallery"}>
                              <div className="swiper-slide">
                                <div className="communityImgCont">
                                  <img
                                    src={img.path}
                                    alt="community1"
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
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              onLoad={onMapLoad}
              onClick={() => setIsOpen(false)}
            >
              {markers.map(
                (
                  {
                    address,
                    title,
                    area,
                    bedrooms,
                    bathrooms,
                    starting_price,
                    mainImage,
                    lat,
                    lng,
                    slug,
                    completionStatusName,
                  },
                  ind
                ) => (
                  <MarkerF
                    key={ind}
                    position={{ lat, lng }}
                    onClick={() => {
                      handleMarkerClick(
                        ind,
                        lat,
                        lng,
                        address,
                        title,
                        area,
                        bedrooms,
                        bathrooms,
                        starting_price,
                        mainImage,
                        slug,
                        completionStatusName
                      );
                    }}
                  >
                    <OverlayView
                      position={{ lat, lng }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "5px",
                          border: "1px solid #ccc",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                          borderRadius: "4px",
                          minWidth: "50px", // Set a minimum width
                          whiteSpace: "nowrap", // Rounded corners
                        }}
                      >
                        {starting_price}
                      </div>
                    </OverlayView>
                    {isOpen && infoWindowData?.id === ind && (
                      <InfoWindow
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <div>
                          <Project
                            slug={infoWindowData.slug}
                            area={infoWindowData.area}
                            bathrooms={infoWindowData.bathrooms}
                            bedrooms={infoWindowData.bedrooms}
                            starting_price={infoWindowData.starting_price}
                            address={infoWindowData.address}
                            mainImage={infoWindowData.mainImage}
                            title={infoWindowData.title}
                            completionStatusName={
                              infoWindowData.completionStatusName
                            }
                          />
                        </div>
                      </InfoWindow>
                    )}
                  </MarkerF>
                )
              )}
            </GoogleMap>
          )}
        </div>
      </Modal>
      <section className="my-5">
        <div className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12">
                  <div>
                    <div className="mainHead mb-5 text-center text-primary">
                      <h4>LATEST PROJECTS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row g-0 justify-content-center mb-4">
                    <div className="col-10 col-lg-2 col-md-3  mx-3 my-auto">
                      <div className="bg-white shadow px-3 py-2">
                        <p className="text-primary mb-1 fw-semibold">
                          NEW PROJECTS
                        </p>
                        <div>
                        <Select
                            onChange={projectChangeHandle}
                            options={options}
                            className=""
                            value={selectedProject}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-10 col-lg-2 col-md-3 mx-3 my-auto"
                      onClick={openModal}
                    >
                      <div className="mapShowBg shadow">
                        <p className="text-primary mb-1 fw-semibold">
                          SHOW MAP
                        </p>
                      </div>
                    </div>
                    <div className="col-10 col-lg-2 col-md-3 mx-3 my-auto">
                      <div className="bg-white shadow  px-3 py-2">
                        <p className="text-primary mb-1 fw-semibold">
                          PRICE RANGE
                        </p>
                        <div className="dropdown">
                          <div
                            className="form-select"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                          >
                            {minMaxPrice.minPrice && minMaxPrice.maxPrice
                              ? `${minMaxPrice.minPrice} ${
                                  minMaxPrice.minPrice &&
                                  minMaxPrice.maxPrice &&
                                  "-"
                                } ${minMaxPrice.maxPrice} AED`
                              : "Price"}
                            {}
                          </div>
                          <div className="dropdown-menu p-4 mt-1">
                            <div className="mb-3">
                              <label className="form-label">
                                Minimum Price
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minprice"
                                min={0}
                                placeholder="0"
                                name="minprice"
                                ref={minPriceRef}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Maximum Price
                              </label>
                              <input
                                type="number"
                                name="maxprice"
                                className="form-control"
                                id="maxprice"
                                placeholder="Any Price"
                                ref={maxPriceRef}
                              />
                            </div>
                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-lg"
                                type="button"
                                onClick={handleApplyPrice}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {developerData?.projects?.map((project, index) => {
                  return (
                    <div
                      className="col-12 col-lg-3 col-md-3"
                      key={project.id + index}
                    >
                      <div className="projectImgCont">
                        <Link
                          href={`/projects/${project?.slug}`}
                          className="text-decoration-none text-white"
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
                              <p className="fw-bold mb-1">{project.title}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
                <div className="text-center py-3 text-primary">
                  <a className="text-primary"  onClick={handleViewProject} href="#">
                  VIEW ALL
                  </a>
                    {/* <Link
                        href={`/projects`}
                        className="text-primary"
                      >
                       VIEW ALL
                      </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {developerData && developerData.communities &&  developerData.communities.length > 0 && (
        <section className="mt-5 bg-light py-5">
          <div className="container">
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-12 col-lg-12 col-md-12">
                    <div>
                      <div className="mainHead mb-5 text-primary text-center">
                        <h4>DEVELOPMENT BY {developerData.name}</h4>
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
                        swiperRef.current = swiper;
                      }}
                      className="swiper pb-5 projectSlider"
                    >
                      {developerData?.communities?.map((community, index) => {
                        return (
                          <SwiperSlide key={community.id + index}>
                            <div className="swiper-slide">
                              <div>
                                <div className="card propCard rounded-0">
                                  <div>
                                    <div className="">
                                      <Link
                                        href={`/communities/${community?.slug}`}
                                        className="text-decoration-none text-white"
                                      >
                                        <div className="projectImgCont">
                                          <img
                                            src={community.mainImage}
                                            alt={community.name}
                                            className="img-fluid propImg"
                                          />
                                        </div>
                                      </Link>
                                    </div>
                                    <div className="card-body rounded-3 rounded-top-0">
                                      <Link
                                        href={`/communities/${community?.slug}`}
                                        className="text-decoration-none text-white"
                                      >
                                        <div className="mb-1 text-center">
                                          <h5 className="text-black">
                                            {community.name}
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
                      })}
                      <div
                        className=""
                        onClick={() => swiperRef.current?.slideNext()}
                      >
                        <span className="swiper-button-prev swiperUniquePrev text-primary">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-next swiperUniqueNext text-primary "
                        onClick={() => swiperRef.current?.slidePrev()}
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

      {developerData && developerData.properties &&  developerData.properties.length > 0 && (
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
                      {developerData?.properties?.map((property, index) => {
                        return (
                          <SwiperSlide key={property.id + +"property"}>
                            <div className="swiper-slide">
                              <div>
                                <div className="card propCard rounded-0">
                                  <div>
                                    <div className="">
                                      <Link
                                        href={`/properties/${property?.slug}`}
                                        className="text-decoration-none text-white"
                                      >
                                        <div className="projectImgCont">
                                          <img
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
                                        href={`/properties/${property?.slug}`}
                                        className="text-decoration-none text-white"
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
    </>
  );
}
export default SingleDeveloperView;

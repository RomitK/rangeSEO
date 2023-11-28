"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import parse from "html-react-parser";
// import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleProjectData } from "@/src/services/ProjectService";
import "@/public/css/single-project-view-styles.css";
import "@/public/css/responsive.css";
import DownloadFileModel from "../models/DownloadFileModel";
import PaymentPlanModel from "../models/paymentPlanModel";
function SingleProjectView({ params }) {
  const slug = params.slug[0];
  const { projectData } = useGetSingleProjectData(slug);
  const bannerSwiperRef = useRef<SwiperCore>();
  const innerSwiperRef = useRef<SwiperCore>();
  const otherProjectSwiperRef = useRef<SwiperCore>();
  const hightlightSwiperRef = useRef<SwiperCore>();
  const rentSwiperRef = useRef<SwiperCore>();
  const saleSwiperRef = useRef<SwiperCore>();
  const contactSideText =
    "An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  const pageUrl = "Home";
  const [currentUnit, setCurrentUnit] = useState(null);
  const [floorPlanFile, setFloorPlanFile] = useState(null);

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (projectData) {
      document.title = projectData?.name;
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

  return (
    <>
      <header>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            bannerSwiperRef.current = swiper;
          }}
          className="swiper"
        >
          {projectData?.exteriorGallery?.map((exteriorGallery, index) => {
            return (
              <SwiperSlide
                className="swiperSilderItem"
                key={exteriorGallery.id + +"exteriorGallery" + index}
              >
                <img src={exteriorGallery.path} className="sliderCoverImg" />
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
      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Starting Price</p>
                <h3>AED {projectData?.price}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Available Units</p>
                <h3>{projectData?.availableUnits} </h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Area from {projectData?.areaUnit}</p>
                <h3>{projectData?.area} </h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Handover</p>
                <h3>{projectData?.handOver}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="tabsListConatiner ">
          <div className="container">
            <div className="row">
              <div className="col-3 selectTitle">
                <a
                  className="tabTitle active"
                  href="#Hightlights"
                  aria-selected="true"
                >
                  Hightlights
                </a>
              </div>
              <div className="col-3 selectTitle ">
                <a
                  className="tabTitle"
                  href="#ProjectDetails"
                  aria-selected="true"
                >
                  Project Details
                </a>
              </div>
              <div className="col-3 selectTitle">
                <a className="tabTitle " href="#NearBy" aria-selected="true">
                  Nearby
                </a>
              </div>
              <div className="col-3 selectTitle">
                <a
                  className="tabTitle"
                  href="#AvailableProperties"
                  aria-selected="true"
                >
                  Available Properties
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="Hightlights">
        <div className="container ">
          <div className="row align-items-center ">
            <div className="col-md-8">
              <div className="secTabCntent" id="hightlight">
                <h4 className="sctionMdTitle text-primary">Hightlights</h4>
                <div className="text-secondary mb-4">
                  {parse(projectData?.hightlightDescription ?? "")}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Swiper
                pagination={true}
                modules={[Pagination]}
                onSwiper={(swiper) => {
                  innerSwiperRef.current = swiper;
                }}
                className="mySwiper singleSlider clmSlider"
              >
                {projectData?.interiorGallery?.map((interiorGallery, index) => {
                  return (
                    <SwiperSlide key={interiorGallery.id + +"interiorGallery"}>
                      <img src={interiorGallery.path} className="clmCoverImg" />
                    </SwiperSlide>
                  );
                })}

                {/* <div className="carouselArrowBar">
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
                      </div> */}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <section id="ProjectDetails">
        <div className="container ">
          <h4 className="sctionMdTitle text-primary my-4">Project Details</h4>
          {parse(projectData?.longDescription ?? "")}

          <div>
            <button
              className="btn btn-blue text-uppercase btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#floorplan"
              onClick={() => setFloorPlanFile(projectData.brochure)}
            >
              Download Brochure
            </button>
          </div>
        </div>
      </section>
      <section className="tableSection ">
        <div className="container">
          <h4 className="sctionMdTitle text-primary my-4">Property Type</h4>

          <div className="tableContainer">
            <table className="priceTable">
              <thead>
                <tr>
                  <th>
                    <h5 className="tblThText">Unit No.</h5>
                  </th>
                  <th>
                    <h5 className="tblThText">Type</h5>
                  </th>
                  <th>
                    <h5 className="tblThText">Size</h5>
                  </th>
                  <th>
                    <h5 className="tblThText text-center">Bedroom</h5>
                  </th>
                  <th>
                    <h5 className="tblThText text-center">Starting Price</h5>
                  </th>
                  <th>
                    <h5 className="tblThText">Payment Plan</h5>
                  </th>
                  <th>
                    <h5 className="tblThText">Floor Plan</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectData?.types?.map((type, index) => {
                  return (
                    <tr key={type.id}>
                      <td>
                        <p className="tblTdText text-secondary">{type.name}</p>
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
                          data-bs-target="#floorplan"
                          onClick={() => setFloorPlanFile(type.floorPlan)}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {projectData?.developer &&
        Object.keys(projectData.developer).length > 0 && (
          <section className="AboutDeveloper my-5 ">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="secContent">
                    <h4 className="sctionMdTitle text-primary mb-4">
                      About Developer
                    </h4>
                    <p className="fs-14 text-secondary mb-4">
                      {projectData &&
                        parse(projectData?.developer?.description ?? "")}
                    </p>
                    <Link
                      href={`/developers/${projectData?.developer?.slug}`}
                      className="text-decoration-none bdrBtn"
                    >
                      View More
                    </Link>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="colmImgBox">
                    <img
                      src={projectData.developer.logo}
                      className="clmContainImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      <section className="my-5   " id="NearBy">
        <div className="container">
          <div className="row">
            <div className="secTabCntent">
              <h4 className="sctionMdTitle text-primary">NEARBY</h4>
              <h6 className="sctionSubTitle text-primary">OTHER PROJECTS</h6>
            </div>
            <div className="row g-0">
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
                className="swiper pb-5 communitySwiper"
              >
                {projectData?.nearbyProjects?.map((project, index) => {
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
                              <p className="fw-bold mb-1">{project.title}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div
                  className="swiper-button-next text-primary"
                  onClick={() => otherProjectSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => otherProjectSwiperRef.current?.slidePrev()}
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
      </section>

      <section className="mt-5 bg-light py-5">
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
                      <div className="row">
                        <h6 className="sctionSubTitle text-primary col-6">
                          FOR RENT
                        </h6>
                        <div className="col-6 text-end">
                          {projectData?.rentProperties.length > 0 && (
                            <Link
                              href={`/rent`}
                              className="text-decoration-none bdrBtn "
                            >
                              View All
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="swiper pb-5 projectSlider">
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
                                              src={similarProperty.mainImage}
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

                <div className="row mb-5">
                  <h6 className="sctionSubTitle text-primary col-6">FOR BUY</h6>
                  <div className="col-6 text-end">
                    {projectData?.buyProperties.length > 0 && (
                      <Link
                        href={`/buy`}
                        className="text-decoration-none bdrBtn "
                      >
                        View All
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="swiper pb-5 projectSlider">
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
                                              src={similarProperty.mainImage}
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
                        onClick={() => saleSwiperRef.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev swiperUniquePrev text-primary"
                        onClick={() => saleSwiperRef.current?.slideNext()}
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
          </div>
        </div>
      </section>

      {/* 
      <section className="my-5  border-top border-dark" id="AvailableProperties">
        <div className="container">
          <div className="row">
            <div className="secTabCntent">
              <h4 className="sctionMdTitle text-primary">
                AVAILABLE PROPERTIES
              </h4>
              <h6 className="sctionSubTitle text-primary">FOR RENT</h6>
            </div>
            <div className="row g-0">
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
                className="swiper pb-5 communitySwiper"
              >
                {projectData?.rentProperties?.map((property, index) => {
                  return (
                    <SwiperSlide
                      className="col-12 col-lg-3 col-md-3"
                      key={property.id + index}
                    >
                      <div className="projectImgCont">
                        <Link
                          href={`/properties/${property.slug}`}
                          className="fw-bold mb-1 text-decoration-none text-white"
                        >
                          <img
                            src={property.mainImage}
                            alt={property.name}
                            className="img-fluid"
                          />
                          <div className="projectImgOverlay">
                            <div>
                              <span className="badge projectType">
                                {property.accommodation}
                              </span>
                            </div>
                            <div className="text-white">
                              <p className="fw-bold mb-1">{property.name}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div
                  className="swiper-button-next text-primary"
                  onClick={() => rentSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => rentSwiperRef.current?.slidePrev()}
                >
                  <span className="">
                    <i className="bi bi-chevron-left fs-1"></i>
                  </span>
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>

            <div className="secTabCntent">
              <h6 className="sctionSubTitle text-primary">FOR SALE</h6>
            </div>
            <div className="row g-0">
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
                className="swiper pb-5 communitySwiper"
              >
                {projectData?.nearbyProjects?.map((project, index) => {
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
                              <p className="fw-bold mb-1">{project.title}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div
                  className="swiper-button-next text-primary"
                  onClick={() => saleSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => saleSwiperRef.current?.slidePrev()}
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
      </section> */}

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
    </>
  );
}
export default SingleProjectView;

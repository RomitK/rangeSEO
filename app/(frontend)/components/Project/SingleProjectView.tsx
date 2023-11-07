"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import parse from "html-react-parser";
// import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleProjectData } from "@/src/services/ProjectService";
import "@/public/css/single-project-view-styles.css";

function SingleProjectView({ params }) {
  const slug = params.slug[0];
  const { projectData } = useGetSingleProjectData(slug);
  const bannerSwiperRef = useRef<SwiperType>;
  const innerSwiperRef = useRef<SwiperType>;
  const otherProjectSwiperRef = useRef<SwiperType>;
  const hightlightSwiperRef = useRef<SwiperType>;
  const rentSwiperRef = useRef<SwiperType>;
  const saleSwiperRef = useRef<SwiperType>;

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <header>
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            bannerSwiperRef.current = swiper;
          }}
          className="swiper"
        >
          {projectData?.exteriorGallery?.map((exteriorGallery, index) => {
            return (
              <SwiperSlide
                className="swiperSilderItem"
                key={exteriorGallery.id + +"exteriorGallery"}
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
      <section>
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
        <div className="secTabsArea">
          <div className="tabsListConatiner container">
            <div className="row">
              <div className="col-3">
                <a
                  className=" text-decoration-none bdrBtn"
                  href="#secTab-1"
                  aria-selected="true"
                >
                  Hightlights
                </a>
              </div>
              <div className="col-3">
                <a
                  className=" text-decoration-none bdrBtn"
                  href="#secTab-1"
                  aria-selected="true"
                >
                  Project Details
                </a>
              </div>
              <div className="col-3">
                <a
                  className=" text-decoration-none bdrBtn"
                  href="#secTab-1"
                  aria-selected="true"
                >
                  Nearby
                </a>
              </div>
              <div className="col-3">
                <a
                  className=" text-decoration-none bdrBtn"
                  href="#secTab-1"
                  aria-selected="true"
                >
                  Available Properties
                </a>
              </div>
            </div>
          </div>

          <div className="tab-content" id="pills-tabContent">
            <div className=" border-bottom border-dark" id="secTab-1">
              <div className="container ">
                <div className="row align-items-center ">
                  <div className="col-md-8">
                    <div className="secTabCntent" id="hightlight">
                      <h4 className="sctionMdTitle text-primary">
                        Hightlights
                      </h4>
                      <div className="text-secondary mb-4">
                        {parse(projectData?.hightlightDescription ?? "")}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Swiper
                      pagination={true}
                      modules={[Pagination]}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container ">
          <h4 className="sctionMdTitle text-primary my-4">Project Details</h4>
          {parse(projectData?.longDescription ?? "")}
        </div>
      </section>
      <section className="tableSection">
        <div className="container">
          <h4 className="sctionMdTitle text-primary my-4">Property Type</h4>
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
                        data-bs-target={"#pricePlaneModal" + type.id}
                      >
                        view
                      </button>
                    </td>
                    <td>
                      <button
                        className="fillBtn tblBtn mrAuto"
                        data-bs-toggle="modal"
                        data-bs-target="#floorPlaneModal"
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
      </section>
      {projectData?.developer &&
        Object.keys(projectData.developer).length > 0 && (
          <section className="my-5 ">
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
      <section className="my-5  border-top border-dark">
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
                onBeforeInit={(swiper) => {
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

      <section className="my-5  border-top border-dark">
        <div className="container">
          <div className="row">
            <div className="secTabCntent">
              <h4 className="sctionMdTitle text-primary">AVAILABLE PROPERTIES</h4>
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
                onBeforeInit={(swiper) => {
                  rentSwiperRef.current = swiper;
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
                onBeforeInit={(swiper) => {
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
      </section>
   

      {projectData?.types?.map((type, index) => {
        return (
          <div className="modal fade" id={"pricePlaneModal" + type.id}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Payment Plan</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="labelFLex">
                    <label className="priceLabel">
                      Sizes From : {projectData?.minPrice} To{" "}
                      {projectData?.maxPrice} SQFT
                    </label>
                    <label className="priceLabel">
                      Starting Price : AED {projectData?.price}
                    </label>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="tblThText">Installments</th>
                        <th className="tblThText">Percentage (%)</th>
                        <th className="tblThText">Milestones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {type?.paymentPlans.map((paymentPlan, index) => {
                        return (
                          <tr key={paymentPlan.id}>
                            <td>
                              {" "}
                              <p className="tblTdText text-secondary">
                                {paymentPlan?.installment}
                              </p>
                            </td>
                            <td>
                              <p className="tblTdText text-secondary">
                                {paymentPlan?.percentage}
                              </p>
                            </td>
                            <td>
                              <p className="tblTdText text-secondary">
                                {paymentPlan?.milestone}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      
      <div className="modal fade" id="floorPlaneModal">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Payment Plan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="floorFormBox">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingNumber"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="floatingNumber">Phone Number</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea
                    className="form-control textArea"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label htmlFor="floatingTextarea">Comments</label>
                </div>
                <input
                  type="submit"
                  className="fillBtn tblBtn mrAuto submitBtn"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleProjectView;

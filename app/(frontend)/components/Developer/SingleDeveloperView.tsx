"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleDeveloperData } from "@/src/services/DeveloperService";

function SingleDeveloperView({ params }) {
  const slug = params.slug[0];
  const { developerData } = useGetSingleDeveloperData(slug);
  const PropertySwiperRef = useRef<SwiperType>;
  const swiperRef = useRef<SwiperType>;
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
                          developerData.longDescription &&
                          parse(developerData.longDescription)}
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
                        onBeforeInit={(swiper) => {
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
                          <select
                            name=""
                            id=""
                            className="form-select form-select-sm border-0"
                          >
                            <option value="">All</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-10 col-lg-2 col-md-3 mx-3 my-auto">
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
                        <div>
                          <select
                            name=""
                            id=""
                            className="form-select form-select-sm border-0"
                          >
                            <option value="">All</option>
                          </select>
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
                  <a href="" className="text-primary">
                    VIEW ALL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {developerData && developerData.communities && (
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
                      onBeforeInit={(swiper) => {
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

      {developerData && developerData.properties && (
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
                      onBeforeInit={(swiper) => {
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

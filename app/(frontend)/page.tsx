"use client";
import React from "react";
import WhyRange from "./components/WhyRange/WhyRange";
import AboutDubai from "./components/AboutDubai/AboutDubai";
import ProjectList from "./components/Project/ProjectList";
import LookingFor from "./components/LookingFor/LookingFor";
import Testimonials from "./components/Testimonial/TestimonialList";
import HomeSearch from "./components/HomeSearch/HomeSearch";
import { SWRProvider } from "../swr-provider";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { useGetAllHomeData } from "@/src/services/HomeService";
import Link from "next/link";

export default function Home() {
  const PropertySwiperRef = useRef<SwiperType>;
  const { homeData } = useGetAllHomeData();
  return (
    <>
      <SWRProvider>
        <HomeSearch></HomeSearch>
        <LookingFor></LookingFor>
        <WhyRange></WhyRange>
        <AboutDubai></AboutDubai>
        <ProjectList></ProjectList>
        <div>
          <section className="my-5">
            <div className="container-fluid px-0">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row g-0">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="mainHead mb-5 text-center text-primary">
                          <h4>TOP LOCATIONS</h4>
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
                        {homeData?.communities?.map((community, index) => {
                          return (
                            <SwiperSlide key={community.id + index}>
                              <div className="swiper-slide">
                                <div className="communityImgCont">
                                  <Link
                                    href={`communities/${community.slug}`}
                                    className=" text-decoration-none "
                                  >
                                    <img
                                      src={community.mainImage}
                                      alt={community.name}
                                      className="img-fluid"
                                    />
                                    <div className="communityImgOverlay">
                                      <div className="text-white">
                                        <p className="fw-bold mb-1">
                                          {community.name}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}

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
                        <div className="swiper-pagination"></div>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Testimonials></Testimonials>
      </SWRProvider>
    </>
  );
}

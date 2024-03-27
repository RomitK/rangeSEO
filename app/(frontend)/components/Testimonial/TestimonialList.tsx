"use client";
import React from "react";
import { useRef } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { useGetAllHomeData } from "@/src/services/HomeService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";


function Testimonials() {
  const testimonialSwiperRef = useRef<SwiperCore>();
  const { homeData, isLoading, isError, mutate } = useGetAllHomeData();

  useEffect(() => {
    // Fetch data when the component mounts
    mutate();
  }, [mutate]);
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-3">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="mainHead mb-3 text-center text-primary">
                    <h4>Client Testimonials</h4>
                  </div>
                  <div className="text-center mb-0">
                    <p className="text-secondary">
                      Discover what our clients are saying about their
                      exceptional experience with Range International Property
                      Investments.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">

                  {homeData?.testimonials ? (
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={50}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      loop={true}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 50,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 50,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 50,
                        },
                      }}
                      modules={[Navigation]}
                      onSwiper={(swiper) => {
                        testimonialSwiperRef.current = swiper;
                      }}
                      className="swiper px-5 testiSlider"
                    >
                      {homeData?.testimonials?.map((testimonial, index) => {
                        return (
                          <SwiperSlide key={index + "slide"}>
                            <div className="swiper-slide">
                              <div className="bg-light p-4">
                                <div>
                                  <i className="fa fa-quote-left fs-6 text-blue"></i>
                                </div>
                                <div className="text-primary mt-1 fs-12">
                                  <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                  <span className="fa fa-star"></span>
                                </div>
                                <div>
                                  <p className="fs-14 my-1 testimonal-line-ellipsis">
                                    {testimonial.feedback}
                                  </p>
                                </div>
                                <div className="text-end text-blue">
                                  <i className="fa fa-quote-right fs-6"></i>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex justify-content-start mt-2">
                                    <div className="my-auto me-3"></div>
                                    <div className="my-auto">
                                      <div className="">
                                        <h4 className="fw-800 mb-0 fs-14 text-blue">
                                          {testimonial.clientName}
                                        </h4>
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
                        className="swiper-button-next text-primary"
                        onClick={() =>
                          testimonialSwiperRef.current?.slideNext()
                        }
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev text-primary"
                        onClick={() =>
                          testimonialSwiperRef.current?.slidePrev()
                        }
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                    </Swiper>
                  ) : (
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={50}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      loop={true}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                          spaceBetween: 50,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 50,
                        },
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 50,
                        },
                      }}
                      modules={[Navigation]}
                      onSwiper={(swiper) => {
                        testimonialSwiperRef.current = swiper;
                      }}
                      className="swiper px-5 testiSlider"
                    >
                      {[...Array(5)].map((_, index) => (
                        <SwiperSlide key={index + "test"}>
                          <div className="swiper-slide">
                            <div className="bg-light p-4">
                              <div>
                                <i className="fa fa-quote-left fs-6 text-blue"></i>
                              </div>
                              <div className="text-primary mt-1 fs-12">
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                              </div>
                              <div>
                                <p className="fs-14 my-1 testimonal-line-ellipsis">
                                  I was impressed with the professionalism and market knowledge demonstrated by Range's sales agents. They guided me through every step of the process, ensuring I made an informed decision. Thanks to their expertise, I found my dream property in Dubai. Highly recommended!
                                </p>
                              </div>
                              <div className="text-end text-blue">
                                <i className="fa fa-quote-right fs-6"></i>
                              </div>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-start mt-2">
                                  <div className="my-auto me-3"></div>
                                  <div className="my-auto">
                                    <div className="">
                                      <h4 className="fw-800 mb-0 fs-14 text-blue">
                                        Emily Smith
                                      </h4>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </SwiperSlide>

                      ))}

                      <div
                        className="swiper-button-next text-primary"
                        onClick={() =>
                          testimonialSwiperRef.current?.slideNext()
                        }
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-prev text-primary"
                        onClick={() =>
                          testimonialSwiperRef.current?.slidePrev()
                        }
                      >
                        <span className="">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                    </Swiper>
                  )}

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Testimonials;

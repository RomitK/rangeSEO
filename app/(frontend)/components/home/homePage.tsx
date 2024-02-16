"use client";
import React from "react";
import WhyRange from "@/app/(frontend)/components/WhyRange/WhyRange";
import AboutDubai from "@/app/(frontend)/components/AboutDubai/AboutDubai";
import ProjectList from "@/app/(frontend)/components/HomeProject/ProjectList";
import LookingFor from "@/app/(frontend)/components/LookingFor/LookingFor";
import Testimonials from "@/app/(frontend)/components/Testimonial/TestimonialList";
import HomeSearch from "@/app/(frontend)/components/HomeSearch/HomeSearch";
import { SWRProvider } from "@/app/swr-provider";
// import "@/public/css/developers-styles.css";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { useGetAllHomeData } from "@/src/services/HomeService";
import Link from "next/link";
const HomePage = () => {
  const PropertySwiperRef = useRef<SwiperCore>();
  const developerSwiperRef = useRef<SwiperCore>();
  const testimonialSwiperRef = useRef<SwiperCore>();
  const { homeData } = useGetAllHomeData();
  return (
    <>
      <SWRProvider>
        <HomeSearch></HomeSearch>
        <LookingFor></LookingFor>
        <WhyRange></WhyRange>
        <AboutDubai brochure={homeData?.brochure}></AboutDubai>
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
                          <h4>KNOW YOUR LOCATIONS</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-12 col-md-12">
                      {homeData?.communities && (
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
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
                            onClick={() =>
                              PropertySwiperRef.current?.slidePrev()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-left fs-1"></i>
                            </span>
                          </div>
                          <div
                            className="swiper-button-next swiperUniqueNext text-white"
                            onClick={() =>
                              PropertySwiperRef.current?.slideNext()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-right fs-1"></i>
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
        </div>

        <div>
          <section className="my-5">
            <div className="container-fluid px-0">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row g-0">
                    <div className="col-12 col-lg-12 col-md-12">
                      <div>
                        <div className="mainHead text-center text-primary">
                          <h4>WE PARTNER WITH THE BEST</h4>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {homeData?.developers && (
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
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
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            1024: {
                              slidesPerView: 5,
                              spaceBetween: 10,
                            },
                          }}
                          autoplay={{
                            delay: 3000,
                          }}
                          modules={[Navigation, Pagination, Autoplay]}
                          onSwiper={(swiper) => {
                            developerSwiperRef.current = swiper;
                          }}
                          className="swiper projectSlider"
                        >
                          {homeData?.developers?.map((developer, index) => {
                            return (
                              <SwiperSlide key={developer.id + index}>
                                <Link
                                  href={`/developers/${developer?.slug}`}
                                  className="col-md-4"
                                  key={developer.id}
                                >
                                  <div className="HomepartnerBox">
                                    <img
                                      src={developer.logo}
                                      className="logoImg"
                                      alt={developer.name}
                                    />
                                  </div>
                                </Link>
                              </SwiperSlide>
                            );
                          })}

                          <div
                            className="swiper-button-prev swiperUniquePrev text-primary"
                            onClick={() =>
                              developerSwiperRef.current?.slidePrev()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-left fs-1"></i>
                            </span>
                          </div>
                          <div
                            className="swiper-button-next swiperUniqueNext text-primary"
                            onClick={() =>
                              developerSwiperRef.current?.slideNext()
                            }
                          >
                            <span className="">
                              <i className="bi bi-chevron-right fs-1"></i>
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
        </div>
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
                    {homeData?.testimonials && (
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
                                          {/* <p className="text-primary fs-12 mb-0">
                                        Daren Axell
                                      </p> */}
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className="my-auto">
                                  <a
                                    href="tel:800 72 888"
                                    className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none"
                                  >
                                    Contact Agent
                                  </a>
                                </div> */}
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
                    )}
                  </div>
                  {/* <div className="col-12 col-lg-12 col-md-12">
                    <div className="text-center py-3">
                      <button className="btn btn-blue text-uppercase btn-lg">
                        VIEW MORE
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SWRProvider>
    </>
  );
};
export default HomePage;

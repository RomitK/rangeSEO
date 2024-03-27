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
import { SWRProvider } from "@/app/swr-provider";
import Loader from "@/app/(frontend)/components/UI/Loader";
const WhyRange = dynamic(() => import('@/app/(frontend)/components/WhyRange/WhyRange'));
const AboutDubai = dynamic(() => import('@/app/(frontend)/components/AboutDubai/AboutDubai'));
const ProjectList = dynamic(() => import('@/app/(frontend)/components/HomeProject/ProjectList'));
const LookingFor = dynamic(() => import('@/app/(frontend)/components/LookingFor/LookingFor'));
const HomeSearch = dynamic(() => import('@/app/(frontend)/components/HomeSearch/HomeSearch'));
const Testimonials = dynamic(() => import('@/app/(frontend)/components/Testimonial/TestimonialList'));

// import "@/public/css/developers-styles.css";

const HomePage = () => {

  const [isMobileDev, setIsMobileDev] = useState(false);
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

  const PropertySwiperRef = useRef<SwiperCore>();
  const developerSwiperRef = useRef<SwiperCore>();
  const testimonialSwiperRef = useRef<SwiperCore>();
  const { homeData } = useGetAllHomeData();
  return (
    <>
      <SWRProvider>
        <AboutDubai />
        <ProjectList />
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
                      {homeData?.communities ? (
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
                          {homeData.communities.map((community, index) => (
                            <SwiperSlide key={community.id + index}>
                              <div className="swiper-slide">
                                <div className="communityImgCont">
                                  <Link
                                    href={`communities/${community.slug}`}
                                    className="text-decoration-none"
                                  >
                                    <img
                                      loading="lazy"
                                      src={community.mainImage}
                                      alt={community.name}
                                      className="img-fluid"
                                    />
                                    <div className="communityImgOverlay">
                                      <div className="text-white">
                                        <p className="fw-bold mb-1">{community.name}</p>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                          <div
                            className="swiper-button-prev swiperUniquePrev text-white"
                            onClick={() => PropertySwiperRef.current?.slidePrev()}
                          >
                            <span className=""><i className="bi bi-chevron-left fs-1"></i></span>
                          </div>
                          <div
                            className="swiper-button-next swiperUniqueNext text-white"
                            onClick={() => PropertySwiperRef.current?.slideNext()}
                          >
                            <span className=""><i className="bi bi-chevron-right fs-1"></i></span>
                          </div>
                        </Swiper>
                      ) : (
                        // Render a separate Swiper for dummy images
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
                          {[...Array(4)].map((_, index) => (
                            <SwiperSlide key={index}>
                              <div className="swiper-slide">
                                <div className="communityImgCont">
                                  <img
                                    src="/images/community/test.webp"
                                    alt={"Dummy Community Image" + index}
                                    className="img-fluid"
                                  />
                                  <div className="communityImgOverlay">
                                    <div className="text-white">
                                      <p className="fw-bold mb-1">Dummy Community Name</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                          <div
                            className="swiper-button-prev swiperUniquePrev text-white"
                            onClick={() => PropertySwiperRef.current?.slidePrev()}
                          >
                            <span className=""><i className="bi bi-chevron-left fs-1"></i></span>
                          </div>
                          <div
                            className="swiper-button-next swiperUniqueNext text-white"
                            onClick={() => PropertySwiperRef.current?.slideNext()}
                          >
                            <span className=""><i className="bi bi-chevron-right fs-1"></i></span>
                          </div>
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

                      {homeData?.developers ? (
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
                                    <img loading="lazy"
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
                      ) : (
                        // Render a separate Swiper for dummy images
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
                          {[...Array(5)].map((_, index) => (
                            <SwiperSlide key={index}>
                              <Link
                                href={`/developers/${index}`}
                                className="col-md-4"
                                key={index}
                              >
                                <div className="HomepartnerBox">
                                  <img loading="lazy"
                                    src="/images/developers/test.webp"
                                    className="logoImg"
                                    alt={"test developer name" + index}
                                  />
                                </div>
                              </Link>
                            </SwiperSlide>
                          ))}
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
                        </Swiper>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Testimonials />
      </SWRProvider >
    </>
  );
};
export default HomePage;

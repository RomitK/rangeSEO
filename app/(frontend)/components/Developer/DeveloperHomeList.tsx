"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import { useGetAllHomeData } from "@/src/services/HomeService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

function DeveloperHomeList() {
    const { homeData, isLoading, isError, mutate } = useGetAllHomeData();
    const developerSwiperRef = useRef<SwiperCore>();
    return (
        <>
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
        </>
    );
}
export default DeveloperHomeList;

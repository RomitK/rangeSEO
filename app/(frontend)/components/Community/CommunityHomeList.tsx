"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useGetHomeCommunities } from "@/src/services/HomeService";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

function CommunityHomeList() {
    const CommunitiesSwiperRef = useRef<SwiperCore>();
    const { homeCommunities, isLoading, isError, mutate } = useGetHomeCommunities();
    useEffect(() => {
        mutate();
    }, [mutate]);

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
                                            <div className="mainHead mb-5 text-center text-primary">
                                                <h4>KNOW YOUR LOCATIONS</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-12 col-md-12">
                                        {homeCommunities ? (
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
                                                    CommunitiesSwiperRef.current = swiper;
                                                }}
                                                className="swiper pb-5 projectSlider"
                                            >
                                                {homeCommunities.map((community, index) => (
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
                                                    onClick={() => CommunitiesSwiperRef.current?.slidePrev()}
                                                >
                                                    <span className=""><i className="bi bi-chevron-left fs-1"></i></span>
                                                </div>
                                                <div
                                                    className="swiper-button-next swiperUniqueNext text-white"
                                                    onClick={() => CommunitiesSwiperRef.current?.slideNext()}
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
                                                    CommunitiesSwiperRef.current = swiper;
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
                                                    onClick={() => CommunitiesSwiperRef.current?.slidePrev()}
                                                >
                                                    <span className=""><i className="bi bi-chevron-left fs-1"></i></span>
                                                </div>
                                                <div
                                                    className="swiper-button-next swiperUniqueNext text-white"
                                                    onClick={() => CommunitiesSwiperRef.current?.slideNext()}
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
        </>
    );
}
export default CommunityHomeList;

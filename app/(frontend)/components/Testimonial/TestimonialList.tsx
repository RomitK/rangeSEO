"use client";
import React from 'react'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';

import SingleTestimonial from "./SingeTestimonial";

function Testimonials(props) {
    const { testimonialData } = props
    const swiperRef = useRef<SwiperType>();
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
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-12 col-md-12">


                                    <div className="swiper px-5 testiSlider">
                                        <div className="swiper-wrapper">

                                        </div>
                                        <div className="swiper-button-next text-primary">
                                            <span className=''>
                                                <i className='bi bi-chevron-right fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-button-prev text-primary">
                                            <span className=''>
                                                <i className='bi bi-chevron-left fs-1'></i>
                                            </span>
                                        </div>
                                    </div>

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
                                        onBeforeInit={(swiper) => {
                                            swiperRef.current = swiper;
                                        }}
                                        className="swiper px-5 testiSlider"
                                    >
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="bg-light p-4">
                                                    <div>
                                                        <i className="fa fa-quote-left fs-6 text-blue"></i>
                                                    </div>
                                                    <div className="text-primary mt-1 fs-12"><span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 my-1">Lorem ipsum dolor sit amet, consectetur adipiscing
                                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                                                        </p>
                                                    </div>
                                                    <div className="text-end text-blue">
                                                        <i className="fa fa-quote-right fs-6"></i>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex justify-content-start mt-2">
                                                            <div className="my-auto me-3">

                                                            </div>
                                                            <div className="my-auto">
                                                                <div className="">
                                                                    <h4 className="fw-800 mb-0 fs-14 text-blue">Daren Axell</h4>
                                                                    <p className="text-primary fs-12 mb-0">Daren Axell</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-auto">
                                                            <a href="tel:800 72 888"
                                                                className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none">Contact
                                                                Agent</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="bg-light p-4">
                                                    <div>
                                                        <i className="fa fa-quote-left fs-6 text-blue"></i>
                                                    </div>
                                                    <div className="text-primary mt-1 fs-12"><span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 my-1">Lorem ipsum dolor sit amet, consectetur adipiscing
                                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                                                        </p>
                                                    </div>
                                                    <div className="text-end text-blue">
                                                        <i className="fa fa-quote-right fs-6"></i>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex justify-content-start mt-2">
                                                            <div className="my-auto me-3">

                                                            </div>
                                                            <div className="my-auto">
                                                                <div className="">
                                                                    <h4 className="fw-800 mb-0 fs-14 text-blue">Daren Axell</h4>
                                                                    <p className="text-primary fs-12 mb-0">Daren Axell</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-auto">
                                                            <a href="tel:800 72 888"
                                                                className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none">Contact
                                                                Agent</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="bg-light p-4">
                                                    <div>
                                                        <i className="fa fa-quote-left fs-6 text-blue"></i>
                                                    </div>
                                                    <div className="text-primary mt-1 fs-12"><span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 my-1">Lorem ipsum dolor sit amet, consectetur adipiscing
                                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                                                        </p>
                                                    </div>
                                                    <div className="text-end text-blue">
                                                        <i className="fa fa-quote-right fs-6"></i>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex justify-content-start mt-2">
                                                            <div className="my-auto me-3">

                                                            </div>
                                                            <div className="my-auto">
                                                                <div className="">
                                                                    <h4 className="fw-800 mb-0 fs-14 text-blue">Daren Axell</h4>
                                                                    <p className="text-primary fs-12 mb-0">Daren Axell</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-auto">
                                                            <a href="tel:800 72 888"
                                                                className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none">Contact
                                                                Agent</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="bg-light p-4">
                                                    <div>
                                                        <i className="fa fa-quote-left fs-6 text-blue"></i>
                                                    </div>
                                                    <div className="text-primary mt-1 fs-12"><span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 my-1">Lorem ipsum dolor sit amet, consectetur adipiscing
                                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                                                        </p>
                                                    </div>
                                                    <div className="text-end text-blue">
                                                        <i className="fa fa-quote-right fs-6"></i>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex justify-content-start mt-2">
                                                            <div className="my-auto me-3">

                                                            </div>
                                                            <div className="my-auto">
                                                                <div className="">
                                                                    <h4 className="fw-800 mb-0 fs-14 text-blue">Daren Axell</h4>
                                                                    <p className="text-primary fs-12 mb-0">Daren Axell</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-auto">
                                                            <a href="tel:800 72 888"
                                                                className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none">Contact
                                                                Agent</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="bg-light p-4">
                                                    <div>
                                                        <i className="fa fa-quote-left fs-6 text-blue"></i>
                                                    </div>
                                                    <div className="text-primary mt-1 fs-12"><span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                    </div>
                                                    <div>
                                                        <p className="fs-14 my-1">Lorem ipsum dolor sit amet, consectetur adipiscing
                                                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                                                        </p>
                                                    </div>
                                                    <div className="text-end text-blue">
                                                        <i className="fa fa-quote-right fs-6"></i>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex justify-content-start mt-2">
                                                            <div className="my-auto me-3">

                                                            </div>
                                                            <div className="my-auto">
                                                                <div className="">
                                                                    <h4 className="fw-800 mb-0 fs-14 text-blue">Daren Axell</h4>
                                                                    <p className="text-primary fs-12 mb-0">Daren Axell</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-auto">
                                                            <a href="tel:800 72 888"
                                                                className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none">Contact
                                                                Agent</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <div className="swiper-button-next text-primary" onClick={() => swiperRef.current?.slideNext()} onClick={() => swiperRef.current?.slideNext()}>
                                            <span className=''>
                                                <i className='bi bi-chevron-right fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-button-prev text-primary" onClick={() => swiperRef.current?.slidePrev()}>
                                            <span className=''>
                                                <i className='bi bi-chevron-left fs-1'></i>
                                            </span>
                                        </div>
                                    </Swiper>
                                </div>
                                <div className="col-12 col-lg-12 col-md-12">
                                    <div className="text-center py-3">
                                        <button className="btn btn-blue text-uppercase btn-lg">VIEW MORE</button>
                                    </div>
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
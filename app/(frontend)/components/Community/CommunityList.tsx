"use client";
import React from 'react'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { useState, useEffect } from 'react';

function CommunityList(props) {
    const swiperRef = useRef<SwiperType>;
    const [communities, setCommunities] = useState([]);
    useEffect(() => {
        fetch('https://rangenew.websitedemo.world/api/getHomeCommunities', {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            setCommunities(data.data)
        });
    }, []);
    return (
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
                                            clickable: true
                                        }}
                                        navigation={{
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev"
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
                                        className="swiper pb-5 communitySwiper"
                                    >
                                        {
                                            communities.map((community) => {
                                                return <SwiperSlide key={community['id']}>
                                                    <div className="swiper-slide">
                                                        <div className="communityImgCont">
                                                            <img src={community['mainImage']}
                                                                alt={community['name']} className="img-fluid" />
                                                            <div className="communityImgOverlay">
                                                                <div className="text-white">
                                                                    <p className="fw-bold mb-1">{community['name']}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })
                                        }
                                        <div className="swiper-button-next text-white" onClick={() => swiperRef.current?.slideNext()} onClick={() => swiperRef.current?.slideNext()}>
                                            <span className=''>
                                                <i className='bi bi-chevron-right fs-1'></i>
                                            </span>
                                        </div>
                                        <div className="swiper-button-prev text-white" onClick={() => swiperRef.current?.slidePrev()}>
                                            <span className=''>
                                                <i className='bi bi-chevron-left fs-1'></i>
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

    );
}
export default CommunityList;
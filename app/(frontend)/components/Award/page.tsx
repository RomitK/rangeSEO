"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "@/public/css/management-styles.css";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useGetAllAwardData } from "@/src/services/AwardService";

function AwardGallery() {
  const { AwardsData } = useGetAllAwardData();
  const testimonialSwiperRef = useRef<SwiperCore>();
  return (
    <section className="section">
      <h4 className="sctionMdTitle text-primary my-3">
        AWARD WINNING TEAM
      </h4>
      <Swiper

        onSwiper={(swiper) => {
          testimonialSwiperRef.current = swiper;
        }}
        onBeforeInit={(swiper) => {
          testimonialSwiperRef.current = swiper;
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 3000,
        }}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation={true}
        spaceBetween={50}
        className="mySwiper"
      >
        {AwardsData &&
          AwardsData?.map((award, index) => {
            return (
              <SwiperSlide key={award.id}>
                <img loading="lazy" src={award.path} className="awardsImg" alt="award iamge" />
              </SwiperSlide>
            )
          })
        }
        <div
          className="swiper-button-next text-white"
          onClick={() => testimonialSwiperRef.current?.slideNext()}
        >
          <span className="">
            <i className="bi bi-chevron-right fs-1"></i>
          </span>
        </div>
        <div
          className="swiper-button-prev text-white"
          onClick={() => testimonialSwiperRef.current?.slidePrev()}
        >
          <span className="">
            <i className="bi bi-chevron-left fs-1"></i>
          </span>
        </div>
      </Swiper>
    </section>
  );
}
export default AwardGallery;
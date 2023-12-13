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
import { Navigation } from "swiper/modules";
import { useGetAllAwardData } from "@/src/services/AwardService";

function AwardGallery(){
  const { AwardsData } = useGetAllAwardData();
  const testimonialSwiperRef = useRef<SwiperCore>();
    return (
        <section className="section">
          <h4 className="sctionMdTitle text-primary mb-5">
            AWARD WINNING TEAM
          </h4>
          <Swiper
            modules={[Navigation]}
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
            slidesPerView={1}
            navigation={true}
            className="mySwiper multiItemsSlider"
          >
            {AwardsData &&
              AwardsData?.map((award, index) => {
                return (
                  <SwiperSlide key={award.id}>
                    <img src={award.path} className="awardsImg" alt="award iamge"/>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </section>
    );
}
export default AwardGallery;
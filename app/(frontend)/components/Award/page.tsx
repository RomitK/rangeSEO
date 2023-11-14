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

function AwardGallery(){
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
            slidesPerView={3}
            navigation={true}
            className="mySwiper multiItemsSlider"
          >
            <SwiperSlide>
              <img src="/images/blogs/blog5.png" className="awardsImg" alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog2.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog3.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog4.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog4.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog5.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog5.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/blogs/blog5.png" className="awardsImg"  alt="dumy"/>
            </SwiperSlide>
          </Swiper>
        </section>
    );
}
export default AwardGallery;
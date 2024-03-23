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

function Management() {
  const PropertySwiperRef = useRef<SwiperCore>();
  const testimonialSwiperRef = useRef<SwiperCore>();
  return (
    <>
      <div className="container">
        <div className="PagiList mb-4">
          <span className="pagiText">Meet the Leader</span>
        </div>
        <section className="section ">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="sctionMdTitle text-primary">NITIN CHOPRA</h4>
              <span className="ceoText">CEO/Founder</span>
              <p className="fs-12 text-secondary mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="fs-12 text-secondary mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint
              </p>
            </div>
            <div className="col-md-4">
              <img loading="lazy" src="/images/team/nitin.png" className="leaderImg" />
            </div>
          </div>
        </section>
        <section className="section carouselSection">
          <video
            className="sectionImgVideo"
            autoPlay
            loop
            muted
            preload="metadata"
            poster="/images/services/service-header.webp"
          >
            <source src="/videos/services.mp4" type="video/mp4" />
            <source src="/videos/services.mp4" type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video>
        </section>
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
              <img loading="lazy" src="images/blogs/blog5.png" className="awardsImg" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="images/blogs/blog2.png" className="awardsImg" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="images/blogs/blog3.png" className="awardsImg" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="images/blogs/blog4.png" className="awardsImg" />
            </SwiperSlide>
          </Swiper>
        </section>
      </div>
    </>
  );
}
export default Management;

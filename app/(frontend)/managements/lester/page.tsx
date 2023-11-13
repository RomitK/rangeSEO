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
import AwardGallery from "../../components/Award/page";
import Link from "next/link";
function Management() {

  return (
    <>
      <div className="container">
        <div className="PagiList mb-4">
        <span className="pagiText">
          <Link href={`/about`} className="fillBtn  crdReadMorebtn mrAuto" >
          Meet the Leader
                  </Link>
                  </span>
        </div>
        <section className="section ">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="sctionMdTitle text-primary">Lester Verma</h4>
              <span className="ceoText">Managing Partner & Co-Founder</span>
              <p className="fs-12 text-secondary mb-4">
              Lester began his career in 1997 with the UAE banking industry and has over 17 years of Consumer Banking experience, primarily in Mortgages, which has given him a unique understanding of the property market. In addition, as a resident of UAE from 1989, he has witnessed the development of the Dubai property market first, and he brings this understanding to his role as Head of Sales with Range International Property Investments.
</p>
<p className="fs-12 text-secondary mb-4">
As Head of Sales for Mortgages in First Gulf Bank, he consistently exceeded the sales targets while proactively seeking and building relations with prospective developers and hence has a great network in the real estate industry both in Dubai and internationally.
              </p>
              
            </div>
            <div className="col-md-4">
              <img src="/images/team/lester.png" className="leaderImg" />
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
        <AwardGallery/>
      </div>
    </>
  );
}
export default Management;

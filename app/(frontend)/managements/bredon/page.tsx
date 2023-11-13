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
            <Link href={`/about`}>Meet the Leader</Link>
          </span>
        </div>
        <section className="section ">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="sctionMdTitle text-primary">Brendon Baker</h4>
              <span className="ceoText">Director</span>
              <p className="fs-12 text-secondary mb-4">
                Brendon started his career in mortgages working for a
                multinational bank in Dubai. He quickly climbed ranks and worked
                with the Business Banking division. He promptly established
                relationships with internal and external clients, leading sales
                and leasing transactions for retail, offices, warehouses and
                plots for clients establishing or growing their business.
              </p>
              <p className="fs-12 text-secondary mb-4">
                An expert at sales, purchasing, contract negotiations and growth
                management, he has a sharp eye for quality of product and
                fulfilling contractual obligations, Brendon holds the position
                of Director at Range International Property Investments to head
                the commercial sector. His prime focus is to facilitate clients
                looking for a commercial partner with transparent and
                professional representation in the market.
              </p>
            </div>
            <div className="col-md-4">
              <img src="/images/team/brendon.png" className="leaderImg" />
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
        <AwardGallery />
      </div>
    </>
  );
}
export default Management;

"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useGetAllFaqsData } from "@/src/services/FaqService";

function FaqsPage(){
    const { faqsData } = useGetAllFaqsData();
    console.log(faqsData)
    return (
        <h1>
            FAQS
        </h1>
    );
}
export default FaqsPage;
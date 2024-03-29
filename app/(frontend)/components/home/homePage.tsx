"use client";
import React from "react";
import { useRef } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { useGetAllHomeData } from "@/src/services/HomeService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import Loader from "@/app/(frontend)/components/UI/Loader";
const WhyRange = dynamic(() => import('@/app/(frontend)/components/WhyRange/WhyRange'));
const ProjectList = dynamic(() => import('@/app/(frontend)/components/HomeProject/ProjectList'));
const LookingFor = dynamic(() => import('@/app/(frontend)/components/LookingFor/LookingFor'));
const HomeSearch = dynamic(() => import('@/app/(frontend)/components/HomeSearch/HomeSearch'));
const Testimonials = dynamic(() => import('@/app/(frontend)/components/Testimonial/TestimonialList'));
const CommunityHomeList = dynamic(() => import('@/app/(frontend)/components/Community/CommunityHomeList'));
const DeveloperHomeList = dynamic(() => import('@/app/(frontend)/components/Developer/DeveloperHomeList'));


const HomePage = () => {
  return (
    <>
      <SWRProvider>
        <ProjectList />
        <CommunityHomeList />
        <DeveloperHomeList />
        <Testimonials />
      </SWRProvider >
    </>
  );
};
export default HomePage;

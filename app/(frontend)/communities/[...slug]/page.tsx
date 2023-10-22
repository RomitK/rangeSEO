"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { SWRProvider } from "@/app/swr-provider";
import { useGetSingleCommunityData } from "@/src/services/CommunityService";
import SingleCommunityView from "../../components/Community/SingleCommunityView";

export default function SingleCommunity({ params }) {
  return (
    <SWRProvider>
      <SingleCommunityView params={params}></SingleCommunityView>
    </SWRProvider>
  );
}

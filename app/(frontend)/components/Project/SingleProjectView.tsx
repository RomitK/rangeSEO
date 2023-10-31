"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleProjectData } from "@/src/services/ProjectService";

function SingleProjectView({ params }) {
  const slug = params.slug[0];
  const { projectData } = useGetSingleProjectData(slug);

  const swiperRef = useRef<SwiperType>;
  const PropertySwiperRef = useRef<SwiperType>;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <h1>Single Project</h1>
    </>
  );
}
export default SingleProjectView;

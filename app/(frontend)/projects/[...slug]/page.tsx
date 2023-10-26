"use client";
import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleProjectView from "../../components/Project/SingleProjectView";

export default function SingleProject({ params }) {
  return (
    <SWRProvider>
      <SingleProjectView params={params}></SingleProjectView>
    </SWRProvider>
  );
}

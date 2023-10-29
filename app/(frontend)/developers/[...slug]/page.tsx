"use client";
import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleDeveloperView from "../../components/Developer/SingleDeveloperView";

export default function SingleDeveloper({ params }) {
  return (
    <SWRProvider>
      <SingleDeveloperView params={params}></SingleDeveloperView>
    </SWRProvider>
  );
}

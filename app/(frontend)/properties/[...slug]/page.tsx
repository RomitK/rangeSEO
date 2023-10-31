"use client";
import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SinglePropertyView from "../../components/Property/SinglePropertyView";

export default function SingleDeveloper({ params }) {
  return (
    <SWRProvider>
      <SinglePropertyView params={params}></SinglePropertyView>
    </SWRProvider>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleCommunityView from "../../components/Community/SingleCommunityView";

function SingleCommunity({ params }: any) {
  return (
    <SWRProvider>
      <SingleCommunityView params={params}></SingleCommunityView>
    </SWRProvider>
  );
}
export default SingleCommunity;

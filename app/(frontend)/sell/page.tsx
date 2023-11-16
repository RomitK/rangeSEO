"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import SellPage from "../components/Sell/SellPage";
import "@/public/css/faq-styles.css";

function Sell() {
  return (
    <>
      <SWRProvider>
        <SellPage></SellPage>
      </SWRProvider>
    </>
  );
}
export default Sell;

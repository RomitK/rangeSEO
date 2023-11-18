"use client";
import React from "react";
import { SWRProvider } from "@/app/swr-provider";
import GoldenVisaPage from "../components/GoldenVisa/GoldenVisaPage";
import "@/public/css/goldenVisa-styles.css";

function GoldenVisa() {
  return (
    <>
      <SWRProvider>
        <GoldenVisaPage></GoldenVisaPage>
      </SWRProvider>
    </>
  );
}
export default GoldenVisa;

"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import "@/public/css/faq-styles.css";

function Faqs() {
  return (
    <>
      <SWRProvider>
        <FaqsPage></FaqsPage>
      </SWRProvider>
    </>
  );
}
export default Faqs;

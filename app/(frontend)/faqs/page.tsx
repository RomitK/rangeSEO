"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import FaqsPage from "../components/FaqsPage/FaqsPage";

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

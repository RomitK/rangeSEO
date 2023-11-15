"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import CareerListPage from "../components/CareerListPage/CareerList";
function Careers(){
    return (
        <>
        <SWRProvider>
        <CareerListPage></CareerListPage>
        </SWRProvider>
        </>
    );
}
export default Careers;
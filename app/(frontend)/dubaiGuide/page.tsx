"use client";
import React from "react";
import { SWRProvider } from "@/app/swr-provider";
import DubaiGuidePage from "../components/DubaiGuide/DubaiGuidePage";
import "@/public/css/dubaiGuide-styles.css";

function DubaiGuide()
{
    return (
        <SWRProvider>
        <DubaiGuidePage></DubaiGuidePage>
        </SWRProvider>
    );
}
export default DubaiGuide;
"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import CareerListPage from "../components/CareerListPage/CareerList";
function Blogs(){
    return (
        <>
        <SWRProvider>
        <h1>Blogs</h1>
        </SWRProvider>
        </>
    );
}
export default Blogs;
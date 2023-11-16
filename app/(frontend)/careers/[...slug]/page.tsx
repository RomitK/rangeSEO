"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import SingleCareerPage from "../../components/CareerListPage/SingleCareerPage";
function SingleCareerDetail({ params }: any){
    return (
        <>
        <SWRProvider>
        <SingleCareerPage params={params}></SingleCareerPage>
        </SWRProvider>
        </>
    );
}
export default SingleCareerDetail;
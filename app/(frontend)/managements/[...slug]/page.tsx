
"use client";
import React, { useEffect, useRef, useState } from "react";
import { SWRProvider } from "@/app/swr-provider";
import "@/public/css/about-styles.css";
import Link from "next/link";
import SingleManagementPage from "../../components/Management/SingleManagementPage";

function SingleManagement({ params }) {
  return (
    <>
      <SWRProvider>
      <SingleManagementPage params={params}></SingleManagementPage>
    </SWRProvider>
    </>
  );
}
export default SingleManagement;

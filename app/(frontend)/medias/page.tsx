"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import MediaPage from "../components/MediaPage/MediaPage";
import "@/public/css/medias-Styles.css";

function Medias({ params }) {
    return (
      <>
        <SWRProvider>
          <MediaPage params={params}></MediaPage>
        </SWRProvider>
      </>
    );
  }
export default Medias;
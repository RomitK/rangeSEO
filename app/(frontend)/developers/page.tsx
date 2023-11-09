"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import DeveloperList from "../components/Developer/DeveloperList";
import "@/public/css/developers-styles.css";
function Developers({ params }) {
  return (
    <>
      <SWRProvider>
        <DeveloperList params={params}></DeveloperList>
      </SWRProvider>
    </>
  );
}
export default Developers;

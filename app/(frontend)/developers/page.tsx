"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import DeveloperList from "../components/Developer/DeveloperList";
import "@/public/css/developers-styles.css";
function Developers(){
    return (
        <>
           <SWRProvider>
               <DeveloperList></DeveloperList>
          </SWRProvider>
        </>
    );
}
export default Developers;
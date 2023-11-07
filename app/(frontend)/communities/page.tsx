"use client";
import React from "react";
import Select from 'react-select';
import "@/public/css/communities-styles.css";
import { SWRProvider } from "@/app/swr-provider";
import CommunityList from "../components/Community/CommunityList";
function Communities(){

    return (
        <>
          <SWRProvider>
               <CommunityList></CommunityList>
          </SWRProvider>
        </>
    );
}
export default Communities;
"use client"
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { SWRProvider } from "@/app/swr-provider";
import PropertyList from '../components/Property/PropertyList'

function Properties() {
    return (
        <SWRProvider>
        <PropertyList></PropertyList>
      </SWRProvider>
       
    );
}

export default Properties;

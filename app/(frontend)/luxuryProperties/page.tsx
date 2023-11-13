"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "../components/LuxuryPropertiesPage/PropertyList";

const Ready = ({ params }) => {
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default Ready;

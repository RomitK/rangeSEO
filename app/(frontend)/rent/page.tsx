"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "../components/Property/PropertyList";

const Properties = () => {
  return (
    <SWRProvider>
      <PropertyList></PropertyList>
    </SWRProvider>
  );
};

export default Properties;

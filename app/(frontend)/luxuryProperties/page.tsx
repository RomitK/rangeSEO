"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "@/app/(frontend)/components/Properties/PropertyList";

const LuxuryProperties = ({ params }) => {
  params = { "isLuxury": true}
  return (
    <SWRProvider>
      <PropertyList params={params} ></PropertyList>
    </SWRProvider>
  );
};

export default LuxuryProperties;

"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "@/app/(frontend)/components/Properties/PropertyList";

const Properties = ({ params }) => {
  params = { "rent": true}
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default Properties;

"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "../components/Property/PropertyList";

const OffPlan = ({ params }) => {
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default OffPlan;

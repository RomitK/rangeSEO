"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
// import PropertyList from "../components/OffPlanPage/PropertyList";
import PropertyList from "@/app/(frontend)/components/Properties/PropertyList";
const OffPlan = ({ params }) => {
  params = { "offplan": true}
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default OffPlan;

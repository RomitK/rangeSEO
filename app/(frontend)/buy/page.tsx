"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
// import PropertyList from "../components/BuyPage/PropertyList";
import PropertyList from "@/app/(frontend)/components/Properties/PropertyList";

const Buy = ({ params }) => {
  params = { "buy": true}
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default Buy;

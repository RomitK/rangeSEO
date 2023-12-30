"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
// import PropertyList from "../components/ReadyPage/PropertyList";
import PropertyList from "@/app/(frontend)/components/Properties/PropertyList";

const Ready = ({ params }) => {
  params = { "ready": true}
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default Ready;

"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "../components/ReadyPage/PropertyList";

const properties = ({ params }) => {
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default properties;

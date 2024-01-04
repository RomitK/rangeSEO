"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";

import PropertyList from "@/app/(frontend)/components/Project/ProjectPageList"
const Projects = ({ params }) => {
  return (
    <SWRProvider>
      <PropertyList params={params}></PropertyList>
    </SWRProvider>
  );
};

export default Projects;

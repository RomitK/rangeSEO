"use client";
import React, { useEffect, useRef, useState } from "react";

import { SWRProvider } from "@/app/swr-provider";
import PropertyList from "../components/Property/PropertyList";
import ProjectPageList from "../components/Project/ProjectPageList";

const Projects = ({ params }) => {
  return (
    <SWRProvider>
      <ProjectPageList params={params}></ProjectPageList>
    </SWRProvider>
  );
};

export default Projects;
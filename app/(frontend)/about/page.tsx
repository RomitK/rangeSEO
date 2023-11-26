
"use client";
import React, { useEffect, useRef, useState } from "react";
import { SWRProvider } from "@/app/swr-provider";
import Link from "next/link";
import AboutPage from "../components/AboutPage/AboutPage";
function About() {
  return (
    <>
      <SWRProvider>
      <AboutPage></AboutPage>
    </SWRProvider>
    </>
  );
}
export default About;

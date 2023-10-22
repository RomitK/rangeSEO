"use client";
import React from "react";
import WhyRange from "./components/WhyRange/WhyRange";
import AboutDubai from "./components/AboutDubai/AboutDubai";
import CommunityList from "./components/Community/CommunityList";
import ProjectList from "./components/Project/ProjectList";
import LookingFor from "./components/LookingFor/LookingFor";
import Testimonials from "./components/Testimonial/TestimonialList";
import HomeSearch from "./components/HomeSearch/HomeSearch";
import { SWRProvider } from "../swr-provider";

export default function Home() {
  return (
    <>
      <SWRProvider>
        <HomeSearch></HomeSearch>
        <LookingFor></LookingFor>
        <WhyRange></WhyRange>
        <AboutDubai></AboutDubai>
        <ProjectList></ProjectList>
        <CommunityList></CommunityList>
        <Testimonials></Testimonials>
      </SWRProvider>
    </>
  );
}

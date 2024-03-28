
"use client";
import React, { useEffect, useRef, useState } from "react";
import { SWRProvider } from "@/app/swr-provider";
import Link from "next/link";
import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import PAGES from "@/src/constants/pages";
const AboutPage = dynamic(() => import('@/app/(frontend)/components/AboutPage/AboutPage'));

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const meta = await fetch(
    `${process.env.API_HOST}meta/${PAGES.about_the_range}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("err", err);
    });
  return {
    title: meta?.data?.title,
    description: meta?.data?.meta_description,
    keywords: meta?.data?.meta_keywords,
  };
};

function About() {
  return (
    <>
      <SWRProvider>
        <AboutPage />
      </SWRProvider>
    </>
  );
}
export default About;

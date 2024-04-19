import type { Metadata } from "next";
import Head from "next/head";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const HomePage = dynamic(() => import('@/app/(frontend)/components/home/homePage'));
const HomeSearch = dynamic(() => import('@/app/(frontend)/components/HomeSearch/HomeSearch'));
const LookingFor = dynamic(() => import('@/app/(frontend)/components/LookingFor/LookingFor'));
const WhyRange = dynamic(() => import('@/app/(frontend)/components/WhyRange/WhyRange'));
const AboutDubai = dynamic(() => import('@/app/(frontend)/components/AboutDubai/AboutDubai'));
import Loader from "@/app/(frontend)/components/UI/Loader";
import PAGES from "@/src/constants/pages";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const HomeMeta = await fetch(
    `${process.env.API_HOST}meta/${PAGES.home}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("err", err);
    });
  return {
    title: HomeMeta?.data?.title,
    description: HomeMeta?.data?.meta_description,
    keywords: HomeMeta?.data?.meta_keywords,
  };
};

// Wrap the dynamically loaded components with Suspense and provide a fallback loader
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <HomeSearch />
        <LookingFor />
        <WhyRange />
        <AboutDubai />
        <HomePage />
      </Suspense>
    </>
  );
}

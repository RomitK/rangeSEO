
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from "react";
import { SWRProvider } from "@/app/swr-provider";
import "@/public/css/teams-style.css";
import Link from "next/link";
import PAGES from "@/src/constants/pages";
const TeamPage = dynamic(() => import('@/app/(frontend)/components/Team/TeamPage'));

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const HomeMeta = await fetch(
    `${process.env.API_HOST}meta/${PAGES.meet_the_team}`,
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

function Teams() {
  return (
    <>
      <TeamPage />
    </>
  );
}
export default Teams;

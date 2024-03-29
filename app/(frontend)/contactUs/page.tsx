

import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import PAGES from "@/src/constants/pages";
import "@/public/css/contact-Us-styles.css";
const ContactPage = dynamic(() => import('@/app/(frontend)/components/ContactPage/ContactPage'));

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const HomeMeta = await fetch(
    `${process.env.API_HOST}meta/${PAGES.contact_us}`,
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

function ContactUs() {
  return (
    <>
        <ContactPage/>
    </>
  );
}
export default ContactUs;

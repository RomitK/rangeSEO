import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import "@/public/css/about-styles.css";
import SingleManagementPage from "../../components/Management/SingleManagementPage";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleManagement({ params }) {
  return <SingleManagementPage params={params}></SingleManagementPage>;
}


export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  if (slug) {
    const managementMeta = await fetch(
      `${process.env.API_HOST}managements/${slug}/meta`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log("err", err);
      });

    return {
      title: managementMeta?.data?.meta_title,
      description: managementMeta?.data?.meta_description,
      keywords: managementMeta?.data?.meta_keywords,
    };
  }
};

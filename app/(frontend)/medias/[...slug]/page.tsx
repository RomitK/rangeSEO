import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import SingleDeveloperPage from "../../components/Developer/SingleDeveloperPage";
import SingleMediaPage from "../../components/MediaPage/SingleMediaPage";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleMedia({ params }) {
  return <SingleMediaPage params={params}></SingleMediaPage>;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  if (slug) {
    const mediaMeta = await fetch(`${process.env.API_HOST}medias/${slug}/meta`, { cache: "no-store" })
        .then((res) => res.json())
        .catch((err) => {
          console.log("err", err);
        });
    return {
      title: mediaMeta?.data?.meta_title,
      description: mediaMeta?.data?.meta_description,
      keywords: mediaMeta?.data?.meta_keywords,
    };
  }
};


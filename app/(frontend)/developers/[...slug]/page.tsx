import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import SingleDeveloperPage from "../../components/Developer/SingleDeveloperPage";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleDeveloper({ params }) {
  return <SingleDeveloperPage params={params}></SingleDeveloperPage>;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  if (slug) {
    const developerMeta = await fetch(`${process.env.API_HOST}developers/${slug}/meta`, { cache: "no-store" })
        .then((res) => res.json())
        .catch((err) => {
          console.log("err", err);
        });
    return {
      title: developerMeta?.data?.name,
      description: developerMeta?.data?.meta_description,
      keywords: developerMeta?.data?.meta_keywords,
    };
  }
};


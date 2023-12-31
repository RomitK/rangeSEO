import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import SinglePropertyPage from "../../components/Property/SinglePropertyPage";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleProperty({ params }) {
  return <SinglePropertyPage params={params}></SinglePropertyPage>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  if (slug) {
    const propertyMeta = await fetch(
      `${process.env.API_HOST}/properties/${slug}/meta`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .catch((err) => {

        console.log("err", err);
      });

    return {
      title: propertyMeta?.data?.meta_title,
      description: propertyMeta?.data?.meta_description,
      keywords: propertyMeta?.data?.meta_keywords,
    };
  }
};


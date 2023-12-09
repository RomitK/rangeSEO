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
  const property = await fetch(`${process.env.API_HOST}/properties/${slug}`).then(
    (res) => res.json()
  );

  return {
    title: property?.data?.name,
    description: property?.data?.meta_description,
    keywords: property?.data?.meta_keywords,
  };
};


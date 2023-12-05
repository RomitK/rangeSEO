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
  const developer = await fetch(`${process.env.API_HOST}developers/${slug}`).then(
    (res) => res.json()
  );

  return {
    title: developer?.data?.name,
    description: developer?.data?.meta_description,
    keywords: developer?.data?.meta_keywords,
  };
};


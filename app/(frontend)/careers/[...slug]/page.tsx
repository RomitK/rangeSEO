import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import SingleCareerPage from '@/app/(frontend)/components/CareerListPage/SingleCareerPage'
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleCareerDetail({ params }) {
  return <SingleCareerPage params={params}></SingleCareerPage>;
}


export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  if (slug) {
    const careerMeta = await fetch(
      `${process.env.API_HOST}careers/${slug}/meta`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log("err", err);
      });

    return {
      title: careerMeta?.data?.meta_title,
      description: careerMeta?.data?.meta_description,
      keywords: careerMeta?.data?.meta_keywords,
    };
  }
};

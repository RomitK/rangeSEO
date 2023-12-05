import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import SingleCommunityPage from "../../components/Community/SingleCommunityPage";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleCommunity({ params }) {
  return <SingleCommunityPage params={params}></SingleCommunityPage>;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  const community = await fetch(`${process.env.API_HOST}communities/${slug}`).then(
    (res) => res.json()
  );

  return {
    title: community?.data?.name,
    description: community?.data?.meta_description,
    keywords: community?.data?.meta_keywords,
  };
};


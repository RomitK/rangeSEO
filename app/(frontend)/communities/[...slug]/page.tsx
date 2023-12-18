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

export const metadata: Metadata = {
  title: 'Community detail title ',
  description: 'Welcome to Next.js',
}
// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const slug = params.slug;
//   if (slug) {
//     const communityMeta = await fetch(
//       `${process.env.API_HOST}/communities/${slug}/meta`,
//       { cache: "no-store" }
//     )
//       .then((res) => res.json())
//       .catch((err) => {

//         console.log("err", err);
//       });

//     return {
//       title: communityMeta?.data?.meta_title,
//       description: communityMeta?.data?.meta_description,
//       keywords: communityMeta?.data?.meta_keywords,
//     };
//   }
// };

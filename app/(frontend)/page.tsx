import type { Metadata } from "next";
import Head from "next/head";
import HomePage from "./components/home/homePage";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const HomeMeta = await fetch(`${process.env.API_HOST}homePage/meta`).then(
    (res) => res.json()
  );
  return {
    title: HomeMeta?.data?.title,
    description: HomeMeta?.data?.meta_description,
    keywords: HomeMeta?.data?.meta_keywords,
  };
};

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

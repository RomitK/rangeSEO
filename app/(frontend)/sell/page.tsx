import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import Link from "next/link";
import PAGES from "@/src/constants/pages";
import "@/public/css/services-styles.css";
import Image from 'next/image'
const SellPage = dynamic(() => import('@/app/(frontend)/components/Sell/SellPage'));

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const HomeMeta = await fetch(
    `${process.env.API_HOST}meta/${PAGES.sell}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log("err", err);
    });
  return {
    title: HomeMeta?.data?.title,
    description: HomeMeta?.data?.meta_description,
    keywords: HomeMeta?.data?.meta_keywords,
  };

};


function Sell() {
  return (
    <>
        <SellPage/>
    </>
  );
}
export default Sell;

import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import Link from "next/link";
import PAGES from "@/src/constants/pages";
import React, { useState, useEffect } from "react";

const CareerListPage = dynamic(() => import('@/app/(frontend)/components/CareerListPage/CareerList'));

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const HomeMeta = await fetch(
        `${process.env.API_HOST}meta/${PAGES.careers}`,
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

function Careers() {
    return (
        <>
            <CareerListPage />
        </>
    );
}
export default Careers;
import { useGetSingleCareerData } from "@/src/services/CareerService";
import React, { useRef, useState, useEffect } from "react";
import "@/public/css/career-page-styles.css";
import "@/public/css/responsive.css";
import { Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";
import Link from "next/link";

function SingleCareerPage({ params }) {

    const slug = params.slug[0];
    const { CareerData } = useGetSingleCareerData(slug);

  return (
    <>
    <h1>{CareerData?.position}</h1>
    </>
  );
}
export default SingleCareerPage;

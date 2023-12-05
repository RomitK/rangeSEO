"use client";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SinglePropertyView from "../../components/Property/SinglePropertyView";

const SinglePropertyPage = ({ params }) => {
  return (
    <SWRProvider>
      <SinglePropertyView params={params}></SinglePropertyView>
    </SWRProvider>
  );
};
export default SinglePropertyPage;

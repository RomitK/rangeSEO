"use client";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleMediaView from "@/app/(frontend)/components/MediaPage/SingleMediaView"

const SingleMediaPage = ({ params }) => {
  return (
    <SWRProvider>
      <SingleMediaView params={params}></SingleMediaView>
    </SWRProvider>
  );
};
export default SingleMediaPage;

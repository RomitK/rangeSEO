"use client";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleManagmentPageView from "./SingleManagmentPageView";
const SingleManagementPage = ({ params }) => {
  return (
    <SWRProvider>
      <SingleManagmentPageView params={params}></SingleManagmentPageView>
    </SWRProvider>
  );
};
export default SingleManagementPage;

"use client";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleCommunityView from "../../components/Community/SingleCommunityView";

const SingleDeveloperPage = ({ params }) => {
  return (
    <SWRProvider>
      <SingleCommunityView params={params}></SingleCommunityView>
    </SWRProvider>
  );
};
export default SingleDeveloperPage;

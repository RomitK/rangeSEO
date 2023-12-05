"use client";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleDeveloperView from "../../components/Developer/SingleDeveloperView";

const SingleDeveloperPage = ({ params }) => {
  return (
    <SWRProvider>
      <SingleDeveloperView params={params}></SingleDeveloperView>
    </SWRProvider>
  );
};
export default SingleDeveloperPage;

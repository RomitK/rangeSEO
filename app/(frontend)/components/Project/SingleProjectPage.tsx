"use client";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { SWRProvider } from "@/app/swr-provider";
import SingleProjectView from "../../components/Project/SingleProjectView";

const SingleProjectPage = ({ params }) => {
  return (
    <SWRProvider>
      <SingleProjectView params={params}></SingleProjectView>
    </SWRProvider>
  );
};
export default SingleProjectPage;

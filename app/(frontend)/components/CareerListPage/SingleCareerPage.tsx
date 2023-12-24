"use client";
import { SWRProvider } from "@/app/swr-provider";
import SingleCareerViewPage from '@/app/(frontend)/components/CareerListPage/SingleCareerViewPage'

const SingleDeveloperPage = ({ params }) => {
  return (
    <SWRProvider>
      <SingleCareerViewPage params={params}></SingleCareerViewPage>
    </SWRProvider>
  );
};
export default SingleDeveloperPage;

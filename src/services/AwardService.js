import useSWR from "swr";
import httpClient from "./http-client";

export const useGetAllAwardData = (slug) => {
  const { data: AwardsData, error, mutate } = useSWR(`/awards`);
  return { AwardsData: AwardsData?.data, AwardsDataMutate: mutate };
};

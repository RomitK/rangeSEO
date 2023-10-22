import useSWR from "swr";
export const useGetAllHomeData = () => {
  const { data:homeData, error, mutate } = useSWR(`/getHomeData`);
  return { homeData: homeData?.data, homeDataMutate: mutate };
};

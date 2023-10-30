import useSWR from "swr";
export const useGetSingleCommunityData = (slug) => {
  const {
    data: communityData,
    error,
    mutate,
  } = useSWR(slug ? `/communities/${slug}` : null);
  return { communityData: communityData?.data, communityDataMutate: mutate };
};

import useSWR from "swr";
export const useGetSingleCommunityData = (slug) => {
  const {
    data: communityData,
    error,
    mutate,
  } = useSWR(slug ? `/communities/${slug}` : null);
  return { communityData: communityData?.data, communityDataMutate: mutate };
};
export const useGetAllCommunityData = (slug) => {
  const {
    data: communitiesData,
    error,
    mutate,
  } = useSWR(`/communities`);
  return { communitiesData: communitiesData?.data, communitiesDataMutate: mutate };
};
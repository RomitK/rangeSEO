import useSWR from "swr";
export const useGetSingleCommunityData = (slug) => {
  console.log(slug);
  const {
    data: communityData,
    error,
    mutate,
  } = useSWR(slug ? `/communities/${slug}` : null);
  console.log(communityData);
  return { communityData: communityData?.data, communityDataMutate: mutate };
};

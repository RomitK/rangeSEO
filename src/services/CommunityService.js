import useSWR from "swr";
export const useGetSingleCommunityData = (slug) => {
  const {
    data: communityData,
    error,
    mutate,
  } = useSWR(slug ? `/communities/${slug}` : null);
  return { communityData: communityData?.data, communityDataMutate: mutate };
};
export const useGetAllCommunityData = (slug = null, form = null) => {
  let url = `/communities?`;
  for (let key in form) {
    if (form.hasOwnProperty(key)) {
      if (form[key].value) {
        url += `${key}=${form[key].value}&`;
      }
    }
  }
  const { data: communitiesData, error, mutate } = useSWR(url);
  return {
    communitiesData: communitiesData?.data,
    communitiesDataMutate: mutate,
  };
};

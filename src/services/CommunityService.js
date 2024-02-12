import useSWR from "swr";
export const useGetSingleCommunityData = (slug, form) => {
 // console.log(form)
  let url = `/communities/${slug}/detail/?`;
  for (let key in form) {
    if (form.hasOwnProperty(key)) {
      if (form[key]) { // Check if the value is truthy, not if it has a 'value' property
        url += `${key}=${form[key]}&`; // Access the value directly, no need for .value
      }
    }
  }
  // console.log(url)
  const { data: communityData, error, mutate, isValidating } = useSWR(url);

  return { communityData: communityData?.data, communityDataMutate: mutate };
};
export const useGetCommunityOption = () =>{
  const {
    data: communityOption,
    error,
    mutate,
  } = useSWR(`/communnityOptions`);
  return { communityOption: communityOption?.data, communityOptionMutate: mutate };

}
export const useGetAllCommunityData = (slug = null, form = null) => {
  let url = `/communities?`;
  for (let key in form) {
    if (form.hasOwnProperty(key)) {
      if (form[key].value) {
        url += `${key}=${form[key].value}&`;
      }
    }
  }
  const { data: communitiesData, error, mutate, isValidating } = useSWR(url);
  return {
    communitiesData: communitiesData?.data,
    communitiesDataMutate: mutate,
     isValidating,
  };
};

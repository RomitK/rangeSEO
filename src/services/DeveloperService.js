import useSWR from "swr";
export const useGetSingleDeveloperData = (slug) => {
  console.log(slug)
  const {
    data: developerData,
    error,
    mutate,
  } = useSWR(slug ? `/developers/${slug}` : null);
  console.log(developerData)
  return { developerData: developerData?.data, developerDataMutate: mutate };
};

export const useGetAllDeveloperData = (slug) => {
  const {
    data: developersData,
    error,
    mutate,
  } = useSWR(`/developers`);
  return { developersData: developersData?.data, developersDataMutate: mutate };
};

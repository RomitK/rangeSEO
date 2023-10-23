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

import useSWR from "swr";
export const useGetSingleDeveloperData = (slug) => {
  const {
    data: developerData,
    error,
    mutate,
  } = useSWR(slug ? `/developers/${slug}/detail` : null);

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

export const useGetDeveloperOptions = (slug) => {
  const {
    data: developerOption,
    error,
    mutate,
  } = useSWR(`/developerOptions`);
  return { developerOption: developerOption?.data, developerOptionMutate: mutate };
};

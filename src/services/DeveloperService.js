import useSWR from "swr";
export const useGetSingleDeveloperData = (slug) => {
  const {
    data: developerData,
    error,
    mutate,
  } = useSWR(slug ? `/developers/${slug}/detail` : null);

  return { developerData: developerData?.data, developerDataMutate: mutate };
};

export const useGetAllDeveloperData = (slug = null, form = null) => {
  let url = `/developers?`;
  for (let key in form) {
    if (form.hasOwnProperty(key)) {
      if (form[key].value) {
        url += `${key}=${form[key].value}&`;
      }
    }
  }
  const { data: developersData, error, mutate, isValidating } = useSWR(url);
  return {
    developersData: developersData?.data,
    developersDataMutate: mutate,
     isValidating,
  };

};

export const useGetDeveloperOptions = (slug) => {
  const {
    data: developerOption,
    error,
    mutate,
  } = useSWR(`/developerOptions`);
  return { developerOption: developerOption?.data, developerOptionMutate: mutate };
};

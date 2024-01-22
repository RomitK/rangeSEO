import useSWR from "swr";


export const useGetMedias = (slug = null, form = null) => {
  let url = `/medias?`;
  for (let key in form) {
    if (form.hasOwnProperty(key)) {
      if (form[key].value) {
        url += `${key}=${form[key].value}&`;
      }
    }
  }
  const { data: mediaData, error, mutate, isValidating } = useSWR(url);
  return {
    mediaData: mediaData?.data,
    mediaDataMutate: mutate,
    isValidating,
  };
};

export const useGetSingleMediaData = (slug) => {
  const {
    data: mediaData,
    error,
    mutate,
  } = useSWR(slug ? `/medias/${slug}/detail` : null);

  return { mediaData: mediaData?.data, mediaDataMutate: mutate };
};

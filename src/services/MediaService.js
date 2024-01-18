import useSWR from "swr";

export const useGetMedias = (slug) => {
  const {
    data: medias,
    error,
    mutate,
  } = useSWR(`/medias`);
  return { medias: medias?.data, mediasMutate: mutate };
};

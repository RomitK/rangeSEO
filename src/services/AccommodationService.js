import useSWR from "swr";

export const useGetAccommodationOptions = (slug) => {
  const {
    data: accommodationOptions,
    error,
    mutate,
  } = useSWR(`/accommodationOptions`);
  return { accommodationOptions: accommodationOptions?.data, accommodationOptionsMutate: mutate };
};

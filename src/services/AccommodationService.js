import useSWR from "swr";

export const useGetAccommodationOptions = (slug) => {
  const {
    data: accommodationOptions,
    error,
    mutate,
  } = useSWR(`/accommodationOptions`);
  return { accommodationOptions: accommodationOptions?.data, accommodationOptionsMutate: mutate };
};


export const useGetDeveloperAccommodationOptions = (slug) => {
  const {
    data: accommodationOptions,
    error,
    mutate,
  } = useSWR(`/developerAccommodationOptions`);
  return { accommodationOptions: accommodationOptions?.data, accommodationOptionsMutate: mutate };
};

export const useGetCommunityAccommodationOptions = (slug) => {
  const {
    data: accommodationOptions,
    error,
    mutate,
  } = useSWR(`/communityAccommodationOptions`);
  return { accommodationOptions: accommodationOptions?.data, accommodationOptionsMutate: mutate };
};

export const useGetProjectAccommodations = () => {
  const { data: projectAccommodations, error, mutate } = useSWR(`/projectAccommodations`);
  return { projectAccommodations: projectAccommodations?.data, projectAccommodationsMutate: mutate };
};

export const useGetPropertyAccommodations = () => {
  const { data: propertyAccommodations, error, mutate } = useSWR(`/propertyAccommodations`);
  return { propertyAccommodations: propertyAccommodations?.data, propertyAccommodationsMutate: mutate };
};


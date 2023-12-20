import useSWR from "swr";
export const useGetAllPropertyData = () => {
  const { data: propertiesData, error, mutate } = useSWR(`/properties`);
  return { propertiesData: propertiesData?.data, propertiesDataMutate: mutate };
};
export const useGetSinglePropertyData = (slug) => {
  const {
    data: propertyData,
    error,
    mutate,
  } = useSWR(slug ? `/properties/${slug}/detail` : null);
  return { propertyData: propertyData?.data, propertyDataMutate: mutate };
};

export const useGetAccommodations = () => {
  const { data: accommodations, error, mutate } = useSWR(`/accommodations`);
  return { accommodations: accommodations?.data, accommodationsMutate: mutate };
};

export const useGetCommunities = () => {
  const { data: communities, error, mutate } = useSWR(`/communities`);
  return { communities: communities?.data, communitiesMutate: mutate };
};

export const useGetAmenities = () => {
  const { data: amenities, error, mutate } = useSWR(`/amenities`);
  return { amenities: amenities?.data, amenitiesMutate: mutate };
};

export const useGetProperties = (params) => {
  const { data: properties, error, mutate } = useSWR(`/properties?` + params);
  return { propertiesData: properties?.data, propertiesMutate: mutate };
};

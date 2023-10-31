import useSWR from "swr";
export const useGetAllPropertyData = () => {
  const {
    data: propertiesData,
    error,
    mutate,
  } = useSWR(`/properties`);
  return { propertiesData: propertiesData?.data, propertiesDataMutate: mutate };
};
export const useGetSinglePropertyData = (slug) => {
  const {
    data: propertyData,
    error,
    mutate,
  } = useSWR(slug ? `/properties/${slug}` : null);
  return { propertyData: propertyData?.data, propertyDataMutate: mutate };
};
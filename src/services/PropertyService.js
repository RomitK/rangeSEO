import useSWR from "swr";
export const useGetAllPropertyData = () => {
  const {
    data: propertiesData,
    error,
    mutate,
  } = useSWR(`/properties`);
  return { propertiesData: propertiesData?.data, propertiesDataMutate: mutate };
};

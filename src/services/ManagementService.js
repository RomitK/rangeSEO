import useSWR from "swr";
export const useGetSingleManagementData = (slug) => {
  const {
    data: managementData,
    error,
    mutate,
  } = useSWR(slug ? `/managements/${slug}` : null);
  return { managementData: managementData?.data, managementDataMutate: mutate };
};
export const useGetAllManagementData = (slug) => {
  const {
    data: managementsData,
    error,
    mutate,
  } = useSWR(`/managements`);
  return { managementsData: managementsData?.data, managementsDataMutate: mutate };
};
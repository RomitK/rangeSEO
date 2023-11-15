import useSWR from "swr";

export const useGetSingleCareerData = (slug) => {
  const {data: CareerData,error,mutate,} = useSWR(slug ? `/careers/${slug}` : null);
  return { CareerData: CareerData?.data, CareerDataMutate: mutate };
};

export const useGetAllCareerData = (slug) => {
  const {data: CareersData,  error, mutate } = useSWR(`/careers`);
  return { CareersData: CareersData?.data, CareersDataMutate: mutate };
};
import useSWR from "swr";

export const useGetAllFaqsData = () => {
  const { data: faqsData, error, mutate } = useSWR(`/faqs`);
  return { faqsData: faqsData?.data, faqsDataMutate: mutate };
};

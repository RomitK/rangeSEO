import useSWR from "swr";

export const useGetAllFaqsData = () => {
  const { data: faqsData, error, mutate } = useSWR(`/faqs`);
  return { faqsData: faqsData?.data, faqsDataMutate: mutate };
};

export const useGetContactFaqsData = () => {
  const { data: faqsData, error, mutate } = useSWR(`/contactFaqs`);
  return { faqsData: faqsData?.data, faqsDataMutate: mutate };
};

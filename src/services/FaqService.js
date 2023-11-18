import useSWR from "swr";

export const useGetAllFaqsData = (search = null) => {
  const {
    data: faqsData,
    error,
    mutate,
  } = useSWR(`/faqs${search ? "?keyword=" + search : ""}`);
  return { faqsData: faqsData?.data, faqsDataMutate: mutate };
};

export const useGetContactFaqsData = () => {
  const { data: faqsData, error, mutate } = useSWR(`/contactFaqs`);
  return { faqsData: faqsData?.data, faqsDataMutate: mutate };
};

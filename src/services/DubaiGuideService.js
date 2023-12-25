import useSWR from "swr";

export const useGetDubaiGuideData = (slug) => {
  const {
    data: dubaiGuideData,
    error,
    mutate,
  } = useSWR(`/dubaiGuideData`);
  return { dubaiGuideData: dubaiGuideData?.data, dubaiGuideDataMutate: mutate };
};

export const useGetSellerGuideData = (slug) => {
    const {
      data: sellerGuideData,
      error,
      mutate,
    } = useSWR(`/sellerGuideData`);
    return { sellerGuideData: sellerGuideData?.data, sellerGuideDataMutate: mutate };
  };

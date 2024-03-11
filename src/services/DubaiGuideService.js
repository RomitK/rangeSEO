import useSWR from "swr";


export const useGetAllGuideDataWithSearch = (search = null) => {
  const {
    data: guideDatawithQuery,
    error,
    mutate
} = useSWR(`/guides${search ? "?keyword=" + search : ""}`);
  return { guideDatawithQuery: guideDatawithQuery?.data, guideDatawithQueryMutate: mutate };
};
export const useGetAllGuideData = (search = null) => {
  const {
    data: guideData,
    error,
    mutate
} = useSWR(`/guides${search ? "?keyword=" + search : ""}`);
  return { guideData: guideData?.data, guideDataMutate: mutate };
};


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

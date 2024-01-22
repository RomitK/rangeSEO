import useSWR from "swr";
import httpClient from "./http-client";
export const useGetAllHomeData = () => {
  const { data: homeData, error, mutate } = useSWR(`/homeData`);
  return { homeData: homeData?.data, homeDataMutate: mutate };
};

export const saveContactFormApi = (data) => {
  return httpClient.post("/contactUs", data);
};

export const sendOTPApi = (data) => {
  return httpClient.post("/sendOtp", data);
};

export const verifyOTPApi = (data) => {
  return httpClient.post("/verifyOtp", data);
};
export const saveContactFormApi2 = (data) => {
  return httpClient.post("/contactUs", data);
};
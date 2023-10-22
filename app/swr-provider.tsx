import React from "react";
import { SWRConfig } from "swr";
import Axios from "axios";
export const SWRProvider = ({ children }) => {
  Axios.defaults.baseURL = process.env.API_HOST;
  
  const fetcher = async (url: any) => {
    try {
      const { data } = await Axios.get(url);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateIfStale: true,
        revalidateOnMount: true,
        revalidateOnReconnect: true,
        refreshInterval: 80000,
      }}
    >
      {children}
    </SWRConfig>
  );
};

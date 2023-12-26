import useSWR from "swr";
import httpClient from "./http-client";

export const useGetSingleAgentData = (slug) => {
  const {
    data: agentData,
    error,
    mutate,
  } = useSWR(slug ? `/agents/${slug}` : null);
  return { agentData: agentData?.data, managementDataMutate: mutate };
};
export const useGetAllTeamData = (slug) => {
  const {
    data: teamsData,
    error,
    mutate,
  } = useSWR(`/agents`);
  return { teamsData: teamsData?.data, teamsDataMutate: mutate };
};
export const useCheckTeamEmployeeId = (slug) => {
  const {
    data: teamsData,
    error,
    mutate,
  } = useSWR(`/checkEmployeeId`);
  return { teamsData: teamsData?.data, teamsDataMutate: mutate };
};

export const checkEmployeeIdApi = (data) => {
  return httpClient.post("/checkEmployeeId", data);
};
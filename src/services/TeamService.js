import useSWR from "swr";
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
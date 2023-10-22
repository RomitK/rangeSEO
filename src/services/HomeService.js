import useSWR from "swr";
export const useGetAllProjects = () => {
  const { data: projects, error, mutate } = useSWR(`/getHomeProjects`);

  return { projects: projects?.data, projectsMutate: mutate };
};

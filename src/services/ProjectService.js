import useSWR from "swr";
export const useGetSingleProjectData = (slug) => {
  const {
    data: projectData,
    error,
    mutate,
  } = useSWR(slug ? `/projects/${slug}` : null);
  return { projectData: projectData?.data, projectDataMutate: mutate };
};

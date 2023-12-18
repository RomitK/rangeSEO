import useSWR from "swr";
export const useGetAllProjectData = () => {
  const { data: projectData, error, mutate } = useSWR(`/project`);
  return { projectData: projectData?.data, projectDataMutate: mutate };
};
export const useGetSingleProjectData = (slug) => {
  const {
    data: projectData,
    error,
    mutate,
  } = useSWR(slug ? `/projects/${slug}/detail` : null);
  return { projectData: projectData?.data, projectDataMutate: mutate };
};

export const useGetNearByProjectsData = (slug) => {
  const {
    data: nearByProjects,
    error,
    mutate,
  } = useSWR(slug ? `/projects/${slug}/nearByProjects` : null);
  return { nearByProjects: nearByProjects?.data, nearByProjectsMutate: mutate };
};

export const useGetProjectOfferTypes = (slug) => {
  const {
    data: projectOfferTypeOption,
    error,
    mutate,
  } = useSWR(`/projectOfferTypes`);
  return { projectOfferTypeOption: projectOfferTypeOption?.data, projectOfferTypeOptionMutate: mutate };
};

export const useGetProjectOptions = (slug) => {
  const {
    data: projectOption,
    error,
    mutate,
  } = useSWR(`/projectOptions`);
  return { projectOption: projectOption?.data, projectOptionMutate: mutate };
};


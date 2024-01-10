import useSWR from "swr";
import httpClient from "./http-client";

export const useGetAmenities = () => {
    const { data: amenities, error, mutate } = useSWR(`/amenities`);
    return { amenities: amenities?.data, amenitiesMutate: mutate };
};

export const useGetProjectAmenities = () => {
    const { data: projectAmenities, error, mutate } = useSWR(`/projectAmenities`);
    return { projectAmenities: projectAmenities?.data, projectAmenitiesMutate: mutate };
};

export const useGetPropertyAmenities = () => {
    const { data: propertyAmenities, error, mutate } = useSWR(`/propertyAmenities`);
    return { propertyAmenities: propertyAmenities?.data, propertyAmenitiesMutate: mutate };
};
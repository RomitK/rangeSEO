"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import parse from "html-react-parser";
import { useGetAllCommunityData } from "@/src/services/CommunityService";
import { useGetDeveloperOptions } from "@/src/services/DeveloperService";
import { useGetAccommodationOptions } from "@/src/services/AccommodationService";
import {
  useGetProjectOfferTypes,
  useGetProjectOptions,
} from "@/src/services/ProjectService";
type OptionType = {
  value: string;
  label: string;
};
function CommunityList() {
  const [form, setForm] = useState({
    project_id: "",
    completion_status_id: "",
    developer_id: "",
    accommodation_id: "",
  });
  const { communitiesData } = useGetAllCommunityData("", form);
  const { developerOption } = useGetDeveloperOptions();
  const { accommodationOptions } = useGetAccommodationOptions();
  const { projectOfferTypeOption } = useGetProjectOfferTypes();
  const { projectOption } = useGetProjectOptions();
  const [communities, setCommunities] = useState([]);
  const [visibleCommunities, setVisibleCommunities] = useState([]);
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(communities?.length / 3);

  const developerOptions: OptionType[] = developerOption;
  const accommodationOptionss: OptionType[] = accommodationOptions;
  const projectOfferTypeOptions: OptionType[] = projectOfferTypeOption;
  const projectOptions: OptionType[] = projectOption;

  const projectChangeHandle = (event) => {
    setForm({ ...form, project_id: event.value });
  };

  const onNextPage = () => {
    const newCommunities = communities.slice(0, visibleCommunities.length * 2);
    setVisibleCommunities(newCommunities);
  };
  const options: OptionType[] = [
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
  ];
  useEffect(() => {
    setCommunities(communitiesData);
    setVisibleCommunities(communitiesData?.slice(0, 9));
  }, [communitiesData]);

  // useEffect(() => {
  //   console.log(form);
  //   let getPropertiesURL = process.env.API_HOST + "/communities?";
  //   const formData = new FormData();
  //   for (let key in form) {
  //     if (form.hasOwnProperty(key)) {
  //       if (form[key]) {
  //         getPropertiesURL += `${key}=${form[key]}&`;
  //       }

  //       formData.append(key, form[key]);
  //     }
  //   }
  //   fetch(getPropertiesURL)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.success) {
  //         setVisibleCommunities(res.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error); // Handle the error response object
  //     });
  // }, [form]);
  return (
    <section className="communitiesSection">
      <div className="container">
        <div className="mainHead mb-5 text-primary text-center">
          <h4>COMMUNITIES</h4>

          <div className="text-center mb-5">
            <div>
              <p className="mb-0">
                We have an array of properties available in the most sough-after
                communities of Dubai.
              </p>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROJECT</label>
              <Select
                options={projectOptions}
                className="reactSelectInput"
                onChange={(e) => setForm({ ...form, project_id: e.value })}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROPERTY TYPE</label>
              <Select
                options={accommodationOptionss}
                className="reactSelectInput"
                onChange={(e) =>
                  setForm({ ...form, accommodation_id: e.value })
                }
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>DEVELOPER</label>
              <Select
                options={developerOptions}
                className="reactSelectInput"
                onChange={(e) => setForm({ ...form, developer_id: e.value })}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROJECT STATUS</label>
              <Select
                options={projectOfferTypeOptions}
                className="reactSelectInput"
                onChange={(e) =>
                  setForm({ ...form, completion_status_id: e.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          {visibleCommunities?.map(function (community, index) {
            return (
              <div className="col-md-4" key={community.id}>
                <Link
                  href={`/communities/${community.slug}`}
                  className="cardBox"
                >
                  <img
                    src={community.mainImage}
                    className="clmCardImage"
                    alt={community.name}
                  />
                  <div className="overlay">
                    <h5 className="crdtitle">{community.name}</h5>
                    <p className="crdText">
                      {community && parse(community?.description ?? "")}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {communities?.length != visibleCommunities?.length && (
          <button className="bdrBtn mrAuto loadBtn mt-4" onClick={onNextPage}>
            View All
          </button>
        )}
      </div>
    </section>
  );
}
export default CommunityList;

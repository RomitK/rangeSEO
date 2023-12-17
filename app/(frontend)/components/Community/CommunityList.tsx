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
import axios from "axios";
import Loader from "../UI/Loader";
type OptionType = {
  value: string;
  label: string;
};
function CommunityList() {
  const [form, setForm] = useState({
    project_id: { label: "", value: "" },
    completion_status_id: { label: "", value: "" },
    developer_id: { label: "", value: "" },
    accommodation_id: { label: "", value: "" },
  });
  const { communitiesData, isValidating } = useGetAllCommunityData("", form);
  const { developerOption } = useGetDeveloperOptions();
  const { accommodationOptions } = useGetAccommodationOptions();
  const { projectOfferTypeOption } = useGetProjectOfferTypes();
  const { projectOption } = useGetProjectOptions();

  const [communities, setCommunities] = useState([]);
  const [visibleCommunities, setVisibleCommunities] = useState([]);
  const [links, setLinks] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const maxPage = Math.ceil(communities?.length / 3);

  const developerOptions: OptionType[] = developerOption;
  const accommodationOptionss: OptionType[] = accommodationOptions;
  const projectOfferTypeOptions: OptionType[] = projectOfferTypeOption;
  const projectOptions: OptionType[] = projectOption;
  const [inputValue, setInputValue] = useState("");

  const onNextPage = () => {
    let url = links?.next;
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].value) {
          url += `${key}=${form[key].value}&`;
        }
      }
    }
    setIsLoader(true);
    axios
      .get(url)
      .then((res) => {
        setIsLoader(false);
        setCommunities([...communities, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        setIsLoader(false);
        console.log(err);
      });
  };
  const options: OptionType[] = [
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
  ];
  useEffect(() => {
    setCommunities(communitiesData?.data);
    setLinks(communitiesData?.links);
  }, [communitiesData]);

  function isEmptyObject() {
    const o = { ...form };
    return Object.keys(o).every(function (x) {
      if (Array.isArray(o[x])) {
        return o[x].length > 0 ? false : true;
      } else {
        return o[x].value === "" || o[x].value === null;
      }
    });
  }

  const handleReset = () => {
    setForm({
      ...form,
      project_id: { label: "", value: "" },
      completion_status_id: { label: "", value: "" },
      developer_id: { label: "", value: "" },
      accommodation_id: { label: "", value: "" },
    });
  };
  return (
    <>
      {(isLoader || isValidating) && <Loader />}
      <section className="communitiesSection">
        <div className="container">
          <div className="mainHead mb-5 text-primary text-center">
            <h4>COMMUNITIES</h4>

            <div className="text-center mb-5">
              <div>
                <p className="mb-0">
                  We have an array of properties available in the most
                  sough-after communities of Dubai.
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
                  value={form.project_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, project_id: e })}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="proSelectBox">
                <label>PROPERTY TYPE</label>
                <Select
                  options={accommodationOptionss}
                  value={form.accommodation_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, accommodation_id: e })}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="proSelectBox">
                <label>DEVELOPER</label>
                <Select
                  options={developerOptions}
                  value={form.developer_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, developer_id: e })}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="proSelectBox">
                <label>PROJECT STATUS</label>
                <Select
                  options={projectOfferTypeOptions}
                  value={form.completion_status_id}
                  className="reactSelectInput"
                  onChange={(e) =>
                    setForm({ ...form, completion_status_id: e })
                  }
                />
              </div>
            </div>
            {!isEmptyObject() && (
              <div className="col-md-12 text-center mt-3">
                <button
                  className="btn  btn-secondary"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className="row">
            {communities?.map(function (community, index) {
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
          {links?.next && (
            <button className="bdrBtn mrAuto loadBtn mt-4" onClick={onNextPage}>
              View All
            </button>
          )}
        </div>
      </section>
    </>
  );
}
export default CommunityList;

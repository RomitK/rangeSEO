"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import Select from "react-select";
import parse from "html-react-parser";
import { useGetAllDeveloperData } from "@/src/services/DeveloperService";
import { useGetCommunityOption } from "@/src/services/CommunityService";
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
function DeveloperList({ params }) {
  const [form, setForm] = useState({
    project_id: { label: "All", value: "" },
    completion_status_id: { label: "All", value: "" },
    community_id: { label: "All", value: "" },
    accommodation_id: { label: "All", value: "" },
  });

  const { developersData } = useGetAllDeveloperData("", form);
  const [links, setLinks] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [visibleDevelopers, setVisibleDevelopers] = useState([]);
  const { communityOption } = useGetCommunityOption();
  const { accommodationOptions } = useGetAccommodationOptions();
  const { projectOfferTypeOption } = useGetProjectOfferTypes();
  const { projectOption } = useGetProjectOptions();
  const onNextPage = () => {
    let url = links?.next;
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].value) {
          url += `${key}=${form[key].value}&`;
        }
      }
    }
    axios
      .get(url)
      .then((res) => {
        setDevelopers([...developers, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setDevelopers(developersData?.data);
    setLinks(developersData?.links);
  }, [developersData]);
  
  const handleReset = () => {
    setForm({
      ...form,
      project_id: { label: "All", value: "" },
      completion_status_id: { label: "All", value: "" },
      community_id: { label: "All", value: "" },
      accommodation_id: { label: "All", value: "" },
    });
  };
  const communityOptions: OptionType[] = communityOption;
  const accommodationOptionss: OptionType[] = accommodationOptions;
  const projectOfferTypeOptions: OptionType[] = projectOfferTypeOption;
  const projectOptions: OptionType[] = projectOption;
  
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
  return (
    <section className="developersSection">
      <div className="container">
        <h4 className="sctionMdTitle text-primary text-center mb-5">
          DEVELOPERS
        </h4>

        <div className="row mb-5">
            {/* <div className="col-md-3">
              <div className="proSelectBox">
                <label>PROJECT</label>
                <Select
                  options={projectOptions}
                  value={form.project_id}
                  className="reactSelectInput"
                  placeholder="Select Project"
                  onChange={(e) => setForm({ ...form, project_id: e })}
                />
              </div>
            </div> */}
            <div className="col-md-4">
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
            <div className="col-md-4">
              <div className="proSelectBox">
                <label>COMMUNITIES</label>
                <Select
                  options={communityOptions}
                  value={form.community_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, community_id: e })}
                />
              </div>
            </div>
            <div className="col-md-4">
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
          {developers?.map(function (developer, index) {
            return (
              <Link
                href={`/developers/${developer?.slug}`}
                className="col-md-4"
                key={developer.id}
              >
                <div className="partnerBox">
                  <img
                    src={developer.logo}
                    className="logoImg"
                    alt={developer.name}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {links?.next && (
            <button className="bdrBtn mrAuto loadBtn mt-4" onClick={onNextPage}>
              View More
            </button>
        )}

      </div>
    </section>
  );
}
export default DeveloperList;

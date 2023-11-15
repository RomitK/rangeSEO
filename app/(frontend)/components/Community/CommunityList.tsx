"use client";
import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { useGetAllHomeData } from "@/src/services/HomeService";
import Link from "next/link";
import Select from "react-select";
import parse from "html-react-parser";
import { useGetAllCommunityData } from "@/src/services/CommunityService";
import { useGetDeveloperOptions } from "@/src/services/DeveloperService";

type OptionType = {
  value: string;
  label: string;
};
function CommunityList() {
  const { communitiesData } = useGetAllCommunityData();
  // const { developerOptions } = useGetDeveloperOptions();
  const [communities, setCommunities] = useState([]);
  const [visibleCommunities, setVisibleCommunities] = useState([]);
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(communities?.length / 3);
  const projectChangeHandle = (event) => {
    console.log(event.value);
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

  //const options: OptionType[] = developerOptions;

  // const [selectedProject, setSelectedProjectName] = useState(options[0]);
  return (
    <section className="communitiesSection">
      <div className="container">
        <h4 className="sctionMdTitle text-primary mb-5 text-center">
          COMMUNITIES
        </h4>
        {/* <div className="row mb-5">
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROJECT</label>
              <Select
                options={options}
               
                className="reactSelectInput"
                onChange={projectChangeHandle}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROPERTY TYPE</label>
              <Select options={options} className="reactSelectInput" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>DEVELOPER</label>
              <Select options={developerOptions} className="reactSelectInput" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROJECT STATUS</label>
              <Select options={options} className="reactSelectInput" />
            </div>
          </div>
        </div> */}

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

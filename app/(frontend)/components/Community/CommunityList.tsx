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

function CommunityList() {
  const swiperRef = useRef<SwiperType>;
  const { communitiesData } = useGetAllCommunityData();
  const options = [
    { value: "Pakistan", label: "Pakistan" },
    { value: "Dubai", label: "Dubai" },
    { value: "Lahore", label: "Lahore" },
    { value: "Karachi", label: "Karachi" },
  ];

  return (
    <section className="communitiesSection">
      <div className="container">
        <h4 className="sctionMdTitle text-primary mb-5 text-center">
          COMMUNITIES
        </h4>
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROJECT</label>
              <Select options={options} className="reactSelectInput" />
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
              <Select options={options} className="reactSelectInput" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="proSelectBox">
              <label>PROJECT STATUS</label>
              <Select options={options} className="reactSelectInput" />
            </div>
          </div>
        </div>
        <div className="row">
          {communitiesData &&
            communitiesData.map(function (community, index) {
              return (
                <div className="col-md-4" key={community.id}>
                  <Link
                    href={`/communities/${community.slug}`}
                    className="cardBox"
                  >
                    <img src={community.mainImage} className="clmCardImage" />
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

        <button className="bdrBtn mrAuto loadBtn mt-4">view All</button>
      </div>
    </section>
  );
}
export default CommunityList;

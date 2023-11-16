import { useGetSingleCareerData } from "@/src/services/CareerService";
import React, { useRef, useState, useEffect } from "react";
import "@/public/css/career-page-styles.css";
import "@/public/css/responsive.css";
import { Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";
import Link from "next/link";

function SingleCareerPage({ params }) {
  const slug = params.slug[0];
  const { CareerData } = useGetSingleCareerData(slug);

  return (
    <>
      {/* Single Career page Start */}
      <section className="ListingSection SingleCareer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="listCardArea SingleCareerSec">
                <div className="SingleCareerHead">
                  <h3 className="listCardTit">{CareerData?.position}</h3>

                  <div className="listflexRow">
                    <div className="listflexBar">
                      <img
                        src="/images/icons/location-icon.png"
                        className="iconImg"
                        alt="location"
                      />
                      <p>{CareerData?.location}</p>
                    </div>
                    <div className="listflexBar">
                      <img
                        src="/images/icons/fullTime-icon.png"
                        className="iconImg"
                        alt="type"
                      />
                     <p>{CareerData?.type}</p>
                    </div>
                  </div>
                  <p className="fs-14 text-secondary mb-4">
                  {CareerData && parse(CareerData?.description ?? "")}
                  </p>
                </div>
                <div className="CarearInfoList">
                  <h4 className="listTitle mb-5">Key Responsibilities:</h4>
                  <div className="ulList">
                    {CareerData && parse(CareerData?.responsibilities ?? "")}
                  </div>
                </div>

                {/* 
                 <ul className="ulList">
                 <li className="fs-14 text-secondary checkListItem">
                      <img
                        src="/images/icons/tick-icon.png"
                        className="tikIcon"
                      />
                      <p className="fs-14 text-secondary">
                        Develop strategies and tactics to get the word out about
                        our company and drive qualified traffic to our front
                        door
                      </p>
                    </li>
                    </ul> */}

                <div className="CarearInfoList">
                  <h4 className="listTitle mb-5">
                    Qualification and Skills required:
                  </h4>
                  <div className="ulList">
                  {CareerData && parse(CareerData?.requirements ?? "")}
                  </div>
                  
                </div>
                <a href="#" className="fillBtn appleNowBtn">
                  APPLY NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Single Career page Start */}
    </>
  );
}
export default SingleCareerPage;

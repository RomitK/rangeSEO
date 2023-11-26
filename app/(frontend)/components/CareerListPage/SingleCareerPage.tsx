import { useGetSingleCareerData } from "@/src/services/CareerService";
import React, { useRef, useState, useEffect } from "react";
import { Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";
import Link from "next/link";
import CareerModel from "../models/careerModel";
import ContactSection from "../ContactSection/ContactSection";
import "@/public/css/career-page-styles.css";
import "@/public/css/responsive.css";

function SingleCareerPage({ params }) {
  const slug = params.slug[0];
  const { CareerData } = useGetSingleCareerData(slug);
  const [currentCareerId, setCurrentCareerId] = useState(0);
  const [currentCareerPosition, setCurrentCareerName] = useState(null);
  
  const contactSideText =" An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  return (
    <>
               <header className="header careerHeader">
        <img
          src="/images/banner/banner-3.png"
          className="headerImgVideo"
          alt="career"
        />
        <div className="headConentBox">
            <h2 className="headTitle mb-3">JOIN RANGE</h2>
            <a href="#currentOpening" className="fillBtn linkBtn">
                SEE CURRENT OPENING
                <img
                src="/images/icons/btn-right-arrow.png"
                className="btnRightArrow"
                alt="arrow"
                />
            </a>
        </div>
      </header>
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
                        src="/images/icons/location_icon.png"
                        className="iconImg"
                        alt="location"
                      />
                      <p>{CareerData?.location}</p>
                    </div>
                    <div className="listflexBar">
                      <img
                        src="/images/icons/type-icon.png"
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
                <a href="#" className="fillBtn appleNowBtn text-decoration-none" data-bs-toggle="modal"
                        data-bs-target="#careerModel" onClick={() => {setCurrentCareerId(CareerData.id); setCurrentCareerName(CareerData.position)}} >
                  APPLY NOW
                </a>
              </div>
            </div>
          </div>
        </div>
        <CareerModel sideText={contactSideText} careerId={currentCareerId} careerPosition={currentCareerPosition}></CareerModel>
      </section>
      {/* Single Career page Start */}
      <ContactSection></ContactSection>
    </>
  );
}
export default SingleCareerPage;

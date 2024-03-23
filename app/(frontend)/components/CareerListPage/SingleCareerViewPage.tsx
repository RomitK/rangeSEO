import { useGetSingleCareerData } from "@/src/services/CareerService";
import React, { useRef, useState, useEffect } from "react";
import { Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";
import Link from "next/link";
import CareerModel from "../models/careerModel";
import ContactSection from "../ContactSection/ContactSection";
import "@/public/css/career-page-styles.css";
import "@/public/css/responsive.css";


function SingleCareerViewPage({ params }) {
  const [isMobileDev, setIsMobileDev] = useState(false);
  const slug = params.slug[0];
  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      if (isMobileDevice) {
        document.body.style.overflow = 'auto';
      }
      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { CareerData } = useGetSingleCareerData(slug);
  const [currentCareerId, setCurrentCareerId] = useState(0);
  const [currentCareerPosition, setCurrentCareerName] = useState(null);
  const contactSideText =
    " An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  return (
    <>
      <header className="header careerHeader">
        <img loading="lazy"
          src="/images/banner/banner-3.webp"
          className="headerImgVideo"
          alt="career"
        />
        <div className="headConentBox">
          <h2 className="headTitle mb-3 joinRange">JOIN RANGE</h2>
          <a href="#currentOpening" className="fillBtn linkBtn">
            SEE CURRENT OPENING
            <img loading="lazy"
              src="/images/icons/btn-right-arrow.png"
              className="btnRightArrow"
              alt="arrow"
            />
          </a>
        </div>
      </header>
      {/* Single Career page Start */}
      <section className="ListingSection SingleCareer" id="currentOpening">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="listCardArea SingleCareerSec">
                <div className="SingleCareerHead">
                  <h3 className="listCardTit">{CareerData?.position}</h3>

                  <div className="listflexRow">
                    {
                      CareerData?.location && <div className="listflexBar">
                        <img loading="lazy"
                          src="/images/icons/location_icon.png"
                          className="iconImg"
                          alt="location"
                        />
                        <p>{CareerData?.location}</p>
                      </div>
                    }
                    {
                      CareerData?.type &&
                      <div className="listflexBar">
                        <img loading="lazy"
                          src="/images/icons/type-icon.png"
                          className="iconImg"
                          alt="type"
                        />
                        <p>{CareerData?.type}</p>
                      </div>
                    }

                  </div>
                  <p className="fs-14 text-secondary mb-4">
                    {CareerData && parse(CareerData?.description ?? "")}
                  </p>
                </div>
                {
                  CareerData?.responsibilities &&
                  <div className="CarearInfoList ">
                    <h4 className="listTitle ">Key Responsibilities:</h4>
                    <div className="ulList">
                      {CareerData && parse(CareerData?.responsibilities ?? "")}
                    </div>
                  </div>
                }

                {
                  CareerData?.requirements &&
                  <div className="CarearInfoList ">
                    <h4 className="listTitle">
                      Qualification and Skills required:
                    </h4>
                    <div className="ulList">
                      {CareerData && parse(CareerData?.requirements ?? "")}
                    </div>
                  </div>
                }

                {CareerData?.assistance &&
                  <div className="CarearInfoList">
                    <h4 className="listTitle ">
                      Assistance:
                    </h4>
                    <div className="ulList">
                      {CareerData && parse(CareerData?.assistance ?? "")}
                    </div>
                  </div>
                }

                {CareerData?.benfits &&
                  <div className="CarearInfoList">
                    <h4 className="listTitle ">
                      Benefits:
                    </h4>
                    <div className="ulList">
                      {CareerData && parse(CareerData?.benfits ?? "")}
                    </div>
                  </div>
                }
                {
                  CareerData && <a
                    href="#"
                    className="fillBtn appleNowBtn text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target="#careerModel"
                    onClick={() => {
                      setCurrentCareerId(CareerData.id);
                      setCurrentCareerName(CareerData.position);
                    }}
                  >
                    APPLY NOW
                  </a>
                }

              </div>
            </div>
          </div>
        </div>
        <CareerModel
          sideText={contactSideText}
          careerId={currentCareerId}
          careerPosition={currentCareerPosition}
        ></CareerModel>
      </section>
      {/* Single Career page Start */}
      {/* <ContactSection></ContactSection> */}
    </>
  );
}
export default SingleCareerViewPage;

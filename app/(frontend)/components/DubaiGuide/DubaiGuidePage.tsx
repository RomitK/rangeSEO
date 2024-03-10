"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import ContactModel from "../models/contactModel";
import { useGetAllGuideData } from "@/src/services/DubaiGuideService";
import DubaiGuideModelGolden from "../models/dubaiGuide/ModelGolden";
import ModelInvestment from "../models/dubaiGuide/ModelInvestment";
import ModelBuyer from "../models/dubaiGuide/ModelBuyer";
import ModelPortfolioManagement from "../models/dubaiGuide/ModelPortfolioManagement";
import ModelDubaiGuide from "../models/dubaiGuide/ModelDubaiGuide";

import "@/public/css/responsive.css";
import "@/public/css/dubai-guide-page-styles.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function DubaiGuidePage() {
  const pageUrl = "Dubai Guide";
  const swiperRef = useRef<SwiperCore>();
  const { guideData } = useGetAllGuideData();
  const [downloadLink, setDownloadLink] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [formName, setFormName] = useState(null);
  const [title, setTitle] = useState(null);
  const [ sourceId, setSourceId] = useState(null);
  const [isMobileDev, setIsMobileDev] = useState(false);
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
  const images = [
    {
      id: 1,
      image: "/images/guides/golden-visa.webp",
      title: "GOLDEN VISA",
    },
    {
      id: 2,
      image: "/images/banner/banner-3.webp",
      title: "INVESTMENT GUIDE",
    },
    {
      id: 3,
      image: "/images/banner/invest.jpeg",
      title: "BUYER GUIDE",
    },
  ];

  const sliderRef = useRef(null);

  // Define custom arrow components for navigation
  const PrevArrow = (props) => (
    <div {...props} className="custom-prev-arrow text-white">
      <span className="">
        <i className="bi bi-chevron-left fs-1"></i>
      </span>
    </div>
  );
  const NextArrow = (props) => (
    <div {...props} className="custom-next-arrow text-white">
      <span className="">
        <i className="bi bi-chevron-right fs-1"></i>
      </span>
    </div>
  );

  // Settings for desktop and iPad
  const desktopSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    speed: 4000,
    centerPadding: "200px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Settings for mobile
  const mobileSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <section
        className={`header dubaiGuideSection ${isMobileDev ? "my-3" : "dubaiMy60"
          }`}
      >
        <div className="container">
          <h4 className="sctionMdTitle text-primary text-center mb-2">
            DUBAI GUIDES
          </h4>
          <Slider
            {...(isMobileDev ? mobileSettings : desktopSettings)}
            ref={sliderRef}
            className="multiSilder"
          >
            {guideData?.map((guide, index) => (
              <div className="clmSliderItem" key={index}>
                <img src={guide.slider_image} className="multiItem" alt={guide.title} />
                <div className="carouselcontent">
                  <h3>{guide.title}</h3>
                  {guide?.id &&
                    <button
                      className="mrAuto downloadBtn"
                      onClick={() => (window.location.href = "#" + guide?.slug)}
                    >
                      DOWNLOAD NOW
                    </button>
                  }

                </div>
              </div>
            ))}
          </Slider>

        </div>
      </section>
      <section className="guidsSection">
        <div className="container">
          {guideData?.map((guide, index) => (
            <div className="sectionArea" id={guide?.slug} key={index}>
              <h4 className="sctionMdTitle text-primary  mb-4">{guide.title}</h4>
              <div className="row horizantalCard">
                {(index % 2 === 0) && (
                  <div className="col-md-6">
                    <div className="crdImgBox">
                      <img
                        src={guide.feature_image}
                        className="horiCrdImg"
                        alt={guide.title}
                      />
                    </div>
                  </div>
                )
                }
                <div className="col-md-6">
                  <div className="crdContentBox">
                    <p className="fs-14 text-secondary mb-5">
                      {guide.description}
                    </p>
                    <button
                      className="mrAuto downloadBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#downloadNowInvestment"
                      onClick={() => {
                        setSourceId(guide?.source_id)
                        setFormName(guide?.title + " Form");
                        setFileName(guide?.title);
                        setDownloadLink(guide?.guide_file);
                        setTitle(guide?.title);
                      }}
                    >
                      DOWNLOAD NOW
                    </button>
                  </div>
                </div>

                {(index % 2 != 0) && (
                  <div className="col-md-6">
                    <div className="crdImgBox">
                      <img
                        src={guide.feature_image}
                        className="horiCrdImg"
                        alt={guide.title}
                      />
                    </div>
                  </div>
                )
                }

              </div>
            </div>
          ))}

        </div>
        {guideData && (
          <>
            <ModelDubaiGuide
              downloadLink={downloadLink}
              fileName={fileName}
              sourceId = {sourceId}
              formName={formName}
              title={title}>
            </ModelDubaiGuide>
          </>
        )}
      </section>
    </>
  );
}
export default DubaiGuidePage;

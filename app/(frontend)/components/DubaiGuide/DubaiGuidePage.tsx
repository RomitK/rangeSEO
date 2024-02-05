"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import ContactModel from "../models/contactModel";
import { useGetDubaiGuideData } from "@/src/services/DubaiGuideService"
import DubaiGuideModelGolden from "../models/dubaiGuide/ModelGolden";
import ModelInvestment from "../models/dubaiGuide/ModelInvestment";
import ModelBuyer from "../models/dubaiGuide/ModelBuyer";
import "@/public/css/responsive.css";
import "@/public/css/dubai-guide-page-styles.css";
function DubaiGuidePage() {
    const contactSideText =" An esteemed award-winning real estate brokerage based in Dubai, UAE.";
    const pageUrl ="Dubai Guide"
    const swiperRef = useRef<SwiperCore>();
    const { dubaiGuideData } = useGetDubaiGuideData();
    const [ downloadLink, setDownloadLink] = useState(null);
    const [ fileName, setFileName] = useState(null);
    const [ formName, setFormName] = useState(null);
    const [ title, setTitle] = useState(null);
    const [isMobileDev, setIsMobileDev] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
        const isMobileDevice = window.innerWidth < 768;
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
    return (
    <>
      <header className={`header dubaiGuideSection ${isMobileDev ? 'my-5' : 'dubaiMy60'}`}>
        <h4 className="sctionMdTitle text-primary text-center mb-2">
          DUBAI GUIDES
        </h4>
        <Swiper
          id="multiSilder"
          modules={[Navigation]}
          className="multiSilder"
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide className="clmSliderItem">
            <img src="/images/banner/dubai-guide-banner.webp" className="multiItem" alt="banner"/>
            <div className="carouselcontent">
              <h3>GOLDEN VISA</h3>
              <button className="mrAuto downloadBtn" onClick={() => window.location.href = '#goldenVisa'}>DOWNLOAD NOW</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="clmSliderItem">
            <img src="/images/banner/banner-3.webp" className="multiItem" alt="banner"/>
            <div className="carouselcontent">
              <h3>INVESTMENT GUIDE</h3>
              <button className="mrAuto downloadBtn" onClick={() => window.location.href = '#luxuryProperties'}>DOWNLOAD NOW</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="clmSliderItem">
            <img src="/images/banner/banner-4.webp" className="multiItem" alt="banner"/>
            <div className="carouselcontent">
              <h3> BUYER GUIDE</h3>
              <button className="mrAuto downloadBtn" onClick={() => window.location.href = '#buyerGuide'}>DOWNLOAD NOW</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="clmSliderItem">
            <img src="/images/banner/banner-3.webp" className="multiItem" alt="banner"/>
            <div className="carouselcontent">
              <h3>INVESTMENT GUIDE</h3>
              <button className="mrAuto downloadBtn" onClick={() => window.location.href = '#luxuryProperties'}>DOWNLOAD NOW</button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="clmSliderItem">
            <img src="/images/banner/banner-4.webp" className="multiItem" alt="banner"/>
            <div className="carouselcontent">
              <h3>GOLDEN VISA</h3>
              <button className="mrAuto downloadBtn"  onClick={() => window.location.href = '#goldenVisa'}>DOWNLOAD NOW</button>
            </div>
          </SwiperSlide>

          <div
              className="swiper-button-prev swiperUniquePrev text-white"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <span className="">
                <i className="bi bi-chevron-left fs-1"></i>
              </span>
            </div>
            <div
              className="swiper-button-next swiperUniqueNext text-white"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <span className="">
                <i className="bi bi-chevron-right fs-1"></i>
              </span>
            </div>
        </Swiper>
      </header>
      <section className="guidsSection">
        <div className="container">
          <div className="sectionArea" id="goldenVisa">
            <h4 className="sctionMdTitle text-primary  mb-4">GOLDEN VISA</h4>
            <div className="row horizantalCard">
              <div className="col-md-6 ">
                <div className="crdImgBox">
                  <img src="/images/guides/golden-visa.webp" className="horiCrdImg" alt="GOLDEN VISA"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="crdContentBox">
                  <p className="fs-14 text-secondary mb-5">
                    The UAE Golden visa is a long-term residence visa that
                    allows foreign talents to live, work, or study in the UAE
                    along with exclusive benefits. Investors, entrepreneurs,
                    scientists, graduates, extraordinary students, graduates,
                    frontline workers, and humanitarian pioneers are typically
                    eligible for the Golden Visa. Learn more about the
                    requirements and benefits of the Golden visa and digital
                    services to apply for it.
                  </p>
                  <button className=" mrAuto downloadBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#downloadNowGolden" 
                    onClick={() => {
                      setFormName('GoldenVisaForm');
                      setFileName('GoldenVisa.pdf');
                      setDownloadLink(dubaiGuideData?.goldenVisaGuide);
                      setTitle('Golden Visa')
                    }}
                  >DOWNLOAD NOW</button>
                </div>
              </div>
            </div>
          </div>
          <div className="sectionArea" id="buyerGuide">
            <h4 className="sctionMdTitle text-primary mb-4">BUYER GUIDE</h4>
            <div className="row horizantalCard">
              <div className="col-md-6">
                <div className="crdContentBox">
                  <p className="fs-14 text-secondary mb-5">
                    The Dubai Real Estate Buyer's Guide offers comprehensive
                    insights for prospective buyers. From navigating diverse
                    property options to understanding legal intricacies and
                    market trends, it provides a holistic overview. Covering
                    prime locations, investment potentials, and essential
                    considerations, this guide ensures informed decision-making
                    in Dubai's dynamic real estate landscape. Download the
                    report for more information.
                  </p>
                  <button className=" mrAuto downloadBtn"  
                  data-bs-toggle="modal"
                  data-bs-target="#downloadNowBuyer" 
                    onClick={() => {
                      setFormName('BuyerGudieForm');
                      setFileName('BuyerGuide.pdf');
                      setDownloadLink(dubaiGuideData?.buyerGuide);
                      setTitle('Buyer Guide')
                    }}>DOWNLOAD NOW</button>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="crdImgBox">
                  <img src="/images/guides/buyer-guide.webp" className="horiCrdImg" alt="BUYER GUIDE"/>
                </div>
              </div>
            </div>
          </div>
          <div className="sectionArea" id="luxuryProperties">
            <h4 className="sctionMdTitle text-primary mb-4">
            INVESTMENT GUIDE
            </h4>
            <div className="row horizantalCard">
              <div className="col-md-6 ">
                <div className="crdImgBox">
                  <img src="/images/guides/luxury-properties.webp" className="horiCrdImg" alt="LUXURY PROPERTIES"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="crdContentBox">
                  <p className="fs-14 text-secondary mb-5">
                    Dubai stands as a global leader in architectural opulence,
                    boasting iconic structures like the Burj Khalifa and the
                    breathtaking Palm Jumeirah. Our report delves into Dubai’s
                    luxury property market, providing a thorough analysis of
                    evolving trends. From sought-after locations to remarkable
                    architectural feats and lavish amenities, the report
                    showcases opulent penthouses, waterfront villas, and more.
                    Download the report to explore Dubai’s luxury real estate.
                  </p>
                  <button className="mrAuto downloadBtn" data-bs-toggle="modal"
                  data-bs-target="#downloadNowInvestment" 
                    onClick={() => {
                      setFormName('LuxuryPropertiesForm');
                      setFileName('LuxuryProperties.pdf');
                      setDownloadLink(dubaiGuideData?.luxuryPropertiesGuide);
                      setTitle('Investment Guide')
                    }}>DOWNLOAD NOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ContactModel sideText={contactSideText} pageUrl={pageUrl}></ContactModel>
        {
        dubaiGuideData && 
        <>
          <DubaiGuideModelGolden 
          downloadLink={downloadLink} 
          fileName={fileName}
          formName = {formName}
          title ={title}
          ></DubaiGuideModelGolden>

          <ModelInvestment downloadLink={downloadLink} 
          fileName={fileName}
          formName = {formName}
          title ={title}>

          </ModelInvestment>

          <ModelBuyer downloadLink={downloadLink} 
          fileName={fileName}
          formName = {formName}
          title ={title}>

          </ModelBuyer>
        </>
        
      }
      </section>
    </>
  );
}
export default DubaiGuidePage;

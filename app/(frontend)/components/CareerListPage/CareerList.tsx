import { useGetAllCareerData } from "@/src/services/CareerService";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/public/css/career-page-styles.css";
import "@/public/css/responsive.css";
import { Pagination, Navigation } from "swiper/modules";
import parse from "html-react-parser";
import Link from "next/link";
import CareerModel from "../models/careerModel";
import ContactSection from "../ContactSection/ContactSection";
function CareerListPage() {
  const { CareersData } = useGetAllCareerData();
  const [careers, setCareers] = useState([]);
  const [visibleCareers, setVisibleCareers] = useState([]);
  const [currentCareerId, setCurrentCareerId] = useState(0);
  const [currentCareerPosition, setCurrentCareerName] = useState(null);
  const contactSideText =" An esteemed award-winning real estate brokerage based in Dubai, UAE.";

  const onNextPage = () => {
    const newCareers = CareersData.slice(0, visibleCareers.length * 2);
    setVisibleCareers(newCareers);
  };

  useEffect(() => {
    setCareers(CareersData);
    setVisibleCareers(CareersData?.slice(0, 9));
  }, [CareersData]);

  const swiperRef = useRef<SwiperCore>();
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
      <section className="multiCarouselSection" >
        <div className="container">
          <h4 className="sctionMdTitle text-primary  mb-4">WHY RANGE?</h4>
          <p className="fs-14 text-secondary mb-2">
            Range International Property Investments, a distinguished
            Dubai-based brokerage, boasts
            <span className="pWt600">
              {" "}
              over two decades of industry-leading expertise.
            </span>{" "}
            Our dynamic team of experts excels in sales, leases, financial
            consultancy, wealth management, property valuation, and mortgage
            services. Committed to professionalism and trust,
            <span className="pWt600 text-primary">
              we offer tailored solutions and high-return investment
              opportunities in Dubai's dynamic real estate market.
            </span>
          </p>
          <Swiper
            slidesPerView={4}
            spaceBetween={0}
            loop={true}
            // pagination={{
            //   clickable: true,
            // }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper multiItemsCarousel"
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">AED 20B+</h2>
                <p className="countertext">TRANSACTIONS</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">20+</h2>
                <p className="countertext">LANGUAGE SPOKEN </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">4.8/5</h2>
                <p className="countertext">GOOGLE REVIEWS</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">5,000+</h2>
                <p className="countertext">PROPERTIES SOLD</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">20+</h2>
                <p className="countertext">LANGUAGE SPOKEN </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">4.8/5</h2>
                <p className="countertext">GOOGLE REVIEWS</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="counterBox">
                <h2 className=" counterTit text-primary">5,000+</h2>
                <p className="countertext">PROPERTIES SOLD</p>
              </div>
            </SwiperSlide>
            <div
              className="swiper-button-prev swiperUniquePrev text-primary"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <span className="">
                <i className="bi bi-chevron-left fs-1"></i>
              </span>
            </div>
            <div
              className="swiper-button-next swiperUniqueNext text-primary"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <span className="">
                <i className="bi bi-chevron-right fs-1"></i>
              </span>
            </div>
          </Swiper>
        </div>
      </section>
      <section className="ListingSection" id="currentOpening">
        <div className="container">
          <div className="text-center mb-2  row g-3 justify-content-center">
          <h4 className=" text-primary">OPEN ROLE</h4>
          <p className="fs-14 text-secondary mb-2">We are currently hiring for the below mentioned roles. Please click on the role to view the full job description and apply with your CV.</p>
          </div>
         
          <div className="row">
            {visibleCareers &&
              visibleCareers?.map((career, index) => {
                return (
                  <div className="col-12" key={career.id}>
                    <div className="listCardArea">
                      <h3 className="listCardTit">
                      <Link
                        href={`/careers/${career.slug}`}
                        className="text-decoration-none"
                        >
                        {career.position}
                        </Link>
                    </h3>
                      <div className="listflexRow">
                        <div className="listflexBar">
                          <img
                            src="/images/icons/location_icon.png"
                            className="iconImg"
                            alt="location"
                          />
                          <p>{career.location}</p>
                        </div>
                        <div className="listflexBar">
                          <img
                            src="/images/icons/type-icon.png"
                            className="iconImg"
                            alt="type"
                          />
                          <p>{career.type}</p>
                        </div>
                      </div>
                      <p className="fs-14 text-secondary mb-4">
                      <Link
                        href={`/careers/${career.slug}`}
                        className="text-decoration-none fs-14 text-secondary mb-4"
                        >
                        {career && parse(career?.description ?? "")}
                        </Link>
                      </p>
                      <a href="#" className="fillBtn appleNowBtn" data-bs-toggle="modal"
                        data-bs-target="#careerModel" onClick={() => {setCurrentCareerId(career.id); setCurrentCareerName(career.position)}}>
                        APPLY NOW
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          {careers?.length != visibleCareers?.length && (
            <button className=" bdrBtn fillBtn mr-auto"  onClick={onNextPage}>View All</button>
        )}
        </div>
        <CareerModel sideText={contactSideText} careerId={currentCareerId} careerPosition={currentCareerPosition}></CareerModel>
      </section>
      <ContactSection></ContactSection>
    </>
  );
}
export default CareerListPage;

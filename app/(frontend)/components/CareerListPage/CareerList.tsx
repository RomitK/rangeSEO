import { useGetAllCareerData } from "@/src/services/CareerService";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/public/css/career-page-styles.css";
import "@/public/css/responsive.css";



import { Pagination, Navigation } from 'swiper/modules';

function CareerListPage() {
    const CareersData = useGetAllCareerData();
    console.log(CareersData);
    return (
        <>
            <ul>
            {CareersData.data?.map((career, index) => {
                return (
                    <li key={career.id}>
                        <h1>{career.position}</h1>
                    </li>
                    );
                })
            }
            </ul>
            <header className="header">
                    <img src="./images/banner/banner-3.png"  className="headerImgVideo"/>
                    <div className="headConentBox">
                        <h2 className="headTitle mb-3">JOIN RANGE</h2>
                        <a href="#" className="fillBtn linkBtn">
                            SEE CURRENT OPENING
                            <img src="./images/icons/btn-right-arrow.png"  className="btnRightArrow"/>
                        </a>
                    </div>
            </header>
            <section className="multiCarouselSection">
                    <div className="container">
                        <h4 className="sctionMdTitle text-primary  mb-4">WHY RANGE?</h4>
                        <p className="fs-14 text-secondary mb-2">
                                Range International Property Investments, a distinguished Dubai-based brokerage, boasts 
                                <span className="pWt600"> over two decades of industry-leading expertise.</span> Our dynamic team of experts excels in
                                sales, leases, financial consultancy, wealth management, property valuation, and mortgage services. 
                                Committed to professionalism and trust, <span className="pWt600 text-primary"> we offer tailored solutions and highreturn investment
                                opportunities in Dubai's dynamic real estate market.</span>

                        </p>

                        <Swiper
                                
                                slidesPerView={4}
                                spaceBetween={0}
                                loop={true}
                                pagination={{
                                clickable: true,
                                }}
                                navigation={true}
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
                                
                        </Swiper>
                    </div>
            </section>
            <section className="ListingSection">
                     <div className="container">
                          <h4 className="sctionMdTitle text-primary  mb-5">OPEN ROLE</h4>
                          <div className="row">
                                <div className="col-12">
                                      <div className="listCardArea">
                                            <h3 className="listCardTit">Sales Consultant</h3>
                                           
                                            <div className="listflexRow">
                                                <div className="listflexBar">
                                                    <img src="./images/icons/location-icon.png" className="iconImg"/>
                                                    <p>Dubai</p>
                                                </div>
                                                <div className="listflexBar">
                                                    <img src="./images/icons/fullTime-icon.png" className="iconImg" />
                                                    <p>Fulltime</p>
                                                </div>
                                               
                                            </div>
                                            <p className="fs-14 text-secondary mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo….
                                            </p>
                                            <a href="#" className="fillBtn appleNowBtn">APPLY NOW</a>
                                      </div>
                                </div>
                                <div className="col-12">
                                      <div className="listCardArea">
                                            <h3 className="listCardTit">Sales Consultant</h3>
                                           
                                            <div className="listflexRow">
                                                <div className="listflexBar">
                                                    <img src="./images/icons/location-icon.png" className="iconImg"/>
                                                    <p>Dubai</p>
                                                </div>
                                                <div className="listflexBar">
                                                    <img src="./images/icons/fullTime-icon.png" className="iconImg" />
                                                    <p>Fulltime</p>
                                                </div>
                                               
                                            </div>
                                            <p className="fs-14 text-secondary mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo….
                                            </p>
                                            <a href="#" className="fillBtn appleNowBtn">APPLY NOW</a>
                                      </div>
                                </div>
                                <div className="col-12">
                                      <div className="listCardArea">
                                            <h3 className="listCardTit">Sales Consultant</h3>
                                           
                                            <div className="listflexRow">
                                                <div className="listflexBar">
                                                    <img src="./images/icons/location-icon.png" className="iconImg"/>
                                                    <p>Dubai</p>
                                                </div>
                                                <div className="listflexBar">
                                                    <img src="./images/icons/fullTime-icon.png" className="iconImg" />
                                                    <p>Fulltime</p>
                                                </div>
                                               
                                            </div>
                                            <p className="fs-14 text-secondary mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo….
                                            </p>
                                            <a href="#" className="fillBtn appleNowBtn">APPLY NOW</a>
                                      </div>
                                </div>
                                <div className="col-12">
                                      <div className="listCardArea">
                                            <h3 className="listCardTit">Sales Consultant</h3>
                                           
                                            <div className="listflexRow">
                                                <div className="listflexBar">
                                                    <img src="./images/icons/location-icon.png" className="iconImg"/>
                                                    <p>Dubai</p>
                                                </div>
                                                <div className="listflexBar">
                                                    <img src="./images/icons/fullTime-icon.png" className="iconImg" />
                                                    <p>Fulltime</p>
                                                </div>
                                               
                                            </div>
                                            <p className="fs-14 text-secondary mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo….
                                            </p>
                                            <a href="#" className="fillBtn appleNowBtn">APPLY NOW</a>
                                      </div>
                                </div>
                                <div className="col-12">
                                      <div className="listCardArea">
                                            <h3 className="listCardTit">Sales Consultant</h3>
                                           
                                            <div className="listflexRow">
                                                <div className="listflexBar">
                                                    <img src="./images/icons/location-icon.png" className="iconImg"/>
                                                    <p>Dubai</p>
                                                </div>
                                                <div className="listflexBar">
                                                    <img src="./images/icons/fullTime-icon.png" className="iconImg" />
                                                    <p>Fulltime</p>
                                                </div>
                                               
                                            </div>
                                            <p className="fs-14 text-secondary mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo….
                                            </p>
                                            <a href="#" className="fillBtn appleNowBtn">APPLY NOW</a>
                                      </div>
                                </div>
                                
                          </div>

                          <button className=" bdrBtn fillBtn mr-auto">View All</button>
                     </div>
            </section>
        {/* Single Career page Start */}
            <section className="ListingSection SingleCareer">
                     <div className="container">
                           <div className="row">
                                 <div className="col-12">
                                      <div className="listCardArea SingleCareerSec">
                                            <div className="SingleCareerHead">
                                                <h3 className="listCardTit">Marketing Manager</h3>
                                                
                                                <div className="listflexRow">
                                                    <div className="listflexBar">
                                                        <img src="./images/icons/location-icon.png" className="iconImg"/>
                                                        <p>Dubai</p>
                                                    </div>
                                                    <div className="listflexBar">
                                                        <img src="./images/icons/fullTime-icon.png" className="iconImg" />
                                                        <p>Fulltime</p>
                                                    </div>
                                                    
                                                </div>
                                                <p className="fs-14 text-secondary mb-4">
                                                        As a key driver of our success, you'll lead strategic planning, campaign management, and team 
                                                        leadership to elevate our brand presence. Your expertise will
                                                        shape multi-channel marketing initiatives, ensuring alignment with company goals. Stay ahead of
                                                            industry trends through market research and contribute to
                                                        budget optimization. If you're a creative, results-oriented leader ready to make a mark in the dynamic
                                                            world of [Industry], we invite you to propel our brand to new heights.
                                                </p>
                                            </div>
                                            <div className="CarearInfoList">
                                                  <h4 className="listTitle mb-5">Key Responsibilities:</h4>
                                                  <ul className="ulList">
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                            <p className="fs-14 text-secondary">
                                                               Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door
                                                            </p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">
                                                            Experiment with a variety of organic and paid acquisition channels like content creation, content curation, pay per click campaigns, event management,
                                                            publicity, social media, lead generation campaigns, copywriting, performance analysis
                                                        </p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">
                                                            Experiment with a variety of organic and paid acquisition channels like content creation, content curation, pay per click campaigns, event management,
                                                            publicity, social media, lead generation campaigns, copywriting, performance analysis
                                                        </p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                  </ul>
                                                
                                            </div>
                                            <div className="CarearInfoList">
                                                  <h4 className="listTitle mb-5">Qualification and Skills required:</h4>
                                                  <ul className="ulList">
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                            <p className="fs-14 text-secondary">
                                                               Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door
                                                            </p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">
                                                            Experiment with a variety of organic and paid acquisition channels like content creation, content curation, pay per click campaigns, event management,
                                                            publicity, social media, lead generation campaigns, copywriting, performance analysis
                                                        </p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">
                                                            Experiment with a variety of organic and paid acquisition channels like content creation, content curation, pay per click campaigns, event management,
                                                            publicity, social media, lead generation campaigns, copywriting, performance analysis
                                                        </p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                      <li className="fs-14 text-secondary checkListItem">
                                                         <img src="/images/icons/tick-icon.png" className="tikIcon"/>  
                                                         <p className="fs-14 text-secondary">Develop strategies and tactics to get the word out about our company and drive qualified traffic to our front door</p>
                                                      </li>
                                                  </ul>
                                            </div>
                                            <a href="#" className="fillBtn appleNowBtn">APPLY NOW</a>
                                      </div>
                                 </div>
                           </div>
                     </div>
            </section>
         {/* Single Career page Start */}
        </>
        
    );
}
export default CareerListPage;
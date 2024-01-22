"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import CareerListPage from "../components/CareerListPage/CareerList";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



import "@/public/css/blogs-styles.css";
function Blogs(){
    return (
        <>
        <SWRProvider>
            <section>
                     <div className="container">
                            <div className="mainHead mb-5 text-primary text-center mxWd blgTitle">
                                <h4>Dubai Real Estate Soars beyond 214 Peak as Apartment Demand Surges</h4>
                            </div>
                            <span className="lineShape"></span>
                           <div className="blogDetail">
                                <div className="row">
                                      <div className="col-md-8">
                                             <div className="sliderArea">
                                                    <Swiper
                                                        spaceBetween={30}
                                                        centeredSlides={true}
                                                        autoplay={{
                                                        delay: 6500,
                                                        disableOnInteraction: false,
                                                        }}
                                                        pagination={{
                                                        clickable: true,
                                                        }}
                                                        navigation={true}
                                                        modules={[Autoplay, Pagination, Navigation]}
                                                        className="mySwiper"
                                                        >
                                                        <SwiperSlide className="carouselItemWd">
                                                                    <img src="/images/services/service1.webp" className="bSliderImg"/>
                                                        </SwiperSlide>
                                                        <SwiperSlide className="carouselItemWd">
                                                                <img src="/images/services/service2.webp" className="bSliderImg"/>
                                                        </SwiperSlide> <SwiperSlide className="carouselItemWd">
                                                                    <img src="/images/services/service1.webp" className="bSliderImg"/>
                                                        </SwiperSlide>
                                                    </Swiper>
                                             </div>
                                             <p className="text-secondary mb-5">
                                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                 when an unknown printer took a galley of type and scrambled it to make a type 
                                                 specimen book. It has survived not only five centuries, but also the leap into 
                                                 electronic typesetting, remaining essentially unchanged. It was popularised in 
                                                 the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                 and more recently with desktop publishing software like Aldus PageMaker 
                                                 including versions of Lorem Ipsum.
                                             </p>
                                             <div>
                                                <a className="imgcardBox" href="#">
                                                        <img src="/images/services/service1.webp" className="bSliderImg"/>
                                                        <img src="/images/logo_white.png" className="crdLogoImg"/>
                                                        <div className="overlayText">
                                                            <h5 className="crdtitle">
                                                            DUBAI REAL ESTATE SOARS BEYOND 214 PEAK AS APARTMENT DEMAND SURGES
                                                            </h5>
                                                            <p className="crdText">
                                                            www.range.ae
                                                            </p>
                                                        </div>
                                                </a>
                                                <p className="text-secondary mb-5">
                                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                 when an unknown printer took a galley of type and scrambled it to make a type 
                                                 specimen book. It has survived not only five centuries, but also the leap into 
                                                 electronic typesetting, remaining essentially unchanged. It was popularised in 
                                                 the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                 and more recently with desktop publishing software like Aldus PageMaker 
                                                 including versions of Lorem Ipsum.
                                             </p>
                                             <span className="lineShape mb-5"></span>
                                             <div>
                                                    <div className="titleFlexBar">
                                                        <h3 className="text-primary">All News</h3>
                                                        <a href="#" className="linkBtn">View All</a>
                                                    </div>
                                                    <Swiper
                                                            spaceBetween={20}
                                                            slidesPerView={3}
                                                            centeredSlides={true}
                                                            autoplay={{
                                                            delay: 2500,
                                                            disableOnInteraction: false,
                                                            }}
                                                            pagination={{
                                                            clickable: false,
                                                            }}
                                                            navigation={false}
                                                            modules={[Autoplay, Pagination, Navigation]}
                                                            className="mySwiper"

                                                            breakpoints={{
                                                                0: {
                                                                  slidesPerView: 1,
                                                                },
                                                                400:{
                                                                  slidesPerView:1,
                                                                },
                                                                690: {
                                                                  slidesPerView: 1,
                                                                },
                                                                700: {
                                                                    slidesPerView: 3,
                                                                  },
                                                             
                                                              }}
                                                            
                                                            >
                                                            <SwiperSlide className="multiCarouselItem">
                                                                        <a href="#" className="blogCard">
                                                                                <div className="bCardHead">
                                                                                    <img src="/images/services/service1.webp" className="crlcardImg"/>
                                                                                    <span className="cdTagBtn"> News</span>
                                                                                    <div className="overlay">
                                                                                        <p className="crdText">
                                                                                            Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                                            Emaar Beachfront,
                                                                                        </p>
                                                                                    </div>
                                                                                </div> 
                                                                                <p>
                                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                                                </p>       
                                                                                <span className="text-primary">11 january 2024</span>                                              
                                                                        </a>
                                                            </SwiperSlide>
                                                            <SwiperSlide className="multiCarouselItem">
                                                                        <a href="#" className="blogCard">
                                                                            <div className="bCardHead">
                                                                                    <img src="/images/services/service1.webp" className="crlcardImg"/>
                                                                                    <span className="cdTagBtn"> News</span>
                                                                                    <div className="overlay">
                                                                                        <p className="crdText">
                                                                                            Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                                            Emaar Beachfront,
                                                                                        </p>
                                                                                    </div>
                                                                             </div> 
                                                                                <p>
                                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                                                </p>       
                                                                                <span className="text-primary">11 january 2024</span>                                              
                                                                        </a>
                                                            </SwiperSlide> 
                                                            <SwiperSlide className="multiCarouselItem">
                                                                        <a href="#" className="blogCard">
                                                                                <div className="bCardHead">
                                                                                    <img src="/images/services/service1.webp" className="crlcardImg" />
                                                                                    <span className="cdTagBtn"> News</span>
                                                                                    <div className="overlay">
                                                                                        <p className="crdText">
                                                                                            Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                                            Emaar Beachfront,
                                                                                        </p>
                                                                                    </div>
                                                                                </div> 
                                                                                <p>
                                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                                                </p>       
                                                                                <span className="text-primary">11 january 2024</span>                                              
                                                                        </a>
                                                            </SwiperSlide>
                                                            <SwiperSlide className="multiCarouselItem">
                                                                        <a href="#" className="blogCard">
                                                                                <div className="bCardHead">
                                                                                    <img src="/images/services/service1.webp" className="crlcardImg"/>
                                                                                    <span className="cdTagBtn"> News</span>
                                                                                    <div className="overlay">
                                                                                        <p className="crdText">
                                                                                            Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                                            Emaar Beachfront,
                                                                                        </p>
                                                                                    </div>
                                                                                </div> 
                                                                                <p>
                                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                                                </p>       
                                                                                <span className="text-primary">11 january 2024</span>                                              
                                                                        </a>
                                                            </SwiperSlide>
                                                    </Swiper>
                                             </div>
                                                  
                                             </div>
                                      </div>
                                      <div className="col-md-4">
                                           <div className="socialBox">
                                                <div className="socialFlexBar">
                                                      <p className="text-primary">Date: </p>
                                                      <h5>11 january 2024</h5>
                                                </div>
                                                <div className="socialFlexBar">
                                                      <p className="text-primary">Event: </p>
                                                      <h5>News</h5>
                                                </div>
                                                <div className="socialFlexBar">
                                                      <p className="text-primary">Share: </p>
                                                      <div className="socialIconsList">
                                                            <a href="#">
                                                               <img src="/images/icons/whatsapp-icon.png" className="socialIcon"/>
                                                            </a>
                                                            <a href="#">
                                                               <img src="/images/icons/whatsapp-icon.png" className="socialIcon"/>
                                                            </a>
                                                            <a href="#">
                                                               <img src="/images/icons/whatsapp-icon.png" className="socialIcon"/>
                                                            </a>
                                                            <a href="#">
                                                               <img src="/images/icons/whatsapp-icon.png" className="socialIcon"/>
                                                            </a>
                                                      </div>
                                                </div>
                                               
                                           </div>
                                           <div className="btnFlxClm mrb">
                                                <a href="#" className="cnLinkBtn">
                                                    <img src="/images/icons/whatsapp-icon.png" className="socialIcon"/>
                                                    Whatsapp
                                                </a>
                                                <a href="#" className="cnLinkBtn bg-2">
                                                    <img src="/images/icons/whatsapp-icon.png" className="socialIcon"/>
                                                    Email
                                                </a>
                                            </div>

                                            <div className="eventsCardArea">
                                                  <h3 className="eventTitle">More Events:</h3>
                                                 <a href="#" className="blogCard">
                                                       <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                             <span className="cdTagBtn"> News</span>
                                                             <div className="overlay">
                                                                <p className="crdText">
                                                                    Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                   Emaar Beachfront, established in early 2018 within Dubai Harbour, 
                                                                   Emaar Beachfront,
                                                                 </p>
                                                            </div>
                                                        </div> 
                                                        <p>
                                                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                 </a>
                                                 <a href="#" className="blogCard">
                                                       <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                             <span className="cdTagBtn"> News</span>
                                                             <div className="overlay">
                                                                <p className="crdText">
                                                                    Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                   Emaar Beachfront, established in early 2018 within Dubai Harbour, 
                                                                   Emaar Beachfront,
                                                                 </p>
                                                            </div>
                                                        </div> 
                                                        <p>
                                                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                 </a>
                                                 <a href="#" className="blogCard">
                                                       <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                             <span className="cdTagBtn"> News</span>
                                                             <div className="overlay">
                                                                <p className="crdText">
                                                                    Emaar Beachfront, established in early 2018 within Dubai Harbour,
                                                                   Emaar Beachfront, established in early 2018 within Dubai Harbour, 
                                                                   Emaar Beachfront,
                                                                 </p>
                                                            </div>
                                                        </div> 
                                                        <p>
                                                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                 </a>
                                            </div>
                                      </div>

                                </div>
                           </div>

                     </div>
            </section>
        </SWRProvider>
        </>
    );
}
export default Blogs;
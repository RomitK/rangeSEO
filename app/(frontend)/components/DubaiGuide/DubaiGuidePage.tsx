"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css/navigation';
import "@/public/css/dubai-guide-page-styles.css";
import "@/public/css/responsive.css";
import { Navigation } from 'swiper/modules';

function DubaiGuidePage(){
    return (
        <>
          <header className="header dubaiGuideSection">
                    <h4 className="sctionMdTitle text-primary text-center mb-5">
                         DUBAI GUIDES
                    </h4>
                    <Swiper 
                        navigation={true} 
                        modules={[Navigation]} 
                        className="multiSilder"
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}
                        >
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-2.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                        </SwiperSlide>
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-3.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                                   
                        </SwiperSlide>
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-4.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                        </SwiperSlide>
                       
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-3.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                                   
                        </SwiperSlide>
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-4.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                        </SwiperSlide>
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-3.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                                   
                        </SwiperSlide>
                        <SwiperSlide className="clmSliderItem">
                                   <img src='/images/banner/banner-4.png' className="multiItem" />
                                   <div className='carouselcontent'>
                                          <h3>DUBAI REAL ESTATE GUIDE</h3>
                                          <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                   </div>
                        </SwiperSlide>
                    </Swiper>
          </header>
          <section className='guidsSection'>
                   <div className="container">
                        <div className='sectionArea'>
                            <h4 className="sctionMdTitle text-primary  mb-4">
                                    GOLDEN VISA
                            </h4>
                            <div className="row horizantalCard">
                                <div className="col-md-6 ">
                                        <div className="crdImgBox">
                                            <img src="/images/blogs/blog6.png" className='horiCrdImg'/>
                                        </div>
                                </div>
                                <div className='col-md-6'>
                                        <div className="crdContentBox">
                                            <p className='fs-14 text-secondary mb-5'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                                laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur.
                                            </p>
                                            <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className='sectionArea'>
                            <h4 className="sctionMdTitle text-primary  mb-4">
                                BUYER GUIDE
                            </h4>
                            <div className="row horizantalCard">
                                <div className='col-md-6'>
                                        <div className="crdContentBox">
                                            <p className='fs-14 text-secondary mb-5'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                                laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur.
                                            </p>
                                            <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                        </div>
                                </div>
                                <div className="col-md-6 ">
                                        <div className="crdImgBox">
                                            <img src="/images/blogs/blog7.png" className='horiCrdImg'/>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className='sectionArea'>
                            <h4 className="sctionMdTitle text-primary  mb-4">
                                LUXURY PROPERTIES
                            </h4>
                            <div className="row horizantalCard">
                                <div className="col-md-6 ">
                                        <div className="crdImgBox">
                                            <img src="/images/blogs/blog8.png" className='horiCrdImg'/>
                                        </div>
                                </div>
                                <div className='col-md-6'>
                                        <div className="crdContentBox">
                                            <p className='fs-14 text-secondary mb-5'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                                laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                velit esse cillum dolore eu fugiat nulla pariatur.
                                            </p>
                                            <button className=" mrAuto downloadBtn ">DOWNLOAD NOW</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
          </section>
        </>
    );
}
export default DubaiGuidePage;
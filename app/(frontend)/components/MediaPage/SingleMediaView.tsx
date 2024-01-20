"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/public/css/blogs-styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import Link from "next/link";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { useGetSingleMediaData } from "@/src/services/MediaService";
import ReactPlayer from "react-player/lazy";

function SingleMediaView({ params }) {
    const mediaSwiperRef = useRef<SwiperCore>();
    const allmediaSwiperRef = useRef<SwiperCore>();
    const slug = params.slug[0];
    const { mediaData } = useGetSingleMediaData(slug);

  return (
    <>
    {
        mediaData && <section>
        <div className="container">
          <div className="mainHead mb-5 text-primary text-center mxWd blgTitle">
            <h4>
              {mediaData?.media?.title}
            </h4>
          </div>
          <span className="lineShape"></span>
          <div className="blogDetail">
            <div className="row">
              <div className="col-md-8">
              {mediaData && mediaData?.media?.gallery &&  mediaData?.media?.gallery.length > 0 && (
                <div className="sliderArea">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={{
                           nextEl: ".swiper-button-next",
                           prevEl: ".swiper-button-prev",
                        }}
                        breakpoints={{
                           640: {
                             slidesPerView: 1,
                             spaceBetween: 10,
                           },
                           768: {
                             slidesPerView: 1,
                             spaceBetween: 10,
                           },
                           1024: {
                             slidesPerView: 1,
                             spaceBetween: 10,
                           },
                         }}
                         modules={[Navigation, Pagination]}
                        
                        className="mySwiper"
                    >
                      {mediaData?.media?.gallery?.map((gallery, index) => {
                        return (
                          <SwiperSlide className="carouselItemWd" key={gallery.id + index}>
                            <img
                                src={gallery.path}
                                alt={gallery.title}
                                className="bSliderImg"
                            />
                          </SwiperSlide>
                        );
                      })}
                      <div
                        className=""
                        onClick={() => mediaSwiperRef?.current?.slideNext()}
                      >
                        <span className="swiper-button-prev swiperUniquePrev text-primary">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-next swiperUniqueNext text-primary "
                        onClick={() => mediaSwiperRef?.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                    </Swiper>
                </div>
              )}
                <p className="text-secondary mb-5">
                    {mediaData && mediaData?.media?.content && parse(mediaData?.media?.content)}
                </p>
                <div>
                    {
                        mediaData?.media?.additionalImage && 
                        <a className="imgcardBox" href="#">
                        <img
                          src={mediaData?.media?.additionalImage}
                          className="bSliderImg"
                        />
                      </a>
                    }
                    {
                        mediaData?.media?.article_additional_video &&  
                        <div className="d-block w-100">
                        <ReactPlayer
                        className="player-wrapper"
                        width="100%"
                        
                        config={{
                            youtube: {
                            playerVars: {
                                autoplay: 0,
                                controls: 1,
                            },
                            },
                        }}
                        url={mediaData?.media?.article_additional_video}
                        />
                    </div>
                    }
                

                  <span className="lineShape mb-5"></span>
                  { mediaData && mediaData?.allMedia &&  mediaData?.allMedia.length > 0 && (
                        <div>
                        <div className="titleFlexBar">
                          <h3 className="text-primary">All Media</h3>
                          <Link href="/medias" className="linkBtn">
                            View All
                          </Link>
                        </div>
    
                        <Swiper
                           slidesPerView={3}
                           spaceBetween={10}
                           navigation={{
                              nextEl: ".swiper-button-next",
                              prevEl: ".swiper-button-prev",
                           }}
                           breakpoints={{
                              640: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                              },
                              768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                              },
                              1024: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                              },
                            }}
                            modules={[Navigation, Pagination]}
                           
                           className="mySwiper"
                        >
                            
                                {mediaData?.allMedia?.map((mediaDataSingle, index) => {

                                    return (<SwiperSlide className="multiCarouselItem" key={mediaDataSingle.id}>
                                    <Link  href={`/medias/${mediaDataSingle?.slug}`} className="blogCard">
                                      <div className="bCardHead">
                                        <img
                                          

                                          src={mediaDataSingle.image} alt={mediaDataSingle.title}

                                          className="crlcardImg"
                                        />
                                        <span className="cdTagBtn"> {mediaDataSingle.type}</span>
                                        <div className="overlay">
                                          <p className="crdText">
                                            {mediaDataSingle.short_content}
                                          </p>
                                        </div>
                                      </div>
                                      <p>
                                        {mediaDataSingle.title}
                                      </p>
                                      <span className="text-primary">{mediaDataSingle.date}</span>
                                    </Link>
                                  </SwiperSlide>)
                                })}
                             <div
                        className=""
                        onClick={() => allmediaSwiperRef?.current?.slideNext()}
                      >
                        <span className="swiper-button-prev swiperUniquePrev text-primary">
                          <i className="bi bi-chevron-left fs-1"></i>
                        </span>
                      </div>
                      <div
                        className="swiper-button-next swiperUniqueNext text-primary "
                        onClick={() => allmediaSwiperRef?.current?.slidePrev()}
                      >
                        <span className="">
                          <i className="bi bi-chevron-right fs-1"></i>
                        </span>
                      </div>
                          

                        </Swiper>
                      </div>
                  )
                  }
                  
                </div>
              </div>
              <div className="col-md-4">
                <div className="socialBox">
                  <div className="socialFlexBar">
                    <p className="text-primary">Date: </p>
                    <h5>{mediaData?.media?.date}</h5>
                  </div>
                  <div className="socialFlexBar">
                    <p className="text-primary">Event: </p>
                    <h5>{mediaData?.media?.event}</h5>
                  </div>
                  <div className="socialFlexBar">
                    <p className="text-primary">Share: </p>
                    <div className="socialIconsList">
                      <a href="#">
                        <img
                          src="/images/icons/whatsapp-icon.png"
                          className="socialIcon"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="/images/icons/whatsapp-icon.png"
                          className="socialIcon"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="/images/icons/whatsapp-icon.png"
                          className="socialIcon"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="/images/icons/whatsapp-icon.png"
                          className="socialIcon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="btnFlxClm mrb">
                  <a href="#" className="cnLinkBtn">
                    <img
                      src="/images/icons/whatsapp-icon.png"
                      className="socialIcon"
                    />
                    Whatsapp
                  </a>
                  <a href="#" className="cnLinkBtn bg-2">
                    <img
                      src="/images/icons/whatsapp-icon.png"
                      className="socialIcon"
                    />
                    Email
                  </a>
                </div>
                { mediaData?.similarMedia && mediaData?.similarMedia.length > 0 &&(
                <div className="eventsCardArea">
                  <h3 className="eventTitle">More Events:</h3>
                  {mediaData?.similarMedia?.map((similarMedia, index) => {
                    return (
                    <Link href={`/medias/${similarMedia?.slug}`} className="blogCard" key={similarMedia.id}>
                    <div className="bCardHead">
                      <img
                        src={similarMedia.image} alt={similarMedia.title}
                        className="eventCardImg"
                      />
                      <span className="cdTagBtn"> News</span>
                      <div className="overlay">
                        <p className="crdText">
                            {similarMedia.short_content}
                        </p>
                      </div>
                    </div>
                    <p>
                        {similarMedia.title}
                    </p>
                    <span className="text-primary">{similarMedia.date}</span>
                    </Link>
                    )
                  })}

                </div>
                ) }
              </div>
            </div>
          </div>
        </div>
      </section>
    }
    </>
  );
}
export default SingleMediaView;

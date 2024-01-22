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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faYoutubeSquare,
  faTiktok,
  faLinkedin,
  faTwitter,
  faYoutube,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { getCurrentUrl } from "@/src/utils/helpers/common";

function SingleMediaView({ params }) {
  const faFacebookIcon = faFacebook as IconProp;
  const faInstagramIcon = faInstagram as IconProp;
  const faTiktokIcon = faTiktok as IconProp;
  const faLinkedinIcon = faLinkedin as IconProp;
  const faYoutubeIcon = faYoutube as IconProp;
  const faTelegramIcon = faTelegram as IconProp;

  const mediaSwiperRef = useRef<SwiperCore>();
  const allmediaSwiperRef = useRef<SwiperCore>();
  const slug = params.slug[0];
  const { mediaData } = useGetSingleMediaData(slug);

  return (
    <>
      {mediaData && (
        <section>
          <div className="container">
            <div className="mainHead mb-5 text-primary text-center mxWd blgTitle">
              <h4>{mediaData?.media?.title}</h4>
            </div>
            <span className="lineShape"></span>
            <div className="blogDetail">
              <div className="row">
                <div className="col-md-8">
                  {mediaData &&
                    mediaData?.media?.gallery &&
                    mediaData?.media?.gallery.length > 0 && (
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
                              <SwiperSlide
                                className="carouselItemWd"
                                key={gallery.id + index}
                              >
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
                    {mediaData &&
                      mediaData?.media?.content &&
                      parse(mediaData?.media?.content)}
                  </p>
                  <div>
                    {mediaData?.media?.additionalImage && (
                      <a className="imgcardBox" href="#">
                        <img
                          src={mediaData?.media?.additionalImage}
                          className="bSliderImg"
                        />
                      </a>
                    )}
                    {mediaData?.media?.article_additional_video && (
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
                    )}

                    <span className="lineShape mb-5"></span>
                    {mediaData &&
                      mediaData?.allMedia &&
                      mediaData?.allMedia.length > 0 && (
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
                            {mediaData?.allMedia?.map(
                              (mediaDataSingle, index) => {
                                return (
                                  <SwiperSlide
                                    className="multiCarouselItem"
                                    key={mediaDataSingle.id}
                                  >
                                    <Link
                                      href={`/medias/${mediaDataSingle?.slug}`}
                                      className="blogCard"
                                    >
                                      <div className="bCardHead">
                                        <img
                                          src={mediaDataSingle.image}
                                          alt={mediaDataSingle.title}
                                          className="crlcardImg"
                                        />
                                        <span className="cdTagBtn">
                                          {" "}
                                          {mediaDataSingle.type}
                                        </span>
                                        <div className="overlay">
                                          <p className="crdText">
                                            {mediaDataSingle.short_content}
                                          </p>
                                        </div>
                                      </div>
                                      <p>{mediaDataSingle.title}</p>
                                      <span className="text-primary">
                                        {mediaDataSingle.date}
                                      </span>
                                    </Link>
                                  </SwiperSlide>
                                );
                              }
                            )}
                            <div
                              className=""
                              onClick={() =>
                                allmediaSwiperRef?.current?.slideNext()
                              }
                            >
                              <span className="swiper-button-prev swiperUniquePrev text-primary">
                                <i className="bi bi-chevron-left fs-1"></i>
                              </span>
                            </div>
                            <div
                              className="swiper-button-next swiperUniqueNext text-primary "
                              onClick={() =>
                                allmediaSwiperRef?.current?.slidePrev()
                              }
                            >
                              <span className="">
                                <i className="bi bi-chevron-right fs-1"></i>
                              </span>
                            </div>
                          </Swiper>
                        </div>
                      )}
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
                        <FacebookShareButton url={getCurrentUrl()}>
                          <FontAwesomeIcon
                            icon={faFacebookIcon}
                            style={{ color: "#1877F2", fontSize: "30px" }}
                          />
                        </FacebookShareButton>
                        {/* <InstapaperShareButton url={getCurrentUrl()}>
                          <FontAwesomeIcon
                            icon={faInstagramIcon}
                            style={{ color: "#E4405F", fontSize: "30px" }}
                          />
                        </InstapaperShareButton> */}
                        <a href="#"></a>
                        <TwitterShareButton url={getCurrentUrl()}>
                          <span className="">
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              style={{ height: "30px" }}
                              className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-18jsvk2 r-16y2uox r-8kz0gk"
                            >
                              <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                              </g>
                            </svg>
                          </span>
                        </TwitterShareButton>

                        <LinkedinShareButton url={getCurrentUrl()}>
                          <FontAwesomeIcon
                            icon={faLinkedinIcon}
                            style={{ color: "#0A66C2", fontSize: "30px" }}
                          />
                        </LinkedinShareButton>
                      </div>
                    </div>
                  </div>
                  <div className="btnFlxClm mrb">
                    <WhatsappShareButton url={getCurrentUrl()}  className="cnLinkBtn whatsappBtn">
                      
                        <i className="fa fa-whatsapp"></i>
                        Whatsapp
                      
                    </WhatsappShareButton>
                    <EmailShareButton url={getCurrentUrl()} className="cnLinkBtn email" id="email2" style={{ "backgroundColor": "#283975 !important" }}> 
                      
                        <i className="fa fa-envelope"></i>
                        Email
                      
                    </EmailShareButton>
                  </div>

                  {mediaData?.similarMedia &&
                    mediaData?.similarMedia.length > 0 && (
                      <div className="eventsCardArea">
                        <h3 className="eventTitle">More Events:</h3>
                        {mediaData?.similarMedia?.map((similarMedia, index) => {
                          return (
                            <Link
                              href={`/medias/${similarMedia?.slug}`}
                              className="blogCard"
                              key={similarMedia.id}
                            >
                              <div className="bCardHead">
                                <img
                                  src={similarMedia.image}
                                  alt={similarMedia.title}
                                  className="eventCardImg"
                                />
                                <span className="cdTagBtn"> News</span>
                                <div className="overlay">
                                  <p className="crdText">
                                    {similarMedia.short_content}
                                  </p>
                                </div>
                              </div>
                              <p>{similarMedia.title}</p>
                              <span className="text-primary">
                                {similarMedia.date}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
export default SingleMediaView;

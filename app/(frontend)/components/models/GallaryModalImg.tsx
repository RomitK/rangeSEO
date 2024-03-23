"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/public/css/gallery-modal-styles.css";
import { Pagination, Navigation } from "swiper/modules";

function GallaryModalImg(props) {
  return (
    <>
      {
        Array.isArray(props.images) && props.images.length > 0 && (
          <>
            <button
              className="gallerymodalBtn"
              data-bs-toggle="modal"
              data-bs-target="#gallaryModalImg"
            >
              VIEW FLOOR PLAN
            </button>

            <div
              className="modal fade"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              id="gallaryModalImg"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-dialog-centered modal-lg modalBookMeet ">
                <div className="modal-content">
                  <div className="modal-header border-0 justify-content-end p-1">
                    <button
                      type="button"
                      className="bg-transparent border-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i className="bi bi-x-circle text-primary"></i>
                    </button>
                  </div>

                  {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                  <div className="modal-body  p-0 rounded-1 m-2">
                    <div className="row g-0">
                      <div className="col-12 col-lg-12 col-md-12 descricalenderCol">
                        {
                          Array.isArray(props.images) && props.images.length > 0 && (
                            <Swiper
                              pagination={{
                                type: "fraction",
                              }}
                              navigation={true}
                              modules={[Pagination, Navigation]}
                              className="mySwiper galleryMdlSilder"
                            >
                              {props?.images?.map((image, index) => {
                                return (
                                  <SwiperSlide className="sliderItem" key={image.id}>
                                    <img loading="lazy"
                                      src={image.path}
                                      alt={image.path}
                                      className="sliderGallaryImg floorplans"
                                    />
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                          )
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }

    </>
  );
}
export default GallaryModalImg;

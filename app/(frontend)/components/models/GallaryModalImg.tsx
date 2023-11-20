"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/public/css/gallery-modal-styles.css";
import { Pagination, Navigation } from 'swiper/modules';




function GallaryModalImg() {
  return (
    <>
         <button  className="gallerymodalBtn" data-bs-toggle="modal" data-bs-target="#gallaryModalImg">
            VIEW FLOOR PLAN 
        </button>

        <div className="modal fade" id="gallaryModalImg"  aria-hidden="true">
           <div className="modal-dialog modal-lg">
                <div className="modal-content">
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                     <Swiper
                          pagination={{
                            type: 'fraction',
                          }}
                          navigation={true}
                          modules={[Pagination, Navigation]}
                          className="mySwiper galleryMdlSilder"
                      >
                        <SwiperSlide className="sliderItem">
                                     <img src='/images/properties/p7.png' className='sliderGallaryImg'/>
                        </SwiperSlide>
                        <SwiperSlide className="sliderItem">
                                     <img src='/images/properties/p6.png' className='sliderGallaryImg'/>
                        </SwiperSlide>
                        <SwiperSlide className="sliderItem">
                                     <img src='/images/properties/p5.png' className='sliderGallaryImg'/>
                        </SwiperSlide>
                        <SwiperSlide className="sliderItem">
                                     <img src='/images/properties/p4.png' className='sliderGallaryImg'/>
                        </SwiperSlide>
       
                    </Swiper>

                </div>
              
            </div>
       </div>
    </>
  );
}
export default GallaryModalImg;

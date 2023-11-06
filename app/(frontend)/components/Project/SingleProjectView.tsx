"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import parse from "html-react-parser";
// import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleProjectData } from "@/src/services/ProjectService";
import "@/public/css/single-project-view-styles.css";

function SingleProjectView({ 
  // params
 }) {
  // const slug = params.slug[0];
  // const { projectData } = useGetSingleProjectData(slug);

  const swiperRef = useRef<SwiperType>;
  const PropertySwiperRef = useRef<SwiperType>;

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
  <header>

        <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
            className="swiper "
            >
            <SwiperSlide className="swiperSilderItem">
                 <img
                    src="/images/slider/sliderImg-1.jpg"
                    className="sliderCoverImg"
                  />
                  <div className=" sliderContainer">
                        <div className="sliderContentArea">
                              <div className="sliderContent">
                                    <h5>Damac</h5>
                                    <h1>Casa</h1>
                                  <p className="mb-5">
                                      A stunning silhouette, both distinct and majestic against the city sky, 
                                      with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                                      design adds to Dubai’s expansive urban tapestry. A reflection of life’s special
                                        moments, memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                        perfect blend of urban and island life.
                                    </p> 
                              </div>
                          </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="swiperSilderItem">
                 <img
                    src="/images/slider/sliderImg-1.jpg"
                    className="sliderCoverImg"
                  />
                  <div className=" sliderContainer">
                        <div className="sliderContentArea">
                              <div className="sliderContent">
                                    <h5>Damac</h5>
                                    <h1>Casa</h1>
                                  <p className="mb-5">
                                      A stunning silhouette, both distinct and majestic against the city sky, 
                                      with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                                      design adds to Dubai’s expansive urban tapestry. A reflection of life’s special
                                        moments, memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                        perfect blend of urban and island life.
                                    </p> 
                              </div>
                          </div>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="swiperSilderItem">
                 <img
                    src="/images/slider/sliderImg-1.jpg"
                    className="sliderCoverImg"
                  />
                  <div className=" sliderContainer">
                        <div className="sliderContentArea">
                              <div className="sliderContent">
                                    <h5>Damac</h5>
                                    <h1>Casa</h1>
                                  <p className="mb-5">
                                      A stunning silhouette, both distinct and majestic against the city sky, 
                                      with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                                      design adds to Dubai’s expansive urban tapestry. A reflection of life’s special
                                        moments, memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                        perfect blend of urban and island life.
                                    </p> 
                              </div>
                          </div>
                    </div>
            </SwiperSlide>
            <div className="sliderArrowBar">
                <div className="swiper-button-next text-white" onClick={() => swiperRef.current?.slideNext()} onClick={() => swiperRef.current?.slideNext()}>
                    <span className=''>
                        <i className='bi bi-chevron-right fs-1'></i>
                    </span>
                </div>
                <div className="swiper-button-prev text-white" onClick={() => swiperRef.current?.slidePrev()}>
                    <span className=''>
                        <i className='bi bi-chevron-left fs-1'></i>
                    </span>
                </div>
            </div>
      </Swiper>
                           
                   
  </header>
  <section>
          <div className="container">
                <div className="row">
                     <div className="col-md-3">
                            <div className="vtTextBXox">
                                 <p>Starting Price</p>
                                 <h3>AED 650,000</h3>
                            </div> 
                     </div>
                     <div className="col-md-3">
                            <div className="vtTextBXox">
                                 <p>Available Units</p>
                                 <h3>1-3 BR</h3>
                            </div> 
                     </div>
                     <div className="col-md-3">
                            <div className="vtTextBXox">
                                 <p>Area from SqFt</p>
                                 <h3>663.92</h3>
                            </div> 
                     </div>
                     <div className="col-md-3">
                            <div className="vtTextBXox">
                                 <p>Handover</p>
                                 <h3>Q4</h3>
                            </div> 
                     </div>
                </div>
          </div>
  </section>
  <section>
      <div className="secTabsArea">
            {/* Tabs List Start */}
            <div className="tabsListConatiner">
                <div className="nav nav-pills TabsListOptions container" id="pills-tab" >
                      <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#secTab-1" aria-selected="true">
                            Hightlights
                      </button>
                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#secTab-2"  aria-selected="false">
                          Projects Destails
                      </button>
                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#secTab-3"  aria-selected="false">
                          Nearby 
                      </button>
                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#secTab-4"  aria-selected="false">
                          Available Property 
                      </button>
                </div>
            </div>
            {/* Tabs List End */}
            {/* Tabs Content Start */}
            <div className="tab-content" id="pills-tabContent">
                  {/* Tab 1 Content Start */}
                  <div className="tab-pane fade show active" id="secTab-1"  >
                        <div className="container">
                            <div className="row align-items-center">
                                  <div className="col-md-8">
                                        <div className="secTabCntent">
                                            <h4 className="sctionMdTitle text-primary">Hightlights</h4>
                                            <p className="text-secondary mb-4">
                                                A stunning silhouette, both distinct and majestic against the city sky, with stunning 
                                                Palm views, DAMAC Casa’s smooth curves and fluid avant-garde design adds to 
                                                Dubai’s expansive urban tapestry. A reflection of life’s special moments,
                                                memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                                perfect blend of urban and island life.
                                            </p>
                                            {/* List Pannel Start  */}
                                            <div className="collapsArea">
                                                  <div className="ListpPannel">
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                              Outdoor Pool
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Fitness Area
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Kids Play Area
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Beach and lagoon 
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Green Community
                                                        </div>
                                                  </div>
                                            </div>
                                            {/* List Pannel End */}
                                        </div> 
                                  </div>
                                  <div className="col-md-4">
                                          <Swiper pagination={true} modules={[Pagination]} className="mySwiper singleSlider clmSlider">
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <div className="carouselArrowBar">
                                                    <div className="swiper-button-next text-white" onClick={() => swiperRef.current?.slideNext()} onClick={() => swiperRef.current?.slideNext()}>
                                                        <span className=''>
                                                            <i className='bi bi-chevron-right fs-1'></i>
                                                        </span>
                                                    </div>
                                                    <div className="swiper-button-prev text-white" onClick={() => swiperRef.current?.slidePrev()}>
                                                        <span className=''>
                                                            <i className='bi bi-chevron-left fs-1'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            
                                          </Swiper>
                                  </div>

                              </div> 
                        </div>
                  </div>    
                    {/* Tab 1 Content End */}
                    {/* Tab 2 Content Start */}
                <div className="tab-pane fade" id="secTab-2"  >
                        <div className="container">
                            <div className="row align-items-center">
                                  <div className="col-md-8">
                                        <div className="secTabCntent">
                                            <h4 className="sctionMdTitle text-primary">PROJECTS DESTAILS</h4>
                                            <p className="text-secondary mb-4">
                                                A stunning silhouette, both distinct and majestic against the city sky, with stunning 
                                                Palm views, DAMAC Casa’s smooth curves and fluid avant-garde design adds to 
                                                Dubai’s expansive urban tapestry. A reflection of life’s special moments,
                                                memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                                perfect blend of urban and island life.
                                            </p>
                                             {/* List Pannel Start  */}
                                             <div className="collapsArea">
                                                  <div className="ListpPannel">
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                              Outdoor Pool
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Fitness Area
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Kids Play Area
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Beach and lagoon 
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Green Community
                                                        </div>
                                                  </div>
                                              </div>
                                            {/* List Pannel End */}
                                        </div> 
                                  </div>
                                  <div className="col-md-4">
                                          <Swiper 
                                                pagination={true} modules={[Pagination]} 
                                                modules={[Navigation]}
                                                onBeforeInit={(swiper) => {
                                                    swiperRef.current = swiper;
                                                }}
                                                className="mySwiper singleSlider clmSlider"
                                              >
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                            
                                          </Swiper>
                                  </div>

                              </div> 
                        </div>
                </div>
                  {/* Tab 2 Content End */}
                  {/* Tab 3 Content Start */}
                <div className="tab-pane fade" id="secTab-3"  >
                        <div className="container">
                            <div className="row align-items-center">
                                  <div className="col-md-8">
                                        <div className="secTabCntent">
                                            <h4 className="sctionMdTitle text-primary">NEARBY</h4>
                                            <p className="text-secondary mb-4">
                                                A stunning silhouette, both distinct and majestic against the city sky, with stunning 
                                                Palm views, DAMAC Casa’s smooth curves and fluid avant-garde design adds to 
                                                Dubai’s expansive urban tapestry. A reflection of life’s special moments,
                                                memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                                perfect blend of urban and island life.
                                            </p>
                                             {/* List Pannel Start  */}
                                            <div className="collapsArea">
                                                  <div className="ListpPannel">
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                              Outdoor Pool
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Fitness Area
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Kids Play Area
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Beach and lagoon 
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Green Community
                                                        </div>
                                                  </div>
                                            </div>
                                            {/* List Pannel End */}
                                        </div> 
                                  </div>
                                  <div className="col-md-4">
                                          <Swiper pagination={true} modules={[Pagination]} className="mySwiper singleSlider clmSlider">
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                        <img
                                                          src="/images/slider/sliderImg-1.jpg"
                                                          className="clmCoverImg"
                                                        />
                                                </SwiperSlide>
                                            
                                          </Swiper>
                                  </div>

                              </div> 
                        </div>
                </div>
                  {/* Tab 3 Content End */}
                  {/* Tab 4 Content Start */}
                <div className="tab-pane fade" id="secTab-4"  >
                    <div className="container">
                        <div className="row align-items-center">
                              <div className="col-md-8">
                                    <div className="secTabCntent">
                                        <h4 className="sctionMdTitle text-primary">AVAILABLE PROPERTY</h4>
                                        <p className="text-secondary mb-4">
                                            A stunning silhouette, both distinct and majestic against the city sky, with stunning 
                                            Palm views, DAMAC Casa’s smooth curves and fluid avant-garde design adds to 
                                            Dubai’s expansive urban tapestry. A reflection of life’s special moments,
                                            memories and dreams, DAMAC Casa is both home and an escape, making it the 
                                            perfect blend of urban and island life.
                                        </p>
                                        {/* List Pannel Start  */}
                                        <div className="collapsArea">
                                                  <div className="ListpPannel">
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                              Outdoor Pool
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Fitness Area
                                                        </div>
                                                        <div className="listItem">
                                                             <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Kids Play Area
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                                Beach and lagoon 
                                                        </div>
                                                        <div className="listItem">
                                                              <img src="/images/icons/list-arrow-icon.png" className="listArrowIcon" />
                                                               Green Community
                                                        </div>
                                                  </div>
                                            </div>
                                            {/* List Pannel End */}
                                    </div> 
                              </div>
                              <div className="col-md-4">
                                      <Swiper pagination={true} modules={[Pagination]} className="mySwiper singleSlider clmSlider">
                                            <SwiperSlide>
                                                    <img
                                                      src="/images/slider/sliderImg-1.jpg"
                                                      className="clmCoverImg"
                                                    />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                    <img
                                                      src="/images/slider/sliderImg-1.jpg"
                                                      className="clmCoverImg"
                                                    />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                    <img
                                                      src="/images/slider/sliderImg-1.jpg"
                                                      className="clmCoverImg"
                                                    />
                                            </SwiperSlide>
                                        
                                      </Swiper>
                              </div>

                          </div> 
                    </div>
                </div>
                  {/* Tab 4 Content End */}
            </div>
            {/* Tabs Content End */}
      </div>
  </section>
  <section>
           <div className="container">
                 <h4 className="sctionMdTitle text-primary mb-4">Project Details</h4>
                 <p className="fs-14 text-secondary mb-3">
                     A stunning silhouette, both distinct and majestic against the city sky,
                     with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                     design adds to Dubai’s expansive urban tapestry.
                 </p>
                 <p className="fs-14 text-secondary mb-3">
                     A stunning silhouette, both distinct and majestic against the city sky,
                     with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                     design adds to Dubai’s expansive urban tapestry.
                 </p>
                 <p className="fs-14 text-secondary mb-3">
                     A stunning silhouette, both distinct and majestic against the city sky,
                     with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                     design adds to Dubai’s expansive urban tapestry.
                 </p>
                 <p className="fs-14 text-secondary mb-3">
                     A stunning silhouette, both distinct and majestic against the city sky,
                     with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                     design adds to Dubai’s expansive urban tapestry.
                 </p>
                 <p className="fs-14 text-secondary mb-3">
                     A stunning silhouette, both distinct and majestic against the city sky,
                     with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                     design adds to Dubai’s expansive urban tapestry.
                 </p>
           </div>
  </section>
  <section className="tableSection">
           <div className="container">
                <h4 className="sctionMdTitle text-primary mb-4">Property Type</h4> 
                <table className="priceTable">
                       <thead>
                              <tr>
                                   <th><h5 className="tblThText">Unit No.</h5></th>
                                   <th><h5 className="tblThText">Type</h5></th>
                                   <th><h5 className="tblThText">Size</h5></th>
                                   <th><h5 className="tblThText text-center">Bedroom</h5></th>
                                   <th><h5 className="tblThText text-center">Payment Plan</h5></th>
                                   <th><h5 className="tblThText text-center">Floor Plan</h5></th>
                              </tr>
                       </thead>
                       <tbody>
                             <tr>
                                  <td>
                                       <p className="tblTdText text-secondary">GG-1</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary">Apartment</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary">12341.12 SqFt.</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary text-center">3</p>
                                  </td>
                                  <td>
                                       <button className="fillBtn tblBtn mrAuto" 
                                             data-bs-toggle="modal" 
                                             data-bs-target="#pricePlaneModal"
                                             >
                                              view
                                        </button>                                  
                                  </td>
                                  <td>
                                       <button className="fillBtn tblBtn mrAuto"
                                          data-bs-toggle="modal" 
                                          data-bs-target="#floorPlaneModal"
                                        >
                                        view
                                        </button> 
                                  </td>
                             </tr>
                             <tr>
                                  <td>
                                       <p className="tblTdText text-secondary">GG-1</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary">Apartment</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary">12341.12 SqFt.</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary text-center">3</p>
                                  </td>
                                  <td>
                                       <button className="fillBtn tblBtn mrAuto" 
                                             data-bs-toggle="modal" 
                                             data-bs-target="#pricePlaneModal"
                                             >
                                              view
                                       </button>                                  
                                 </td>
                                  <td>
                                       <button className="fillBtn tblBtn mrAuto">view</button> 
                                  </td>
                             </tr>
                             <tr>
                                  <td>
                                       <p className="tblTdText text-secondary">GG-1</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary">Apartment</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary">12341.12 SqFt.</p>
                                  </td>
                                  <td>
                                       <p className="tblTdText text-secondary text-center">3</p>
                                  </td>
                                  <td>
                                      <button className="fillBtn tblBtn mrAuto" 
                                             data-bs-toggle="modal" 
                                             data-bs-target="#pricePlaneModal"
                                             >
                                              view
                                       </button>
                                  </td>
                                  <td>
                                       <button className="fillBtn tblBtn mrAuto">view</button> 
                                  </td>
                             </tr>
                       </tbody>
                </table>
                <button className="bdrBtn mrAuto">view All</button>
           </div>
  </section>
  <section className="mb-5">
          <div className="container">
               <div className="row">
                    <div className="col-md-7">
                          <div className="secContent">
                               <h4 className="sctionMdTitle text-primary mb-4">About Developers</h4>
                               <p className="fs-14 text-secondary mb-4">
                                  A stunning silhouette, both distinct and majestic against the city sky, 
                                  with stunning Palm views, DAMAC Casa’s smooth curves and fluid avant-garde 
                                  design adds to Dubai’s expansive urban tapestry. A reflection of life’s special 
                                  moments, memories and dreams, DAMAC Casa is both home and an escape, making it 
                                  the perfect blend of urban and island life.
                               </p>
                               <button className="bdrBtn">view All</button>
                          </div>
                    </div>
                    <div className="col-md-5">
                          <div className="colmImgBox">
                              <img src="/images/damac-img.png" className="clmContainImg" />
                          </div> 
                    </div>

               </div>
          </div>
  </section>










  <div className="modal fade" id="pricePlaneModal"   >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment Plan</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
                <div className="labelFLex">
                      <label className="priceLabel">Sizes From : 1768.4 To 4055.73 SQFT</label>
                      <label className="priceLabel">Starting Price : AED 1,758,000</label>
                </div>
                <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="tblThText">Installments</th>
                        <th className="tblThText">	Percentage (%)</th>
                        <th className="tblThText">Milestones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td> <p className="tblTdText text-secondary">DEPOSIT</p></td>
                          <td><p className="tblTdText text-secondary">14%</p></td>
                          <td><p className="tblTdText text-secondary">Immediate</p></td>
                      </tr>
                      <tr>
                        <td> <p className="tblTdText text-secondary">DEPOSIT</p></td>
                        <td><p className="tblTdText text-secondary">14%</p></td>
                        <td><p className="tblTdText text-secondary">Immediate</p></td>
                      </tr>
                      <tr>
                        <td> <p className="tblTdText text-secondary">DEPOSIT</p></td>
                        <td><p className="tblTdText text-secondary">14%</p></td>
                        <td><p className="tblTdText text-secondary">Immediate</p></td>
                      </tr>
                    </tbody>
                </table>
          </div>
        
        </div>
      </div>
  </div>

  <div className="modal fade" id="floorPlaneModal"   >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment Plan</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
               <form className="floorFormBox">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Email" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingNumber" placeholder="Phone Number" />
                      <label for="floatingNumber">Phone Number</label>
                    </div>
                    <div className="form-floating mb-4">
                        <textarea className="form-control textArea" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Comments</label>
                    </div>
                    <input type="submit" className="fillBtn tblBtn mrAuto submitBtn" value="submit"/>
               </form>
          </div>
        
        </div>
      </div>
  </div>
    </>
  );
}
export default SingleProjectView;

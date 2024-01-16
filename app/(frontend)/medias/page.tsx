"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import FaqsPage from "../components/FaqsPage/FaqsPage";
import CareerListPage from "../components/CareerListPage/CareerList";
import "@/public/css/medias-Styles.css";


function Medias(){
    return (
        <>
        <SWRProvider>
        <section>
                 <div className="container">
                       <div className="mainHead mb-3 text-primary text-center mxWd pt-5">
                                <h4 className="mb-2 pt-2">MEDIA</h4>
                                <span className="lineShape mb-2"></span>

                        </div>
                       <div className="proGalleryArea">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active"  data-bs-toggle="tab" data-bs-target="#proTab-1"    aria-selected="true">All</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#proTab-2"    aria-selected="false">NEWS</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#proTab-3"    aria-selected="false">BLOGS</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#proTab-4"    aria-selected="true">AWARDS</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#proTab-5"    aria-selected="false">CELEBARTION</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#proTab-6"    aria-selected="false">SAELSEVENTS</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                {/* Tab 1 Contant Area Start */}
                                <div className="tab-pane fade show active" id="proTab-1"  >
                                        <div className="row">
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                        </div>
                                </div>
                                 {/* Tab 1 Contant Area End */}
                                 {/* Tab 2 Contant Area Start */}
                                 <div className="tab-pane fade" id="proTab-2"  >
                                        <div className="row">
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>                                          
                                        </div>
                                 </div>
                                 {/* Tab 2 Contant Area End */}
                                 {/* Tab 3 Contant Area Start */}
                                 <div className="tab-pane fade" id="proTab-3"  >
                                        <div className="row">
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                                                                       
                                        </div>
                                 </div>
                                 {/* Tab 3 Contant Area End */}
                                 {/* Tab 4 Contant Area Start */}
                                 <div className="tab-pane fade" id="proTab-4"  >
                                        <div className="row">
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                        </div>
                                 </div>
                                 {/* Tab 4 Contant Area End*/}
                                 {/* Tab 5 Contant Area Start */}
                                 <div className="tab-pane fade" id="proTab-5">
                                        <div className="row">
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                        </div>
                                 </div>
                                 {/* Tab 5 Contant Area End */}
                                 {/* Tab 6 Contant Area Start */}
                                 <div className="tab-pane fade" id="proTab-6"  >
                                       <div className="row">
                                              <div className="col-md-4">
                                                    <a href="#" className="blogCard proGalleryCard">
                                                        <div className="bCardHead">
                                                            <img src="/images/services/service1.webp" className="eventCardImg"/>
                                                            <span className="cdTagBtn"> News</span>
                                                        </div> 
                                                        <p>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                        </p>       
                                                        <span className="text-primary">11 january 2024</span>                                              
                                                    </a>
                                              </div>
                                        </div>
                                 </div>
                                 {/* Tab 6 Contant Area End */}
                            </div>
                       </div>
                       <button className="viewLinkBtn mb-5">View All</button>
                 </div>
        </section>
        </SWRProvider>
        </>
    );
}
export default Medias;
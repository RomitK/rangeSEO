"use client";
import React, { useState, useEffect } from "react";
import "@/public/css/sell-with-range.css";

function SellPage() {
  return (
    <>
      <header className="sellWithRange">
          <img
              src="/images/banner/banner-4.png"
               className="headerImgVideo"
              />
               <div className="headConentBox">
                    <h2 className="headTitle mb-3">
                       SELL WITH RANGE
                    </h2>
                    <p className="pText">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <a href="#" className="fillBtn">
                        CONTACT US NOW
                    </a>
              </div>
      </header>
      <section className="sectionSec">
              <div className="container">
                    <h4 className="sctionMdTitle text-primary  mb-5">
                        HOW WE MAKE IT EASY FOR YOU?
                    </h4>
                    <div className="rowArea">
                          <div className="colmBox">
                               <img src="/images/icons/icon-5.png" className="iconImg" />
                               <h5 className="colmBoxText">PROPERTY VALUATION </h5>
                          </div>
                          <div className="colmBox">
                               <img src="/images/icons/icon-4.png" className="arrrowIconImg"/>
                               <img src="/images/icons/icon-6.png" className="iconImg"/>
                               <h5 className="colmBoxText">MARKETING </h5>
                          </div>
                          <div className="colmBox">
                               <img src="/images/icons/icon-4.png" className="arrrowIconImg"/>
                               <img src="/images/icons/icon-9.png" className="iconImg"/>
                               <h5 className="colmBoxText">VIEWING </h5>
                          </div>
                          <div className="colmBox">
                               <img src="/images/icons/icon-4.png" className="arrrowIconImg"/>
                               <img src="/images/icons/icon-8.png" className="iconImg"/>
                               <h5 className="colmBoxText">NEGOTIATIONS</h5>
                          </div>
                          <div className="colmBox">
                               <img src="/images/icons/icon-4.png" className="arrrowIconImg"/>
                               <img src="/images/icons/icon-7.png" className="iconImg"/>
                               <h5 className="colmBoxText">PROPERTY TRACKER </h5>
                          </div>
                    </div>
              </div>
      </section>
      <section>
                <div className="container">
                     <div className="videoSectionContiner">
                              <h4 className="sctionMdTitle text-primary  text-center mb-4">
                                  WHY SELL WITH RANGE?
                              </h4>  
                              <p className="fs-14 text-secondary text-center mb-4">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </p>
                              <div className="videoBox">
                                  <video
                                        className="d-block w-100 videoMain"
                                        autoPlay
                                        loop
                                        muted
                                        preload="metadata"
                                        poster="/images/services/service-header.webp"
                                        >
                                        <source src="/videos/services.mp4" type="video/mp4" />
                                        <source src="/videos/services.mp4" type="video/mov" />
                                        Sorry, your browser doesn't support videos.
                                  </video>
                              </div>
                      </div>
                </div>
      </section>
      <section className="guideSellSection">
               <div className="container">
                      <div className="rowSec">
                           <div className="colmBox">
                                <img src="/images/banner/banner-5.png" className="colmBoxImg"/>
                                <div className="colmBoxContent">
                                      <h2>
                                         GUIDE TO SELL <br/>
                                        YOUR PROPERTY
                                      </h2>
                                      <a href="#" className="fillBtn">DOWNLOAD NOW</a>
                                </div>
                           </div>
                           <div className="colmBox formBox">
                                <h3 className="title">Contact our Agents now</h3>
                                <div className="row ">
                                      <div className="col-12 mb-2">
                                          <input className="form-control cntInptField" placeholder="Name"  type="text"  />
                                      </div>
                                        <div className="col-12 mb-2">
                                                <input className="form-control cntInptField" placeholder="Email Address"  type="email" />
                                        </div>
                                        <div className="col-12 mb-2">
                                                  <input className="form-control cntInptField" placeholder="Contact Number"   type="email"  />
                                        </div>
                                        <div className="col-12">
                                                <textarea className="form-control cntInptField textareaField" placeholder="Message">
                                                </textarea>
                                          </div>
                                          <input className="fillBtn submitBtn" type="submit" value="Submit" />
                                  </div>
                           </div>
                      </div>
               </div>
      </section>
    </>
  );
}
export default SellPage;

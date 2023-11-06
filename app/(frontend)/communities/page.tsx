"use client";
import React from "react";
import Select from 'react-select';
import "@/public/css/communities-styles.css";

function Communities(){

    const options =[
        {value:"Pakistan", label:"Pakistan"},
        {value:"Dubai", label:"Dubai"},
        {value:"Lahore", label:"Lahore"},
        {value:"Karachi", label:"Karachi"},
    ]
    

    return (
        <>
          <section className="communitiesSection">
                  <div className="container">
                       <h4 className="sctionMdTitle text-primary mb-5 text-center">COMMUNITIES</h4>
                       <div className="row mb-5">
                             <div className="col-md-3">
                                  <div className="proSelectBox">
                                       <label>PROJECT</label>
                                       <Select options={options} className="reactSelectInput"
                                       />
                                  </div>
                             </div>
                             <div className="col-md-3">
                                  <div className="proSelectBox">
                                       <label>PROPERTY TYPE</label>
                                       <Select options={options} className="reactSelectInput"
                                       />
                                  </div>
                             </div>
                             <div className="col-md-3">
                                  <div className="proSelectBox">
                                       <label>DEVELOPER</label>
                                       <Select options={options} className="reactSelectInput"
                                       />
                                  </div>
                             </div>
                             <div className="col-md-3">
                                  <div className="proSelectBox">
                                       <label>PROJECT STATUS</label>
                                       <Select options={options} className="reactSelectInput"
                                       />
                                  </div>
                             </div>
                       </div>
                       <div className="row">
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p1.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p2.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p3.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p4.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p5.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p6.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p7.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p8.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="#" className="cardBox">
                                    <img src="/images/properties/p3.png" className="clmCardImage" />
                                    <div className="overlay">
                                        <h5 className="crdtitle">JBR</h5>
                                        <p className="crdText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet</p>
                                    </div>
                                </a>
                            </div>
                       </div>

                       <button className="bdrBtn mrAuto loadBtn mt-4">view All</button>
                  </div>
          </section>
        </>
    );
}
export default Communities;
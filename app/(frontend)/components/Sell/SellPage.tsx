"use client";
import React, { useState, useEffect } from "react";
import "@/public/css/sell-with-range.css";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import { useForm, Controller } from "react-hook-form";
import SellModel from "../models/SellModel";
import { useGetSingleManagementData } from "@/src/services/ManagementService";
import { useGetSellerGuideData } from "@/src/services/DubaiGuideService" 

function SellPage() {
  const { sellerGuideData } = useGetSellerGuideData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const currentPageURL = getCurrentUrl();

  const onSubmit = (data) => {
    saveContactFormApi(data)
      .then((res) => {
        toast.success(
          "Thank you. Our team will get back to you soon."
        );
        reset();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };

  const contactSideText =
    " An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  const pageUrl = "Sell";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    formName: "contactForm",
    page: "contact",
  });
  // const handleSubmit = () => {
  //   if (!formData.name || !formData.email || !formData.phone) {
  //     return toast.error("Please fill required field");
  //   }
  //   saveContactFormApi(formData)
  //     .then((res) => {
  //       toast.success(
  //         "Enquire form submitted successfully, out support teams contact you soon"
  //       );
  //       setFormData({
  //         name: "",
  //         email: "",
  //         message: "",
  //         phone: "",
  //         formName: "contactForm",
  //         page: "contact",
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error("Something went wrong, please try again");
  //     });
  // };
  return (
    <>
      <header className="sellWithRange">
        <img
          src="/images/banner/banner-4.webp"
          className="headerImgVideo"
          alt="sell your property"
        />
        <div className="headConentBox">
          <h2 className="headTitle mb-3">SELL WITH RANGE</h2>
          <p className="pText">
            We offer comprehensive property selling services. Our expert team
            assists clients in navigating the complex real estate market,
            leveraging our extensive knowledge and network to facilitate swift
            and profitable property sales. From initial consultation to
            marketing strategies, negotiations, and finalizing deals, we provide
            personalized guidance every step of the way.
          </p>
          <a
            className="fillBtn"
            href="#sellContact"
          >
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
              <img
                src="/images/icons/property.png"
                className="iconImg"
                alt="PROPERTY VALUATION"
              />
              <h5 className="colmBoxText">PROPERTY VALUATION </h5>
            </div>
            <div className="colmBox">
              <img
                src="/images/icons/icon-4.png"
                className="arrrowIconImg"
                alt="arrrowIconImg"
              />
              <img
                src="/images/icons/icon-6.png"
                className="iconImg"
                alt="MARKETING"
              />
              <h5 className="colmBoxText">MARKETING </h5>
            </div>
            <div className="colmBox">
              <img
                src="/images/icons/icon-4.png"
                className="arrrowIconImg"
                alt="arrrowIconImg"
              />
              <img
                src="/images/icons/icon-9.png"
                className="iconImg"
                alt="VIEWING"
              />
              <h5 className="colmBoxText">VIEWING </h5>
            </div>
            <div className="colmBox">
              <img
                src="/images/icons/icon-4.png"
                className="arrrowIconImg"
                alt="arrrowIconImg"
              />
              <img
                src="/images/icons/icon-8.png"
                className="iconImg"
                alt="NEGOTIATIONS"
              />
              <h5 className="colmBoxText">NEGOTIATIONS</h5>
            </div>
            <div className="colmBox">
              <img
                src="/images/icons/icon-4.png"
                className="arrrowIconImg"
                alt="arrrowIconImg"
              />
              <img
                src="/images/icons/icon-7.png"
                className="iconImg"
                alt="PROPERTY TRACKER"
              />
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
              We have unparalleled expertise in the Dubai real estate market.
              Our dedicated team delivers personalized and comprehensive
              services tailored to each client's needs, ensuring a seamless and
              successful property selling experience. We combine in-depth market
              knowledge with a strategic approach to maximize value and achieve
              optimal results for our clients. With Range, you gain access to a
              network of resources and professionals dedicated to making your
              property sale in Dubai a rewarding and hassle-free endeavor.
            </p>
            <div className="video">
              {/* <iframe
                src="https://player.vimeo.com/video/392311980?h=2f90973f9d"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe> */}

              <iframe width="100%" height="500" 
            src="https://www.youtube-nocookie.com/embed/-6jlrq7idl8" 
            title="YouTube video player" 
            frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen></iframe>
            </div>
            {/* <div className="videoBox">
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
                              </div> */}
          </div>
        </div>
      </section>
      <section className="guideSellSection">
        <div className="container">
          <div className="rowSec">
            <div className="colmBox">
              <img
                src="/images/banner/banner-5.webp"
                className="colmBoxImg"
                alt="sell your properties"
              />
              <div className="colmBoxContent">
                <h2>
                  GUIDE TO SELL <br />
                  YOUR PROPERTY
                </h2>
                
                <a
                  className="fillBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#downloadNow">
                  DOWNLOAD NOW
                </a>
              </div>
            </div>
            <div className="colmBox formBox" id="sellContact">
              <h3 className="title">Contact our Agents now</h3>
              <div className="row ">
              <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" value="sellContactForm" {...register("formName", { required: false })}/>
                  <input type="hidden" value={currentPageURL} {...register("page", { required: false })}/>
                <div className="col-12 mb-2">
                  <input
                    className="form-control cntInptField"
                    placeholder="Name"
                    type="text"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <small className="text-danger">Name is required.</small>}
                </div>
                <div className="col-12 mb-2">
                  <input
                    className="form-control cntInptField"
                    placeholder="Email Address"
                    type="email"
                  
                  {...register("email", { required: true })}
                  />
                  {errors.email && <small className="text-danger">Email is required.</small>}
                </div>
                <div className="col-12 mb-2">
                  <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      className="form-control cntInptField d-flex"
                      defaultCountry="AE"
                      placeholder="Enter Phone Number"
                      value={value}
                      onChange={onChange}
                      style={{ border: "0px" }}
                    />
                  )}
                />

                {errors.phone && <small className="text-danger">Phone is required.</small>}

                </div>
                <div className="col-12">
                  <textarea
                    className="form-control cntInptField textareaField"
                    placeholder="Message"
                    {...register("message", { required: false })}
                    
                  ></textarea>
                </div>
                <input
                  className="fillBtn submitBtn"
                  type="submit"
                  value="Submit"
                  id="sellSubmit"
                />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        sellerGuideData && 
        <SellModel sellerLink={sellerGuideData?.sellerGuide} fileName="Seller Guide.pdf"></SellModel>
      }
      
    </>
  );
}
export default SellPage;

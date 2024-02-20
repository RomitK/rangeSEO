"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import ContactModel from "../components/models/contactModel";
import ServiceModel from '@/app/(frontend)/components/models/ServiceModel';

import "@/public/css/services-styles.css";
function Services() {
  const router = useRouter();
  const contactSideText =" An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  const pageUrl ="Services"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    formName: "enquireForm",
    page: "services",
  });
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error("Please fill required field");
    }
    saveContactFormApi(formData)
      .then((res) => {
        toast.success(
          "Enquire form submitted successfully, out support teams contact you soon"
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
          formName: "enquireForm",
          page: "services",
        });
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };
  const goldenHandler = () => {
    router.push("/goldenVisa");
  };
  return (
    <>
      {/*<header className="serviceHeader">
        <img src="/images/banner/service-banner.webp" className="headerImg" />
         <div className="p-relative">
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
          <div className="videoOverlay"></div>
        </div> 
      </header>*/}
      <section className="servicePageSec">
        <div className="container">
          <h4 className="sctionMdTitle text-primary text-center mb-4">
            SERVICES
          </h4>
          <p className="fs-14 text-secondary mb-4">
            Explore a comprehensive range of specialized services. We have a
            diverse range of services to cater to a wide spectrum of real estate
            needs, offering personalized solutions for each client. From
            residential sales & leasing to investment consultants, our team is
            dedicated to delivering exceptional results.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/services/service1.webp"
                  className="serviceCardImg"
                  alt="Residential Sales & Leasing"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">
                    Residential Sales & Leasing
                  </h3>
                  <p className="fs-14 text-secondary mb-4">
                    With decades of experience and helping thousands of people,
                    our team possesses an in-depth knowledge of residential
                    sales and leasing. Our dedicated team is committed to
                    assisting you in finding ideal buyers and maximizing your
                    ROI.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/services/service2.webp"
                  className="serviceCardImg"
                  alt="Commercial Sales & Leasing"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">
                    Commercial Sales & Leasing
                  </h3>
                  <p className="fs-14 text-secondary mb-4">
                    Range specializes in matching commercial properties to
                    businesses of all sizes, from startups to established
                    corporations. We prioritize your needs and goals to find the
                    ideal space for your business growth, whether it's offices
                    or retail.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/services/service3.webp"
                  className="serviceCardImg"
                  alt="Property Management"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">Property Management</h3>
                  <p className="fs-14 text-secondary mb-4">
                    We offer comprehensive property management services tailored
                    to meet your unique needs. Our experienced team is dedicated
                    to ensuring your property is well-maintained and optimized
                    for its highest potential.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/services/service4.webp"
                  className="serviceCardImg"
                  alt="Holiday Homes"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">Holiday Homes</h3>
                  <p className="fs-14 text-secondary mb-4">
                    We have a curated selection of luxurious holiday homes,
                    designed to elevate your vacation experience. With
                    extraordinary locations & amenities, our properties provide
                    the perfect backdrop for creating lasting memories with
                    loved ones.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/services/service5.webp"
                  className="serviceCardImg"
                  alt="Mortgage Services"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">Mortgage Services</h3>
                  <p className="fs-14 text-secondary mb-4">
                  My mortgage brokerage is dedicated to helping our clients achieve their dream of home ownership. Our team of experienced professionals are committed to providing exceptional customer service and personalised solutions to meet the specific needs of each of our clients.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/services/service6.webp"
                  className="serviceCardImg"
                  alt=" Investment Consultancy"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">
                    Investment Consultancy{" "}
                  </h3>
                  <p className="fs-14 text-secondary mb-4">
                    Our seasoned advisors offer in-depth market analysis and
                    customized recommendations to help you make informed
                    investment decisions. With Range, you will have access to a
                    wealth of knowledge and expertise to diversify your property
                    portfolio.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="serviceCard">
                <img
                  src="/images/guides/portfolio.jpg"
                  className="serviceCardImg"
                  alt=" Investment Consultancy"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">
                  Portfolio Management{" "}
                  </h3>
                  <p className="fs-14 text-secondary mb-4">
                  At Range, we offer comprehensive Portfolio Management Services tailored to maximize your real estate investments. Our dedicated team of experts specializes in guiding clients through each aspect of property portfolio management, ensuring optimal performance and returns. From strategic asset allocation to property acquisition, leasing, and ongoing maintenance, we provide personalized solutions to meet your specific investment goals.
                  </p>
                  <button
                    className="fillBtn  mrAuto cardBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#enquireNow"
                  >
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
      <section className="imgSection overlayBgClr">
        <div className="contentBox">
          <h2>CHECK YOUR ELIGIBILITY FOR GOLDEN VISA</h2>
          <button
            className="bdrBtn largBtn text-white border border-white"
            onClick={goldenHandler}
          >
            Check Now
          </button>
        </div>
      </section>
      <ServiceModel></ServiceModel>
    </>
  );
}
export default Services;

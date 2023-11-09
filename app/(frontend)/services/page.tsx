"use client";
import "@/public/css/services-styles.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";

function Services() {
  const router = useRouter();
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
      <header>
        <img src="/images/banner/homeBg.webp" className="headerImg" />
        {/* <div className="p-relative">
                        <video className="d-block w-100 videoMain" 
                                autoPlay loop  preload="metadata"
                                poster="images/banner/homeBg.webp"
                               >
                                <source src="/videos/homeVideo.mp4" type="video/mp4" />
                                <source src="/videos/homeVideo.mp4" type="video/mov" />
                                Sorry, your browser doesn't support videos.
                        </video>
                        <div className="videoOverlay"></div>
                        </div> */}
      </header>
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
                  src="/images/banner/homeBg.webp"
                  className="serviceCardImg"
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
                  src="/images/banner/homeBg.webp"
                  className="serviceCardImg"
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
                  src="/images/banner/homeBg.webp"
                  className="serviceCardImg"
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
                  src="/images/banner/homeBg.webp"
                  className="serviceCardImg"
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
                  src="/images/banner/homeBg.webp"
                  className="serviceCardImg"
                />
                <div className="serCardContent ">
                  <h3 className="cardTitle text-center">Mortgage Services</h3>
                  <p className="fs-14 text-secondary mb-4">
                    Our team of mortgage advisors works closely with clients
                    across the UAE and globally, for effective mortgage
                    management. Our specialized home finance team provides
                    comprehensive solutions for property purchases in Dubai and
                    other Emirates.
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
                  src="/images/banner/homeBg.webp"
                  className="serviceCardImg"
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
      <div id="enquireNow" className="modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="container-fluid1">
                <div className="row justify-content-center align-items-center d-flex">
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="logo-text">
                      <div className="logo mt-3 mb-3">
                        <div className="logo-img">
                          <img
                            src="/images/logo_blue.png"
                            alt="Range Property"
                            className="img-fluid"
                            width="200"
                          />
                        </div>
                      </div>

                      <div className="assist-text  text-left mt-3 mb-5">
                        <h5>
                          <strong className="need">
                            An esteemed award-winning real estate brokerage
                            based in Dubai, UAE.
                          </strong>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="form-div mt-3">
                      <form id="contact_form" method="POST">
                        <div className="mb-3">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            id="phone"
                            placeholder="Phone"
                          />
                        </div>
                        <div className="mb-3">
                          <textarea
                            name="message"
                            placeholder="Message"
                            id="message_input"
                            cols={30}
                            rows={5}
                            required
                          ></textarea>
                        </div>

                        <div className="mb-3 mt-3">
                          <button
                            type="submit"
                            name="submit"
                            className="btn btn-blue"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Services;

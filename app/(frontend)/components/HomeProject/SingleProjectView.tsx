"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwiperCore, { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import parse from "html-react-parser";
// import GoogleMapReact from "google-map-react";
import { useMemo } from "react";
import { useGetSingleProjectData } from "@/src/services/ProjectService";

import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";

import "@/public/css/single-project-view-styles.css";
import "@/public/css/responsive.css";

function SingleProjectView({ params }) {
  const slug = params.slug[0];
  const { projectData } = useGetSingleProjectData(slug);
  const bannerSwiperRef = useRef<SwiperCore>();
  const innerSwiperRef = useRef<SwiperCore>();
  const otherProjectSwiperRef = useRef<SwiperCore>();
  const hightlightSwiperRef = useRef<SwiperCore>();
  const rentSwiperRef = useRef<SwiperCore>();
  const saleSwiperRef = useRef<SwiperCore>();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    formName: "enquireForm",
    page: "services",
  });
  const contactCloseRef = useRef(null);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error("Please fill required field");
    }
    saveContactFormApi(formData)
      .then((res) => {
        toast.success(
          "Enquire form submitted successfully, out support teams contact you soon"
        );
        contactCloseRef.current.click();
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

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <header>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            bannerSwiperRef.current = swiper;
          }}
          className="swiper"
        >
          {projectData?.exteriorGallery?.map((exteriorGallery, index) => {
            return (
              <SwiperSlide
                className="swiperSilderItem"
                key={exteriorGallery.id + +"exteriorGallery" + index}
              >
                <img src={exteriorGallery.path} className="sliderCoverImg" />
                <div className=" sliderContainer">
                  <div className="sliderContentArea">
                    <div className="sliderContent">
                      <h5>{projectData?.sub_title_1}</h5>
                      <h1>{projectData?.sub_title_2}</h1>
                      <p className="mb-5">
                        {projectData &&
                          projectData.shortDescription &&
                          parse(projectData?.shortDescription ?? "")}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="sliderArrowBar">
            <div
              className="swiper-button-next text-white"
              onClick={() => bannerSwiperRef.current?.slideNext()}
            >
              <span className="">
                <i className="bi bi-chevron-right fs-1"></i>
              </span>
            </div>
            <div
              className="swiper-button-prev text-white"
              onClick={() => bannerSwiperRef.current?.slidePrev()}
            >
              <span className="">
                <i className="bi bi-chevron-left fs-1"></i>
              </span>
            </div>
          </div>
        </Swiper>
      </header>
      <section className="mb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Starting Price</p>
                <h3>AED {projectData?.price}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Available Units</p>
                <h3>{projectData?.availableUnits} </h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Area from</p>
                <h3>{projectData?.area} </h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="vtTextBXox">
                <p>Handover</p>
                <h3>{projectData?.handOver}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
          <div className="tabsListConatiner ">
              <div className="container">
                    <div className="row">
                        <div className="col-3 selectTitle">
                          <a
                            className="tabTitle active"
                            href="#Hightlights"
                            aria-selected="true"
                          >
                            Hightlights
                          </a>
                        </div>
                        <div className="col-3 selectTitle ">
                          <a
                            className="tabTitle"
                            href="#ProjectDetails"
                            aria-selected="true"
                          >
                            Project Details
                          </a>
                        </div>
                        <div className="col-3 selectTitle">
                          <a
                            className="tabTitle "
                            href="#NearBy"
                            aria-selected="true"
                          >
                            Nearby
                          </a>
                        </div>
                        <div className="col-3 selectTitle">
                          <a
                            className="tabTitle"
                            href="#AvailableProperties"
                            aria-selected="true"
                          >
                            Available Properties
                          </a>
                        </div>
                    </div>
              </div>
          </div>
      </section>
      <section id="Hightlights">
               <div className="container ">
                <div className="row align-items-center ">
                  <div className="col-md-8">
                    <div className="secTabCntent" id="hightlight">
                      <h4 className="sctionMdTitle text-primary">
                        Hightlights
                      </h4>
                      <div className="text-secondary mb-4">
                        {parse(projectData?.hightlightDescription ?? "")}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Swiper
                      pagination={true}
                      modules={[Pagination]}
                      onSwiper={(swiper) => {
                        innerSwiperRef.current = swiper;
                      }}
                      className="mySwiper singleSlider clmSlider"
                    >
                      {projectData?.interiorGallery?.map(
                        (interiorGallery, index) => {
                          return (
                            <SwiperSlide
                              key={interiorGallery.id + +"interiorGallery"}
                            >
                              <img
                                src={interiorGallery.path}
                                className="clmCoverImg"
                              />
                            </SwiperSlide>
                          );
                        }
                      )}

                      {/* <div className="carouselArrowBar">
                        <div
                          className="swiper-button-next text-white"
                          onClick={() => innerSwiperRef.current?.slideNext()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-right fs-1"></i>
                          </span>
                        </div>
                        <div
                          className="swiper-button-prev text-white"
                          onClick={() => innerSwiperRef.current?.slidePrev()}
                        >
                          <span className="">
                            <i className="bi bi-chevron-left fs-1"></i>
                          </span>
                        </div>
                      </div> */}
                    </Swiper>
                  </div>
                </div>
              </div>
      </section>
      <section id="ProjectDetails">
        <div className="container ">
          <h4 className="sctionMdTitle text-primary my-4">Project Details</h4>
          {parse(projectData?.longDescription ?? "")}
        </div>
      </section>
      <section className="tableSection " >
        <div className="container">
          <h4 className="sctionMdTitle text-primary my-4">Property Type</h4>

          <div className="tableContainer">
            <table className="priceTable">
              <thead>
                <tr>
                  <th>
                    <h5 className="tblThText">Unit No.</h5>
                  </th>
                  <th>
                    <h5 className="tblThText">Type</h5>
                  </th>
                  <th>
                    <h5 className="tblThText">Size</h5>
                  </th>
                  <th>
                    <h5 className="tblThText text-center">Bedroom</h5>
                  </th>
                  <th>
                    <h5 className="tblThText text-center">Starting Price</h5>
                  </th>
                  <th>
                    <h5 className="tblThText text-center">Payment Plan</h5>
                  </th>
                  <th>
                    <h5 className="tblThText text-center">Floor Plan</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectData?.types?.map((type, index) => {
                  return (
                    <tr key={type.id}>
                      <td>
                        <p className="tblTdText text-secondary">{type.name}</p>
                      </td>
                      <td>
                        <p className="tblTdText text-secondary">
                          {type?.accommodation}
                        </p>
                      </td>
                      <td>
                        <p className="tblTdText text-secondary">
                          {type?.area} {type?.areaUnit}
                        </p>
                      </td>
                      <td>
                        <p className="tblTdText text-secondary text-center">
                          {type?.bedrooms}
                        </p>
                      </td>
                      <td>
                        <p className="tblTdText text-secondary text-center">
                          AED{" "}
                          {type &&
                            new Intl.NumberFormat().format(
                              type?.startingPrice
                            )}{" "}
                        </p>
                      </td>
                      <td>
                        <button
                          className="fillBtn tblBtn mrAuto"
                          data-bs-toggle="modal"
                          data-bs-target={"#pricePlanModal" + type.id}
                        >
                          view
                        </button>
                      </td>
                      <td>
                        <button
                          className="fillBtn tblBtn mrAuto"
                          data-bs-toggle="modal"
                          data-bs-target={"#floorPlanModal" + type.id}
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {projectData?.developer &&
        Object.keys(projectData.developer).length > 0 && (
          <section className="AboutDeveloper my-5 ">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="secContent">
                    <h4 className="sctionMdTitle text-primary mb-4">
                      About the Developer
                    </h4>
                    <p className="fs-14 text-secondary mb-4">
                      {projectData &&
                        parse(projectData?.developer?.description ?? "")}
                    </p>
                    <Link
                      href={`/developers/${projectData?.developer?.slug}`}
                      className="text-decoration-none bdrBtn"
                    >
                      View More
                    </Link>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="colmImgBox">
                    <img
                      src={projectData.developer.logo}
                      className="clmContainImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      <section className="my-5   " id="NearBy">
        <div className="container">
          <div className="row">
            <div className="secTabCntent">
              <h4 className="sctionMdTitle text-primary">NEARBY</h4>
              <h6 className="sctionSubTitle text-primary"> PROJECTS</h6>
            </div>
            <div className="row g-0">
              <Swiper
                loop
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                modules={[Navigation, Pagination]}
                onSwiper={(swiper) => {
                  otherProjectSwiperRef.current = swiper;
                }}
                className="swiper pb-5 communitySwiper"
              >
                {projectData?.nearbyProjects?.map((project, index) => {
                  return (
                    <SwiperSlide
                      className="col-12 col-lg-3 col-md-3"
                      key={project.id + index}
                    >
                      <div className="projectImgCont">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="fw-bold mb-1 text-decoration-none text-white"
                        >
                          <img
                            src={project.mainImage}
                            alt={project.title}
                            className="img-fluid"
                          />
                          <div className="projectImgOverlay">
                            <div>
                              <span className="badge projectType">
                                {project.accommodation}
                              </span>
                            </div>
                            <div className="text-white">
                              <p className="fw-bold mb-1">{project.title}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div
                  className="swiper-button-next text-primary"
                  onClick={() => otherProjectSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => otherProjectSwiperRef.current?.slidePrev()}
                >
                  <span className="">
                    <i className="bi bi-chevron-left fs-1"></i>
                  </span>
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="my-5  border-top border-dark" id="AvailableProperties">
        <div className="container">
          <div className="row">
            <div className="secTabCntent">
              <h4 className="sctionMdTitle text-primary">
                AVAILABLE PROPERTIES
              </h4>
              <h6 className="sctionSubTitle text-primary">FOR RENT</h6>
            </div>
            <div className="row g-0">
              <Swiper
                loop
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                modules={[Navigation, Pagination]}
                onSwiper={(swiper) => {
                  rentSwiperRef.current = swiper;
                }}
                className="swiper pb-5 communitySwiper"
              >
                {projectData?.nearbyProjects?.map((project, index) => {
                  return (
                    <SwiperSlide
                      className="col-12 col-lg-3 col-md-3"
                      key={project.id + index}
                    >
                      <div className="projectImgCont">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="fw-bold mb-1 text-decoration-none text-white"
                        >
                          <img
                            src={project.mainImage}
                            alt={project.title}
                            className="img-fluid"
                          />
                          <div className="projectImgOverlay">
                            <div>
                              <span className="badge projectType">
                                {project.accommodation}
                              </span>
                            </div>
                            <div className="text-white">
                              <p className="fw-bold mb-1">{project.title}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div
                  className="swiper-button-next text-primary"
                  onClick={() => rentSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => rentSwiperRef.current?.slidePrev()}
                >
                  <span className="">
                    <i className="bi bi-chevron-left fs-1"></i>
                  </span>
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>

            <div className="secTabCntent">
              <h6 className="sctionSubTitle text-primary">FOR SALE</h6>
            </div>
            <div className="row g-0">
              <Swiper
                loop
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                modules={[Navigation, Pagination]}
                onSwiper={(swiper) => {
                  saleSwiperRef.current = swiper;
                }}
                className="swiper pb-5 communitySwiper"
              >
                {projectData?.nearbyProjects?.map((project, index) => {
                  return (
                    <SwiperSlide
                      className="col-12 col-lg-3 col-md-3"
                      key={project.id + index}
                    >
                      <div className="projectImgCont">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="fw-bold mb-1 text-decoration-none text-white"
                        >
                          <img
                            src={project.mainImage}
                            alt={project.title}
                            className="img-fluid"
                          />
                          <div className="projectImgOverlay">
                            <div>
                              <span className="badge projectType">
                                {project.accommodation}
                              </span>
                            </div>
                            <div className="text-white">
                              <p className="fw-bold mb-1">{project.title}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div
                  className="swiper-button-next text-primary"
                  onClick={() => saleSwiperRef.current?.slideNext()}
                >
                  <span className="">
                    <i className="bi bi-chevron-right fs-1"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-prev text-primary"
                  onClick={() => saleSwiperRef.current?.slidePrev()}
                >
                  <span className="">
                    <i className="bi bi-chevron-left fs-1"></i>
                  </span>
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {projectData?.types?.map((type, index) => {
        return (

          <div className="modal-dialog  modal-dialog-centered modal-lg modalBookMeet "  id={"pricePlanModal" + type.id}
          key={index + "pricePlanModal"}>
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
            </div>
        </div>
          
        );
      })}

      {projectData?.types?.map((type, index) => {
        return (
         

<div
className="modal fade"
id={"floorPlanModal" + type.id}
key={index + "floorPlanModal"}
tabIndex={-1}
aria-labelledby="exampleModalLabel"
aria-hidden="true"
ref={contactCloseRef}
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

    <div className="modal-body  p-0 rounded-1 m-2">
      <div className="row g-0">
        <div className="col-12 col-lg-5 col-md-12 border-end descricalenderCol">
          <div className="border-bottom">
            <div className="p-3">
              <img
                src="/images/logo_blue.png"
                alt="Range Property"
                className="img-fluid"
                width="150"
              />
            </div>
          </div>
          <div className="p-3">
            <div className="assist-text  text-left mt-3 mb-5">
              <h5>
                <strong className="need">An esteemed award-winning real estate brokerage based in Dubai, UAE</strong>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-7 col-md-12 ">
          <div className=" p-4">
            <form action="" method="POST">
              <div className="">
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="text-primary">Enter Details</h6>
                    <div className="form-group">
                      <label>
                        Name<small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        name="nameCon2"
                        id="nameCon2"
                        className="form-control mb-2"
                        placeholder="Enter your name"
                        autoComplete="off"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Email<small className="text-danger">*</small>
                      </label>
                      <input
                        type="email"
                        name="emailCon2"
                        id="emailCon2"
                        className="form-control mb-2"
                        placeholder="Enter your email"
                        autoComplete="off"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Phone Number{" "}
                        <small className="text-danger">*</small>
                      </label>
                      <input
                        id="fullNumber3"
                        type="hidden"
                        name="fullNumber"
                      />
                      <input
                        type="tel"
                        className="form-control mb-2"
                        id="telephoneNew3"
                        name="phone"
                        placeholder="Enter your Phone Number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <input
                        type="text"
                        name="messageCon2"
                        id="messageCon2"
                        className="form-control mb-2"
                        placeholder="Message"
                        autoComplete={"off"}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
        );
      })}

      <div className="modal fade" id="floorPlaneModal">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Payment Plan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="floorFormBox">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingNumber"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="floatingNumber">Phone Number</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea
                    className="form-control textArea"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label htmlFor="floatingTextarea">Comments</label>
                </div>
                <input
                  type="submit"
                  className="fillBtn tblBtn mrAuto submitBtn"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SingleProjectView;

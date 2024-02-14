"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import Select from "react-select";
import parse from "html-react-parser";
import { useGetAllDeveloperData } from "@/src/services/DeveloperService";
import { useGetCommunityOption } from "@/src/services/CommunityService";
import { useGetDeveloperAccommodationOptions } from "@/src/services/AccommodationService";
import {
  useGetProjectOfferTypes,
  useGetProjectOptions,
} from "@/src/services/ProjectService";
import axios from "axios";
import Loader from "../UI/Loader";
type OptionType = {
  value: string;
  label: string;
};
function DeveloperList({ params }) {
  const [form, setForm] = useState({
    project_id: { label: "All", value: "" },
    completion_status_id: { label: "All", value: "" },
    community_id: { label: "All", value: "" },
    accommodation_id: { label: "All", value: "" },
  });
  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { developersData } = useGetAllDeveloperData("", form);
  const [links, setLinks] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [visibleDevelopers, setVisibleDevelopers] = useState([]);
  const { communityOption } = useGetCommunityOption();
  const { accommodationOptions } = useGetDeveloperAccommodationOptions();
  const { projectOfferTypeOption } = useGetProjectOfferTypes();
  const [totalDevelopers, setTotalDevelopers] = useState(0);
  const { projectOption } = useGetProjectOptions();
  const onNextPage = () => {
    let url = links?.next;
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].value) {
          url += `${key}=${form[key].value}&`;
        }
      }
    }
    axios
      .get(url)
      .then((res) => {
        setDevelopers([...developers, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setDevelopers(developersData?.data);

    setTotalDevelopers(developersData?.meta?.total);
    setLinks(developersData?.links);
  }, [developersData]);

  const handleReset = () => {
    setForm({
      ...form,
      project_id: { label: "All", value: "" },
      completion_status_id: { label: "All", value: "" },
      community_id: { label: "All", value: "" },
      accommodation_id: { label: "All", value: "" },
    });
  };
  const communityOptions: OptionType[] = communityOption;
  const accommodationOptionss: OptionType[] = accommodationOptions;
  const projectOfferTypeOptions: OptionType[] = projectOfferTypeOption;
  const projectOptions: OptionType[] = projectOption;
  const closeRef = useRef(null);
  function isEmptyObject() {
    const o = { ...form };
    return Object.keys(o).every(function (x) {
      if (Array.isArray(o[x])) {
        return o[x].length > 0 ? false : true;
      } else {
        return o[x].value === "" || o[x].value === null;
      }
    });
  }
  return (
    <>
    {isMobileDev && 
    (
      <div className={`${isMobileDev ? "" : "container-fluid px-0"}`}>
        <div className={` ${isMobileDev ? "" : "row g-0 "}`}>
          <div className={`${isMobileDev ? "" : "col-12 col-lg-12 col-md-12"}`}>
            <div className={`${isMobileDev ? "" : "p-3 shadow-sm"}`}>
              <nav className="navbar bg-white mobItemLink ">
                <div className="container justify-content-start">
                  <div className="col-4">
                    <img
                      src="/images/icons/menu.png"
                      alt="Range Internation Property Investments"
                      className="img-fluid navMobMen cursor-pointer"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight2"
                      width="25"
                    />
                    <div
                      className="offcanvas offcanvas-start"
                      tabIndex={-1}
                      id="offcanvasRight2"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div className="offcanvas-header">
                        <div className="">
                          <Link
                            href={{ pathname: "/" }}
                            className="navbar-brand"
                          >
                            <img
                              src="/images/logo.png"
                              alt="Range Internation Property Investments"
                              className="img-fluid navMobLogo"
                              width="175"
                            />
                          </Link>
                        </div>
                        <div className="my-auto">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            ref={closeRef}
                          ></button>
                        </div>
                      </div>
                      <div className="offcanvas-body">
                        <ul className="list-unstyled dropList">
                          <li className="nav-item py-3 border-bottom mobItemLink">
                            <Link
                              className="nav-link"
                              href="/properties"
                              onClick={() => closeRef.current.click()}
                            >
                              Properties
                            </Link>
                          </li>
                          <li className="nav-item py-3 border-bottom mobItemLink">
                            <Link
                              className="nav-link"
                              href="/projects"
                              onClick={() => closeRef.current.click()}
                            >
                              Projects
                            </Link>
                          </li>
                          <li className="nav-item py-3 border-bottom mobItemLink">
                            <Link
                              className="nav-link"
                              href="/communities"
                              onClick={() => closeRef.current.click()}
                            >
                              Communities
                            </Link>
                          </li>

                          <li className="nav-item py-3 border-bottom mobItemLink">
                            <Link
                              className="nav-link"
                              href="/developers"
                              onClick={() => closeRef.current.click()}
                            >
                              Developers
                            </Link>
                          </li>
                          <li className="nav-item py-3 border-bottom mobItemLink">
                            <Link
                              className="nav-link"
                              href="/teams"
                              onClick={() => closeRef.current.click()}
                            >
                              Meet the Team
                            </Link>
                          </li>

                          <li className="nav-item py-3 border-bottom mobItemLink">
                            <Link
                              className="nav-link"
                              href="/about"
                              onClick={() => closeRef.current.click()}
                            >
                              About Range
                            </Link>
                          </li>

                          <li className="nav-item py-3 border-bottom">
                            <Link
                              className="nav-link"
                              href="/goldenVisa"
                              onClick={() => closeRef.current.click()}
                            >
                              Golden Visa
                            </Link>
                          </li>

                          <li className="nav-item py-3 border-bottom">
                            <Link
                              className="nav-link"
                              href="/careers"
                              onClick={() => closeRef.current.click()}
                            >
                              Career
                            </Link>
                          </li>
                          <li className="nav-item py-3 border-bottom">
                            <Link
                              className="nav-link"
                              href="/medias"
                              onClick={() => closeRef.current.click()}
                            >
                              Media
                            </Link>
                          </li>
                          {/* <li className="nav-item py-3 border-bottom" >
                          <Link className="nav-link" href="/blogs" onClick={() => closeRef.current.click()}>
                            Blogs and News
                          </Link>
                        </li> */}
                          <li className="nav-item py-3 border-bottom">
                            <Link
                              className="nav-link"
                              href="/dubaiGuide"
                              onClick={() => closeRef.current.click()}
                            >
                              Dubai Guide
                            </Link>
                          </li>
                          {/* <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Investment Guide
                          </a>
                        </li> */}
                          <li className="nav-item py-3 border-bottom">
                            <Link
                              className="nav-link"
                              href="/faqs"
                              onClick={() => closeRef.current.click()}
                            >
                              FAQ's
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <Link href={{ pathname: "/" }} className="navbar-brand">
                      <img
                        src="/images/logo.png"
                        alt="Range Internation Property Investments"
                        className="img-fluid navMobLogo"
                        width="175"
                      />
                    </Link>
                  </div>
                  <div className="col-4">
                    <img
                      src="/images/icons/filter.png"
                      alt="Range Internation Property Investments"
                      className="img-fluid navMobMen cursor-pointer float-end"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight1"
                      width="25"
                    />
                    <div
                      className="offcanvas offcanvas-end"
                      tabIndex={-1}
                      id="offcanvasRight1"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div className="offcanvas-header border-bottom ">
                        <div className="">Filters</div>
                        <div className="my-auto">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                      <div className="offcanvas-body ">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label>PROPERTY TYPE</label>
                            <Select
                              options={accommodationOptionss}
                              value={form.accommodation_id}
                              className="reactSelectInput"
                              onChange={(e) =>
                                setForm({ ...form, accommodation_id: e })
                              }
                            />
                          </div>
                          <div className="col-md-4">
                            <label>COMMUNITIES</label>
                            <Select
                              options={communityOptions}
                              value={form.community_id}
                              className="reactSelectInput"
                              onChange={(e) =>
                                setForm({ ...form, community_id: e })
                              }
                            />
                          </div>
                          <div className="col-md-4">
                            <label>PROJECT STATUS</label>
                            <Select
                              options={projectOfferTypeOptions}
                              value={form.completion_status_id}
                              className="reactSelectInput"
                              onChange={(e) =>
                                setForm({ ...form, completion_status_id: e })
                              }
                            />
                          </div>

                          {!isEmptyObject() && (
                          <div className="col-lg-3">
                            <button
                              className="btn btn-sm btn-secondary w-100 "
                              type="button"
                              onClick={handleReset}
                            >
                              Reset
                            </button>
                          </div>
                        )}

                        <div className="col-lg-3">
                          <button
                            className="btn  btn-primary w-100"
                            type="button"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            ref={closeRef}
                          >
                            Show {totalDevelopers} results
                          </button>
                        </div>

                        </div>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )}
      
      <section className={`developersSection  ${isMobileDev ? "py-2" : ""}`}>
        <div className="container">
          <h4
            className={`sctionMdTitle text-primary text-center  ${
              isMobileDev ? "" : "mb-5"
            }`}
          >
            DEVELOPERS
          </h4>

{ !isMobileDev && (<div className={`row  ${isMobileDev ? "" : "mb-5"}`}>
            <div className="col-md-4">
              <div className="proSelectBox">
                <label>PROPERTY TYPE</label>
                <Select
                  options={accommodationOptionss}
                  value={form.accommodation_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, accommodation_id: e })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="proSelectBox">
                <label>COMMUNITIES</label>
                <Select
                  options={communityOptions}
                  value={form.community_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, community_id: e })}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="proSelectBox">
                <label>PROJECT STATUS</label>
                <Select
                  options={projectOfferTypeOptions}
                  value={form.completion_status_id}
                  className="reactSelectInput"
                  onChange={(e) =>
                    setForm({ ...form, completion_status_id: e })
                  }
                />
              </div>
            </div>
            {!isEmptyObject() && (
              <div className="col-md-12 text-center mt-3">
                <button
                  className="btn  btn-secondary"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>)}
          

          <div className="row">
            {developers?.map(function (developer, index) {
              return (
                <Link
                  href={`/developers/${developer?.slug}?accommodation=${form?.accommodation_id.label}&completionStatus=${form.completion_status_id.label}&community=${form.community_id.label}&accommodation_id=${form?.accommodation_id.value}&completion_status_id=${form.completion_status_id.value}`}
                 
                  className={`  ${isMobileDev ? "col-6" : "col-md-4"}`}
                  key={developer.id}
                >
                  <div className="partnerBox">
                    <img
                      src={developer.logo}
                      className="logoImg"
                      alt={developer.name}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {links?.next && (
            <button className="bdrBtn mrAuto loadBtn mt-4" onClick={onNextPage}>
              View More
            </button>
          )}
        </div>
      </section>
    </>
  );
}
export default DeveloperList;

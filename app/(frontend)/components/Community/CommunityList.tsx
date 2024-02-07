"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Select from "react-select";
import parse from "html-react-parser";
import { useGetAllCommunityData } from "@/src/services/CommunityService";
import { useGetDeveloperOptions } from "@/src/services/DeveloperService";
import { useGetAccommodationOptions } from "@/src/services/AccommodationService";
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
function CommunityList() {
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

  const [form, setForm] = useState({
    project_id: { label: "All", value: "" },
    completion_status_id: { label: "All", value: "" },
    developer_id: { label: "All", value: "" },
    accommodation_id: { label: "All", value: "" },
  });
  const { communitiesData, isValidating } = useGetAllCommunityData("", form);
  const { developerOption } = useGetDeveloperOptions();
  const { accommodationOptions } = useGetAccommodationOptions();
  const { projectOfferTypeOption } = useGetProjectOfferTypes();
  const { projectOption } = useGetProjectOptions();

  const [communities, setCommunities] = useState([]);
  const [visibleCommunities, setVisibleCommunities] = useState([]);
  const [links, setLinks] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const maxPage = Math.ceil(communities?.length / 3);

  const developerOptions: OptionType[] = developerOption;
  const accommodationOptionss: OptionType[] = accommodationOptions;
  const projectOfferTypeOptions: OptionType[] = projectOfferTypeOption;
  const projectOptions: OptionType[] = projectOption;
  const [inputValue, setInputValue] = useState("");
  const closeRef = useRef(null);
  const [totalCommunities, setTotalCommunities] = useState(0);
  const onNextPage = () => {
    let url = links?.next;
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].value) {
          url += `${key}=${form[key].value}&`;
        }
      }
    }
    //setIsLoader(true);
    axios
      .get(url)
      .then((res) => {
        // setIsLoader(false);
        setCommunities([...communities, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        //setIsLoader(false);
        console.log(err);
      });
  };
  const options: OptionType[] = [
    { value: "rent", label: "Rent" },
    { value: "sale", label: "Sale" },
  ];
  useEffect(() => {
    setCommunities(communitiesData?.data);
    setLinks(communitiesData?.links);
    setTotalCommunities(communitiesData?.meta?.total);
  }, [communitiesData]);

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

  const handleReset = () => {
    setForm({
      ...form,
      project_id: { label: "All", value: "" },
      completion_status_id: { label: "All", value: "" },
      developer_id: { label: "All", value: "" },
      accommodation_id: { label: "All", value: "" },
    });
  };
  return (
    <>
      {isMobileDev && (
        <div className={`${isMobileDev ? "" : "container-fluid px-0"}`}>
          <div className={` ${isMobileDev ? "" : "row g-0 "}`}>
            <div
              className={`${isMobileDev ? "" : "col-12 col-lg-12 col-md-12"}`}
            >
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
                              <label>PROJECT</label>
                              <Select
                                options={projectOptions}
                                value={form.project_id}
                                className=""
                                placeholder="Select Project"
                                onChange={(e) =>
                                  setForm({ ...form, project_id: e })
                                }
                              />
                            </div>
                            <div className="col-md-4">
                              <label>PROPERTY TYPE</label>
                              <Select
                                options={accommodationOptionss}
                                value={form.accommodation_id}
                                className=""
                                onChange={(e) =>
                                  setForm({ ...form, accommodation_id: e })
                                }
                              />
                            </div>
                            <div className="col-md-4">
                              <label>DEVELOPER</label>
                              <Select
                                options={developerOptions}
                                value={form.developer_id}
                                className=""
                                onChange={(e) =>
                                  setForm({ ...form, developer_id: e })
                                }
                              />
                            </div>

                            <div className="col-md-4">
                              <label>PROJECT STATUS</label>
                              <Select
                                options={projectOfferTypeOptions}
                                value={form.completion_status_id}
                                className=""
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
                                Show {totalCommunities} results
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

      {/* {(isLoader || isValidating) && <Loader />} */}
      <section className="communitiesSection">
        <div className="container">
          <div className={`mainHead text-primary text-center ${isMobileDev ? "mb-2" : "mb-5 "}`}>
            <h4>COMMUNITIES</h4>

            <div className={` text-center ${isMobileDev ? "mb-2" : "mb-5 "}`}>
              <div>
                <p className="mb-0">
                  We have an array of properties available in the most
                  sough-after communities of Dubai.
                </p>
              </div>
            </div>
          </div>
          {!isMobileDev && (
          <div className="row mb-5">
            <div className="col-md-3">
              <div className="proSelectBox">
                <label>PROJECT</label>
                <Select
                  options={projectOptions}
                  value={form.project_id}
                  className="reactSelectInput"
                  placeholder="Select Project"
                  onChange={(e) => setForm({ ...form, project_id: e })}
                />
              </div>
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="proSelectBox">
                <label>DEVELOPER</label>
                <Select
                  options={developerOptions}
                  value={form.developer_id}
                  className="reactSelectInput"
                  onChange={(e) => setForm({ ...form, developer_id: e })}
                />
              </div>
            </div>
            <div className="col-md-3">
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
          </div>
          )}

          <div className="row">
            {communities?.map(function (community, index) {
              return (
                <div className="col-md-4" key={community.id}>
                  <Link
                    href={`/communities/${community.slug}`}
                    className="cardBox"
                  >
                    <img
                      src={community.mainImage}
                      className="clmCardImage"
                      alt={community.name}
                    />
                    <div className="overlay">
                      <h5 className="crdtitle">{community.name}</h5>
                      {!isMobileDev && (
                      <p className="crdText">
                        {community && parse(community?.description ?? "")}
                      </p>
                      )}
                    </div>
                  </Link>
                </div>
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
export default CommunityList;

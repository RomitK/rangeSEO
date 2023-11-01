"use client";
import { useState, useEffect } from "react";
import React from "react";
import Select from "react-select";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import { useGetAllHomeData } from "@/src/services/HomeService";
function ProjectList() {
  const router = useRouter()
  const { homeData } = useGetAllHomeData();
  const [selectedProject, setSelectedProjectName] = useState();
  const options = homeData?.newProjects;
  const projectChangeHandle = (event) => {
    console.log(event.value);
    router.push('/projects/'+event.value);
  };
  return (
    <>
      <section className="my-5">
        <div className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12">
                  <div>
                    <div className="mainHead mb-5 text-center text-primary">
                      <h4>LATEST PROJECTS</h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row g-0 justify-content-center mb-4">
                    <div className="col-10 col-lg-2 col-md-3  mx-3 my-auto">
                      <div className="bg-white shadow px-3 py-2">
                        <p className="text-primary mb-1 fw-semibold">
                          NEW PROJECTS
                        </p>
                        <div>
                          <Select
                            onChange={projectChangeHandle}
                            options={options}
                            className=""
                            value={selectedProject}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-10 col-lg-2 col-md-3 mx-3 my-auto">
                      <div className="mapShowBg shadow">
                        <p
                          className="text-primary mb-1 fw-semibold"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          SHOW MAP
                        </p>
                      </div>
                    </div>
                    <div className="col-10 col-lg-2 col-md-3 mx-3 my-auto">
                      <div className="bg-white shadow  px-3 py-2">
                        <p className="text-primary mb-1 fw-semibold">
                          PRICE RANGE
                        </p>
                        <div>
                          <select
                            name=""
                            id=""
                            className="form-select form-select-sm border-0"
                          >
                            <option value="">All</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {homeData?.projects?.map((project, index) => {
                  return (
                    <div
                      className="col-12 col-lg-3 col-md-3"
                      key={project.id + index}
                    >
                      <div className="projectImgCont">
                        <Link
                          href={`projects/${project.slug}`}
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectList;

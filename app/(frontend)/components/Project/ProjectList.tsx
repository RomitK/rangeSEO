"use client";
import { useState, useEffect } from "react";
import React from "react";
import Select from "react-select";
import { useGetAllProjects } from "@/src/services/HomeService";
function ProjectList() {
  const { projects } = useGetAllProjects();
  const [newProjects, setNewProjects] = useState([]);
  const [selectedProject, setSelectedProjectName] = useState();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    fetch("https://rangenew.websitedemo.world/api/getNewProjects", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewProjects(data.data);
      });
  }, []);

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
                            options={options}
                            className=""
                            value={selectedProject}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-10 col-lg-2 col-md-3 mx-3 my-auto">
                      <div className="mapShowBg shadow">
                        <p className="text-primary mb-1 fw-semibold">
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
                {projects?.map((project, index) => {
                  return (
                    <div
                      className="col-12 col-lg-3 col-md-3"
                      key={project.id + index}
                    >
                      <div className="projectImgCont">
                        <img
                          src={project["mainImage"]}
                          alt={project.title}
                          className="img-fluid"
                        />
                        <div className="projectImgOverlay">
                          <div>
                            <span className="badge projectType">
                              {project["accommodations"] &&
                                project["accommodations"][0]["name"]}
                            </span>
                          </div>
                          <div className="text-white">
                            <p className="fw-bold mb-1">{project["title"]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ProjectList;

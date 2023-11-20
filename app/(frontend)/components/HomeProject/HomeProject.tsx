"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import Select from "react-select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useGetAllHomeData } from "@/src/services/HomeService";
import Project from "./Project";
import {
    GoogleMap,
    InfoWindow,
    MarkerF,
    useLoadScript,
    OverlayView,
} from "@react-google-maps/api";

function HomeProjectList() {
  const router = useRouter();
  const { homeData } = useGetAllHomeData();
  const options = homeData?.newProjects;
  const projectChangeHandle = (event) => {
    router.push("/projects/" + event.value);
  };
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    });
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState({
        id: null,
        address: "",
        title: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        starting_price: "",
        mainImage: "",
        slug: "",
      });

    const markers = JSON.parse(homeData?.mapProjects);
    const [minMaxPrice, setMinMaxPrice] = useState({
            minPrice: 0,
            maxPrice: 0,
        });

    const minPriceRef = useRef(null);
    const maxPriceRef = useRef(null);

    const handleApplyPrice = () => {
        setMinMaxPrice({
            minPrice: minPriceRef.current.value,
            maxPrice: maxPriceRef.current.value,
        });
        const minPrice = minPriceRef.current.value
            ? minPriceRef.current.value
            : 0;
        const maxPrice = maxPriceRef.current.value
            ? maxPriceRef.current.value
            : 0;

        router.push(`rent?minprice=${minPrice}&maxprice=${maxPrice}`);
    };
    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

  
    const handleMarkerClick = (
        id,
        lat,
        lng,
        address,
        title,
        area,
        bedrooms,
        bathrooms,
        starting_price,
        mainImage,
        slug
      ) => {
        setInfoWindowData({
          id,
          address,
          title,
          area,
          bedrooms,
          bathrooms,
          starting_price,
          mainImage,
          slug,
        });
        setIsOpen(true);
      };
    const [selectedProject, setSelectedProject] = useState({
        id: "",
        label: "",
        value: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalOpen(false);
    };

  return (
    <>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2></h2>
                <div className="">
                    {!isLoaded ? (
                        <h1>Loading...</h1>
                    ) : (
                        <GoogleMap
                            mapContainerClassName="map-container"
                            onLoad={onMapLoad}
                            onClick={() => setIsOpen(false)}
                        >
                            {markers.map(
                                (
                                    {
                                        id,
                                        lat,
                                        lng,
                                        address,
                                        title,
                                        area,
                                        bedrooms,
                                        bathrooms,
                                        starting_price,
                                        mainImage,
                                        slug
                                    },
                                    ind
                                ) => (
                                    <MarkerF
                                        key={ind}
                                        position={{ lat, lng }}
                                        onClick={() => {
                                            handleMarkerClick(
                                                id,
                                                lat,
                                                lng,
                                                address,
                                                title,
                                                area,
                                                bedrooms,
                                                bathrooms,
                                                starting_price,
                                                mainImage,
                                                slug
                                            );
                                        }}
                                    >
                                        <OverlayView
                                            position={{ lat, lng }}
                                            mapPaneName={
                                                OverlayView.OVERLAY_MOUSE_TARGET
                                            }
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: "white",
                                                    padding: "5px",
                                                    border: "1px solid #ccc",
                                                    boxShadow:
                                                        "0 2px 6px rgba(0, 0, 0, 0.3)",
                                                    borderRadius: "4px",
                                                    minWidth: "50px", // Set a minimum width
                                                    whiteSpace: "nowrap", // Rounded corners
                                                }}
                                            >
                                                {starting_price}
                                            </div>
                                        </OverlayView>
                                        {isOpen &&
                                            infoWindowData?.id === ind && (
                                                <InfoWindow
                                                    onCloseClick={() => {
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    <div>
                                                        <Project
                                                            area={
                                                                infoWindowData.area
                                                            }
                                                            bathrooms={
                                                                infoWindowData.bathrooms
                                                            }
                                                            bedrooms={
                                                                infoWindowData.bedrooms
                                                            }
                                                            starting_price={
                                                                infoWindowData.starting_price
                                                            }
                                                            address={
                                                                infoWindowData.address
                                                            }
                                                            mainImage={
                                                                infoWindowData.mainImage
                                                            }
                                                            title={
                                                                infoWindowData.title
                                                            }
                                                        />
                                                    </div>
                                                </InfoWindow>
                                            )}
                                    </MarkerF>
                                )
                            )}
                        </GoogleMap>
                    )}
                </div>
            </Modal>
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
export default HomeProjectList;

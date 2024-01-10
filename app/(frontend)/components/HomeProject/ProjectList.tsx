"use client";
import { useState, useEffect, useRef, useId } from "react";
import React from "react";
import Select from "react-select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
  OverlayView,
} from "@react-google-maps/api";
import { useGetAllHomeData } from "@/src/services/HomeService";
import Modal from "./Model";
import MapProject from "./MapProject";
import Project from "./Project";

function ProjectList() {
  const router = useRouter();
  const { homeData } = useGetAllHomeData();

  const options = homeData?.newProjects;
  const projectChangeHandle = (event) => {
    setSelectedProject(event);
    router.push("/projects/" + event.value);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
  });
  const [mapRef, setMapRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState({
    id: null,
    address: "",
    title: "",
    area: "",
    area_unit: "",
    bedrooms: "",
    bathrooms: "",
    handOver : "",
    starting_price: "",
    mainImage: "",
    slug: "",
    completionStatusName: "",
  });
  const [markers, setMarkers] = useState([]);
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });

  const [minMaxPrice, setMinMaxPrice] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  useEffect(() => {
    if (homeData?.mapProjects) {
      setMarkers(homeData?.mapProjects);
    }
  }, [homeData]);
  const handleApplyPrice = () => {
    setMinMaxPrice({
      minPrice: minPriceRef.current.value,
      maxPrice: maxPriceRef.current.value,
    });
    const minPrice = minPriceRef.current.value ? minPriceRef.current.value : 0;
    const maxPrice = maxPriceRef.current.value ? maxPriceRef.current.value : 0;

    router.push(`projects?minprice=${minPrice}&maxprice=${maxPrice}`);
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
    area_unit,
    bedrooms,
    bathrooms,
    handOver,
    starting_price,
    mainImage,
    slug,
    completionStatusName
  ) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({
      id,
      address,
      title,
      area,
      area_unit,
      bedrooms,
      bathrooms,
      handOver,
      starting_price,
      mainImage,
      slug,
      completionStatusName,
    });
    setIsOpen(true);
  };
  // const [selectedProject, setSelectedProject] = useState({
  //   id: "",
  //   label: "",
  //   value: "",
  // });

  const [selectedProject, setSelectedProject] = useState(null);

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
        <div className="">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="list-map-container"
              onLoad={onMapLoad}
              onClick={() => setIsOpen(false)}
            >
              {markers.map(
                (
                  {
                    address,
                    title,
                    area,
                    area_unit,
                    bedrooms,
                    bathrooms,
                    handOver,
                    starting_price,
                    mainImage,
                    lat,
                    lng,
                    slug,
                    completionStatusName,
                  },
                  ind
                ) => (
                  <MarkerF
                    key={ind}
                    position={{ lat, lng }}
                    onClick={() => {
                      handleMarkerClick(
                        ind,
                        lat,
                        lng,
                        address,
                        title,
                        area,
                        area_unit,
                        bedrooms,
                        bathrooms,
                        handOver,
                        starting_price,
                        mainImage,
                        slug,
                        completionStatusName
                      );
                    }}
                  >
                    <OverlayView
                      position={{ lat, lng }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "5px",
                          border: "1px solid #ccc",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                          borderRadius: "4px",
                          minWidth: "fit-content", // Set a minimum width
                          whiteSpace: "nowrap", // Rounded corners
                        }}
                      >
                        {new Intl.NumberFormat().format(starting_price)}
                        
                      </div>
                    </OverlayView>
                    {isOpen && infoWindowData?.id === ind && (
                      <InfoWindow
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        <div>
                          <Project
                            slug={infoWindowData.slug}
                            area={infoWindowData.area}
                            area_unit = {infoWindowData.area_unit}
                            bathrooms={infoWindowData.bathrooms}
                            bedrooms={infoWindowData.bedrooms}
                            handOver = {infoWindowData.handOver}
                            starting_price={infoWindowData.starting_price}
                            address={infoWindowData.address}
                            mainImage={infoWindowData.mainImage}
                            title={infoWindowData.title}
                            completionStatusName={
                              infoWindowData.completionStatusName
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
                            placeholder="Select Project"
                            value={selectedProject}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-10 col-lg-2 col-md-3 mx-3 my-auto">
                      <div className="mapShowBg shadow">
                        <p
                          className="text-primary mb-1 fw-semibold"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          SHOW MAP
                        </p>
                      </div>
                    </div> */}

                    <div
                      className="col-10 col-lg-2 col-md-3 mx-3 my-auto"
                      onClick={openModal}
                    >
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
                        <div className="dropdown">
                          <div
                            className="form-select"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                          >
                            {minMaxPrice.minPrice && minMaxPrice.maxPrice
                              ? `${minMaxPrice.minPrice} ${
                                  minMaxPrice.minPrice &&
                                  minMaxPrice.maxPrice &&
                                  "-"
                                } ${minMaxPrice.maxPrice} AED`
                              : "Price"}
                            {}
                          </div>
                          <div className="dropdown-menu p-4 mt-1">
                            <div className="mb-3">
                              <label className="form-label">
                                Minimum Price
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="minprice"
                                min={0}
                                placeholder="0"
                                name="minprice"
                                ref={minPriceRef}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Maximum Price
                              </label>
                              <input
                                type="number"
                                name="maxprice"
                                className="form-control"
                                id="maxprice"
                                placeholder="Any Price"
                                min={0}
                                ref={maxPriceRef}
                              />
                            </div>
                            <div className="mt-4 d-grid">
                              <button
                                className="btn btn-primary btn-lg"
                                type="button"
                                onClick={handleApplyPrice}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
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
export default ProjectList;

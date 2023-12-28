"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Project from "./Project";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
  OverlayView,
  DrawingManagerF,
} from "@react-google-maps/api";

import classes from "./Project.module.css";
import Filters from "./Filters";
import {
  useGetAccommodations,
  useGetCommunities,
  useGetAmenities,
} from "@/src/services/PropertyService";
import axios from "axios";

const PropertyList = ({ params }) => {
  const [showMap, setShowMap] = useState(true);
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [originalMarkers, setOriginalMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });
  const [infoWindowData, setInfoWindowData] = useState({
    id: null,
    address: "",
    title: "",
    area: "",
    area_unit: "",
    bedrooms: "",
    bathrooms: "",
    starting_price: "",
    mainImage: "",
    slug: "",
    completionStatusName: "",
    accommodationName: "",
  });
  const [showClearMapButton, setShowClearMapButton] = useState(false);
  const mapRef2 = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState("");
  const [links, setLinks] = useState({ next: "", first: "" });

  const { accommodations } = useGetAccommodations();
  const { communities } = useGetCommunities();
  const { amenities } = useGetAmenities();

  const mapRef = useRef(null);

  const getMarkersInView = useCallback(() => {
    if (!mapRef2.current) return;

    const bounds = mapRef2.current.getBounds();

    const markersInsideView = originalMarkers.filter((marker) =>
      bounds.contains(new window.google.maps.LatLng(marker.lat, marker.lng))
    );

    mapRef2?.current?.setCenter({
      lat: parseFloat(originalMarkers[0].address_latitude),
      lng: parseFloat(originalMarkers[0].address_longitude),
    });
    // setFilteredMarkers([...markersInsideView]);
    setProperties([...markersInsideView]);
  }, [originalMarkers]);
  console.log("links", links);
  const onNextPage = () => {
    let url = links?.next;
    axios
      .get(url)
      .then((res) => {
        setProperties([...properties, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (trigger) {
      setFilteredMarkers([...originalMarkers]);
      getMarkersInView();
    }
  }, [trigger, getMarkersInView, originalMarkers]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    libraries: ["drawing", "geometry"],
  });

  useEffect(() => {
    if (isLoaded) {
      setFilteredMarkers([...properties]);
    }
  }, [isLoaded, properties]);

  const onMapLoad = (map) => {
    mapRef2.current = map;
    const bounds = new google.maps.LatLngBounds();
    // filteredMarkers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    // map.fitBounds(bounds);
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
    starting_price,
    mainImage,
    slug,
    completionStatusName,
    accommodationName
  ) => {
    setInfoWindowData({
      id,
      address,
      title,
      area,
      area_unit,
      bedrooms,
      bathrooms,
      starting_price,
      mainImage,
      slug,
      completionStatusName,
      accommodationName,
    });
    setIsOpen(true);
  };

  const handleCenterChanged = () => {
    if (mapRef2) {
      const newCenter = mapRef2?.current?.getCenter();
    }
  };

  const handleSortChange = (e) => {
    setSorting(e.target.value);
  };
  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-12 col-lg-12 col-md-12">
          <div className="p-3 shadow-sm">
            <Filters
              setProperties={setProperties}
              showMap={showMap}
              setShowMap={setShowMap}
              mapRef={mapRef2}
              setOriginalMarkers={setOriginalMarkers}
              accomodations={accommodations}
              communities={communities}
              amenities={amenities}
              setLoading={setLoading}
              sortBy={sorting}
              setLinks={setLinks}
              setTotalProperties={setTotalProperties}
            />
          </div>
        </div>
        {showMap && (
          <div className="col-12 col-sm-12 col-md-6">
            <div className="">
              <div className={classes.clearMapButtonContainer}>
                <button
                  style={{
                    color: "black",
                    backgroundColor: "lightgrey",
                    border: "none",
                    visibility: showClearMapButton ? "visible" : "hidden",
                    zIndex: showClearMapButton ? "1" : "-1",
                  }}
                  onClick={() => {
                    setTrigger((prev) => prev + 1);
                    setShowClearMapButton(false);
                  }}
                >
                  Clear Map Selection
                </button>
              </div>
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  onZoomChanged={getMarkersInView}
                  onDragEnd={getMarkersInView}
                  zoom={10}
                  center={centerRef.current}
                  onCenterChanged={handleCenterChanged}
                  mapContainerClassName="list-map-container"
                  onLoad={onMapLoad}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {filteredMarkers.map(
                    (
                      {
                        address,
                        title,
                        area,
                        area_unit,
                        bedrooms,
                        bathrooms,
                        starting_price,
                        mainImage,
                        lat,
                        lng,
                        slug,
                        completionStatusName,
                        accommodationName,
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
                            starting_price,
                            mainImage,
                            slug,
                            completionStatusName,
                            accommodationName
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
                              minWidth: "50px", // Set a minimum width
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
                                bathrooms={infoWindowData.bathrooms}
                                bedrooms={infoWindowData.bedrooms}
                                starting_price={infoWindowData.starting_price}
                                address={infoWindowData.address}
                                mainImage={infoWindowData.mainImage}
                                title={infoWindowData.title}
                                completionStatusName={
                                  infoWindowData.completionStatusName
                                }
                                area_unit={infoWindowData.area_unit}
                                accommodationName={
                                  infoWindowData.accommodationName
                                }
                              />
                            </div>
                          </InfoWindow>
                        )}
                      </MarkerF>
                    )
                  )}
                  <DrawingManagerF
                    onPolygonComplete={(polygon) => {
                      const drawnPolygonPath = polygon.getPath();
                      const markersInsidePolygon = originalMarkers.filter(
                        (marker) =>
                          window.google.maps.geometry.poly.containsLocation(
                            new window.google.maps.LatLng(
                              marker.lat,
                              marker.lng
                            ),
                            polygon
                          )
                      );
                      setProperties(markersInsidePolygon);
                      setFilteredMarkers(markersInsidePolygon);
                      setShowClearMapButton(true);
                      polygon.setMap(null); // Remove the polygon after processing
                    }}
                    options={{
                      drawingControl: true,
                      drawingControlOptions: {
                        position: window.google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                      },
                      polygonOptions: {
                        fillColor: "#FF0000",
                        fillOpacity: 0.2,
                        strokeWeight: 1,
                        clickable: false,
                        editable: true,
                        zIndex: 1,
                      },
                    }}
                  />
                </GoogleMap>
              )}
            </div>
          </div>
        )}
        <div
          className={`col-12 col-sm-12 ${showMap ? "col-md-6" : "col-md-12"}`}
        >
          <div id="dataTable">
            <div>
              <h5>Real Estate Projects</h5>
            </div>
            <div id="PropertyResult">
              <div>
                <div className="col-12 col-lg-12 col-md-12">
                  {loading ? (
                    "Loading Projects"
                  ) : (
                    <>
                      <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <p className="text-primary mb-0">
                            {totalProperties} results found
                          </p>
                        </div>
                        <div className="col">
                          {/* <select
                            onChange={handleSortChange}
                            value={sorting}
                            className="form-select w-auto float-end"
                            aria-label="Size 3 select"
                          >
                            <option value="1">Newest</option>
                            <option value="2">rice (Low to High)</option>
                            <option value="3">rice (High to Low)</option>
                          </select> */}
                        </div>
                      </div>
                      <div className="row g-3">
                        {/* <div className="col-12 col-lg-12 col-md-12">
                      <p className="text-primary mb-0">
                        {properties.length} results found
                      </p>
                    </div> */}
                        {properties.map((property, index) => (
                          <div
                            key={index}
                            className={`col-12 ${
                              showMap ? "col-lg-6" : "col-lg-3"
                            } col-md-6`}
                          >
                            <Project
                              slug={property.slug}
                              area={property.area}
                              bathrooms={property.bathrooms}
                              bedrooms={property.bedrooms}
                              starting_price={property.starting_price}
                              address={property.address}
                              mainImage={property.mainImage}
                              title={property.title}
                              completionStatusName={
                                property.completionStatusName
                              }
                              area_unit={property.area_unit}
                              accommodationName={property.accommodationName}
                            />
                          </div>
                        ))}
                      </div>
                      {links?.next && (
                        <button
                          className="bdrBtn mrAuto loadBtn mt-4"
                          onClick={onNextPage}
                        >
                          View All
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyList;

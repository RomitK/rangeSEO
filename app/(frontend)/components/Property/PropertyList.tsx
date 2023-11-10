"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Property from "./Property";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
  OverlayView,
  DrawingManagerF,
} from "@react-google-maps/api";

import classes from "./Properties.module.css";
import Filters from "../rent/Filters";

const PropertyList = ({ params }) => {
  const [showMap, setShowMap] = useState(true);
  const [properties, setProperties] = useState([]);
  const [originalMarkers, setOriginalMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });
  const [infoWindowData, setInfoWindowData] = useState({
    id: null,
    address: "",
    name: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    property_banner: "",
    slug: "",
  });
  const [showClearMapButton, setShowClearMapButton] = useState(false);
  const mapRef2 = useRef(null);

  const getMarkersInView = useCallback(() => {
    if (!mapRef2.current) return;

    const bounds = mapRef2.current.getBounds();

    const markersInsideView = originalMarkers.filter((marker) =>
      bounds.contains(new window.google.maps.LatLng(marker.lat, marker.lng))
    );
    // setFilteredMarkers([...markersInsideView]);
    setProperties([...markersInsideView]);
  }, [originalMarkers]);

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
    filteredMarkers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (
    id,
    lat,
    lng,
    address,
    name,
    area,
    bedrooms,
    bathrooms,
    price,
    property_banner,
    slug
  ) => {
    setInfoWindowData({
      id,
      address,
      name,
      area,
      bedrooms,
      bathrooms,
      price,
      property_banner,
      slug,
    });
    setIsOpen(true);
  };

  const handleCenterChanged = () => {
    if (mapRef2) {
      const newCenter = mapRef2?.current?.getCenter();
    }
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
                  mapContainerClassName="map-container"
                  onLoad={onMapLoad}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {filteredMarkers.map(
                    (
                      {
                        address,
                        name,
                        area,
                        bedrooms,
                        bathrooms,
                        price,
                        property_banner,
                        lat,
                        lng,
                        slug,
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
                            name,
                            area,
                            bedrooms,
                            bathrooms,
                            price,
                            property_banner,
                            slug
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
                            {price}
                          </div>
                        </OverlayView>
                        {isOpen && infoWindowData?.id === ind && (
                          <InfoWindow
                            onCloseClick={() => {
                              setIsOpen(false);
                            }}
                          >
                            <div>
                              <Property
                                slug={infoWindowData.slug}
                                area={infoWindowData.area}
                                bathrooms={infoWindowData.bathrooms}
                                bedrooms={infoWindowData.bedrooms}
                                price={infoWindowData.price}
                                address={infoWindowData.address}
                                property_banner={infoWindowData.property_banner}
                                name={infoWindowData.name}
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
              <h5>Real Estate &amp; Homes For Sale</h5>
            </div>
            <div id="PropertyResult">
              <div>
                <div className="col-12 col-lg-12 col-md-12">
                  <div className="row g-3">
                    <div className="col-12 col-lg-12 col-md-12">
                      <p className="text-primary mb-0">
                        {properties.length} results found
                      </p>
                    </div>
                    {properties.map((property, index) => (
                      <div
                        key={index}
                        className={`col-12 ${
                          showMap ? "col-lg-6" : "col-lg-3"
                        } col-md-6`}
                      >
                        <Property
                          slug={property.slug}
                          area={property.area}
                          bathrooms={property.bathrooms}
                          bedrooms={property.bedrooms}
                          price={property.price}
                          address={property.address}
                          property_banner={property.property_banner}
                          name={property.name}
                        />
                      </div>
                    ))}
                  </div>
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

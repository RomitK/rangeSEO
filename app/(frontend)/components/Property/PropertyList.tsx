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

const PropertyList = ({ params }) => {
  const [showMap, setShowMap] = useState(true);
  const [properties, setProperties] = useState([]);
  const [originalMarkers, setOriginalMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const centerRef = useRef({ lat: 25.2048, lng: 55.2708 });
  const [infoWindowData, setInfoWindowData] = useState();
  const mapRef2 = useRef(null);
  const [form, setForm] = useState({
    acc: "",
    cat: "",
    community: "",
    bedrooms: "",
    minprice: "",
    maxprice: "",
  });

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
    const formData = new FormData();
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        formData.append(key, form[key]);
      }
    }
    fetch("https://rangenew.websitedemo.world/api/properties", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        const propertiesDup = JSON.parse(res.data);
        setProperties([...propertiesDup]);
        setOriginalMarkers([...propertiesDup]);
        mapRef2?.current?.setCenter({
          lat: parseFloat(propertiesDup[0].address_latitude),
          lng: parseFloat(propertiesDup[0].address_longitude),
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle the error response object
      });
  }, [form]);

  useEffect(() => {
    if (trigger) {
      setFilteredMarkers([...originalMarkers]);
      getMarkersInView();
    }
  }, [trigger, getMarkersInView, originalMarkers]);

  const handleChange = (e) => {
    form[e.target.name] = e.target.value;
    setForm({ ...form });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAGZjmTZFO0V8_-_V_A-Dqto1I-FlBhshE",
    libraries: ["drawing", "geometry"],
  });

  useEffect(() => {
    if (isLoaded && properties.length) {
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
    property_banner
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
            <form action="">
              <div className="row">
                <div className="col">
                  <select
                    onChange={handleChange}
                    value={form.community}
                    name="community"
                    id="community"
                    className="form-select bedroomSelect"
                  >
                    <option value="">Select community</option>
                    <option value="1">Business Bay</option>
                    <option value="2">Meydan</option>
                    <option value="3">Dubai Marina</option>
                    <option value="4">Bur Dubai</option>
                    <option value="5">Jebel Ali</option>
                    <option value="6">DAMAC Hills</option>
                    <option value="7">Downtown Dubai</option>
                    <option value="8">Dubailand</option>
                    <option value="9">Town Square</option>
                    <option value="10">Bluewaters Island</option>
                    <option value="11">Mohammad Bin Rashid City</option>
                    <option value="12">International City</option>
                    <option value="13">Jumeirah Village Circle</option>
                    <option value="14">Dubai Hills Estate</option>
                    <option value="15">Al Furjan</option>
                    <option value="16">Damac Lagoons</option>
                    <option value="17">Motor City</option>
                    <option value="18">JBR</option>
                    <option value="19">Al Sufouh</option>
                    <option value="20">World Trade Centre</option>
                    <option value="21">Silicon Oasis</option>
                    <option value="22">IMPZ</option>
                    <option value="23">Sports City</option>
                    <option value="24">Arabian Ranches 3</option>
                    <option value="25">Palm Jumeirah</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    onChange={handleChange}
                    value={form.acc}
                    name="acc"
                    id="accomodation"
                    className="form-select bedroomSelect"
                  >
                    <option value="">Select Accomodation</option>
                    <option value="1">Apartment</option>
                    <option value="2">Land Residential</option>
                    <option value="3">Villa</option>
                    <option value="4">Townhouse</option>
                    <option value="5">Office</option>
                    <option value="6">Hotel Apartment</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    onChange={handleChange}
                    value={form.cat}
                    name="cat"
                    id="category"
                    className="form-select bedroomSelect"
                    disabled=""
                  >
                    <option value="">Select Category</option>
                    <option value="1">Rent</option>
                    <option value="2">Ready</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    onChange={handleChange}
                    value={form.bedrooms}
                    name="bedrooms"
                    id="bedrooms"
                    className="form-select bedroomSelect"
                  >
                    <option value="">Bedrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
                <div className="col">
                  <div className="dropdown">
                    <div
                      className="form-select"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside"
                    >
                      Price
                    </div>
                    <div className="dropdown-menu p-4">
                      <div className="mb-3">
                        <label className="form-label">Minimum Price</label>
                        <input
                          type="text"
                          className="form-control"
                          id="minprice"
                          value={form.minprice}
                          placeholder="0"
                          name="minprice"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Maximum Price</label>
                        <input
                          value={form.maxprice}
                          type="text"
                          name="maxprice"
                          onChange={handleChange}
                          className="form-control"
                          id="maxprice"
                          placeholder="Any Price"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="exampleCheckbox"
                      checked={showMap}
                      onChange={() => {
                        setShowMap(!showMap);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleCheckbox"
                    >
                      Map
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {showMap && (
          <div className="col">
            <div className="">
              <button
                style={{
                  color: "black",
                  backgroundColor: "lightgrey",
                  border: "none",
                }}
                onClick={() => {
                  setTrigger((prev) => prev + 1);
                }}
              >
                Clear Map Selection
              </button>
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
                            property_banner
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

                      polygon.setMap(null); // Remove the polygon after processing
                    }}
                    options={{
                      drawingControl: true,
                      drawingControlOptions: {
                        position: window.google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ["polygon"],
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
        <div className="col">
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
                      <div key={index} className="col-12 col-lg-6 col-md-4">
                        <Property
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

"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
  OverlayView,
  DrawingManagerF,
} from "@react-google-maps/api";
import { priceShortFormat } from "@/app/utils/formatNumber"
import { useGetPropertyAccommodations } from "@/src/services/AccommodationService";
import { useGetPropertyAmenities } from "@/src/services/AmenityService"

import axios from "axios";
import classes from "@/app/(frontend)/components/Properties/Properties.module.css";
import Filters from "@/app/(frontend)/components/Properties/Filters/Filters";
import LuxuryPropertyFilters from "@/app/(frontend)/components/Properties/Filters/LuxuryPropertyFilters";
import RentFilters from "@/app/(frontend)/components/Properties/Filters/RentFilters";
import BuyFilters from "@/app/(frontend)/components/Properties/Filters/Buy/BuyFilters";
import ReadyFilters from "@/app/(frontend)/components/Properties/Filters/Buy/ReadyFilters";
import OffPlanFilters from "@/app/(frontend)/components/Properties/Filters/Buy/OffPlanFilters";
import Property from "@/app/(frontend)/components/Properties/Property";

const PropertyList = ({ params }) => {
  //console.log(params);
  const isLuxuryProperties = Object.hasOwn(params, 'isLuxury');
  const isRentPage = Object.hasOwn(params, 'rent');
  const isBuyPage = Object.hasOwn(params, "buy");
  const isReadyPage = Object.hasOwn(params, "ready");
  const isOffPlanPage = Object.hasOwn(params, "offplan");

  const [isMobile, setIsMobile] = useState(false);
  const { propertyAccommodations } = useGetPropertyAccommodations();
  const [showMap, setShowMap] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const [links, setLinks] = useState({ next: "", first: "" });
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
    unit_measure: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    property_banner: "",
    slug: "",
    accommodationName: "",
    categoryName: "",
    completionStatusName: ""
  });
  const [showClearMapButton, setShowClearMapButton] = useState(false);
  const mapRef2 = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState("");


  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    setTotalProperties(markersInsideView.length);
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
    // filteredMarkers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    // map.fitBounds(bounds);
  };

  const handleMarkerClick = (
    id,
    lat,
    lng,
    address,
    name,
    area,
    unit_measure,
    bedrooms,
    bathrooms,
    price,
    property_banner,
    slug,
    accommodationName,
    categoryName,
    completionStatusName
  ) => {
    setInfoWindowData({
      id,
      address,
      name,
      area,
      unit_measure,
      bedrooms,
      bathrooms,
      price,
      property_banner,
      slug,
      accommodationName,
      categoryName,
      completionStatusName
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

  return (
    <div className={`${isMobile ? '' : 'container-fluid px-0'}`}>
      <div className={` ${isMobile ? '' : 'row g-0 '}`}>
        <div className={`${isMobile ? '' : 'col-12 col-lg-12 col-md-12'}`}>
          <div className={`${isMobile ? '' : 'p-3 shadow-sm'}`}>
            {
              isLuxuryProperties &&
              <LuxuryPropertyFilters
                setProperties={setProperties}
                showMap={showMap}
                setShowMap={setShowMap}
                mapRef={mapRef2}
                setOriginalMarkers={setOriginalMarkers}
                accomodations={propertyAccommodations}
                amenities={propertyAccommodations}
                setLoading={setLoading}
                sortBy={sorting}
                setLinks={setLinks}
                totalPropertyCount={totalProperties}
                setTotalProperties={setTotalProperties}
              />
            }
            {
              isRentPage &&
              <RentFilters
                setProperties={setProperties}
                showMap={showMap}
                setShowMap={setShowMap}
                mapRef={mapRef2}
                setOriginalMarkers={setOriginalMarkers}
                accomodations={propertyAccommodations}
                amenities={propertyAccommodations}
                setLoading={setLoading}
                sortBy={sorting}
                setLinks={setLinks}
                totalPropertyCount={totalProperties}
                setTotalProperties={setTotalProperties}
              />
            }
            {
              isBuyPage &&
              <BuyFilters
                setProperties={setProperties}
                showMap={showMap}
                setShowMap={setShowMap}
                mapRef={mapRef2}
                setOriginalMarkers={setOriginalMarkers}
                accomodations={propertyAccommodations}
                amenities={propertyAccommodations}
                setLoading={setLoading}
                sortBy={sorting}
                setLinks={setLinks}
                totalPropertyCount={totalProperties}
                setTotalProperties={setTotalProperties}
              />
            }
            {isReadyPage &&
              <ReadyFilters
                setProperties={setProperties}
                showMap={showMap}
                setShowMap={setShowMap}
                mapRef={mapRef2}
                setOriginalMarkers={setOriginalMarkers}
                accomodations={propertyAccommodations}
                amenities={propertyAccommodations}
                setLoading={setLoading}
                sortBy={sorting}
                setLinks={setLinks}
                totalPropertyCount={totalProperties}
                setTotalProperties={setTotalProperties}
              />
            }
            {
              isOffPlanPage &&
              <OffPlanFilters
                setProperties={setProperties}
                showMap={showMap}
                setShowMap={setShowMap}
                mapRef={mapRef2}
                setOriginalMarkers={setOriginalMarkers}
                accomodations={propertyAccommodations}
                amenities={propertyAccommodations}
                setLoading={setLoading}
                sortBy={sorting}
                setLinks={setLinks}
                totalPropertyCount={totalProperties}
                setTotalProperties={setTotalProperties}
              />
            }
            {
              !isLuxuryProperties && !isRentPage && !isBuyPage && !isReadyPage && !isOffPlanPage &&
              <Filters
                setProperties={setProperties}
                showMap={showMap}
                setShowMap={setShowMap}
                mapRef={mapRef2}
                setOriginalMarkers={setOriginalMarkers}
                accomodations={propertyAccommodations}
                amenities={propertyAccommodations}
                setLoading={setLoading}
                sortBy={sorting}
                setLinks={setLinks}
                totalPropertyCount={totalProperties}
                setTotalProperties={setTotalProperties}
              />
            }
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
                        name,
                        area,
                        unit_measure,
                        bedrooms,
                        bathrooms,
                        price,
                        property_banner,
                        lat,
                        lng,
                        slug,
                        accommodationName,
                        categoryName,
                        completionStatusName
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
                            unit_measure,
                            bedrooms,
                            bathrooms,
                            price,
                            property_banner,
                            slug,
                            accommodationName,
                            categoryName,
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
                            {priceShortFormat(price)}
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
                                unit_measure={infoWindowData.unit_measure}
                                bathrooms={infoWindowData.bathrooms}
                                bedrooms={infoWindowData.bedrooms}
                                price={infoWindowData.price}
                                address={infoWindowData.address}
                                property_banner={infoWindowData.property_banner}
                                name={infoWindowData.name}
                                accommodationName={
                                  infoWindowData.accommodationName
                                }
                                categoryName={infoWindowData.categoryName}
                                completionStatusName={infoWindowData.completionStatusName}
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
              <h5>Available Properties</h5>
            </div>
            <div id="PropertyResult">
              <div>
                <div className="col-12 col-lg-12 col-md-12">
                  {loading ? (
                    "Loading Properties"
                  ) : (
                    <>
                      <div className="row mb-3">
                        <div className="col d-flex align-items-center">
                          <p className="text-primary mb-0">
                            {totalProperties} results found
                          </p>
                        </div>
                        <div className="col">

                          <select
                            onChange={handleSortChange}
                            value={sorting}
                            className="form-select w-auto float-end"
                            aria-label="Size 3 select"
                          >
                            <option value="1">Newest</option>
                            <option value="2">Price (Low to High)</option>
                            <option value="3">Price (High to Low)</option>
                          </select>
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
                            className={`col-12 ${showMap ? "col-lg-6" : "col-lg-3"
                              } col-md-6`}
                          >
                            <Property
                              slug={property.slug}
                              area={property.area}
                              unit_measure={property.unit_measure}
                              bathrooms={property.bathrooms}
                              bedrooms={property.bedrooms}
                              price={property.price}
                              address={property.address}
                              property_banner={property.property_banner}
                              name={property.name}
                              accommodationName={property.accommodationName}
                              categoryName={property.categoryName}
                              completionStatusName={property.completionStatusName}
                            />
                          </div>
                        ))}
                      </div>
                      {links?.next && (
                        <button
                          className="bdrBtn mrAuto loadBtn mt-4"
                          onClick={onNextPage}
                        >
                          View More
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

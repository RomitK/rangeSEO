import React, { useState, useEffect } from "react";
const Location = ({
  type,
  property,
  map,
  prepareRequestData,
  prepareMapData,
}) => {
  const [locations, setLocations] = useState([]);

  const getNearByPlacesByType = (locType, lat, lng) => {
    const requestData = prepareRequestData(locType, lat, lng);
    if (map) {
      let service = new google.maps.places.PlacesService(map);
      service.nearbySearch(requestData, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const resultData = prepareMapData(results, 5);
          setLocations(resultData);
        }
      });
    }
  };

  useEffect(() => {
    getNearByPlacesByType(
      type,
      property?.address_latitude,
      property?.address_longitude
    );
  }, [type, property, map]);

  return (
    <>
      {locations?.map((location, lIndex) => (
        <p className="fw-500 mb-0" key={lIndex + "nearLocation"}>
          {location.name}
        </p>
      ))}
    </>
  );
};

export default Location;

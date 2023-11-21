"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Bottombar from "./BottomNavigationBar";
import {
  useGetAccommodations,
  useGetCommunities,
  useGetAmenities,
} from "@/src/services/PropertyService";
import { useRouter } from "next/navigation";
import Select from "react-select";

function Filters({
  setShowMap,
  showMap,
  setProperties,
  setOriginalMarkers,
  mapRef,
}) {
  const searchParams = useSearchParams();
  const { accommodations } = useGetAccommodations();
  const { communities } = useGetCommunities();
  const { amenities } = useGetAmenities();
  const router = useRouter();
  console.log(router);
  // const { minprice } = router.query;
  // const { maxprice } = router.query;
  const resetApplyPrice = () => {
    form["minprice"] = "";
    form["maxprice"] = "";
    setForm({ ...form });
    minPriceRef.current.value = "";
    maxPriceRef.current.value = "";
  };
  const [communityOption, setCommunityOption] = useState();
  const [form, setForm] = useState({
    accommodation_id: "",
    community: "",
    bedrooms: "",
    minprice: "",
    maxprice: "",
    amenity_id: "",
    bathroom: "",
    area: "",
  });

  const [showMore, setShowMore] = useState(false);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const showPriceResetButton = () => {
    if (
      (minPriceRef.current && minPriceRef.current.value) ||
      (maxPriceRef.current && maxPriceRef.current.value)
    ) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (searchParams.has("minprice") && searchParams.has("maxprice")) {
      setForm({
        ...form,
        minprice: searchParams.get("minprice"),
        maxprice: searchParams.get("maxprice"),
      });
    }
  }, []);
  useEffect(() => {
    let getPropertiesURL = process.env.API_HOST + "projects?";
    const formData = new FormData();
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key]) {
          getPropertiesURL += `${key}=${form[key]}&`;
        }

        formData.append(key, form[key]);
      }
    }
    console.log(getPropertiesURL);
    fetch(getPropertiesURL)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          const propertiesDup = JSON.parse(res.data);
          setProperties([...propertiesDup]);
          setOriginalMarkers([...propertiesDup]);
          if (propertiesDup.length) {
            mapRef?.current?.setCenter({
              lat: parseFloat(propertiesDup[0].address_latitude),
              lng: parseFloat(propertiesDup[0].address_longitude),
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle the error response object
      });
  }, [form]);
  useEffect(() => {
    const newArray2 = communities?.map((originalObject, index) => {
      // Assuming you want to use the index as the 'id' property
      const id = originalObject.community_id;
      // Extracting 'label' and 'value' from the original object
      const label = originalObject.name; // Adjust this based on your data
      const value = originalObject.name; // Adjust this based on your data
      const community_id = originalObject.community_id;
      // Creating a new object with 'id', 'label', and 'value'
      return { id, label, value };
    });
    setCommunityOption(newArray2);
  }, [communities]);

  const handleChange = (e) => {
    console.log(e.target.id);
    form[e.target.name] = e.target.value;
    setForm({ ...form });
  };

  const handleViewChange = (e) => {
    console.log(e.target.value);
  };

  const handleApplyPrice = () => {
    setForm({
      ...form,
      minprice: minPriceRef.current.value,
      maxprice: maxPriceRef.current.value,
    });
  };

  return (
    <form action="">
      <div className="row">
        <div className="col-md-3">
          <Select
            name="community"
            id="community"
            options={communityOption}
            placeholder="Select Community"
            className=""
            onChange={({ id }) => {
              form["community"] = id;
              setForm({ ...form });
            }}
          />
        </div>
        {/* <div className="col-md-1">
          <select
            onChange={handleChange}
            value={form.category}
            name="category"
            id="category"
            className="form-select bedroomSelect"
          >
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div> */}
        <div className="col-md-2">
          <select
            onChange={handleChange}
            value={form.accommodation_id}
            name="accommodation_id"
            id="accomodation"
            className="form-select bedroomSelect"
          >
            <option value="">Select Property Type</option>
            {accommodations?.map((accomodation) => (
              <option key={accomodation.id} value={accomodation.id}>
                {accomodation.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select
            onChange={handleChange}
            value={form.bedrooms}
            name="bedrooms"
            id="bedrooms"
            className="form-select bedroomSelect"
          >
            <option value="">Select Bedrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="ST">ST</option>
          </select>
        </div>
        {/* <div className="col-md-1">
          <input
            value={form.area}
            type="number"
            name="area"
            onChange={handleChange}
            className="form-control"
            id="area"
            placeholder="Area"
          />
        </div> */}
        <div className="col-md-2">
          <div className="dropdown">
            <div
              className="form-select"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              {form.minprice || form.maxprice
                ? `${form.minprice} ${form.minprice && form.maxprice && "-"} ${
                    form.maxprice
                  } AED`
                : "Price"}
              {}
            </div>
            <div className="dropdown-menu p-4">
              <div className="mb-3">
                <label className="form-label">Minimum Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="minprice"
                  min={0}
                  placeholder="0"
                  value={form.minprice}
                  name="minprice"
                  ref={minPriceRef}
                  onChange={(e) =>
                    setForm({ ...form, minprice: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Maximum Price</label>
                <input
                  type="number"
                  name="maxprice"
                  className="form-control"
                  id="maxprice"
                  placeholder="Any Price"
                  ref={maxPriceRef}
                  value={form.maxprice}
                  onChange={(e) =>
                    setForm({ ...form, maxprice: e.target.value })
                  }
                />
              </div>
              <div className="mt-4 d-grid">
                <div
                  className="row justify-content-center"
                  style={{ columnGap: "0.25rem" }}
                >
                  <button
                    className="btn btn-primary btn-sm col"
                    type="button"
                    onClick={handleApplyPrice}
                  >
                    Apply
                  </button>
                  {showPriceResetButton() && (
                    <button
                      className="btn btn-secondary btn-sm col"
                      type="button"
                      onClick={resetApplyPrice}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-2 d-flex align-items-center justify-content-end">
          {/* <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide" : "More"}
          </button> */}
          <div className="form-check d-none d-sm-block">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="map"
                id="mapradio"
                autoComplete="off"
                onChange={handleViewChange}
                checked={showMap}
                onClick={() => {
                  setShowMap(true);
                }}
              />
              <label className="btn btn-outline-primary" htmlFor="mapradio">
                Map
              </label>

              <input
                type="radio"
                className="btn-check"
                name="list"
                id="listradio"
                autoComplete="off"
                onChange={handleViewChange}
                checked={!showMap}
                onClick={() => {
                  setShowMap(false);
                }}
              />
              <label className="btn btn-outline-primary" htmlFor="listradio">
                List
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* {showMore && (
        <div className="row mt-3">
          <div className="col">
            <select
              onChange={handleChange}
              value={form.amenity_id}
              name="amenity_id"
              id="amenity"
              className="form-select amenitySelect"
            >
              <option value="">Select Amenity</option>
              {amenities?.map((amenity) => (
                <option key={amenity.id} value={amenity.id}>
                  {amenity.name}
                </option>
              ))}
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
              <option value="">Select Bedrooms</option>
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
            <input
              value={form.bathroom}
              type="number"
              name="bathroom"
              onChange={handleChange}
              className="form-control"
              id="bathroom"
              placeholder="Bathrooms"
            />
          </div>
          
        </div>
      )} */}
      <Bottombar
        item={0}
        callBack={(index) =>
          index === 0 ? setShowMap(true) : setShowMap(false)
        }
      />
    </form>
  );
}

export default Filters;

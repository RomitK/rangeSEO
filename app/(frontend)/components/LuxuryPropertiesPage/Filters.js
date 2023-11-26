import { useState, useEffect, useRef } from "react";
import Bottombar from "./BottomNavigationBar";
import {
  useGetAccommodations,
  useGetCommunities,
  useGetAmenities,
} from "@/src/services/PropertyService";
import { Dropdown, FormControl, Form } from "react-bootstrap";
import Select from "react-select";
function Filters({
  setShowMap,
  showMap,
  setProperties,
  setOriginalMarkers,
  mapRef,
}) {
  const { accommodations } = useGetAccommodations();
  const { communities } = useGetCommunities();
  const { amenities } = useGetAmenities();
  const [isCommercial, setIsCommercial] = useState(false);
  const [communityOption, setCommunityOption] = useState();
  const [amenitiesOption, setAmenitiesOption] = useState();
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const minAreaRef = useRef(null);
  const maxAreaRef = useRef(null);
  const [form, setForm] = useState({
    accommodation_id: "",
    community: "",
    bedrooms: "",
    minprice: "",
    maxprice: "",
    amenity_id: "",
    minarea: "",
    maxarea: "",
    amenities: "",
    furnishing: "",
    bathroom: "",
    area: "",
    category: "buy",
    exclusive: 1
  });
  const [selectedCommunity, setselectedCommunity] = useState({
    id: "",
    label: "",
    value: "",
  });
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    let getPropertiesURL = process.env.API_HOST + "properties?";
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
          console.log(propertiesDup);
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
    const newArray3 = amenities?.map((originalObject, index) => {
      // Assuming you want to use the index as the 'id' property

      // Extracting 'label' and 'value' from the original object
      const label = originalObject.name; // Adjust this based on your data
      const value = originalObject.id; // Adjust this based on your data

      // Creating a new object with 'id', 'label', and 'value'
      return { label, value };
    });
    setAmenitiesOption(newArray3);
  }, [amenities]);
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const amenitiesFilterOption = amenitiesOption?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleApplyPrice = () => {
    setForm({
      ...form,
      minprice: minPriceRef.current.value,
      maxprice: maxPriceRef.current.value,
    });
  };
  const resetApplyPrice = () => {
    form["minprice"] = "";
    form["maxprice"] = "";
    setForm({ ...form });
    minPriceRef.current.value = "";
    maxPriceRef.current.value = "";
  };
  const handleApplyArea = () => {
    setForm({
      ...form,
      minarea: minAreaRef.current.value,
      maxarea: maxAreaRef.current.value,
    });
  };
  const resetApplyArea = () => {
    form["minarea"] = "";
    form["maxarea"] = "";
    setForm({ ...form });
    minAreaRef.current.value = "";
    maxAreaRef.current.value = "";
  };
  const highlightMatch = (label) => {
    const index = label.toLowerCase().indexOf(searchTerm.toLowerCase());

    if (index !== -1) {
      const prefix = label.substring(0, index);
      const match = label.substring(index, index + searchTerm.length);
      const suffix = label.substring(index + searchTerm.length);

      return (
        <>
          {prefix}
          <strong>{match}</strong>
          {suffix}
        </>
      );
    }

    return label;
  };
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
    setForm({ ...form, amenities: [...selectedItems] });
  }, [selectedItems]);

  const handleCheckboxChange = (value) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.includes(value);

      if (isSelected) {
        // If already selected, remove it
        return prevSelectedItems.filter((item) => item !== value);
      }

      // If not selected, add it
      return [...prevSelectedItems, value];
    });
  };

  return (
    <form action="">
      <div className="row">
        <div className="col-md-3">
          <Select
            name="community"
            id="community"
            placeholder="Select Community"
            options={communityOption}
            className=""
            onChange={(comm) => {
              form["community"] = comm.id;
              setForm({ ...form });
             
            }}
          />
        </div>
        <div className="col-md-1">
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
        </div>
        
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
          <div className="dropdown">
            <div
              className="form-select"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              {form.minprice && form.maxprice
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
                  name="minprice"
                  ref={minPriceRef}
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
                />
              </div>
              <div className="mt-4 d-grid">
                <div
                  className="row justify-content-center"
                  style={{ columnGap: "0.25rem" }}
                >
                  <button
                    className="btn btn-primary btn-sm"
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

        <div className="col-md-3 d-flex align-items-center justify-content-end">
          <div className="form-check me-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={(e) => setIsCommercial(e.target.checked)}
              value={isCommercial}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Commericial
            </label>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide" : "More"}
          </button>
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

      {showMore && (
        <div className="row mt-3">
          {!isCommercial && (
            <div className="col">
              <Dropdown>
                <Dropdown.Toggle
                  className="dt form-control"
                  variant=""
                  id="dropdown-basic"
                >
                  Amenities
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="fc">
                    <FormControl
                      autoFocus
                      placeholder="Search amenities..."
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                    />
                  </div>

                  <div className="options-container row g-0">
                    {amenitiesFilterOption?.map((option) => (
                      <div key={option.value} className="col-6">
                        <Form.Check
                          key={option.value}
                          type="checkbox"
                          label={highlightMatch(option.label)}
                          checked={selectedItems.includes(option.value)}
                          onChange={() => handleCheckboxChange(option.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 d-grid fc">
                    <div
                      className="row justify-content-center"
                      style={{ columnGap: "0.25rem" }}
                    >
                      {!!selectedItems.length && (
                        <button
                          className="btn btn-secondary btn-sm col-md"
                          type="button"
                          onClick={() => setSelectedItems([])}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
          {/* {!isCommercial && (
                        <div className="col">
                            <select
                                onChange={handleChange}
                                value={form.furnishing}
                                name="furnishing"
                                id="furnishing"
                                className="form-select furnishingSelect"
                            >
                                <option value="">Select Furnishing</option>
                                <option value="1">Furnished</option>
                                <option value="2">Unfurnished</option>
                                <option value="3">Partly Furnished</option>
                            </select>
                        </div>
                    )} */}
          {form.category == "buy" && !isCommercial && (
            <div className="col">
              <select
                onChange={handleChange}
                value={form.completionStatus}
                name="completionStatus"
                id="completionStatus"
                className="form-select completionStatusSelect"
              >
                <option value="">Select Completion Status</option>
                <option value="1">Off-plan</option>
                <option value="2">Ready</option>
              </select>
            </div>
          )}
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
          {!isCommercial && (
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
          )}
          <div className="col">
            <div className="dropdown">
              <div
                className="form-select"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
              >
                {form.minarea && form.maxarea
                  ? `${form.minarea} ${form.minarea && form.maxarea && "-"} ${
                      form.maxarea
                    } `
                  : "Area"}
                {}
              </div>
              <div className="dropdown-menu p-4">
                {" "}
                <div className="mb-3">
                  <label className="form-label">Minimum Area</label>
                  <input
                    type="number"
                    className="form-control"
                    id="minarea"
                    min={0}
                    placeholder="0"
                    name="minarea"
                    ref={minAreaRef}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Maximum Area</label>
                  <input
                    type="number"
                    name="maxarea"
                    className="form-control"
                    id="maxarea"
                    placeholder="Any Area"
                    ref={maxAreaRef}
                  />
                </div>
                <div className="mt-4 d-grid">
                  <div
                    className="row justify-content-center"
                    style={{ columnGap: "0.25rem" }}
                  >
                    <button
                      className="btn btn-primary btn-sm col-md"
                      type="button"
                      onClick={handleApplyArea}
                    >
                      Apply
                    </button>
                    {/* <button
                                            className="btn btn-secondary btn-sm col-md"
                                            type="button"
                                            onClick={resetApplyArea}
                                        >
                                            Reset
                                        </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

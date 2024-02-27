import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { components } from "react-select";
import { Dropdown, FormControl, Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import classes from "@/app/(frontend)/components/Properties/Filters/Filters.module.css";
import Bottombar from "@/app/(frontend)/components/UI/BottomNavigationBar";
import CustomToggle from "@/app/(frontend)/components/UI/CustomSelectToggle";
import MultiValue from "@/app/(frontend)/components/UI/ReactSelect/MultiValue";
import IndicatorsContainer from "@/app/(frontend)/components/UI/ReactSelect/IndicatorsContainer";
import MultiValueContainer from "@/app/(frontend)/components/UI/ReactSelect/MultiValueContainer";
import { useSearchParams } from "next/navigation";
import { useLocation } from "react-router-dom";
import Link from "next/link";
function ReadyFilters({
  setShowMap,
  showMap,
  setProperties,
  setOriginalMarkers,
  mapRef,
  accomodations,
  amenities,
  setLoading,
  sortBy,
  setLinks,
  totalPropertyCount,
  setTotalProperties,
}) {

  const closeRef = useRef(null);
  const [form, setForm] = useState({
    accommodation_id: "",
    community: "",
    bedrooms: "",
    minprice: "",
    maxprice: "",
    minarea: "",
    maxarea: "",
    amenities: "",
    bathroom: "",
    area: "",
    category: "buy",
    completion_status_id: 286,
    furnishing: "",
    isCommercial: "",
  });

  const [projectAmenities, setProjectAmenities] = useState(amenities);
  const [showMore, setShowMore] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [newArrayF, setNewArrayF] = useState([]);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const minAreaRef = useRef(null);
  const maxAreaRef = useRef(null);
  const searchParams = useSearchParams();
  const [isCommercial, setIsCommercial] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMobileDev, setIsMobileDev] = useState(false);
  const [filteredAccomodation, setFilteredAccomodation] =
    useState(accomodations);
  const [showNoMessage, setNoMessage] = useState(false);
  const selectRef = useRef();
  const [hasFocus, setHasFocus] = useState(false);
  const [showSelectedValues, setShowSelectedValues] = useState(true);
  const [ongoingRequests, setOngoingRequests] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const Menu = ({ children, ...props }) => {
    let items = form["searchBy"];
    return (
      <components.Menu {...props}>
        {items?.length ? (
          <div className="pt-2">
            <div className="d-inline-flex mb-1 flex-wrap">
              {items?.map((selectedItem) => (
                <div
                  className={classes.openedItemContainer}
                  key={selectedItem.name}
                >
                  <span className="p-1">{selectedItem.name}</span>
                  <div
                    role="button"
                    className={classes.openItemsDiv}
                    onClick={() => {
                      const comm = form["searchBy"];
                      const filtered = comm.filter(
                        (item1) =>
                          item1.name !== selectedItem.name &&
                          item1.type !== selectedItem.type
                      );
                      props.setValue([...filtered]);
                      setForm({ ...form, searchBy: filtered });
                      selectRef.current.blur();
                    }}
                  >
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className={classes.clearItemIcon}
                    >
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {children}
      </components.Menu>
    );
  };

  const NoOptionsMessage = ({ children, ...props }) => (
    <components.NoOptionsMessage {...props}>
      {showNoMessage ? { children } : <>Search</>}
    </components.NoOptionsMessage>
  );

  useEffect(() => {
    if (isCommercial) {
      form["isCommercial"] = 1;
      setForm({ ...form });

      const filtered = accomodations?.filter(
        (accomodation) =>
          accomodation.type === "Commercial" || accomodation.type === "Both"
      );
      if (filtered != null) {
        setFilteredAccomodation([...filtered]);
      }
    } else {
      setIsCommercial(false);
      form["isCommercial"] = "";
      setForm({ ...form });

      const filtered = accomodations?.filter(
        (accomodation) =>
          accomodation.type === "Residential" || accomodation.type === "Both"
      );
      if (filtered != null) {
        setFilteredAccomodation([...filtered]);
      }
    }
  }, [isCommercial, accomodations]);

  useEffect(() => {
    if (isMobile && showMap) {
      setShowMap(false);
    }
  }, [isMobile]);
  useEffect(() => {
    if (
      searchParams.has("project_name") &&
      searchParams.has("project_detail")
    ) {
      setForm({
        ...form,
        searchBy: [
          {
            type: searchParams.get("project_detail"),
            name: searchParams.get("project_name"),
          },
        ],
      });
      selectRef.current.setValue([
        {
          type: searchParams.get("project_detail"),
          name: searchParams.get("project_name"),
        },
      ]);
    }
    if (
      searchParams.has("community_name") &&
      searchParams.has("community_detail")
    ) {
      setForm({
        ...form,
        searchBy: [
          {
            type: searchParams.get("community_detail"),
            name: searchParams.get("community_name"),
          },
        ],
      });
      selectRef.current.setValue([
        {
          type: searchParams.get("community_detail"),
          name: searchParams.get("community_name"),
        },
      ]);
    }
    if (
      searchParams.has("developer_name") &&
      searchParams.has("developer_detail")
    ) {
      setForm({
        ...form,
        searchBy: [
          {
            type: searchParams.get("developer_detail"),
            name: searchParams.get("developer_name"),
          },
        ],
      });
      selectRef.current.setValue([
        {
          type: searchParams.get("developer_detail"),
          name: searchParams.get("developer_name"),
        },
      ]);
    }
    if (searchParams.has("accommodation_id")) {
      form["accommodation_id"] = searchParams.get("accommodation_id");
      setForm({ ...form });
    }
    if (searchParams.has("bedrooms")) {
      form["bedrooms"] = searchParams.get("bedrooms");
      setForm({ ...form });
      if (form["bedrooms"]) {
        setShowMore(true);
      }
    }

    if (searchParams.has("minprice")) {
      form["minprice"] = searchParams.get("minprice");
      setForm({ ...form });
      if (form["minprice"]) {
        setShowMore(true);
      }
    }

    if (searchParams.has("maxprice")) {
      form["maxprice"] = searchParams.get("maxprice");
      setForm({ ...form });
      if (form["maxprice"]) {
        setShowMore(true);
      }
    }

    if (searchParams.has("minarea")) {
      form["minarea"] = searchParams.get("minarea");
      setForm({ ...form });
      if (form["minarea"]) {
        setShowMore(true);
      }
    }

    if (searchParams.has("maxarea")) {
      form["maxarea"] = searchParams.get("maxarea");
      setForm({ ...form });
      if (form["maxarea"]) {
        setShowMore(true);
      }
    }
    if (searchParams.has("searchBy")) {

      form["searchBy"] = searchParams.get("searchBy");
      selectRef.current.setValue(JSON.parse(searchParams.get("searchBy")));
      setForm({ ...form });
    }
  }, []);
  useEffect(() => {
    let getPropertiesURL = process.env.API_HOST + "properties?";
    let payload = { ...form };
    for (let key in payload) {
      if (payload.hasOwnProperty(key)) {
        if (payload[key]) {
          if (key === "searchBy" && payload[key].length) {
            let searchBy = undefined;
            if (typeof payload[key] == "string") {
              searchBy = JSON.parse(payload[key]);
            } else if (Array.isArray(payload[key])) {
              searchBy = payload[key];
            } else {
              searchBy = [];
            }
            searchBy.forEach((element) => {
              delete element.id;
              delete element.slug;
            });
            payload[key] = JSON.stringify(searchBy);
            getPropertiesURL += `${key}=${payload[key]}&`;
          } else {
            getPropertiesURL += `${key}=${payload[key]}&`;
          }
        }
      }
    }
    setLoading(true);
    fetch(getPropertiesURL)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          const propertiesDup = res.data.properties.data;
          setProperties([...propertiesDup]);
          setProjectAmenities(res.data.amenities);
          setTotalProperties(res.data.properties.meta.total);
          setOriginalMarkers([...propertiesDup]);
          setLinks(res.data.properties.links);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);

  useEffect(() => {
    setForm({ ...form, sortBy });
  }, [sortBy]);

  useEffect(() => {
    const newArray3 = projectAmenities?.map((originalObject, index) => {
      const label = originalObject.name;
      const value = originalObject.id;
      return { label, value };
    });
    setNewArrayF(projectAmenities);
  }, []);
  useEffect(() => {
    const newArray3 = projectAmenities?.map((originalObject, index) => {
      const label = originalObject.name;
      const value = originalObject.id;
      return { label, value };
    });
    setNewArrayF(newArray3);
  }, projectAmenities);
  function isEmptyObject() {
    const o = { ...form };
    delete o.sortBy;
    if(o.category === "buy"){

      delete o.category;
    }else{
      
    }
    if(o.completion_status_id == 286){
      delete o.completion_status_id;
    }else{
      
    }
    const result =  Object.keys(o).every(function (x) {
      if (Array.isArray(o[x])) {
        return o[x].length > 0 ? false : true;
      } else {
        return o[x] === "" || o[x] === null;
      }
    });
    return result;
  }

  const handleReset = () => {
    setIsCommercial(false);
    setForm((prevForm) => ({
      ...prevForm,
      isCommercial: "",
    }));
    form["minprice"] = "";
    form["maxprice"] = "";
    form["minarea"] = "";
    form["maxarea"] = "";
    form["furnishing"] = "";
    form["bedrooms"] = "";
    form["accommodation_id"] = "";
    form["completion_status_id"] = 286;
    form["category"] = "buy";
    form["bathroom"] = "";
    form["searchBy"] = "";
    form["amenities"] = "";
    form["isCommercial"] = "";
    //console.log(form.furnishing);
    setForm({ ...form });

    setSelectedItems([]);
    selectRef.current.setValue([]);
    if (minPriceRef.current != null) {
      minPriceRef.current.value = "";
    }
    if (maxPriceRef.current != null) {
      maxPriceRef.current.value = "";
    }
    if (minAreaRef.current != null) {
      minAreaRef.current.value = "";
    }
    if (maxAreaRef.current != null) {
      maxAreaRef.current.value = "";
    }
  };
  const handleChange = (e) => {
    form[e.target.name] = e.target.value;
    if (form.category == "rent" || form.category == "all") {
      form.completion_status_id = "";
    }
    setForm({ ...form });
  };

  const handleViewChange = (e) => {};

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

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

  const filteredOptions = newArrayF?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setForm({ ...form, amenities: [...selectedItems] });
  }, [selectedItems]);

  const handleCheckboxChange = (value) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.includes(value);

      if (isSelected) {
        return prevSelectedItems.filter((item) => item !== value);
      }
      return [...prevSelectedItems, value];
    });
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

  const showAreaResetButton = () => {
    if (
      (minAreaRef.current && minAreaRef.current.value) ||
      (maxAreaRef.current && maxAreaRef.current.value)
    ) {
      return true;
    }
    return false;
  };

  const loadOptions = (inputValue, callback) => {
    setNoMessage(inputValue ? false : true);
    if (inputValue) {
      setShowSelectedValues(false);
    }

    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const apiUrl =
      process.env.API_HOST + "propertyPageSearch?keyword=" + inputValue;

    ongoingRequests.map((onGoingRequest) =>
      onGoingRequest.abortController.abort()
    );
    if (!inputValue) {
      setNewArray([]);
      callback([]);
      return;
    }
    ongoingRequests.push({ url: apiUrl, abortController });
    setOngoingRequests([...ongoingRequests]);

    fetch(apiUrl, { signal: abortSignal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data = data.data.slice(0, 7);
        callback(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          console.error("Fetch error:", error);
        }
        callback([]);
      });
  };
  return (
    <>
      {isMobileDev && (
        <>
          <nav className="navbar bg-white mobItemLink ">
            <div className="container justify-content-start">
              <div className="col-4">
                <img
                  src="/images/icons/menu.png"
                  alt="Range Internation Property Investments"
                  className="img-fluid navMobMen cursor-pointer"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight2"
                  width="25"
                />
                <div
                  className="offcanvas offcanvas-start"
                  tabIndex={-1}
                  id="offcanvasRight2"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <div className="">
                      <Link href={{ pathname: "/" }} className="navbar-brand">
                        <img
                          src="/images/logo_blue.png"
                          alt="Range Internation Property Investments"
                          className="img-fluid navMobLogo"
                          width="175"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        ref={closeRef}
                      ></button>
                    </div>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="list-unstyled dropList">
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/properties"
                          onClick={() => closeRef.current.click()}
                        >
                          Properties
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/projects"
                          onClick={() => closeRef.current.click()}
                        >
                          Projects
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/communities"
                          onClick={() => closeRef.current.click()}
                        >
                          Communities
                        </Link>
                      </li>

                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/developers"
                          onClick={() => closeRef.current.click()}
                        >
                          Developers
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/teams"
                          onClick={() => closeRef.current.click()}
                        >
                          Meet the Team
                        </Link>
                      </li>

                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/about"
                          onClick={() => closeRef.current.click()}
                        >
                          About Range
                        </Link>
                      </li>

                      <li className="nav-item py-3 border-bottom">
                        <Link
                          className="nav-link"
                          href="/goldenVisa"
                          onClick={() => closeRef.current.click()}
                        >
                          Golden Visa
                        </Link>
                      </li>

                      <li className="nav-item py-3 border-bottom">
                        <Link
                          className="nav-link"
                          href="/careers"
                          onClick={() => closeRef.current.click()}
                        >
                          Career
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom">
                        <Link
                          className="nav-link"
                          href="/medias"
                          onClick={() => closeRef.current.click()}
                        >
                          Media
                        </Link>
                      </li>
                      {/* <li className="nav-item py-3 border-bottom" >
                          <Link className="nav-link" href="/blogs" onClick={() => closeRef.current.click()}>
                            Blogs and News
                          </Link>
                        </li> */}
                      <li className="nav-item py-3 border-bottom">
                        <Link
                          className="nav-link"
                          href="/dubaiGuide"
                          onClick={() => closeRef.current.click()}
                        >
                          Dubai Guide
                        </Link>
                      </li>
                      {/* <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Investment Guide
                          </a>
                        </li> */}
                      <li className="nav-item py-3 border-bottom">
                        <Link
                          className="nav-link"
                          href="/faqs"
                          onClick={() => closeRef.current.click()}
                        >
                          FAQ's
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <Link href={{ pathname: "/" }} className="navbar-brand">
                  <img
                    src="/images/logo_blue.png"
                    alt="Range Internation Property Investments"
                    className="img-fluid navMobLogo"
                    width="175"
                  />
                </Link>
              </div>
              <div className="col-4">
                <img
                  src="/images/icons/filter.png"
                  alt="Range Internation Property Investments"
                  className="img-fluid navMobMen cursor-pointer float-end"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight1"
                  width="25"
                />
                <div
                  className="offcanvas offcanvas-end"
                  tabIndex={-1}
                  id="offcanvasRight1"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header border-bottom ">
                    <div className="">Filters</div>
                    <div className="my-auto">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        ref={closeRef}
                      ></button>
                    </div>
                  </div>
                  <div className="offcanvas-body ">
                    <div className="row g-3">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic checkbox toggle button group"
                      >
                        <input
                          type="checkbox"
                          name="category"
                          value="all"
                          checked={form.category === "all"}
                          onChange={handleChange}
                          className="btn-check"
                          id="btncheck1"
                        />
                        <label class="btn btn-outline-primary" for="btncheck1">
                          Any
                        </label>

                        <input
                          type="checkbox"
                          name="category"
                          value="buy"
                          checked={form.category === "buy"}
                          onChange={handleChange}
                          className="btn-check"
                          id="btncheck2"
                        />
                        <label class="btn btn-outline-primary" for="btncheck2">
                          Buy
                        </label>

                        <input
                          type="checkbox"
                          name="category"
                          value="rent"
                          checked={form.category === "rent"}
                          onChange={handleChange}
                          className="btn-check"
                          id="btncheck3"
                        />
                        <label class="btn btn-outline-primary" for="btncheck3">
                          Rent
                        </label>
                      </div>

                      {form.category && form.category == "buy" && (
                        <>
                          <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic checkbox toggle button group"
                          >
                            <input
                              type="checkbox"
                              name="completion_status_id"
                              value="all"
                              checked={form.completion_status_id === "all"}
                              onChange={handleChange}
                              className="btn-check"
                              id="btncheck6"
                            />
                            <label
                              class="btn btn-outline-primary"
                              for="btncheck6"
                            >
                              Any
                            </label>

                            <input
                              type="checkbox"
                              name="completion_status_id"
                              value="286"
                              checked={form.completion_status_id === 286}
                              onChange={handleChange}
                              className="btn-check"
                              id="btncheck5"
                            />
                            <label
                              className="btn btn-outline-primary"
                              for="btncheck5"
                            >
                              Ready
                            </label>

                            <input
                              type="checkbox"
                              name="completion_status_id"
                              value="287"
                              checked={form.completion_status_id === 287}
                              onChange={handleChange}
                              className="btn-check"
                              id="btncheck4"
                            />
                            <label
                              class="btn btn-outline-primary"
                              for="btncheck4"
                            >
                              Off-Plan
                            </label>
                          </div>
                        </>
                      )}

                      <div className="col-md-2">
                        <select
                          onChange={handleChange}
                          value={form.accommodation_id}
                          name="accommodation_id"
                          id="accomodation"
                          className="form-select bedroomSelect"
                        >
                          <option value=""> Property Type</option>
                          {filteredAccomodation?.map((accomodation) => (
                            <option
                              key={accomodation.id}
                              value={accomodation.id}
                            >
                              {accomodation.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {!isCommercial && (
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic checkbox toggle button group"
                        >
                          <input
                            type="checkbox"
                            name="furnishing"
                            value="0"
                            checked={form.furnishing === "0"}
                            onChange={handleChange}
                            className="btn-check"
                            id="btncheck8"
                          />
                          <label
                            class="btn btn-outline-primary"
                            for="btncheck8"
                          >
                            Furnished
                          </label>

                          <input
                            type="checkbox"
                            name="furnishing"
                            value="1"
                            checked={form.furnishing === "1"}
                            onChange={handleChange}
                            className="btn-check"
                            id="btncheck9"
                          />
                          <label
                            class="btn btn-outline-primary"
                            for="btncheck9"
                          >
                            Unfurnished
                          </label>

                          <input
                            type="checkbox"
                            name="furnishing"
                            value="partly"
                            checked={form.furnishing === "partly"}
                            onChange={handleChange}
                            className="btn-check"
                            id="btncheck10"
                          />
                          <label
                            class="btn btn-outline-primary"
                            for="btncheck10"
                          >
                            Partly Furnished
                          </label>
                        </div>
                      )}

                      <div className="col-lg-2">
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
                          <option value="Studio">Studio</option>
                        </select>
                      </div>

                      {!isCommercial && (
                        <div className="col-lg-2">
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
                      <div
                        className={`base-class ${
                          form.category && form.category != "rent"
                            ? "col-md-1"
                            : "col-md-2"
                        }`}
                      >
                        <div className="dropdown">
                          <div
                            className="form-select"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                          >
                            {form.minprice || form.maxprice
                              ? `${form.minprice} ${
                                  form.minprice && form.maxprice && "-"
                                } ${form.maxprice} AED`
                              : "Price"}
                            {}
                          </div>
                          <div className="dropdown-menu p-4">
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



                      <div className="col-lg-3">
                        <div className="dropdown">
                          <div
                            className="form-select"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                          >
                            {form.minarea && form.maxarea
                              ? `${form.minarea} ${
                                  form.minarea && form.maxarea && "-"
                                } ${form.maxarea} `
                              : "Area(Sq.Ft)"}
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
                                {showAreaResetButton() && (
                                  <button
                                    className="btn btn-secondary btn-sm col-md"
                                    type="button"
                                    onClick={resetApplyArea}
                                  >
                                    Reset
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3">
                        <div className="row g-0">
                          <div className="col-12 vertical-scrollable-container" >
                            {filteredOptions?.map((option) => (
                              <div key={option.value} className="d-inline-block px-1">
                                


                          <input
                           key={option.value}
                           id={option.value}
                           type="checkbox"
                           label={highlightMatch(option.label)}
                           checked={selectedItems.includes(option.value)}
                           onChange={() => handleCheckboxChange(option.value)}
                           className="btn-check" // Add a custom class for styling
                          />


                                <label className="btn btn-outline-primary m-0" htmlFor={option.value}>
                                  {highlightMatch(option.label)}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>







                      </div>

                      <div
                        className={`base-class ${
                          form.category && form.category != "rent"
                            ? "col-lg-3"
                            : "col-lg-3"
                        } `}
                      >
                        <div className="form-check col-lg-6">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            onChange={(e) => setIsCommercial(e.target.checked)}
                            checked={isCommercial}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                          >
                            show only Commercial Properties
                          </label>
                        </div>
                        
                        
                      </div>


                      {!isEmptyObject() && (
                          <div className="col-lg-3">
                            <button
                              className="btn btn-sm btn-secondary w-100 "
                              type="button"
                              onClick={handleReset}
                            >
                              Reset
                            </button>
                          </div>
                        )}

                        <div className="col-lg-3">
                          <button
                            className="btn  btn-primary w-100"
                            type="button"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            ref={closeRef}
                          >
                            Show {totalPropertyCount} results
                          </button>
                        </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <form action="" className="">
            <div className="my-2 mobItemLink ">
              <div className="col-10 col-lg-3 mx-auto">
                <AsyncSelect
                  isClearable={false}
                  isMulti
                  placeholder="Search..."
                  onChange={(comm, { action }) => {
                    if (comm != form["searchBy"]) {
                      form["searchBy"] = comm;
                      setForm({ ...form });
                    }
                    if (action === "clear" || action === "remove-value") {
                      setTimeout(() => selectRef.current.blur(), 1);
                    }
                  }}
                  ref={selectRef}
                  styles={{
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      minWidth: "160px",
                    }),
                    valueContainer: (baseStyles, state) => ({
                      ...baseStyles,
                      columnGap: "0.1rem",
                      display: "grid",
                      gridTemplateColumns: hasFocus
                        ? "1fr auto auto 1fr"
                        : "auto auto 1fr",
                    }),
                    multiValue: (baseStyles, state) => ({
                      ...baseStyles,
                      gridColumn: 1,
                    }),
                    input: (baseStyles, state) => ({
                      ...baseStyles,
                      gridColumn: hasFocus ? 1 : "none",
                    }),
                  }}
                  blurInputOnSelect={true}
                  onFocus={() => {
                    setHasFocus(true);
                    setShowSelectedValues(false);
                  }}
                  onBlur={() => {
                    setShowSelectedValues(true);
                    setHasFocus(false);
                  }}
                  controlShouldRenderValue={showSelectedValues}
                  components={{
                    MultiValue,
                    IndicatorsContainer,
                    NoOptionsMessage,
                    MultiValueContainer,
                    Menu,
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.type}
                  name="searchBy"
                  loadOptions={loadOptions}
                  instanceId="searchBy"
                />
              </div>
            </div>
          </form>
        </>
      )}

      {!isMobileDev && (
        <>
          <div className="row row-gap-3 ">
            <div className="col-12 col-lg-3">
              <AsyncSelect
                isClearable={false}
                isMulti
                placeholder="Search..."
                onChange={(comm, { action }) => {
                  if (comm != form["searchBy"]) {
                    form["searchBy"] = comm;
                    setForm({ ...form });
                  }
                  if (action === "clear" || action === "remove-value") {
                    setTimeout(() => selectRef.current.blur(), 1);
                  }
                }}
                ref={selectRef}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    minWidth: "160px",
                  }),
                  valueContainer: (baseStyles, state) => ({
                    ...baseStyles,
                    columnGap: "0.1rem",
                    display: "grid",
                    gridTemplateColumns: hasFocus
                      ? "1fr auto auto 1fr"
                      : "auto auto 1fr",
                  }),
                  multiValue: (baseStyles, state) => ({
                    ...baseStyles,
                    gridColumn: 1,
                  }),
                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    gridColumn: hasFocus ? 1 : "none",
                  }),
                }}
                blurInputOnSelect={true}
                onFocus={() => {
                  setHasFocus(true);
                  setShowSelectedValues(false);
                }}
                onBlur={() => {
                  setShowSelectedValues(true);
                  setHasFocus(false);
                }}
                controlShouldRenderValue={showSelectedValues}
                components={{
                  MultiValue,
                  IndicatorsContainer,
                  NoOptionsMessage,
                  MultiValueContainer,
                  Menu,
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.type}
                name="searchBy"
                loadOptions={loadOptions}
                instanceId="searchBy"
              />
            </div>
            <div
              className={`base-class ${
                form.category && form.category != "" ? "col-md-1" : "col-md-2"
              }`}
            >
              <select
                onChange={handleChange}
                value={form.category}
                name="category"
                id="category"
                className="form-select bedroomSelect"
              >
                <option value="all">Buy/Rent</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            {form.category && form.category == "buy" && (
              <div className="col-md-2">
                <select
                  onChange={handleChange}
                  value={form.completion_status_id}
                  name="completion_status_id"
                  id="completion_status_id"
                  className="form-select bedroomSelect"
                >
                  <option value="all">Completion Status</option>
                  <option value="286">Ready</option>
                  <option value="287">Off-Plan</option>
                </select>
              </div>
            )}
            <div className="col-md-2">
              <select
                onChange={handleChange}
                value={form.accommodation_id}
                name="accommodation_id"
                id="accomodation"
                className="form-select bedroomSelect"
              >
                <option value=""> Property Type</option>
                {filteredAccomodation?.map((accomodation) => (
                  <option key={accomodation.id} value={accomodation.id}>
                    {accomodation.name}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`base-class ${
                form.category && form.category != "rent"
                  ? "col-md-1"
                  : "col-md-2"
              }`}
            >
              <div className="dropdown">
                <div
                  className="form-select"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                >
                  {form.minprice || form.maxprice
                    ? `${form.minprice} ${
                        form.minprice && form.maxprice && "-"
                      } ${form.maxprice} AED`
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
                      min={0}
                      ref={maxPriceRef}
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

            <div
              className={`base-class ${
                form.category && form.category != "rent"
                  ? "col-md-3"
                  : "col-md-3"
              } d-flex align-items-center gap-2 justify-content-end`}
            >
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  onChange={(e) => setIsCommercial(e.target.checked)}
                  checked={isCommercial}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Commercial
                </label>
              </div>
              <button
                className="btn btn-sm btn-primary"
                type="button"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Hide" : "More"}
              </button>
              {!isEmptyObject() && (
                <button
                  className="btn btn-sm btn-secondary"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
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
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="listradio"
                  >
                    List
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showMore && (
        <div className="row mt-3 row-gap-3">
          {!isCommercial && (
            <div className="col-lg-3">
              <Dropdown>
                <Dropdown.Toggle
                  className={`dt form-control form-select ${classes.customDropdown}`}
                  variant=""
                  id="dropdown-basic"
                  as={CustomToggle}
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
                    {filteredOptions?.map((option) => (
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
                  {!!selectedItems.length && (
                    <div className="my-2 d-grid fc">
                      <div
                        className="row justify-content-center"
                        style={{ columnGap: "0.25rem" }}
                      >
                        <button
                          className="btn btn-secondary btn-sm col-md"
                          type="button"
                          onClick={() => setSelectedItems([])}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
          {!isCommercial && (
            <div className="col-lg-2">
              <select
                onChange={handleChange}
                value={form.furnishing}
                name="furnishing"
                id="furnishing"
                className="form-select furnishingSelect"
              >
                <option value="">All Furnishings</option>
                <option value="0">Furnished</option>
                <option value="1">Unfurnished</option>
                <option value="partly">Partly Furnished</option>
              </select>
            </div>
          )}

          <div className="col-lg-2">
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
              <option value="Studio">Studio</option>
            </select>
          </div>
          {!isCommercial && (
            <div className="col-lg-2">
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
          <div className="col-lg-3">
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
                  : "Area(Sq.Ft)"}
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
                    {showAreaResetButton() && (
                      <button
                        className="btn btn-secondary btn-sm col-md"
                        type="button"
                        onClick={resetApplyArea}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Bottombar
        item={showMap ? 0 : 1}
        callBack={(index) =>
          index === 0 ? setShowMap(true) : setShowMap(false)
        }
      />
    </>
  );
}

export default ReadyFilters;

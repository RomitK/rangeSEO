import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { components } from "react-select";
import { Dropdown, FormControl, Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";

import classes from "./Filters.module.css";
import Bottombar from "../UI/BottomNavigationBar";
import CustomToggle from "../UI/CustomSelectToggle";
import MultiValue from "../UI/ReactSelect/MultiValue";
import IndicatorsContainer from "../UI/ReactSelect/IndicatorsContainer";
import MultiValueContainer from "../UI/ReactSelect/MultiValueContainer";
import Link from "next/link";
function Filters({
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
  const [priceList, setPriceList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const closeRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [newArrayF, setNewArrayF] = useState([]);
  const [filteredAccomodation, setFilteredAccomodation] = useState(accomodations);
  const [showNoMessage, setNoMessage] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [showFormReset, setShowFormReset] = useState(false);
  const [formHasValues, setFormHasValues] = useState(false);
  const [showSelectedValues, setShowSelectedValues] = useState(true);
  const [ongoingRequests, setOngoingRequests] = useState([]);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCommercial, setIsCommercial] = useState(false);
  const selectRef = useRef();
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const minAreaRef = useRef(null);
  const maxAreaRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [projectAmenities, setProjectAmenities] = useState(amenities);
  const [showListing, setShowListing] = useState(false);
  const [isMobileDev, setIsMobileDev] = useState(false);
  const router = useRouter();
  const [showDatalist, setShowDatalist] = useState(false);
  
  const handleFocus = () => {
    setShowDatalist(true);
  };

  const handleBlur = () => {
    setShowDatalist(false);
  };
  const [form, setForm] = useState({
    accommodation_id: "",
    bedrooms: "",
    minprice: "",
    maxprice: "",
    minarea: "",
    maxarea: "",
    amenities: "",
    bathroom: "",
    completion_status_id: "",
    isCommercial:"",
    lastUpdated:""
  });
  const priceDropdownRef = useRef(null);

  const [showMinAreaSuggestions, setShowMinAreaSuggestions] = useState(false);
  const [showMaxAreaSuggestions, setShowMaxAreaSuggestions] = useState(false);
  const [selectedMinArea, setSelectedMinArea] = useState("");
  const [selectedMaxArea, setSelectedMaxArea] = useState("");

  const [showMinPriceSuggestions, setShowMinPriceSuggestions] = useState(false);
  const [showMaxPriceSuggestions, setShowMaxPriceSuggestions] = useState(false);
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");

  const handleOnFocusMinimum = () => {
    setShowMinAreaSuggestions(true);
  };

  const handleOnBlurMinimum = () => {
    setTimeout(() => setShowMinAreaSuggestions(false), 200); // Delay hiding to allow click on suggestions
  };

  const handleOnFocusMax = () => {
    setShowMaxAreaSuggestions(true);
  };

  const handleOnBlurMax = () => {
    setTimeout(() => setShowMaxAreaSuggestions(false), 200); // Delay hiding to allow click on suggestions
  };

  const handleMinAreaSelection = (value) => {
    minAreaRef.current.value = value;
    setSelectedMinArea(value);
    // setShowMaxAreaSuggestions(true); // Show suggestions for maximum area
  };

  const handleMaxAreaSelection = (value) => {
    maxAreaRef.current.value = value;
    setSelectedMaxArea(value);
    // setShowMinAreaSuggestions(true); // Show suggestions for minimum area
  };

  const filterMinAreaList = () => {
    return areaList.filter((item) => item < selectedMaxArea);
  };

  const filterMaxAreaList = () => {
    return areaList.filter((item) => item > selectedMinArea);
  };

  // Function to find the minimum value in the priceList
  const findMinPrice = () => {
    if (priceList.length > 0) {
      return Math.min(...priceList);
    }
    return "";
  };

  // Function to find the maximum value in the priceList
  const findMaxPrice = () => {
    if (priceList.length > 0) {
      return Math.max(...priceList);
    }
    return "";
  };

  // Function to find the minimum value in the areaList
  const findMinArea = () => {
    if (areaList.length > 0) {
      return Math.min(...areaList);
    }
    return "";
  };

  // Function to find the maximum value in the areaList
  const findMaxArea = () => {
    if (areaList.length > 0) {
      return Math.max(...areaList);
    }
    return "";
  };

  useEffect(() => {
    // Set the initial value of selectedMinArea to the minimum value of the priceList
    setSelectedMinPrice(findMinPrice());

    // Set the initial value of selectedMaxArea to the maximum value of the priceList
    setSelectedMaxPrice(findMaxPrice());
  }, [priceList]);

  useEffect(() => {
    // Set the initial value of selectedMinArea to the minimum value of the areaList
    setSelectedMinArea(findMinArea());

    // Set the initial value of selectedMaxArea to the maximum value of the areaList
    setSelectedMaxArea(findMaxArea());
  }, [areaList]);

  const handleOnFocusMinimumPrice = () => {
    setShowMinPriceSuggestions(true);
  };

  const handleOnBlurMinimumPrice = () => {
    setTimeout(() => setShowMinPriceSuggestions(false), 200); // Delay hiding to allow click on suggestions
  };

  const handleOnFocusMaxPrice = () => {
    setShowMaxPriceSuggestions(true);
  };

  const handleOnBlurMaxPrice = () => {
    setTimeout(() => setShowMaxPriceSuggestions(false), 200); // Delay hiding to allow click on suggestions
  };

  const handleMinPriceSelection = (value) => {
    minPriceRef.current.value = value;
    setSelectedMinPrice(value);
  };

  const handleMaxPriceSelection = (value) => {
    maxPriceRef.current.value = value;
    setSelectedMaxPrice(value);
  };

  const filterMinPriceList = () => {
    return priceList.filter((item) => item < selectedMaxPrice);
  };

  const filterMaxPriceList = () => {
    return priceList.filter((item) => item > selectedMinPrice);
  };
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

  useEffect(() => {
    let getPropertiesAreaURL = process.env.API_HOST + "projects/areaList";
    let getPropertiesPriceURL =
      process.env.API_HOST + "projects/priceList";

    setLoading(true);
    fetch(getPropertiesAreaURL)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setAreaList(res.data.formattedNumbers);
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle the error response object
      })
      .finally(() => {
        setLoading(false);
      });

    fetch(getPropertiesPriceURL)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setPriceList(res.data.formattedNumbers);
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle the error response object
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  useEffect (()=>{
    let getPropertiesURL = process.env.API_HOST + "projects/priceList";
   
    setLoading(true);
    fetch(getPropertiesURL)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setPriceList(res.data.formattedNumbers)
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle the error response object
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (isCommercial) {
      form['isCommercial'] = 1;
      form['accommodation_id'] = "";
      setForm({ ...form });

      const filtered = accomodations?.filter(
        (accomodation) =>
          accomodation.type === "Commercial" || accomodation.type === "Both"
      );
      if (filtered != null) {
        setFilteredAccomodation([...filtered]);
      }
    } else {
      setIsCommercial(false)      
      form['isCommercial'] = "";
      if(searchParams.has('accommodation_id')){
        form['accommodation_id'] = searchParams.get('accommodation_id');
      }else{
        form['accommodation_id'] = "";
      }

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
    if (searchParams.has("minprice") && searchParams.has("maxprice")) {
      form["minprice"] = searchParams.get("minprice");
      form["maxprice"] = searchParams.get("maxprice");

      if (minPriceRef.current != null) {
        minPriceRef.current.value = searchParams.get("minprice") || '';
      }
      if (maxPriceRef.current != null) {
        maxPriceRef.current.value = searchParams.get("maxprice") || '';
      }
      setForm({ ...form });
      setShowMore(true);
    }
    // if(searchParams.has('completion_status_id') && searchParams.has('accommodation_id')){
    //   form['completion_status_id'] =searchParams.get('completion_status_id');
    //   form['accommodation_id'] = searchParams.get('accommodation_id');
    //   setForm({ ...form });
    // }

    // if(searchParams.has('accommodation_id')){
    //   form['accommodation_id'] = searchParams.get('accommodation_id');
    //   setForm({ ...form });
    // }

    if (
      searchParams.has("developer_name") &&
      searchParams.has("developer_detail") && 
      searchParams.has('completion_status_id') && searchParams.has('accommodation_id')
    ) {
      console.log('searchParam')
      form['completion_status_id'] =searchParams.get('completion_status_id');
      form['accommodation_id'] = searchParams.get('accommodation_id');

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
      if(searchParams.has('lisiting')){
        setShowListing(true)
      }
    }
  }, []);
  function isEmptyObject() {
    const o = { ...form };
    return Object.keys(o).every(function (x) {
      if (Array.isArray(o[x])) {
        return o[x].length > 0 ? false : true;
      } else {
        return o[x] === "" || o[x] === null;
      }
    });
  }

  const handleReset = () => {
    setIsCommercial(false);
    setForm(prevForm => ({
      ...prevForm,
      isCommercial: ""
    }));
    setForm(prevForm => ({
      ...prevForm,
      maxprice: ""
    }));
    setForm(prevForm => ({
      ...prevForm,
      minprice: ""
    }));

    setForm(prevForm => ({
      ...prevForm,
      minarea: ""
    }));
    setForm(prevForm => ({
      ...prevForm,
      maxarea: ""
    }));
    form["furnishing"] = "";
    form["bedrooms"] = "";
    form["accommodation_id"] = "";
    form["completion_status_id"] = "";
    form["bathroom"] = "";
    form["searchBy"] = "";
    form["amenities"] = "";
    form["isCommercial"] ="";
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

     // Set the initial value of selectedMinArea to the minimum value of the priceList
     setSelectedMinPrice(findMinPrice());

     // Set the initial value of selectedMaxArea to the maximum value of the priceList
     setSelectedMaxPrice(findMaxPrice());
 
     // Set the initial value of selectedMinArea to the minimum value of the areaList
     setSelectedMinArea(findMinArea());
 
     // Set the initial value of selectedMaxArea to the maximum value of the areaList
     setSelectedMaxArea(findMaxArea());
  };
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
    if (isMobile && showMap) {
      setShowMap(false);
    }
  }, [isMobile]);

  useEffect(() => {
    let getPropertiesURL = process.env.API_HOST + "projects?";
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
          const propertiesDup = res.data.projects.data;
          setProperties([...propertiesDup]);
          setProjectAmenities(res.data.amenities);
          setTotalProperties(res.data.projects.meta.total);
          setOriginalMarkers([...propertiesDup]);
          setLinks(res.data.projects.links);
          
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
    setNewArrayF(newArray3);
  }, []);
  useEffect(() => {
    const newArray3 = projectAmenities?.map((originalObject, index) => {
      const label = originalObject.name;
      const value = originalObject.id;
      return { label, value };
    });
    setNewArrayF(newArray3);
  }, projectAmenities);
  const redirectListing = (e) =>{
    if(showListing && form.lastUpdated !== 'completion_status_id'){

      const searchParams = new URLSearchParams({
        accommodation_id: form.accommodation_id,
        bedrooms: form.bedrooms,
        minprice: form.minprice,
        maxprice: form.maxprice,
        minarea: form.minarea,
        maxarea: form.maxarea,
        amenities: form.amenities,
        bathroom: form.bathroom,
        searchBy:JSON.stringify(form.searchBy)
      }).toString();
      
      const url = `properties?${searchParams}`;
      router.push(url);
    }
  }

  useEffect(() => {
    if (showListing) {
      redirectListing(form);
    }
  }, [form.minprice, form.maxprice, form.minarea, form.maxarea]);
  
  const handleChange = (e) => {
    form[e.target.name] = e.target.value;
    setForm({ ...form });
    if(showListing){
      form['lastUpdated'] =e.target.name;
     redirectListing(form);
    }
  };

  const handleViewChange = (e) => {};

  const handleApplyPrice = () => {
    const dropdownMenu = document.querySelector("#priceDiv");
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }
    setForm({
      ...form,
      minprice: minPriceRef.current.value,
      maxprice: maxPriceRef.current.value,
    });
    if(showListing){
      redirectListing(form);
    }
  };
  const resetApplyPrice = () => {
    form["minprice"] = "";
    form["maxprice"] = "";
    setForm({ ...form });
    minPriceRef.current.value = "";
    maxPriceRef.current.value = "";
    // Set the initial value of selectedMinArea to the minimum value of the priceList
    setSelectedMinPrice(findMinPrice());

    // Set the initial value of selectedMaxArea to the maximum value of the priceList
    setSelectedMaxPrice(findMaxPrice());
  };

  const handleApplyArea = () => {
    const dropdownMenu = document.querySelector("#areaDiv");
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }
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

    // Set the initial value of selectedMinArea to the minimum value of the areaList
    setSelectedMinArea(findMinArea());

    // Set the initial value of selectedMaxArea to the maximum value of the areaList
    setSelectedMaxArea(findMaxArea());
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
      process.env.API_HOST + "projectPageSearch?keyword=" + inputValue;

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
  const handlePositiveChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = numericValue;
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
                          href="/dubaiGuides"
                          onClick={() => closeRef.current.click()}
                        >
                          Dubai Guides
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
                          name="completion_status_id"
                          value=""
                          checked={form.completion_status_id === ""}
                          onChange={handleChange}
                          className="btn-check"
                          id="btncheck1"
                        />
                        <label class="btn btn-outline-primary" htmlFor="btncheck1">
                          Any
                        </label>

                        <input
                          type="checkbox"
                          name="completion_status_id"
                          value="289"
                          checked={form.completion_status_id === "289"}
                          onChange={handleChange}
                          className="btn-check"
                          id="btncheck2"
                        />
                        <label class="btn btn-outline-primary" htmlFor="btncheck2">
                          Under Construction
                        </label>

                        <input
                          type="checkbox"
                          name="completion_status_id"
                          value="290"
                          checked={form.completion_status_id === "290"}
                          onChange={handleChange}
                          className="btn-check"
                          id="btncheck3"
                        />
                        <label class="btn btn-outline-primary" htmlFor="btncheck3">
                        Completed
                        </label>
                      </div>

                     
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

                     
             
                      <div
                        className={`base-class ${
                          form.category && form.category != "rent"
                            ? "col-md-1"
                            : "col-md-2"
                        }`}
                      >
                        <div className="dropdown-menu p-4" id="priceDiv">
                            <div className="row">
                              <div className="mb-3 col-6">
                                <label className="form-label" htmlFor="minprice">
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
                                  onFocus={handleOnFocusMinimumPrice}
                                  onBlur={handleOnBlurMinimumPrice}
                                />
                                {showMinPriceSuggestions && (
                                  <div id="area-suggestion-box">
                                    <div id="area-suggestion">
                                      {filterMinPriceList().map((item, key) => (
                                        <button
                                          className="btn area-buttons"
                                          key={key}
                                          onClick={() =>
                                            handleMinPriceSelection(item)
                                          }
                                        >
                                          {item}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="mb-3 col-6">
                                <label className="form-label" htmlFor="maxprice">
                                  Maximum Price
                                </label>
                                <input
                                  type="number"
                                  name="maxprice"
                                  className="form-control"
                                  id="maxprice"
                                  min={0}
                                  ref={maxPriceRef}
                                  onFocus={handleOnFocusMaxPrice}
                                  onBlur={handleOnBlurMaxPrice}
                                />
                                {showMaxPriceSuggestions && (
                                  <div id="area-suggestion-box">
                                    <div id="area-suggestion">
                                      {filterMaxPriceList().map((item, key) => (
                                        <button
                                          className="btn area-buttons"
                                          key={key}
                                          onClick={() =>
                                            handleMaxPriceSelection(item)
                                          }
                                        >
                                          {item}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
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
                                } ${form.maxarea} (Sq.Ft)`
                              : "Area(Sq.Ft)"}
                            {}
                          </div>
                          <div className="dropdown-menu p-4" id="areaDiv">
                            <div className="row">
                              {" "}
                              <div className="mb-3 col-6">
                                <label className="form-label" htmlFor="minarea">
                                  Minimum Area
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="minarea"
                                  min={0}
                                  placeholder="0"
                                  name="minarea"
                                  ref={minAreaRef}
                                  onFocus={handleOnFocusMinimum}
                                  onBlur={handleOnBlurMinimum}
                                />
                                {showMinAreaSuggestions && (
                                  <div id="area-suggestion-box">
                                    <div id="area-suggestion">
                                      {filterMinAreaList().map((item, key) => (
                                        <button
                                          className="btn area-buttons"
                                          key={key}
                                          onClick={() =>
                                            handleMinAreaSelection(item)
                                          }
                                        >
                                          {item}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="mb-3 col-6">
                                <label className="form-label" htmlFor="maxarea">
                                  Maximum Area
                                </label>
                                <input
                                  type="number"
                                  name="maxarea"
                                  className="form-control"
                                  id="maxarea"
                                  placeholder=""
                                  ref={maxAreaRef}
                                  onFocus={handleOnFocusMax}
                                  onBlur={handleOnBlurMax}
                                />
                                {showMaxAreaSuggestions && (
                                  <div id="area-suggestion-box">
                                    <div id="area-suggestion">
                                      {filterMaxAreaList().map((item, key) => (
                                        <button
                                          className="btn area-buttons"
                                          key={key}
                                          onClick={() =>
                                            handleMaxAreaSelection(item)
                                          }
                                        >
                                          {item}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="mt-4 d-grid">
                                <div
                                  className="row justify-content-center"
                                  style={{ columnGap: "0.25rem" }}
                                >
                                  <button
                                    className="btn btn-primary btn-sm col"
                                    type="button"
                                    onClick={handleApplyArea}
                                  >
                                    Apply
                                  </button>
                                  {showAreaResetButton() && (
                                    <button
                                      className="btn btn-secondary btn-sm col"
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
                      <br/>
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
                        className={`base-class`}
                      >
                        <br/>
                        <div className="form-check col-lg-6">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck11"
                            onChange={(e) => setIsCommercial(e.target.checked)}
                            checked={isCommercial}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleCheck11"
                          >
                            show only Commercial Projects
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
      <div className="row row-gap-3">
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
            // placeholder="Search By Developers and  Communities"
          />
        </div>

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
            <option value="Studio">Studio</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            onChange={handleChange}
            value={form.completion_status_id}
            name="completion_status_id"
            id="completion_status_id"
            className="form-select bedroomSelect"
          >
            <option value="">Project Status</option>
            <option value="289">Under Construction</option>
            <option value="290">Completed</option>
          </select>
        </div>

        <div className="col-md-3 d-flex align-items-center gap-2 justify-content-end">
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
              <label className="btn btn-outline-primary" htmlFor="listradio">
                List
              </label>
            </div>
          </div>
        </div>
        {showMore && (
          <div className="row mt-3 row-gap-3">
            <div className="col-md-3">
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
            <div className="col-md-2">
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
                <div className="dropdown-menu p-4" id="priceDiv">
                  <div className="row">
                    {" "}
                    <div className="mb-3 col-6">
                      <label className="form-label" htmlFor="minprice">Minimum Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="minprice"
                        min={0}
                        placeholder="0"
                        name="minprice"
                        ref={minPriceRef}
                        onFocus={handleOnFocusMinimumPrice}
                        onBlur={handleOnBlurMinimumPrice}
                      />
                      {showMinPriceSuggestions && (
                        <div id="area-suggestion-box">
                          <div id="area-suggestion">
                            {filterMinPriceList().map((item, key) => (
                              <button
                                className="btn area-buttons"
                                key={key}
                                onClick={() => handleMinPriceSelection(item)}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label" htmlFor="maxprice">Maximum Price</label>
                      <input
                        type="number"
                        name="maxprice"
                        className="form-control"
                        id="maxprice"
                        min={0}
                        ref={maxPriceRef}
                        onFocus={handleOnFocusMaxPrice}
                        onBlur={handleOnBlurMaxPrice}
                      />
                      {showMaxPriceSuggestions && (
                        <div id="area-suggestion-box">
                          <div id="area-suggestion">
                            {filterMaxPriceList().map((item, key) => (
                              <button
                                className="btn area-buttons"
                                key={key}
                                onClick={() => handleMaxPriceSelection(item)}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
            </div>
            <div className="col-md-2">
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
                    } (Sq.Ft)`
                  : "Area(Sq.Ft)"}
                {}
              </div>
              <div className="dropdown-menu p-4" id="areaDiv">
                <div className="row">
                  {" "}
                  <div className="mb-3 col-6">
                    <label className="form-label" htmlFor="minarea">Minimum Area</label>
                    <input
                      type="number"
                      className="form-control"
                      id="minarea"
                      min={0}
                      placeholder="0"
                      name="minarea"
                      ref={minAreaRef}
                      onChange={handlePositiveChange}
                      onFocus={handleOnFocusMinimum}
                      onBlur={handleOnBlurMinimum}
                    />
                    {showMinAreaSuggestions && (
                      <div id="area-suggestion-box">
                        <div id="area-suggestion">
                          {filterMinAreaList().map((item, key) => (
                            <button
                              className="btn area-buttons"
                              key={key}
                              onClick={() => handleMinAreaSelection(item)}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-6">
                    <label className="form-label" htmlFor="maxarea">Maximum Area</label>
                    <input
                      type="number"
                      name="maxarea"
                      className="form-control"
                      id="maxarea"
                      placeholder=""
                      ref={maxAreaRef}
                      onChange={handlePositiveChange}
                      onFocus={handleOnFocusMax}
                      onBlur={handleOnBlurMax}
                    />
                    {showMaxAreaSuggestions && (
                      <div id="area-suggestion-box">
                        <div id="area-suggestion">
                          {filterMaxAreaList().map((item, key) => (
                            <button
                              className="btn area-buttons"
                              key={key}
                              onClick={() => handleMaxAreaSelection(item)}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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
            {showFormReset && (
              <button className="col-md-1 btn btn-primary btn-md col">
                Reset
              </button>
            )}
          </div>
        )}
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

export default Filters;

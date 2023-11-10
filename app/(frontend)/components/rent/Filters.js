import { useState, useEffect, useRef } from "react";
import Bottombar from "./BottomNavigationBar";

function Filters({ setShowMap, showMap, setProperties, setOriginalMarkers, mapRef }) {
    const [form, setForm] = useState({
        accommodation_id: "",
        community: "",
        bedrooms: "",
        minprice: "",
        maxprice: "",
        amenity_id: "",
        bathroom: "",
        area: "",
        category: "rent",
    });

    const [accomodations, setAccomodataions] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const minPriceRef = useRef(null);
    const maxPriceRef = useRef(null);

    useEffect(() => {
        fetch("https://rangenew.websitedemo.world/api/accommodations")
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    setAccomodataions([...res.data]);
                }
            })
            .catch((e) => {
                console.log(e, "error getting accomodations");
            });

        fetch("https://rangenew.websitedemo.world/api/communities")
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    setCommunities([...res.data]);
                }
            })
            .catch((e) => {
                console.log(e, "error getting communities");
            });

        fetch("https://rangenew.websitedemo.world/api/amenities")
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    setAmenities([...res.data]);
                }
            })
            .catch((e) => {
                console.log(e, "error getting amenities");
            });
    }, []);

    useEffect(() => {
        let getPropertiesURL = "https://rangenew.websitedemo.world/api/properties?";
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

    const handleChange = (e) => {
        console.log(e.target.id);
        form[e.target.name] = e.target.value;
        setForm({ ...form });
    };

    const handleViewChange = (e) => {
        console.log(e.target.value);
    };

    const handleApplyPrice = () => {
        setForm({ ...form, minprice: minPriceRef.current.value, maxprice: maxPriceRef.current.value });
    };

    return (
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
                        <option value="">Select Community</option>
                        {communities.map((community) => (
                            <option key={community.id} value={community.id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <select
                        onChange={handleChange}
                        value={form.category}
                        name="category"
                        id="category"
                        className="form-select bedroomSelect"
                        disabled=""
                    >
                        <option value="">Select Category</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                        <option value="sale">Sale</option>
                        <option value="offplan">Off Plan</option>
                        <option value="ready">Ready</option>
                    </select>
                </div>
                <div className="col">
                    <select
                        onChange={handleChange}
                        value={form.accommodation_id}
                        name="accommodation_id"
                        id="accomodation"
                        className="form-select bedroomSelect"
                    >
                        <option value="">Select Accomodation</option>
                        {accomodations.map((accomodation) => (
                            <option key={accomodation.id} value={accomodation.id}>
                                {accomodation.name}
                            </option>
                        ))}
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
                            {form.minprice && form.maxprice
                                ? `${form.minprice} ${form.minprice && form.maxprice && "-"} ${form.maxprice} AED`
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
                                <button className="btn btn-primary btn-lg" type="button" onClick={handleApplyPrice}>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col d-flex align-items-center justify-content-end">
                    <button className="btn btn-primary btn-lg" type="button" onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Hide" : "More"}
                    </button>
                    <div className="form-check d-none d-sm-block">
                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
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
                    <div className="col">
                        <select
                            onChange={handleChange}
                            value={form.amenity_id}
                            name="amenity_id"
                            id="amenity"
                            className="form-select amenitySelect"
                        >
                            <option value="">Select Amenity</option>
                            {amenities.map((amenity) => (
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
                    <div className="col">
                        <input
                            value={form.area}
                            type="number"
                            name="area"
                            onChange={handleChange}
                            className="form-control"
                            id="area"
                            placeholder="Area"
                        />
                    </div>
                </div>
            )}
            <Bottombar item={0} callBack={(index) => (index === 0 ? setShowMap(true) : setShowMap(false))} />
        </form>
    );
}

export default Filters;

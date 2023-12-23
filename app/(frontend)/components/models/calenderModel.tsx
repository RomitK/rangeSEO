import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import { getCurrentUrl } from "@/src/utils/helpers/common";
function CalenderModel() {
  const initialState = {
    name: "",
    email: "",
    message: "",
    phone: "",
    date: "",
    time: "",
    formName: "bookACall",
    page: getCurrentUrl(),
  };
  const [startDate, setStartDate] = useState(null);
  const [minDate, setMinDate] = useState(new Date());
  const [confirm, setConfirm] = useState(false);
  const closeRef = useRef(null);
  const timeOptions = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
  ];

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = () => {
    console.log(formData);
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error("Please fill required field");
    }
    closeRef.current.click();
    saveContactFormApi(formData)
      .then((res) => {
        setFormData(initialState);
        setStartDate(null);
        setConfirm(false);
        toast.success(
          "Enquire form submitted successfully, out support teams contact you soon"
        );
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };
  return (
    <div
      className="modal fade"
      id="bookAmeeting"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className={`modal-dialog  modal-dialog-centered modal-lg modalBookMeet ${
          startDate ? "modalBookView" : ""
        } `}
      >
        <div className="modal-content">
          {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
          <div className="modal-header border-0 justify-content-end p-1">
            <button
              type="button"
              className="bg-transparent border-0"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setFormData(initialState);
                setStartDate(null);
                setConfirm(false);
              }}
              ref={closeRef}
            >
              <i className="bi bi-x-circle text-primary"></i>
            </button>
          </div>
          <div className="modal-body  p-0 rounded-1 m-2">
            <div className="row g-0">
              {(!startDate || confirm) && (
                <div className="col-12 col-lg-5 col-md-12 border-end descricalenderCol">
                  <div className="border-bottom">
                    <div className="p-3">
                      <img
                        src="/images/logo_blue.png"
                        alt="Range Property"
                        className="img-fluid"
                        width="150"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="agent-img mt-2">
                      <img
                        src="/images/videocall.webp"
                        alt="Range Property"
                        className="agent-img"
                      />
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                    <h4 className="fs-18">Spend a Day with Range</h4>
                      {/* <p>
                        <i className="fa fa-clock-o" aria-hidden="true"></i> 30
                        Min
                      </p> */}
                      <p>          
                        An experience its exclusive concierge service
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`col-12 ${
                  startDate && !confirm ? "col-lg-12" : "col-lg-7"
                }  col-md-12 calenderCol `}
              >
                <div className="calenderDiv p-4">
                  <form id="bookAviewing" action="" method="POST">
                    <input
                      id="formFrom"
                      name="formFrom"
                      type="hidden"
                      value="Book A Viewing"
                      required
                    />
                    {!confirm && (
                      <div className="step-1">
                        <div className="row">
                          <div className="col-md-12">
                            <h5 className="text-start">Select a Date & Time</h5>
                          </div>

                          <div
                            className={` ${
                              startDate ? "col-md-7" : "col-md-12"
                            } newcol py-2`}
                          >
                            <DatePicker
                              id="calendar"
                              inline
                              minDate={minDate}
                              selected={startDate ?? new Date()}
                              onChange={(date) => {
                                setStartDate(date);
                                setFormData({ ...formData, date: startDate });
                              }}
                            />
                          </div>
                          {startDate && (
                            <div className="col-md-5">
                              <div className="timepic">
                                <b>
                                  <p className="ths_date">
                                    {startDate.toDateString()}
                                  </p>
                                </b>

                                <div className="listitem">
                                  {timeOptions.map((item, index) => {
                                    return (
                                      <div
                                        className={`pickitem ${
                                          formData.time == item ? "active" : ""
                                        }`}
                                        key={"pickitem" + index}
                                      >
                                        <button
                                          type="button"
                                          className="timeitem"
                                          onClick={() =>
                                            setFormData({
                                              ...formData,
                                              time: item,
                                            })
                                          }
                                        >
                                          {item}
                                        </button>
                                        {formData.time == item && (
                                          <button
                                            className="confirm-button"
                                            type="button"
                                            onClick={() => setConfirm(true)}
                                          >
                                            Confirm
                                          </button>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {confirm && (
                      <div className="step-2 ">
                        <div className="row">
                          <div className="col-md-12">
                            <h6 className="text-primary">Enter Details</h6>
                            <div className="form-group mb-2">
                              <input
                                type="text"
                                name="nameCon2"
                                id="nameCon2"
                                className="form-control"
                                placeholder="Enter your name"
                                autoComplete="off"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="form-group mb-2">
                              <input
                                type="email"
                                name="emailCon2"
                                id="emailCon2"
                                className="form-control"
                                placeholder="Enter your email"
                                autoComplete="off"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div className="form-group mb-2">
                              
                              <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                className="form-control "
                                defaultCountry="AE"
                                placeholder="Enter Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e })}
                                style={{ border: "0px" }}
                                required
                              />
                            </div>
                            <div className="form-group mb-2">
                              <textarea
                                name="messageCon2"
                                id="messageCon2"
                                className="form-control "
                                placeholder="Message"
                                autoComplete={"off"}
                                value={formData.message}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    message: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="button"
                            name="submit"
                            className="btn btn-blue rounded-0 px-5 float-end"
                            onClick={handleSubmit}
                          >
                            Book A Meeting
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CalenderModel;

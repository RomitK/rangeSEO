import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import Swal from 'sweetalert2';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { FieldError } from "react-hook-form";

function CalenderModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
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
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00"
  ];

  const [formData, setFormData] = useState(initialState);
  // Function to get the date part of a date object as a string
  const getDateAsString = (date) => {
    return date.toISOString().split('T')[0];
  };
  const onSubmit = (data) => {
    data.date = formData.date;
    data.time = formData.time;
    data.formName = formData.formName;
    data.page = formData.page;
    saveContactFormApi(data)
      .then((res) => {
        setFormData(initialState);
        setStartDate(null);
        setConfirm(false);
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          showCloseButton: true,
          title: "Form Submitted",
          text: "Thank you. Our team will get back to you soon.",
          showConfirmButton: false,
          timer: 1500
        });

        // toast.success(
        //   "Thank you. Our team will get back to you soon."
        // );
        closeRef.current.click();
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
        className={`modal-dialog  modal-dialog-centered modal-lg modalBookMeet ${startDate ? "modalBookView" : ""
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
                reset();
              }}
              ref={closeRef}
            >
              <i className="bi bi-x-circle text-primary"></i>
            </button>
          </div>
          <div className="modal-body  p-0 rounded-1 m-2">
            <div className="row g-0">
              {(!startDate || confirm) && (<>


                <div className="col-12 col-lg-5 col-md-12 border-end descricalenderCol propertyDesktopItemLink">
                  <div className="border-bottom">
                    <div className="p-3 text-center">
                      <img
                        src="/images/logo_blue.png"
                        alt="Range Property"
                        className="img-fluid"
                        width="180"
                      />
                    </div>
                  </div>
                  <div className="p-3 ">
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
                      <p>An experience its exclusive concierge service</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-5 col-md-12  descricalenderCol " id="mobItemLink">

                  <div className="p-3 text-center">
                    <img
                      src="/images/logo_blue.png"
                      alt="Range Property"
                      className="img-fluid"
                      width="180"
                    />
                  </div>
                </div>
              </>
              )}

              <div
                className={`col-12 ${startDate && !confirm ? "col-lg-12" : "col-lg-7"
                  }  col-md-12 calenderCol `}
              >
                <div className="calenderDiv p-4">
                  <form id="bookAviewing" onSubmit={handleSubmit(onSubmit)}>
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
                            className={` ${startDate ? "col-md-7" : "col-md-12"
                              } newcol py-2`}
                          >
                            <DatePicker
                              id="calendar"
                              inline
                              minDate={minDate}
                              selected={startDate ?? new Date()}
                              onChange={(date) => {
                                const dateString = getDateAsString(date); // Convert date object to date string
                                setStartDate(date);
                                setFormData({ ...formData, date: dateString }); // Update formData with date string
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
                                        className={`pickitem ${formData.time == item ? "active" : ""
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
                                id="nameCon2"
                                className="form-control"
                                placeholder="Name"
                                autoComplete="off"
                                {...register("name", { required: true })}
                              />
                              {errors.name && (
                                <small className="text-danger">
                                  Name is required.
                                </small>
                              )}
                            </div>
                            <div className="form-group mb-2">
                              <input
                                type="email"
                                name="emailCon2"
                                id="emailCon2"
                                className="form-control"
                                placeholder="Email address"
                                autoComplete="off"
                                {...register("email", { required: true })}
                              />
                              {errors.email && (
                                <small className="text-danger">
                                  Email is required.
                                </small>
                              )}
                            </div>
                            <div className="form-group mb-2">
                              <Controller
                                name="phone"
                                control={control}
                                rules={{
                                  required: 'Phone is required.',
                                  validate: {
                                    validPhoneNumber: (value) => isValidPhoneNumber(value) || 'Invalid phone number'
                                  }
                                }}
                                render={({ field }) => (
                                  <>
                                    <PhoneInput
                                      international
                                      countryCallingCodeEditable={false}
                                      className={`form-control fs-14 d-flex ${errors.phone ? 'is-invalid' : ''}`}
                                      defaultCountry="AE"
                                      placeholder="Enter Phone Number"
                                      error={errors.phone ? 'Invalid phone number' : undefined}
                                      {...field}
                                      style={{ border: "0px" }}
                                      onChange={(phone) => {
                                        field.onChange(phone); // keep react-hook-form's onChange in sync
                                      }}
                                    />
                                    {errors.phone && (
                                      <small className="text-danger">
                                        {(errors.phone as FieldError).message}
                                      </small>
                                    )}

                                  </>
                                )}
                              />
                            </div>
                            <div className="form-group mb-2">
                              <textarea
                                name="messageCon2"
                                id="messageCon2"
                                className="form-control "
                                placeholder="Message"
                                autoComplete={"off"}
                                {...register("message", { required: false })}
                              />
                              {errors.message && (
                                <small className="text-danger">
                                  Message is required.
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="submit"
                            name="submit"
                            className="btn btn-blue rounded-0 px-5 float-end"
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

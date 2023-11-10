import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";

function CalenderModel () {
    const [startDate, setStartDate] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date());

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
      phone: "",
      date:startDate,
      time:"",
      formName: "bookACall",
      page: "home",
    });
    // $(document).on("click", ".timeitem", function () {
    //     setFormData({ ...formData, time: $(this).val() })
    //     $(".pickitem").removeClass("active");
    //     $(this).parent(".pickitem").addClass("active");
    //   });
    //   $(document).on("click", ".confirm-button", function () {
    //     $("#ths_time").val($(this).val());
    //     $(".step-1").hide();
    //     $(".step-2").show();
    //     $(".descricalenderCol").show();
    //     $(".calenderCol").removeClass("col-lg-12").addClass("col-lg-7");
    //   });
    //   $(document).on("click", ".bookBtn", function () {
    //     $(".timepic").hide();
    //     $(".newcol").removeClass("col-md-7").addClass("col-md-12");
    //     $(".step-1").show();
    //     $(".step-2").hide();
    //     $(".pickitem ").removeClass("active");
    //   });
      const handleSubmit = () => {
        console.log(formData)
        if (!formData.name || !formData.email || !formData.phone) {
          return toast.error("Please fill required field");
        }
        saveContactFormApi(formData)
          .then((res) => {
            toast.success(
              "Enquire form submitted successfully, out support teams contact you soon"
            );
            $("#bookAmeeting").modal("hide");
           
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
          <div className="modal-dialog  modal-dialog-centered modal-lg modalBookMeet ">
            <div className="modal-content">
              <div className="modal-header border-0 justify-content-end p-1">
                <button
                  type="button"
                  className="bg-transparent border-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="bi bi-x-circle text-primary"></i>
                </button>
              </div>
              <div className="modal-body  p-0 rounded-1 m-2">
                <div className="row g-0">
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
                      <p className="fw-semibold mb-0">
                        Range International Property Investments
                      </p>
                      <h3 className="text-primary fw-semibold">
                        Schedule Viewing with Sales Team
                      </h3>
                      <small className="text-secondary">
                        <i className="bi bi-clock-fill"></i> 30 min
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-lg-7 col-md-12 calenderCol">
                    <div className="calenderDiv p-4">
                      <form id="bookAviewing" action="" method="POST">
                        <input
                          id="formFrom"
                          name="formFrom"
                          type="hidden"
                          value="Book A Viewing"
                          required
                        />
                        <div className="step-1">
                          <div className="row">
                            <div className="col-md-12">
                              <h5 className="text-start">
                                Select a Date & Time
                              </h5>
                            </div>

                            <div className="col-md-12 newcol py-2">
                              <DatePicker
                                id="calendar"
                                inline
                                minDate={minDate}
                                selected={startDate}
                                onChange={(date) => {
                                  $(".modalBookMeet").addClass("modalBookView");
                                  $(".timepic").show();
                                  $(".descricalenderCol").hide();
                                  $(".calenderCol").removeClass("col-lg-7").addClass("col-lg-12");
                                  $(".newcol") .removeClass("col-md-12").addClass("col-md-7");
                                  setStartDate(date);
                                }}
                              />
                            </div>
                            <div className="col-md-5">
                              <div className="timepic">
                                <b>
                                <p className="ths_date">{startDate.toDateString()}</p>
                                </b>
                                <input type="hidden" name="id" value="" />
                                <input
                                  type="hidden"
                                  name="ths_date"
                                  id="ths_date"
                                  required
                                />
                                <input
                                  type="hidden"
                                  name="ths_time"
                                  id="ths_time"
                                  required
                                />
                                <div className="listitem">
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="09:00 AM"
                                      
                                    >
                                      09:00 AM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="09:00 AM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="09:30 AM"
                                      
                                    >
                                      09:30 AM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="09:30 AM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="10:00 AM"
                                      
                                    >
                                      10:00 AM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="10:00 AM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="10:30 AM"
                                      
                                    >
                                      10:30 AM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="10:30 AM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="11:00 AM"
                                      
                                    >
                                      11:00 AM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="11:00 AM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="11:30 AM"
                                      
                                    >
                                      11:30 AM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="11:30 AM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="12:00 PM"
                                      
                                    >
                                      12:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="12:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="12:30 PM"
                                      
                                    >
                                      12:30 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="12:30 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="13:00 PM"
                                      
                                    >
                                      13:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="13:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="13:30 PM"
                                      
                                    >
                                      13:30 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="13:30 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="14:00 PM"
                                      
                                    >
                                      14:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="14:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="14:30 PM"
                                      
                                    >
                                      14:30 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="14:30 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="15:00 PM"
                                      
                                    >
                                      15:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="15:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="15:30 PM"
                                      
                                    >
                                      15:30 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="15:30 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="16:00 PM"
                                      
                                    >
                                      16:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="16:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="16:30 PM"
                                      
                                    >
                                      16:30 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="16:30 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="17:00 PM"
                                      
                                    >
                                      17:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="17:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="17:30 PM"
                                      
                                    >
                                      17:30 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="17:30 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  <div className="pickitem">
                                    <button
                                      type="button"
                                      className="timeitem"
                                      value="18:00 PM"
                                      
                                    >
                                      18:00 PM
                                    </button>
                                    <button
                                      className="confirm-button"
                                      type="button"
                                      value="18:00 PM"
                                      
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="step-2">
                          <div className="row">
                            <div className="col-md-12">
                              <h6 className="text-primary">Enter Details</h6>
                              <div className="form-group">
                                <label>Name*</label>
                                <input
                                  type="text"
                                  name="nameCon2"
                                  id="nameCon2"
                                  className="form-control mb-2"
                                  placeholder="Enter your name"
                                  autoComplete="off"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                  }
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Email*</label>
                                <input
                                  type="email"
                                  name="emailCon2"
                                  id="emailCon2"
                                  className="form-control mb-2"
                                  placeholder="Enter your email"
                                  autoComplete="off"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                  }
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Phone Number*</label>
                                <input
                                  id="fullNumber3"
                                  type="hidden"
                                  name="fullNumber"
                                />
                                <input
                                  type="tel"
                                  className="form-control mb-2"
                                  id="telephoneNew3"
                                  name="phone"
                                  placeholder="Enter your Phone Number"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                  }
                                  autoComplete="off"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label>Message</label>
                                <input
                                  type="text"
                                  name="messageCon2"
                                  id="messageCon2"
                                  className="form-control mb-2"
                                  placeholder="Message"
                                  autoComplete={"off"}
                                  value={formData.message}
                                  onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer border-0">
                            <button
                              type="submit"
                              name="submit"
                              className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                              onClick={handleSubmit}
                            >
                              Book A Meeting
                            </button>
                          </div>
                        </div>
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
import React, { useState, useRef, useEffect } from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
function ContactModel(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        formName: "enquireForm",
        page: "services",
      });
      const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.phone) {
          return toast.error("Please fill required field");
        }
        saveContactFormApi(formData)
          .then((res) => {
            toast.success(
              "Enquire form submitted successfully, out support teams contact you soon"
            );
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
              phone: "",
              formName: "enquireForm",
              page: "services",
            });
          })
          .catch((err) => {
            toast.error("Something went wrong, please try again");
          });
      };
    return (
        <>

        <div
          className="modal fade"
          id="enquireNow"
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
                    <div className="assist-text  text-left mt-3 mb-5">
                        <h5>
                          <strong className="need">
                            An esteemed award-winning real estate brokerage
                            based in Dubai, UAE.
                          </strong>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-7 col-md-12 ">
                    <div className=" p-4">
                      <form  action="" method="POST">
                        
                        <div className="">
                          <div className="row">
                            <div className="col-md-12">
                              <h6 className="text-primary">Enter Details</h6>
                              <div className="form-group">
                                <label>Name<small className="text-danger">*</small></label>
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
                                <label>Email<small className="text-danger">*</small></label>
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
                                <label>Phone Number <small className="text-danger">*</small></label>
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
                              Submit
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



        {/* <div id="enquireNow" className="modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="container-fluid1">
                <div className="row justify-content-center align-items-center d-flex">
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="logo-text">
                      <div className="logo mt-3 mb-3">
                        <div className="logo-img">
                          <img
                            src="/images/logo_blue.png"
                            alt="Range Property"
                            className="img-fluid"
                            width="200"
                          />
                        </div>
                      </div>

                      <div className="assist-text  text-left mt-3 mb-5">
                        <h5>
                          <strong className="need">
                            An esteemed award-winning real estate brokerage
                            based in Dubai, UAE.
                          </strong>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="form-div mt-3">
                      <form id="contact_form" method="POST">
                        <div className="mb-3">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                          />
                        </div>

                        <div className="mb-3">
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            id="phone"
                            placeholder="Phone"
                          />
                        </div>
                        <div className="mb-3">
                          <textarea
                            name="message"
                            placeholder="Message"
                            id="message_input"
                            cols={30}
                            rows={5}
                            required
                          ></textarea>
                        </div>

                        <div className="mb-3 mt-3">
                          <button
                            type="submit"
                            name="submit"
                            className="btn btn-blue"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        </>
        
    );
}
export default ContactModel;
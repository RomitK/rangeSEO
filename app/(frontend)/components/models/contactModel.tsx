import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
function ContactModel(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    formName: "enquireForm",
    page: props.pageUrl,
  });
  const contactCloseRef = useRef(null);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error("Please fill required field");
    }
    saveContactFormApi(formData)
      .then((res) => {
        toast.success(
          "Enquire form submitted successfully, out support teams contact you soon"
        );
        contactCloseRef.current.click();
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
          formName: "enquireForm",
          page: props.pageUrl,
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
        ref={contactCloseRef}
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
                    <div className="agent-img mt-2">
                      <img
                        src="/images/videocall.jpeg"
                        alt="Range Property"
                        className="agent-img"
                      />
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                    <h5>
                        <strong className="need">{props.sideText}</strong>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-7 col-md-12 ">
                  <div className=" p-4">
                    <form action="" method="POST">
                      <div className="">
                        <div className="row">
                          <div className="col-md-12">
                            <h6 className="text-primary">Enter Details</h6>
                            <div className="form-group">
                              <input
                                type="text"
                                name="nameCon2"
                                id="nameCon2"
                                className="form-control mb-2"
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
                            <div className="form-group">
                              
                              <input
                                type="email"
                                name="emailCon2"
                                id="emailCon2"
                                className="form-control mb-2"
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
                            <div className="form-group">
                             
                              <input
                                type="tel"
                                className="form-control mb-2"
                                id="telephoneNew3"
                                name="phone"
                                placeholder="Enter your Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                autoComplete="off"
                                required
                              />
                            </div>
                            <div className="form-group">
                              
                              <textarea
                                name="messageCon2"
                                id="messageCon2"
                                className="form-control mb-2"
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
    </>
  );
}
export default ContactModel;

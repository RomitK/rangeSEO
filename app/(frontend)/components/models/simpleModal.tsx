
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
function SimpleModal() {
    const closeRef = useRef(null);
    const initialState = {
        name: "",
        email: "",
        message: "",
        phone: "",
        date: "",
        time: "",
        formName: "bookACall",
        page: "home",
      };

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
            toast.success(
              "Enquire form submitted successfully, out support teams contact you soon"
            );
          })
          .catch((err) => {
            toast.error("Something went wrong, please try again");
          });
      };
  return (
    <>
    <div className="modalArea">
                <button type="button" className="btn btn-blue text-uppercase btn-lg broucherBtn" data-bs-toggle="modal" data-bs-target="#simpleModal">
                    DOWNLOAD BROCHURE
                    </button>
    <div
      className="modal fade"
      id="simpleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        className={`modal-dialog  modal-dialog-centered modal-lg modalBookMeet`}
      >
        <div className="modal-content">
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
        <div className="modal-header border-0 justify-content-end p-1">
            <button
              type="button"
              className="bg-transparent border-0"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeRef}
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
                        src="/images/videocall.webp"
                        alt="Range Property"
                        className="agent-img"
                      />
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                      <p>
                      Download Brochure By filling your details
                      </p>
                    </div>
                  </div>
                </div>
              <div
                className="col-md-7"
              >
                <div  className="formMdlBox">
                  <form id="bookAviewing" action="" method="POST">
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
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                className="form-control mb-2 fs-14 d-flex"
                                defaultCountry="AE"
                                placeholder="Enter Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e })}
                                required
                              />
                              {/* <input
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
                              /> */}
                            </div>
                            {/* <div className="form-group">
                              <textarea
                                name="messageCon2"
                                id="messageCon2"
                                className="form-control  cntInptField mb-2"
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
                            </div> */}
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="button"
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
    </div>

    </>
  );
}
export default SimpleModal;

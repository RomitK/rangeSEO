import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
const SaleOfferModal = (prop) => {
  const [show, setShow] = useState(false);
  const contactCloseRef = useRef(null);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShowOtp(false);
    setOtpCode(null);
    setShow(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    formName: "enquireForm",
    page: "services",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [showAgentCode, setAgentCode] = useState(false);
  const [OtpCode, setOtpCode] = useState(null);
  const [agentCodeValue, setAgentCodeValue] = useState(null);
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return toast.error("Please fill required field");
    }
    saveContactFormApi(formData)
      .then((res) => {
        setShowOtp(true);
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

  const handleOTP = () => {
    if (!OtpCode) {
      return toast.error("Please fill required field");
    }
    setAgentCode(true);
    setShowOtp(false);

    // saveContactFormApi(formData)
    //   .then((res) => {
    //     setShowOtp(false);
    //     setOtpCode(null);
    //     handleClose();
    //   })
    //   .catch((err) => {
    //     toast.error("Something went wrong, please try again");
    //   });
  };
  return (
    <>
      <div
        className="modal fade"
        id="saleSale"
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
                ref={contactCloseRef}
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>

            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                <div className="col-12 col-lg-5 col-md-12 border-end descricalenderCol">
                  <div className="border-bottom">
                    <div className="p-3">
                      <img loading="lazy"
                        src="/images/logo_blue.png"
                        alt="Range Property"
                        className="img-fluid"
                        width="150"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="agent-img mt-2">
                      <img loading="lazy"
                        src="/images/videocall.webp"
                        alt="Range Property"
                        className="agent-img"
                      />
                    </div>
                    <div className="col-md-12 mt-3 mb-3">
                      <h5>
                        <strong className="need">
                          An esteemed award-winning real estate brokerage based
                          in Dubai, UAE.
                        </strong>
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
                            {showOtp && (
                              <div className="form-group">
                                <label>
                                  OTP<small className="text-danger">*</small>
                                </label>
                                <input
                                  type="text"
                                  name="nameCon2"
                                  id="nameCon2"
                                  className="form-control mb-2"
                                  placeholder="Enter OTP code..."
                                  autoComplete="off"
                                  value={OtpCode}
                                  onChange={(e) => setOtpCode(e.target.value)}
                                  required
                                />
                              </div>
                            )}
                            {showAgentCode && (
                              <>
                                <div className="form-group">
                                  <label>
                                    Enter Agent Code
                                    <small className="text-danger">*</small>
                                  </label>
                                  <input
                                    type="text"
                                    name="nameCon2"
                                    id="nameCon2"
                                    className="form-control mb-2"
                                    placeholder="Enter Enter Agent Code..."
                                    autoComplete="off"
                                    value={agentCodeValue}
                                    onChange={(e) =>
                                      setAgentCodeValue(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <button
                                  type="button"
                                  name="submit"
                                  className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                                  onClick={showOtp ? handleOTP : handleSubmit}
                                >
                                  Submit
                                </button>
                                <br />
                                <br />
                                <br />
                                <h4 className="text-center">OR</h4>
                                <h3 className="text-center text-primary">
                                  Connect to the Agent
                                </h3>
                                <div className="py-3">
                                  <div className="BtnsflexBar mb-3">
                                    <a
                                      className="Probtn whatsappBtn wd50pr"
                                      href={
                                        "https://wa.me/" +
                                        prop?.whatsapp +
                                        "?text=Hi, " +
                                        prop?.name +
                                        " Please let me know more about investing in Dubai Real Estate"
                                      }
                                    >
                                      <i className="fa fa-whatsapp"></i>
                                      WHATSAPP
                                    </a>

                                    <a
                                      className="Probtn bg-primary wd50pr"
                                      href={"mailto:" + prop?.email}
                                    >
                                      <i className="fa fa-envelope"></i>
                                      Email
                                    </a>
                                  </div>
                                </div>
                              </>
                            )}
                            {!showOtp && !showAgentCode && (
                              <>
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
                                    placeholder="Enter your email address"
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
                                    onChange={(e) =>
                                      setFormData({ ...formData, phone: e })
                                    }
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
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="button"
                            name="submit"
                            className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                            onClick={showOtp ? handleOTP : handleSubmit}
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
};
export default SaleOfferModal;

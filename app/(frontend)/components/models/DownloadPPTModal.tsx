import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
const DownloadPPTModal = () => {
  const [show, setShow] = useState(false);

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
  const [OtpCode, setOtpCode] = useState(null);
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
    saveContactFormApi(formData)
      .then((res) => {
        setShowOtp(false);
        setOtpCode(null);
        handleClose();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };
  return (
    <>
      <button
        className="btn  btn-secondary mt-2 text-uppercase fs-18 fw-500 w-100 btn-lg"
        onClick={handleShow}
      >
        <i className="fa fa-download"></i> &nbsp;Download PPT
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header></Modal.Header>
        <Modal.Body>
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
                    <strong className="need"></strong>
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
                        {showOtp ? (
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
                        ) : (
                          <>
                            <div className="form-group">
                              <label>
                                Name<small className="text-danger">*</small>
                              </label>
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
                              <label>
                                Email<small className="text-danger">*</small>
                              </label>
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
                              <label>
                                Phone Number{" "}
                                <small className="text-danger">*</small>
                              </label>
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={showOtp ? handleOTP : handleSubmit}
            className="btn btn-blue rounded-0 px-5 float-end btnContact2"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DownloadPPTModal;

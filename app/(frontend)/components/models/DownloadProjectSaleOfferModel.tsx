import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  saveContactFormApi,
  sendOTPApi,
  verifyOTPApi,
} from "@/src/services/HomeService";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { useForm, Controller } from "react-hook-form";
import Loader from "../UI/Loader";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import { checkEmployeeIdApi } from "@/src/services/TeamService";
import ErrorToast from "../toast/ErrorToast";
import { fetchResponseErrors } from "@/src/utils/helpers/common";
import "react-phone-number-input/style.css";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";

function DownloadProjectSaleOfferModel(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    formName: "downloadBrochureForm",
    page: props.pageUrl,
  });
  const visiorFormRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    let interval = null;
    if (otpSent && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setOtpSent(false);
      setCountdown(120);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, countdown]);

  const closeRef = useRef(null);
  const fileRef = useRef(null);
  const [showOtp, setShowOtp] = useState(false);
  const [OtpCode, setOtpCode] = useState(null);
  const currentPageURL = getCurrentUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [UserAs, setUserAs] = useState(null);

  const [countryCode, setCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [optPhoneNumber, setOptPhoneNumber] = useState("");
  const [timer, setTimer] = useState(60);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    console.log(timer);
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const resendOTP = () => {
    setTimer(60);
    setIsButtonDisabled(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
    clearErrors,
  } = useForm();

  const handlePhoneChange = (phone) => {
    if (phone) {
      const phoneNumberParsed = parsePhoneNumberFromString(phone);

      if (phoneNumberParsed) {
        const countryCode = phoneNumberParsed.countryCallingCode; // Extracts the country code
        const nationalNumber = phoneNumberParsed.nationalNumber; // Extracts the national number (phone number without country code)
        const fullNumber = phoneNumberParsed.formatInternational(); // Full phone number with country code

        // Now you can set these values to your state or form
        // For example:
        setValue("countryCode", `+${countryCode}`);
        setValue("nationalNumber", nationalNumber);
        setValue("fullPhoneNumber", fullNumber);
        setOptPhoneNumber(fullNumber);
      }
    }
  };

  const downloadFile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(props.brochureLink);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", props.fileName); // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsLoading(false);
      closeRef.current.click();
    }
  };
  const onSubmitVisitorOTPVerifyForm = (data) => {
    setIsLoading(true);
    verifyOTPApi(data)
      .then((res) => {
        console.log(res.data);
        if (res.data.verify) {
          setShowOtp(true);
          setOtpSent(true);
          reset();
        } else {
          toast.error("Invalid OTP");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Invalid OTP");
        setIsLoading(false);
      });
  };
  const onSubmitVisitorForm = (data) => {
    setIsLoading(true);
    sendOTPApi(data)
      .then((res) => {
        setShowOtp(true);
        setOtpSent(true);
        setIsLoading(false);
        setValue("otp", "");
        // closeRef.current.click();
        // toast.success("Thank you. Our team will get back to you soon.");
        // downloadFile()
        // reset();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong, please try again");
      });
  };

  const onSubmitEmployeeForm = (data) => {
    checkEmployeeIdApi(data)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data === true) {
          toast.success("Please wait, the Sale Offer is downloading.");
          downloadFile();
          reset();
        } else {
          toast.error("Your Employee Id is not correct");
        }
      })
      .catch((err) => {
        toast.error(<ErrorToast error={fetchResponseErrors(err.response)} />);
        //toast.error("Something went wrong, please try again");
      });
  };
  const handleOTP = () => {
    if (!OtpCode) {
      return toast.error("Please fill required field");
    }
    setShowOtp(false);
  };

  return (
    <>
      {isLoading && <Loader />}

      <div
        className="modal fade"
        id="projectSaleOffer"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-md modalBookMeet ">
          <div className="modal-content">
            <div className="modal-header border-0 justify-content-end p-1">
              <button
                type="button"
                className="bg-transparent border-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
                onClick={() => {
                  reset();
                  clearErrors("name");
                  clearErrors("email");
                  clearErrors("phone");
                  setShowOtp(false);
                  setUserAs(null);
                }}
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>
            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12 ">
                  <div className=" text-center">
                    <img
                      src="/images/logo_blue.png"
                      alt="Range Property"
                      className="img-fluid"
                      width="150"
                    />
                  </div>
                  {!UserAs && (
                   <div className="p-4 d-flex justify-content-end">
                   <button
                       className="btn btn-sm btn-bluee rounded-0 px-5 me-2 btnContact2"
                       onClick={() => setUserAs("Visitor")}
                   >
                       I am a Buyer
                   </button>
               
                   <button
                       className="btn btn-sm btn-primary rounded-0 px-5 btnContact2"
                       onClick={() => setUserAs("Employee")}
                   >
                       I am an Agent
                   </button>
               </div>
               
                  )}

                  {UserAs && UserAs == "Visitor" && showOtp && (
                    <form
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(onSubmitVisitorOTPVerifyForm)}
                    >
                      <div className="">
                        <div className="row">
                          <div className="col-md-12">
                            <h6 className="text-primary text-center p-2">
                              Enter Details For Downloading Sale Offer
                            </h6>

                            <div className="form-group">
                              <label>
                                OTP{" "}
                                <small className="text-danger">
                                  {" "}
                                  {timer > 0 && (
                                    <span>(Valid for: {timer} seconds)</span>
                                  )}{" "}
                                  *
                                </small>
                              </label>
                              <input
                                type="text"
                                name="nameCon2"
                                id="nameCon2"
                                className="form-control mb-2"
                                placeholder="Enter OTP code..."
                                autoComplete="off"
                                {...register("otp", { required: false })}
                              />
                              {errors.otp && (
                                <small className="text-danger">
                                  OTP is required.
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <input
                            type="hidden"
                            name="phone"
                            value={optPhoneNumber} // Use the stored phone number here
                            {...register("phoneNumber", { required: false })}
                          />

                          {timer === 0 ? (
                            <div className="row">
                              <div className="col-md-6">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-bluee rounded-0 px-5 float-end btnContact"
                                  onClick={() => {
                                    if (submitBtnRef.current) {
                                      setTimer(60);
                                      submitBtnRef.current.click();
                                    }
                                  }}
                                >
                                  Resend OTP
                                </button>
                              </div>
                              <div className="col-md-6">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary rounded-0 px-5 float-end btnContact2"
                                  onClick={() => {
                                    setShowOtp(false);
                                    setTimer(60);
                                  }}
                                >
                                  Change Number
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="submit"
                              name="submit"
                              className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                            >
                              {isLoading ? "Sending..." : "Verify OTP"}
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  )}

                  {UserAs && UserAs == "Visitor" && (
                    <form
                      ref={visiorFormRef}
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(onSubmitVisitorForm)}
                      style={{ display: `${!showOtp ? "block" : "none"}` }}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <h6 className="text-primary text-center p-2">
                            Enter Details For Downloading Sale Offer
                          </h6>

                          {!showOtp && (
                            <>
                              <div className="form-group mb-2">
                                <input
                                  type="text"
                                  name="nameCon2"
                                  id="nameCon2"
                                  className="form-control "
                                  placeholder="Enter your name"
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
                                  placeholder="Enter your email"
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
                                  rules={{ required: true }}
                                  render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                      international
                                      countryCallingCodeEditable={false}
                                      className="form-control"
                                      defaultCountry="AE"
                                      placeholder="Enter Phone Number"
                                      value={value}
                                      onChange={(phone) => {
                                        handlePhoneChange(phone);
                                        onChange(phone); // keep react-hook-form's onChange in sync
                                      }}
                                    />
                                  )}
                                />
                                {errors.phone && (
                                  <small className="text-danger">
                                    Phone is required.
                                  </small>
                                )}
                              </div>
                              <input
                                type="hidden"
                                name="countryCode"
                                {...register("countryCode", {
                                  required: false,
                                })}
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div className="modal-footer border-0">
                        <input
                          type="hidden"
                          value="propertySaleOfferDownloadForm"
                          {...register("formName", { required: false })}
                        />
                        <input
                          type="hidden"
                          value={currentPageURL}
                          {...register("page", { required: false })}
                        />
                        <button
                          type="submit"
                          name="submit"
                          ref={submitBtnRef}
                          className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                        >
                          {isLoading ? "sending..." : "Submit"}
                        </button>
                      </div>
                    </form>
                  )}
                  {UserAs && UserAs == "Employee" && (
                    <form
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(onSubmitEmployeeForm)}
                    >
                      <div className="">
                        <div className="row">
                          <div className="col-md-12">
                            <h6 className="text-primary text-center p-2">
                              Enter Employee Id For Downloading Sale Offer
                            </h6>

                            {!showOtp && (
                              <>
                                <div className="form-group mb-2">
                                  <input
                                    type="hidden"
                                    value="propertySaleOfferDownloadForm"
                                    {...register("formName", {
                                      required: false,
                                    })}
                                  />
                                  <input
                                    type="hidden"
                                    value={currentPageURL}
                                    {...register("page", { required: false })}
                                  />
                                  <input
                                    type="text"
                                    name="nameCon2"
                                    id="nameCon2"
                                    className="form-control "
                                    placeholder="Enter Employee Id"
                                    autoComplete="off"
                                    {...register("employeeId", {
                                      required: true,
                                    })}
                                  />
                                  {errors.employeeId && (
                                    <small className="text-danger">
                                      Employee Id is required.
                                    </small>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <input
                            type="hidden"
                            value="propertySaleOfferDownloadForm"
                            {...register("formName", { required: false })}
                          />
                          <input
                            type="hidden"
                            value={currentPageURL}
                            {...register("page", { required: false })}
                          />
                          <button
                            type="submit"
                            name="submit"
                            className="btn btn-blue rounded-0 px-5 float-end btnContact2"
                          >
                            {isLoading ? "Downloading..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DownloadProjectSaleOfferModel;

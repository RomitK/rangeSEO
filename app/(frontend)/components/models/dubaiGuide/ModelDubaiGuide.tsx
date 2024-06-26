import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../UI/Loader";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import JsFileDownloader from "js-file-downloader";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import {
  sendOTPApi,
  verifyOTPApi,
} from "@/src/services/HomeService";
import { isValidPhoneNumber } from 'react-phone-number-input'
import Swal from 'sweetalert2'
import { FieldError } from "react-hook-form";

function ModelDubaiGuide(props) {
  //console.log(props)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    formName: "downloadBrochureForm",
    page: props.pageUrl,
  });
  const [formName, setformName] = useState()

  const visiorFormRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60); // 2 minutes in seconds

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
  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {
    setformName(props.formName)
    reset();
    setTimer(60);
    setShowOtp(false);
    // console.log(showOtp)
    // console.log(timer)
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  useEffect(() => {
    setformName(props.formName)
    reset();
    setTimer(60);
    setShowOtp(false);
  }, [props]);

  useEffect(() => {
    let interval = null;
    if (otpSent && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setOtpSent(false);
      setCountdown(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, countdown]);


  useEffect(() => {

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

  // const downloadFile = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(props.brochureLink);
  //     const blob = await response.blob();

  //     const url = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", props.fileName); // Set the desired filename
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   } finally {
  //     setIsLoading(false);
  //     closeRef.current.click();
  //   }
  // };
  const onSubmitVisitorOTPVerifyForm = (data) => {
    //console.log(props.fileName)
    setIsLoading(true);
    verifyOTPApi(data)
      .then((res) => {
        if (res.data.data.verify === true) {
          if (props.downloadLink) {
            setIsLoading(true); // Set isLoading to true before starting the download
            //console.log(props.downloadLink)
            new JsFileDownloader({
              url: props.downloadLink,
            })
              .then(function () {
                // File download successful
                setIsLoading(false); // Set isLoading to false after the download is complete
                closeRef.current.click();
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Thank you. Your document is downloading.",
                  showConfirmButton: false,
                  showCloseButton: true,
                  timer: 2000,
                  didOpen: (toast) => {
                    Swal.getPopup().setAttribute('id', 'guideFormSubmit');
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: "guideFormSubmit",
                      guideFormName: props.title,
                    });
                  }
                });

                //toast.success("Thank you. Your document is downloading.");
              })
              .catch(function (error) {
                // File download failed
                setIsLoading(false); // Set isLoading to false if there is an error during download
                toast.error(`Download failed Something went wrong!`);
              });

          }
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
        setTimer(60);
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


  const handleOTP = () => {
    if (!OtpCode) {
      return toast.error("Please fill required field");
    }
    setShowOtp(false);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    saveContactFormApi(data)
      .then((res) => {
        new JsFileDownloader({
          url: props.brochure,
        })
          .then(function () {
            setIsLoading(false);
            closeRef.current.click();
            reset();
            toast.success("Thank you. Your document is downloading.");
          })
          .catch(function (error) {
            toast.error(`Download failed Something went wrong!`);
          });
        reset();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };


  return (
    <>
      {isLoading && <Loader />}
      <div
        className="modal fade"
        id="downloadNowInvestment"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-md modalBookMeet">
          <div className={`modal-content ${isMobileDev ? 'p-2' : ''}`}>
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
                  setCountdown(60);
                  setShowOtp(false);
                }}
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>
            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12 ">
                  <div className=" text-center">
                    <img loading="lazy"
                      src="/images/logo_blue.png"
                      alt="Range Property"
                      className="img-fluid"
                      width="150"
                    />
                  </div>
                  <div className="">
                    {showOtp && (
                      <form
                        action=""
                        method="POST"
                        onSubmit={handleSubmit(onSubmitVisitorOTPVerifyForm)}
                      >
                        <div className="">
                          <div className="row">
                            <div className="col-md-12">
                              <h6 className="text-primary text-center p-2">
                                Enter Details to Download the {props.title}
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
                                  {...register("otp", { required: true })}
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



                            {timer === 0 ? (
                              <div className="row">
                                <div className="col-md-6">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-bluee rounded-0 px-5 float-end btnContact"
                                    onClick={() => {
                                      if (submitBtnRef.current) {

                                        submitBtnRef.current.click();
                                        setTimer(60);
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
                            Enter Details to Download the {props.title}
                          </h6>

                          {!showOtp && (
                            <>
                              <div className="form-group mb-2">
                                <input
                                  type="text"
                                  name="nameCon2"
                                  id="nameCon2"
                                  className="form-control "
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
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        defaultCountry="AE"
                                        placeholder="Enter Phone Number"
                                        error={errors.phone ? 'Invalid phone number' : undefined}
                                        {...field}
                                        style={{ border: "0px" }}
                                        onChange={(phone) => {
                                          handlePhoneChange(phone);
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
                          value="DubaiGuides"
                          {...register("superformName", { required: true })}
                        />
                        <input type="hidden"
                          value={props?.sourceId}
                          {...register("sourceId", { required: true })}
                        />
                        <input
                          type="hidden"
                          value={props.formName}
                          {...register("formName", { required: true })}
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
                          {isLoading ? "Sending...." : "Submit"}
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

    </>
  );
}
export default ModelDubaiGuide;

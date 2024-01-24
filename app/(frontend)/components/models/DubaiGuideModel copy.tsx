import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import { useForm, Controller } from "react-hook-form";
import Loader from "../UI/Loader";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import JsFileDownloader from "js-file-downloader";

function DubaiGuideModel(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    formName: "downloadBrochureForm",
    page: props.pageUrl,
  });
  const closeRef = useRef(null);
  const fileRef = useRef(null);
  const [showOtp, setShowOtp] = useState(false);
  const [OtpCode, setOtpCode] = useState(null);
  const currentPageURL = getCurrentUrl();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    clearErrors,
  } = useForm();
  const downloadFile = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(props.downloadLink);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", props.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Once the download starts, hide the loading indicator and close the modal
      setIsLoading(false);
      closeRef.current.click();
    } catch (error) {
      console.error("Error downloading file:", error);

      // Handle errors by hiding the loading indicator and closing the modal
      setIsLoading(false);
      closeRef.current.click();
    }
  };

  const onSubmit = (data) => {
    setIsLoading(false);
    saveContactFormApi(data)
      .then((res) => {
        // toast.success(
        //   "Please Wait until your " + props.title + " is being download"
        // );
        new JsFileDownloader({
          url: props.downloadLink,
        })
          .then(function () {
            setIsLoading(false);
            // toast.success(`${props.title} has been downloaded successfully`);
            toast.success("Thank you. your document is downloading.")
          })
          .catch(function (error) {
            toast.error(`Download failed Something went wrong!`);
          });
       
        reset();
        closeRef.current.click();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
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
        id="downloadNow"
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
                  clearErrors("name");
                  clearErrors("email");
                  clearErrors("phone");
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
                  <div className=" p-4">
                    <form
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="">
                        <div className="row">
                          <div className="col-md-12">
                            <h6 className="text-primary text-center">
                              Enter Details For Downloading {props.title}
                            </h6>

                            {/* {showOtp && (
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
                                )} */}
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
                                    render={({
                                      field: { onChange, value },
                                    }) => (
                                      <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        className="form-control fs-14 d-flex"
                                        defaultCountry="AE"
                                        placeholder="Enter Phone Number"
                                        value={value}
                                        onChange={onChange}
                                        style={{ border: "0px" }}
                                      />
                                    )}
                                  />
                                  {errors.phone && (
                                    <small className="text-danger">
                                      Phone is required.
                                    </small>
                                  )}
                                </div>

                                <div className="form-group mb-2">
                                  <textarea
                                    className="form-control"
                                    placeholder="Message"
                                    {...register("message", {
                                      required: false,
                                    })}
                                  ></textarea>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <input
                            type="hidden"
                            value={props.formName}
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
export default DubaiGuideModel;

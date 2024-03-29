import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { saveCareerFormApi } from "@/src/services/CareerService";
import { saveContactFormApi2 } from "@/src/services/HomeService";
import ErrorToast from "../toast/ErrorToast";
import { fetchResponseErrors } from "@/src/utils/helpers/common";
import PhoneInput from "react-phone-number-input";
import { useForm, Controller } from "react-hook-form";
import { getCurrentUrl } from "@/src/utils/helpers/common";

function CareerModel(props) {

  const [isMobileDev, setIsMobileDev] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
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

  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append('career_id', props.careerId);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('contact_number', data.phone);
    formData.append('cv', data.cv[0]); // Append the file to FormData
    formData.append('message', data.message);

    saveCareerFormApi(formData)
      .then((res) => {
        toast.success(
          "Thank you, Our team will get back to you soon."
        );
        reset();
        careerCloseRef.current.click();
        //setFormData(initialState);
        //resetFile();

      })
      .catch((err) => {
        toast.error(<ErrorToast error={fetchResponseErrors(err.response)} />);
        //toast.error("Something went wrong, please try again");
      });
  };
  const initialState = {
    careerId: props.careerId,
    name: "",
    email: "",
    message: "",
    phone: "",
    cv: null,
    formName: "applyForm",
    page: "career",
  };
  const [formData, setFormData] = useState(initialState);
  const careerCloseRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    setFormData({ ...formData, careerId: props.careerId });
  }, [props.careerId]);

  const resetFile = () => {
    fileRef.current.value = "";
  };

  // const handleSubmit = () => {
  //   if (!formData.name || !formData.email || !formData.phone || !formData.cv) {
  //     return toast.error("Please fill required field");
  //   }
  //   const frmData = new FormData();
  //   frmData.append("career_id", formData.careerId);
  //   frmData.append("name", formData.name);
  //   frmData.append("email", formData.email);
  //   frmData.append("contact_number", formData.phone);
  //   frmData.append("cv", formData.cv);
  //   frmData.append("message", formData.message);
  //   saveCareerFormApi(frmData)
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       careerCloseRef.current.click();
  //       setFormData(initialState);
  //       resetFile();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(<ErrorToast error={fetchResponseErrors(err.response)} />);
  //     });
  // };

  const validatePDF = (file) => {
    if (!file || !file[0]) {
      return 'File is required';
    }

    const validTypes = ['application/pdf'];
    const maxSize = 1024 * 1024; // 1MB in bytes

    if (!validTypes.includes(file[0]?.type)) {
      return 'Only PDF files are allowed';
    }

    if (file[0]?.size > maxSize) {
      return 'File size should be less than 1MB';
    }

    return true; // File meets validation criteria
  };

  return (
    <>
      <div
        className="modal fade"
        id="careerModel"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-md modalBookMeet ">
          <div className={`modal-content ${isMobileDev ? 'p-2' : ''}`}>
            <div className="modal-header border-0 justify-content-end p-1">
              <button
                type="button"
                className="bg-transparent border-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={careerCloseRef}
                onClick={() => {
                  reset();
                  // setFormData(initialState);
                  // resetFile();
                }}
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>

            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                {/* <div className="col-12 col-lg-5 col-md-12 border-end descricalenderCol">
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
                        <strong className="need">{props.sideText}</strong>
                      </h5>
                    </div>
                  </div>

                </div> */}
                <div className="col-12 col-lg-12 col-md-12 ">
                  <div className="">
                    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                      <div className="">
                        <div className="row">
                          <div className="col-md-12">
                            <div className=" text-center">
                              <img loading="lazy"
                                src="/images/logo_blue.png"
                                alt="Range Property"
                                className="img-fluid"
                                width="150"
                              />
                              <h6 className="text-primary py-2">
                                Share your CV with us

                                {/* {props.careerPosition} */}
                              </h6>
                            </div>
                            <div className="form-group  mb-2">
                              <input type="hidden" value={props.careerId}  {...register("career_id", { required: true })} />
                              <input
                                type="text"
                                name="nameCon2"
                                id="nameCon2"
                                className="form-control"
                                placeholder="Enter your name"
                                autoComplete="off"
                                {...register("name", { required: true })}

                              />
                              {errors.name && <small className="text-danger">Name is required.</small>}
                            </div>
                            <div className="form-group  mb-2">

                              <input
                                type="email"
                                name="emailCon2"
                                id="emailCon2"
                                className="form-control"
                                placeholder="Enter your email address"
                                autoComplete="off"
                                {...register("email", { required: true })}

                              />
                              {errors.email && <small className="text-danger">Email is required.</small>}
                            </div>
                            <div className="form-group  mb-2">
                              <Controller
                                name="phone"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                  <PhoneInput
                                    international
                                    countryCallingCodeEditable={false}
                                    className="form-control  fs-14 d-flex"
                                    defaultCountry="AE"
                                    placeholder="Enter Phone Number"
                                    value={value}
                                    onChange={onChange}
                                    style={{ border: "0px" }}
                                  />
                                )}
                              />
                              {errors.phone && <small className="text-danger">Phone is required.</small>}
                            </div>
                            <div className="form-group  mb-2">
                              <label className="fileChooseBar">
                                <p>Choose CV</p>
                                <input
                                  type="file"
                                  accept=".pdf" // Specify accepted file types (only PDF)
                                  {...register('cv', {
                                    required: 'CV is required', // Example: Required validation
                                    validate: validatePDF, // File validation function
                                  })}
                                  className="form-control"
                                  id="cv"
                                  name="cv"
                                  autoComplete="off"
                                />
                              </label>
                              {/* {errors.cv && <small className="text-danger">{errors.cv.message}</small>} */}

                              {errors.cv && <small className="text-danger">CV is Invalid</small>}
                            </div>
                            <div className="form-group  mb-2">
                              <textarea
                                name="messageCon2"
                                id="messageCon2"
                                className="form-control"
                                placeholder="Message"
                                autoComplete={"off"}
                                {...register("message", { required: false })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="submit"
                            name="submit"
                            className="btn btn-blue rounded-0 px-5 float-end btnContact2"
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
export default CareerModel;

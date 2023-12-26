
import React, { useState, useRef, useEffect } from "react";
import { saveContactFormApi } from "@/src/services/HomeService";
import PhoneInput from "react-phone-number-input";
import ErrorToast from "../toast/ErrorToast";
import { fetchResponseErrors } from "@/src/utils/helpers/common";
import { useForm, Controller } from "react-hook-form";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import { toast } from "react-toastify";

function SimpleModal() {
    const closeRef = useRef(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
    } = useForm();
    const currentPageURL = getCurrentUrl();
    const onSubmit = (data) => {
      saveContactFormApi(data)
        .then((res) => {
          toast.success(
            "Thank you, Our team will get back to you soon"
          );
          reset();
          closeRef.current.click();
        })
        .catch((err) => {
          toast.error(<ErrorToast error={fetchResponseErrors(err.response)} />);
          //toast.error("Something went wrong, please try again");
        });
    };

    // const initialState = {
    //     name: "",
    //     email: "",
    //     message: "",
    //     phone: "",
    //     date: "",
    //     time: "",
    //     formName: "bookACall",
    //     page: "home",
    //   };

    // const [formData, setFormData] = useState(initialState);
    // const handleSubmit = () => {
    //     console.log(formData);
    //     if (!formData.name || !formData.email || !formData.phone) {
    //       return toast.error("Please fill required field");
    //     }
    //     closeRef.current.click();
    //     saveContactFormApi(formData)
    //       .then((res) => {
    //         setFormData(initialState);
    //         toast.success(
    //           "Enquire form submitted successfully, out support teams contact you soon"
    //         );
    //       })
    //       .catch((err) => {
    //         toast.error("Something went wrong, please try again");
    //       });
    //   };
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
                  // setFormData(initialState);
                  // resetFile();
                }}
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>

            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12 ">
                  <div className="">
                    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value="aboutDubaiBrochureForm" {...register("formName", { required: false })}/>
                    <input type="hidden" value={currentPageURL} {...register("page", { required: false })}/>
                      <div className="">
                        <div className="row">
                          <div className="col-md-12">
                            <div className=" text-center">
                              <img
                                src="/images/logo_blue.png"
                                alt="Range Property"
                                className="img-fluid"
                                width="150"
                              />
                              <h6 className="text-primary py-2">
                              Enter Details For Downloding Brochure
                            </h6>
                            </div>
                            <div className="form-group  mb-2">
                              
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
                                placeholder="Enter your email"
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
    </div>

    </>
  );
}
export default SimpleModal;

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
import { saveContactFormApi } from "@/src/services/HomeService";

function MortgageModel(props) {

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
        careerCloseRef.current.click();
      })
      .catch((err) => {
        toast.error(<ErrorToast error={fetchResponseErrors(err.response)} />);
        //toast.error("Something went wrong, please try again");
      });
  };
  const careerCloseRef = useRef(null);
  const fileRef = useRef(null);

  return (
    <>
      <div
        className="modal fade"
        id="mortageModel"
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
                <div className="col-12 col-lg-12 col-md-12 ">
                  <div className="">
                    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value="viewClosingCostForm" {...register("formName", { required: false })}/>
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
                              Enter Details
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
export default MortgageModel;

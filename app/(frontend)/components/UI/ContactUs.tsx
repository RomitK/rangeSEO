"use client";
import React from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import { saveContactFormApi } from "@/src/services/HomeService";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import { FieldError } from "react-hook-form";
import Swal from 'sweetalert2'

const ContactUs = () => {

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

        Swal.fire({
          position: "center",
          icon: "success",
          showCloseButton: true,
          title: "Form Submitted",
          text: "Thank you. Our team will get back to you soon.",
          showConfirmButton: false,
          timer: 1500
        });

        // toast.success(
        //   "Thank you. Our team will get back to you soon."
        // );
        reset();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };
  return (
    <div className="col-12 col-lg-4 col-md-4 propertyDesktopItemLink">
      <div className="text-start">
        <div className="mb-3">
          <p className="text-dark mb-0"><b>WRITE TO US</b></p>
        </div>

        <div className="contactForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 mb-2">
                <input
                  type="text"
                  className="form-control rounded-0 fs-14"
                  id="name"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && <small className="text-danger">Name is required.</small>}
              </div>

              <div className="col-12 mb-2">
                <input
                  type="email"
                  className="form-control rounded-0 fs-14"
                  id="email"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && <small className="text-danger">Email is required.</small>}
              </div>

              <div className="col-12 mb-2">
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
                        className={`form-control rounded-0 fs-14 d-flex ${errors.phone ? 'is-invalid' : ''}`}
                        defaultCountry="AE"
                        placeholder="Enter Phone Number"
                        error={errors.phone ? 'Invalid phone number' : undefined}
                        {...field}
                        style={{ border: "0px" }}
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

              <div className="col-12 mb-2">
                <textarea
                  className="form-control rounded-0 fs-14"
                  id="message"
                  rows={3}
                  placeholder="Message"
                  {...register("message", { required: false })}
                ></textarea>
                {errors.message && (
                  <small className="text-danger">Message is required.</small>
                )}
              </div>
              <input type="hidden" value="FooterContactForm" {...register("formName", { required: false })} />
              <input type="hidden" value={currentPageURL} {...register("page", { required: false })} />
              <div className="col-12 mb-2">
                <div className="text-start">
                  <button
                    className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

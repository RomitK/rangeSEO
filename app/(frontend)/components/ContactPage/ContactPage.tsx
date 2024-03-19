import { useGetContactFaqsData } from "@/src/services/FaqService";
import parse from "html-react-parser";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveContactFormApi } from "@/src/services/HomeService";
import { useForm, Controller } from "react-hook-form";
import "@/public/css/style.css"
import "@/public/css/contact-Us-styles.css"
import PhoneInput from "react-phone-number-input";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import Swal from 'sweetalert2'
import { FieldError } from "react-hook-form";
import { isValidPhoneNumber } from 'react-phone-number-input'

function ContactPage() {
  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {

    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      if (isMobileDevice) {
        document.body.style.overflow = 'auto';
      }
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

  const { faqsData } = useGetContactFaqsData();
  const [activeIndex, setActiveIndex] = useState(0);
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    formName: "contactForm",
    page: "contact",
  });
  // const handleSubmit = () => {
  //   if (!formData.name || !formData.email || !formData.phone) {
  //     return toast.error("Please fill required field");
  //   }
  //   saveContactFormApi(formData)
  //     .then((res) => {
  //       toast.success(
  //         "Enquire form submitted successfully, out support teams contact you soon"
  //       );
  //       setFormData({
  //         name: "",
  //         email: "",
  //         message: "",
  //         phone: "",
  //         formName: "contactForm",
  //         page: "contact",
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error("Something went wrong, please try again");
  //     });
  // };
  return (
    <>
      {/* <header id="contactUsHeader">
        <img
          src="/images/banner/contactUsBanner.webp"
          className="headerSimpleImg"
        />
      </header> */}
      <section className="section contactSection" id="contactSectionId">
        <div className="container">
          <h4 className={`text-primary text-center  sctionMdTitle ${isMobileDev ? "pb-0" : ""}`}>
            CONTACT US
          </h4>
          <p className={`fs-12 text-secondary mxWdtext ${isMobileDev ? "mb-3" : "mb-5"}`}>
            Connect with Range for unparalleled real estate solutions. From
            inquiries to collaborations, our team is ready to assist. Reach out
            through the form below or stay updated on industry insights through
            our social channels. Let's transform your property goals into
            reality – contact Range today.
          </p>
        </div>
      </section>
      <section className="section contactBoxsSection">
        <div className="container">
          <div className="row" >
            {
              isMobileDev && (
                <>

                  <div className="col-6 paddingRight0">
                    <div className="contactBox bdrOnly">
                      <h5 className="">Call Us</h5>
                      <a href="tel:80072888" className="textFlexBar">
                        <img
                          src="/images/icons/phone-icon.png"
                          className="contact-icon"
                          alt="phone"
                        />
                        <p className="fs-12">800 72 888</p>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 paddingRight0">
                    <div className="contactBox bdr">
                      <h5>Email</h5>
                      <a href="mailto:sales@range.ae" className="textFlexBar">
                        <img
                          src="/images/icons/mail-icon.png"
                          className="contact-icon"
                          alt="mail"
                        />
                        <p className="fs-12">sales@range.ae</p>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 paddingRight0">
                    <div className="contactBox bdrOnly">
                      <h5>WhatsApp</h5>
                      <a
                        href={
                          "https://wa.me/+971506337953?text=Hi, Please let me know more about investing in Dubai Real Estate"
                        }
                        className="textFlexBar"
                      >
                        <img
                          src="/images/icons/whatsapp-icon.png"
                          className="contact-icon"
                          alt="whatsapp"
                        />
                        <p className="fs-12">+971 50 633 7953</p>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 paddingRight0">
                    <div className="contactBox">
                      <h5>Address</h5>
                      <a href="tel:80072888" className="textFlexBar">
                        <img
                          src="/images/icons/map_pin.png"
                          className="contact-icon"
                          alt="whatsapp"
                        />
                        <p className="fs-12"> 2601, Aspect Tower, Business Bay, Dubai, UAE</p>
                      </a>
                    </div>
                  </div>

                </>
              )
            }
            {
              !isMobileDev && (
                <>

                  <div className="col-lg-3 ">
                    <div className="contactBox">
                      <h5 className="">Call Us</h5>
                      <a href="tel:80072888" className="textFlexBar">
                        <img
                          src="/images/icons/phone-icon.png"
                          className="contact-icon"
                          alt="phone"
                        />
                        <p className="fs-18">800 72 888</p>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 paddingLeft0">
                    <div className="contactBox bdr">
                      <h5>Email</h5>
                      <a href="mailto:sales@range.ae" className="textFlexBar">
                        <img
                          src="/images/icons/mail-icon.png"
                          className="contact-icon"
                          alt="mail"
                        />
                        <p className="fs-18">sales@range.ae</p>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 paddingRight0">
                    <div className="contactBox bdrOnly">
                      <h5>WhatsApp</h5>
                      <a
                        href={
                          "https://wa.me/+971506337953?text=Hi, Please let me know more about investing in Dubai Real Estate"
                        }
                        className="textFlexBar"
                      >
                        <img
                          src="/images/icons/whatsapp-icon.png"
                          className="contact-icon"
                          alt="whatsapp"
                        />
                        <p className="fs-18">+971 50 633 7953</p>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 paddingRight0">
                    <div className="contactBox">
                      <h5>Address</h5>
                      <a href="tel:80072888" className="textFlexBar">
                        <img
                          src="/images/icons/map_pin.png"
                          className="contact-icon"
                          alt="whatsapp"
                        />
                        <p className="fs-18"> 2601, Aspect Tower, Business Bay, Dubai, UAE</p>

                      </a>


                    </div>
                  </div>

                </>
              )
            }

          </div>
        </div>
      </section>
      <section className="addressSection">
        <div className="container">
          <div className="AddressArea">
            <div className="addressBox">
              <h4 className="text-center text-primary">Request a Call back</h4>

              <div className="addressBoxContent">
                <div className="row ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12 mb-2">
                      <p>Please fill the form</p>
                      <input type="hidden" value="CallBackRequestForm" {...register("formName", { required: false })} />
                      <input type="hidden" value={currentPageURL} {...register("page", { required: false })} />
                      <input
                        type="text"
                        className="form-control cntInptField"
                        placeholder="Name"
                        {...register("name", { required: true })}

                      />
                      {errors.name && <small className="text-danger">Name is required.</small>}
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="email"
                        className="form-control cntInptField"
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
                    <div className="col-12">
                      <textarea
                        className="form-control cntInptField textareaField"
                        placeholder="Message"

                        {...register("message", { required: false })}
                      ></textarea>
                    </div>
                    <input
                      type="submit"
                      className="fillBtn submitBtn"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="addressBox">
              <div className="addressBoxHead">
                <h4>Location</h4>
                <p className=" text-secondary">

                </p>
              </div>
              <div className="addressBoxContent pad-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.330369250141!2d55.26378107538162!3d25.192078977714353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d5b3fdaac1%3A0xb73489ebcf242a4f!2sRange%20International%20Property%20Investments!5e0!3m2!1sen!2sae!4v1699861068005!5m2!1sen!2sae"
                  width="600"
                  height="450"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faqSection">
        <div className="container">
          {/* <h4 className="sctionMdTitle text-primary ">FAQS</h4> */}


          <div className="location-heading-div text-center padding">
            <h2 className="location-heading">Frequently Ask Questions</h2>
          </div>

          <div className="upper-heading-div text-center  padding-bottom">
            <span className="upper-heading">FAQs</span>
            <span>
              <i className="fa-solid fa-horizontal-rule"></i>
            </span>
          </div>
          {/* <div className="accordion" id="FAQAccordion"> */}
          <div className="accordion">
            {faqsData &&
              faqsData?.map((faq, index) => {
                return (
                  <div className="accordion-item" key={index + "faq"}>
                    <button
                      className={`accordion-button ${activeIndex != index ? " collapsed" : ""
                        } `}
                      data-bs-toggle="collapse"
                      data-bs-target={"#faqCollapse-" + index}
                      aria-expanded={activeIndex == index ? true : false}
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                    >
                      {faq.question}
                    </button>
                    <div
                      id={"faqCollapse-" + index}
                      className={`accordion-collapse collapse  ${activeIndex == index ? " show" : ""
                        } `}
                      data-bs-parent="#FAQAccordion"
                    >
                      <div className="accordion-body">
                        <p className="fs-14 text-secondary">
                          {faq && faq.answer && parse(faq?.answer ?? "")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {/* <section className="sectionBanner">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="bnrTitle">Still need help?</h2>
              <p className="fs-12 text-secondary">
                Click on the blue round button at the bottom right corner of
                this page. You can <br />
                also email our support team at{" "}
                <a href="#" className="fs-12">
                  info@range.ae
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <a href="#contactSectionId" className="fillBtn contactBtn btn">
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
export default ContactPage;

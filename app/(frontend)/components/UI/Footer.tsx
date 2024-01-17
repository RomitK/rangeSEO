"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import ContactUs from "./ContactUs";
import parse from "html-react-parser";
import { getCurrentUrl } from "@/src/utils/helpers/common";
import { useForm } from "react-hook-form";
import { saveContactFormApi } from "@/src/services/HomeService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faYoutubeSquare,
  faTiktok,
  faLinkedin,
  faTwitter,
  faYoutube,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();
  const faFacebookIcon = faFacebook as IconProp;
  const faInstagramIcon = faInstagram as IconProp;
  const faTiktokIcon = faTiktok as IconProp;
  const faLinkedinIcon = faLinkedin as IconProp;
  const faYoutubeIcon = faYoutube as IconProp;
  const faTelegramIcon = faTelegram as IconProp;
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
        toast.success("Thank you for subscribing to our mailing list.");
        reset();
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again");
      });
  };
  return (
    <>
      <footer className="pt-3 text-dark footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-3">
                <div className="col-12 col-lg-4 col-md-4">
                  <div className="mb-3">
                    <Link href={{ pathname: "/" }}>
                      <img
                        src="/images/logo.png"
                        alt="Range Internation Property Investments"
                        className="img-fluid"
                        width="175"
                      />
                    </Link>
                  </div>
                  <div className="mb-3">
                    <p className=" fs-12 mb-0">
                      Range International Property Investments is an esteemed
                      award-winning real estate brokerage based in Dubai, UAE.
                      With over two decades of unmatched experience, we have
                      established ourselves as industry leaders, renowned for
                      our exceptional services and deep knowledge of the real
                      estate market locally and internationally.
                    </p>
                  </div>
                  <div className="mb-1">
                    <p className=" mb-0 font-weight-bold">
                      <b>Quick Link</b>
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6 col-md-6">
                      <ul className="mb-0 list-unstyled footNav ">
                        <li>
                          <Link className="footLink text-dark" href="/buy">
                            Buy
                          </Link>
                        </li>
                        <li>
                          <Link className="footLink text-dark" href="/rent">
                            Rent
                          </Link>
                        </li>
                        <li>
                          <Link className="footLink text-dark" href="/offplan">
                            Off-Plan
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/luxuryProperties"
                            className="footLink text-dark"
                          >
                            Luxury Properties
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg-6 col-md-6">
                      <ul className="mb-0 list-unstyled footNav">
                        <li>
                          <Link
                            className="footLink text-dark"
                            href={{
                              pathname: "/services",
                            }}
                          >
                            Services
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/dubaiGuide"
                            className="footLink text-dark"
                          >
                            Dubai Guides
                          </Link>
                        </li>
                        <li>
                          <Link className="footLink text-dark" href="/about">
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="footLink text-dark"
                            href={{
                              pathname: "/contactUs",
                            }}
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4 col-md-4">
                  <div className="text-start">
                    <div className="mb-1">
                      <p className=" mb-0 font-weight-bold">
                        <b>CONTACT INFO</b>
                      </p>
                    </div>
                    <div className="mb-3">
                      <ul className="list-unstyled">
                        <li>
                          <a
                            className="text-decoration-none text-dark fs-14"
                            href="tel:80072888"
                          >
                            <i className="bi bi-telephone-fill text-primary"></i>
                            &nbsp; Call Us 800 72 888
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-decoration-none text-dark fs-14"
                            href="mailto:info@range.ae"
                          >
                            <i className="bi bi-envelope-fill text-primary"></i>
                            &nbsp; info@range.ae
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-decoration-none text-dark fs-14"
                            href="#"
                          >
                            <i className="bi bi-geo-alt-fill text-primary"></i>
                            &nbsp; 2601 Aspect Tower, Business Bay, United Arab
                            Emirates
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-1">
                      <p className="text-dark mb-0 font-weight-bold">
                        <b>MAILING LIST</b>
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="text-dark fs-12 mb-0">
                        Sign up for our mailing list to get latest updates and
                        offers.
                      </p>
                    </div>
                    <div className="subscribeCont">
                      <form
                        action=""
                        method="post"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="input-group">
                          <div className="form-outline">
                            <input
                              type="hidden"
                              value="EmailerForm"
                              {...register("formName", { required: false })}
                            />
                            <input
                              type="hidden"
                              value={currentPageURL}
                              {...register("page", { required: false })}
                            />
                            <input
                              type="search"
                              id="form1"
                              className="form-control fs-14 form-control-lg rounded-0 border-0"
                              placeholder="Email address"
                              {...register("email", { required: true })}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary  rounded-0 "
                          >
                            <i className="bi bi-check2"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <ContactUs />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0 py-4">
          <div className="row g-0 justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-0">
                <div className=" col my-auto iconRoundBlack">
                  <div className="text-center  p-2">
                    <a
                      href={process.env.FACEBOOK_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Facebook`}
                    >
                      <span className="iconBox">
                        <FontAwesomeIcon
                          icon={faFacebookIcon}
                          style={{ color: "#1877F2", fontSize: "30px" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col my-auto iconRoundBlack">
                  <div className="text-center  p-2">
                    <a
                      href={process.env.INSTAGRAM_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Instagram`}
                    >
                      <span className="">
                        <FontAwesomeIcon
                          icon={faInstagramIcon}
                          style={{ color: "#E4405F", fontSize: "30px" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col my-auto iconRoundBlack">
                  <div className="text-center p-2">
                    <a
                      href={process.env.TWITTER_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Twitter`}
                    >
                      <span className="">
                        {/* <i className="fa fa-twitter"></i>
                        <img src="/images/icons/twitter-icon.png" className="twitterIcon"/> */}
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          style={{ height: "30px" }}
                          className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp r-18jsvk2 r-16y2uox r-8kz0gk"
                        >
                          <g>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
                <div className=" col my-auto iconRoundBlack">
                  <div className="text-center  p-2">
                    <a
                      href={process.env.LINKEDIN_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Linkedin`}
                    >
                      <span className="">
                        <FontAwesomeIcon
                          icon={faLinkedinIcon}
                          style={{ color: "#0A66C2", fontSize: "30px" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col my-auto iconRoundBlack">
                  <div className="text-center  p-2">
                    <a
                      href={process.env.YOUTUBE_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Youtube`}
                    >
                      <span className="">
                        <FontAwesomeIcon
                          icon={faYoutubeIcon}
                          style={{ color: "#FF0000", fontSize: "30px" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col my-auto iconRoundBlack">
                  <div className="text-center p-2">
                    <a
                      href={process.env.TIKTOK_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Tiktok`}
                    >
                      <span className="">
                        <FontAwesomeIcon
                          icon={faTiktokIcon}
                          style={{ color: "#000000", fontSize: "30px" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col my-auto iconRoundBlack">
                  <div className="text-center p-2">
                    <a
                      href={process.env.TELEGRAM_LINK}
                      className="text-decoration-none"
                      target="_blanket"
                      aria-label={`Follow us on Telegram`}
                    >
                      <span className="">
                        <FontAwesomeIcon
                          icon={faTelegramIcon}
                          style={{ color: "#000000", fontSize: "30px" }}
                        />
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className="pt-3">
                <p className="fs-12 mb-0  text-center">
                  All Rights Reserved {currentYear} @ Range International
                  Property Investments
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossOrigin="anonymous"
      />
      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js"
        integrity="sha512-+gShyB8GWoOiXNwOlBaYXdLTiZt10Iy6xjACGadpqMs20aJOoh+PJt3bwUVA6Cefe7yF7vblX6QwyXZiVwTWGg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/bs5-lightbox@1.8.3/dist/index.bundle.min.js"
      />
      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js"
      />
      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.js"
      />
      <Script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"
      />
      <Script type="text/javascript" src="../../js/custom.js" />
    </>
  );
}
export default Footer;

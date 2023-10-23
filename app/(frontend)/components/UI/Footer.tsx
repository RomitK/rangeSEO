"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import ContactUs from "./ContactUs";

function Footer() {
  return (
    <>
      <footer className="pt-5 bg-blue">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row g-3">
                <div className="col-12 col-lg-4 col-md-4">
                  <div className="mb-3">
                    <Link href={{ pathname: "/" }}>
                      <img
                        src="/images/logo_white.png"
                        alt="Range Internation Property Investments"
                        className="img-fluid"
                        width="175"
                      />
                    </Link>
                  </div>
                  <div className="mb-3">
                    <p className="text-white fs-12 mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                  <div className="mb-1">
                    <p className="text-white fs-16 mb-0">Quick Link</p>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6 col-md-6">
                      <ul className="mb-0 list-unstyled footNav">
                        <li>
                          <a href="" className="footLink">
                            Buy
                          </a>
                        </li>
                        <li>
                          <a href="" className="footLink">
                            Rent
                          </a>
                        </li>
                        <li>
                          <a href="" className="footLink">
                            Off-Plan
                          </a>
                        </li>
                        <li>
                          <a href="" className="footLink">
                            Luxury Properties
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg-6 col-md-6">
                      <ul className="mb-0 list-unstyled footNav">
                        <li>
                          <a href="" className="footLink">
                            Services
                          </a>
                        </li>
                        <li>
                          <a href="" className="footLink">
                            Insights
                          </a>
                        </li>
                        <li>
                          <a href="" className="footLink">
                            About
                          </a>
                        </li>
                        <li>
                          <Link
                            className="footLink"
                            href={{
                              pathname: "/contact",
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
                      <p className="text-white fs-16 mb-0">CONTACT INFO</p>
                    </div>
                    <div className="mb-3">
                      <ul className="list-unstyled">
                        <li>
                          <a
                            className="text-decoration-none text-white fs-14"
                            href="tel:80072888"
                          >
                            <i className="bi bi-telephone-fill text-primary"></i>
                            &nbsp; Call Us 800 72 888
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-decoration-none text-white fs-14"
                            href="mailto:info@range.ae"
                          >
                            <i className="bi bi-envelope-fill text-primary"></i>
                            &nbsp; info@range.ae
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-decoration-none text-white fs-14"
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
                      <p className="text-white fs-16 mb-0">MAILING LIST</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-white fs-12 mb-0">
                        Sign up for our mailing list to get latest updates and
                        offers.
                      </p>
                    </div>
                    <div className="subscribeCont">
                      <form action="" method="post">
                        <div className="input-group">
                          <div className="form-outline">
                            <input
                              type="search"
                              id="form1"
                              className="form-control fs-14 form-control-lg rounded-0 border-0"
                              placeholder="Email address"
                            />
                          </div>
                          <button
                            type="button"
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
                <div className="col-2 col-lg-2 my-auto">
                  <div className="text-center socialLinkNav p-3">
                    <a href="" className="text-decoration-none">
                      <span className="iconRoundBlack">
                        <i className="fa fa-facebook"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-2 col-lg-2 my-auto">
                  <div className="text-center socialLinkNav p-3">
                    <a href="" className="text-decoration-none">
                      <span className="iconRoundBlack">
                        <i className="fa fa-instagram"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-2 col-lg-2 my-auto">
                  <div className="text-center socialLinkNav p-3">
                    <a href="" className="text-decoration-none">
                      <span className="iconRoundBlack">
                        <i className="fa fa-twitter"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-2 col-lg-2 my-auto">
                  <div className="text-center socialLinkNav p-3">
                    <a href="" className="text-decoration-none">
                      <span className="iconRoundBlack">
                        <i className="fa fa-linkedin"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-2 col-lg-2 my-auto">
                  <div className="text-center socialLinkNav p-3">
                    <a href="" className="text-decoration-none">
                      <span className="iconRoundBlack">
                        <i className="bi bi-youtube"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-2 col-lg-2 my-auto">
                  <div className="text-center socialLinkNav p-3">
                    <a href="" className="text-decoration-none">
                      <span className="iconRoundBlack">
                        <i className="bi bi-tiktok"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className="pt-3">
                <p className="fs-12 mb-0 text-white text-center">
                  All Rights Reserved 2023 @ Range International Property
                  Investments
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
        crossorigin="anonymous"
      />
      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js"
        integrity="sha512-+gShyB8GWoOiXNwOlBaYXdLTiZt10Iy6xjACGadpqMs20aJOoh+PJt3bwUVA6Cefe7yF7vblX6QwyXZiVwTWGg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
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

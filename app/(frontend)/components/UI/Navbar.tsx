"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
function Navbar() {
  const homePage = usePathname() === "/" ? true : false;

  const closeRef = useRef(null);
  const expandPropertyDropdown = [
    "/properties",
    "/ready",
    "/rent",
    "/offplan",
    "/luxuryProperties",
  ].includes(usePathname());
  return (
    <>
      {homePage && (
        <nav className="navbar  bg-white">
          <div className="container py-3">
            <div className="my-auto">
              <Link href={{ pathname: "/" }} className="navbar-brand">
                <img
                  src="/images/logo.png"
                  alt="Range Internation Property Investments"
                  className="img-fluid navMobLogo"
                  width="175"
                />
              </Link>
            </div>
            <div className="my-auto">
              <div className="d-flex navMobRev">
                <ul className="navMainPc d-none d-lg-flex d-md-flex navMenu my-auto me-3">
                  <li className="dropdown navDropMain nav-item">
                    <a
                      href="/properties"
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      Properties <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown navDropSub dropdown-submenu">
                        <a
                          className="dropdown-toggle mainLink"
                          data-toggle="dropdown"
                        >
                          Buy
                        </a>
                        <ul className="dropdown-menu">
                          <li className="">
                            <Link className="" href="/ready">
                              Ready
                            </Link>
                          </li>
                          <li className="">
                            <Link className="" href="/offplan">
                              Off-plan
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/rent">
                          Rent
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/sell">
                          Sell
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/services">
                      Services
                    </Link>
                  </li>
                  {/* <li className="dropdown navDropMain nav-item">
                                        <a href="" className="dropdown-toggle nav-link " data-toggle="dropdown">Services<b
                                            className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li className=""><a href="" className="mainLink">Residential Sales & Leasing</a></li>
                                            <li className=""><a href="" className="mainLink">Commercial Sales &
                                                Leasing</a></li>
                                            <li className=""><a href="" className="mainLink">Property Management</a></li>
                                            <li className=""><a href="" className="mainLink">Holiday Homes</a></li>
                                            <li className=""><a href="" className="mainLink">Mortgages</a></li>
                                        </ul>
                                    </li> */}
                  <li className="dropdown navDropMain nav-item">
                    <a
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      Insights<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      {/* <li className="">
                        <a href="" className="mainLink">
                          Dubai Trends
                        </a>
                      </li> */}
                      <li className="">
                        <Link className="mainLink" href="/communities">
                          Communities
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/developers">
                          Developers
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/projects">
                          Projects
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown navDropMain nav-item">
                    <a
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      About<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="">
                        <Link className="mainLink" href="/about">
                          About Range
                        </Link>
                      </li>

                      <li className="">
                        <Link className="mainLink" href="/teams">
                          Meet the Team
                        </Link>
                      </li>
                      {/* <li className="">
                        <a href="" className="mainLink">
                          Achievements
                        </a>
                      </li> */}
                    </ul>
                  </li>

                  <li className="dropdown navDropMain nav-item">
                    <a
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      Contact<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="">
                        <Link className="mainLink" href="/contactUs">
                          Contact Us
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/careers">
                          Career
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className=" my-auto me-0 me-lg-3 me-md-3 ms-3 ms-lg-0 ms-md-0">
                  <img
                    src="/images/icons/menu.png"
                    alt="Range Internation Property Investments"
                    className="img-fluid navMobMen cursor-pointer"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    width="35"
                  />
                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <div className="">
                        <Link href={{ pathname: "/" }} className="navbar-brand">
                          <img
                            src="/images/logo.png"
                            alt="Range Internation Property Investments"
                            className="img-fluid navMobLogo"
                            width="175"
                          />
                        </Link>
                      </div>
                      <div className="my-auto">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                          ref={closeRef}
                        ></button>
                      </div>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="list-unstyled dropList">
                        <li className="nav-item py-3 border-bottom">
                          <Link
                            className="nav-link"
                            href="/goldenVisa"
                            onClick={() => closeRef.current.click()}
                          >
                            Golden Visa
                          </Link>
                        </li>

                        <li className="nav-item py-3 border-bottom">
                          <Link
                            className="nav-link"
                            href="/careers"
                            onClick={() => closeRef.current.click()}
                          >
                            Career
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/medias"  onClick={() => closeRef.current.click()}>
                            Media
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom" >
                          <Link className="nav-link" href="/blogs" onClick={() => closeRef.current.click()}>
                            Blogs and News
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/dubaiGuide"  onClick={() => closeRef.current.click()}>
                            Dubai Guide
                          </Link>
                        </li>
                        {/* <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Investment Guide
                          </a>
                        </li> */}
                        <li className="nav-item py-3 border-bottom">
                          <Link
                            className="nav-link"
                            href="/faqs"
                            onClick={() => closeRef.current.click()}
                          >
                            FAQ's
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="my-auto">
                  <div className="d-flex justify-content-end">
                    <div className="my-auto me-1">
                      <img
                        src="/images/icons/phone.png"
                        alt="Range Internation Property Investments"
                        className="img-fluid"
                        width="15"
                      />
                    </div>
                    <div className="my-auto text-uppercase text-end  navMob14 fs-14 text-primary">
                      <div>
                        <span className="fw-bold">Toll free</span> 800 72 888
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      {!homePage && (
        <nav className="navbar bg-blue ">
          <div className="container py-3">
            <div className="my-auto">
              <Link href={{ pathname: "/" }} className="navbar-brand">
                <img
                  src="/images/logo_white.png"
                  alt="Range Internation Property Investments"
                  className="img-fluid navMobLogo"
                  width="175"
                />
              </Link>
            </div>
            <div className="my-auto">
              <div className="d-flex navMobRev">
                <ul className="navMainPc navBlue navMenu d-none d-lg-flex d-md-flex my-auto me-3">
                  {expandPropertyDropdown && (
                    <li className="nav-item">
                      <Link className="nav-link" href="/ready">
                        Ready
                      </Link>
                    </li>
                  )}
                  {expandPropertyDropdown && (
                    <li className="nav-item">
                      <Link className="nav-link" href="/rent">
                        Rent
                      </Link>
                    </li>
                  )}
                  {expandPropertyDropdown && (
                    <li className="nav-item">
                      <Link className="nav-link" href="/offplan">
                        Off-plan
                      </Link>
                    </li>
                  )}
                  {expandPropertyDropdown && (
                    <li className="nav-item">
                      <Link className="nav-link" href="/luxuryProperties">
                        LUXURY PROPERTIES
                      </Link>
                    </li>
                  )}

                  {!expandPropertyDropdown && (
                    <li className="dropdown navDropMain nav-item">
                      <a
                        href="properties') }}"
                        className="dropdown-toggle nav-link "
                        data-toggle="dropdown"
                      >
                        Properties <b className="caret"></b>
                      </a>
                      <ul className="dropdown-menu">
                        <li className="dropdown navDropSub dropdown-submenu">
                          <a
                            className="dropdown-toggle mainLink"
                            data-toggle="dropdown"
                          >
                            Buy
                          </a>
                          <ul className="dropdown-menu">
                            <li className="">
                              <Link className="" href="/ready">
                                Ready
                              </Link>
                            </li>
                            <li className="">
                              <Link className="" href="/offplan">
                                Off-plan
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="">
                          <Link className="mainLink" href="/rent">
                            Rent
                          </Link>
                        </li>
                        <li className="">
                          <Link className="mainLink" href="/sell">
                            Sell
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" href="/services">
                      Services
                    </Link>
                  </li>
                  {/* <li className="dropdown navDropMain nav-item">
                                    <a href="" className="dropdown-toggle nav-link " data-toggle="dropdown">Services<b
                                        className="caret"></b></a>
                                    <ul className="dropdown-menu">
                                        <li className=""><a href="" className="mainLink">Residential Sales & Leasing</a></li>
                                        <li className=""><a href="" className="mainLink">Commercial Sales &
                                            Leasing</a></li>
                                        <li className=""><a href="" className="mainLink">Property Management</a></li>
                                        <li className=""><a href="" className="mainLink">Holiday Homes</a></li>
                                        <li className=""><a href="" className="mainLink">Mortgages</a></li>
                                    </ul>
                                </li> */}
                  <li className="dropdown navDropMain nav-item">
                    <a
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      Insights<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      {/* <li className="">
                        <a href="" className="mainLink">
                          Dubai Trends
                        </a>
                      </li> */}

                      <li className="">
                        <Link className="mainLink" href="/communities">
                          Communities
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/developers">
                          Developers
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/projects">
                          Projects
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown navDropMain nav-item">
                    <a
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      About<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="">
                        <Link className="mainLink" href="/about">
                          About Range
                        </Link>
                      </li>

                      <li className="">
                        <Link className="mainLink" href="/teams">
                          Meet the Team
                        </Link>
                      </li>
                      {/* <li className="">
                        <a href="" className="mainLink">
                          Achievements
                        </a>
                      </li> */}
                    </ul>
                  </li>

                  <li className="dropdown navDropMain nav-item">
                    <a
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown"
                    >
                      Contact<b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="">
                        <Link className="mainLink" href="/contactUs">
                          Contact Us
                        </Link>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/careers">
                          Career
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className=" my-auto me-0 me-lg-3 me-md-3 ms-3 ms-lg-0 ms-md-0">
                  <img
                    src="/images/icons/menu.png"
                    alt="Range Internation Property Investments"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    className="img-fluid navMobMen cursor-pointer filterBright"
                    width="35"
                  />
                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <div className="">
                        <Link href={{ pathname: "/" }} className="navbar-brand">
                          <img
                            src="/images/logo.png"
                            alt="Range Internation Property Investments"
                            className="img-fluid navMobLogo"
                            width="175"
                          />
                        </Link>
                      </div>
                      <div className="my-auto">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                          ref={closeRef}
                        ></button>
                      </div>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="list-unstyled dropList">
                      <li className="nav-item py-3 border-bottom">
                          <Link
                            className="nav-link"
                            href="/goldenVisa"
                            onClick={() => closeRef.current.click()}
                          >
                            Golden Visa
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link
                            className="nav-link"
                            href="/careers"
                            onClick={() => closeRef.current.click()}
                          >
                            Career
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/medias" onClick={() => closeRef.current.click()}>
                            Media
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/blogs" onClick={() => closeRef.current.click()}>
                            Blogs and News
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/dubaiGuide" onClick={() => closeRef.current.click()}>
                            Dubai Guide
                          </Link>
                        </li>
                        {/* <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Investment Guide
                          </a>
                        </li> */}
                        <li className="nav-item py-3 border-bottom">
                          <Link
                            className="nav-link"
                            href="/faqs"
                            onClick={() => closeRef.current.click()}
                          >
                            FAQ's
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="my-auto">
                  <div className="d-flex justify-content-end">
                    <div className="my-auto me-1">
                      <img
                        src="/images/icons/phone.png"
                        alt="Range Internation Property Investments"
                        className="img-fluid filterBright"
                        width="15"
                      />
                    </div>
                    <div className="my-auto text-uppercase text-end  navMob14 fs-14 text-white">
                      <div>
                        <span className="fw-bold">Toll free</span> 800 72 888
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      className="btn btn-primary rounded-0 fs-12 btn-sm w-100"
                      href="/sell"
                    >
                      SELL WITH US
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
export default Navbar;

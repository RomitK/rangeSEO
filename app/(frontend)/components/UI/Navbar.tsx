"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
function Navbar() {
  const homePage = usePathname() === "/" ? true : false;
  const expandPropertyDropdown = [
    "/properties",
    "/ready",
    "/rent",
    "/off-plan",
    "/luxury-properties",
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
                            <a className="" href="/ready">
                              Ready
                            </a>
                          </li>
                          <li className="">
                            <a className="" href="off-plan'">
                              Off-plan
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="">
                        <Link className="mainLink" href="/rent">
                          Rent
                        </Link>
                      </li>
                      <li className="">
                        <a href="" className="mainLink">
                          Sell
                        </a>
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
                      <li className="">
                        <a href="" className="mainLink">
                          Dubai Trends
                        </a>
                      </li>
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
                        

                        <Link className="mainLink" href="/management">
                        Management
                        </Link>

                      </li>
                      <li className="">
                      <Link className="mainLink" href="/teams">
                        Agents
                        </Link>
                      </li>
                      <li className="">
                        <a href="" className="mainLink">
                          Achievements
                        </a>
                      </li>
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
                        ></button>
                      </div>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="list-unstyled dropList">
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/careers">
                            Career
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Media
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Blogs and News
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Dubai Guide
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Investment Guide
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            FAQ's
                          </a>
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
                    <div className="my-auto text-uppercase text-end fs-14 navMob14 text-primary">
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
                      <a className="nav-link" href="ready">
                        Ready
                      </a>
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
                      <a className="nav-link" href="off-plan">
                        OFF-PLAN
                      </a>
                    </li>
                  )}
                  {expandPropertyDropdown && (
                    <li className="nav-item">
                      <a className="nav-link" href="luxury-properties">
                        LUXURY PROPERTIES
                      </a>
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
                              <a className="" href="buy">
                                Ready
                              </a>
                            </li>
                            <li className="">
                              <a className="" href="off-plan">
                                Off-plan
                              </a>
                            </li>
                          </ul>
                        </li>

                        <li className="">
                          <Link className="mainLink" href="/rent">
                            Rent
                          </Link>
                        </li>
                        <li className="">
                          <a href="rent" className="mainLink">
                            Sell
                          </a>
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
                      <li className="">
                        <a href="" className="mainLink">
                          Dubai Trends
                        </a>
                      </li>

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
                       
                        <Link className="mainLink" href="/management">
                        Management
                        </Link>

                      </li>
                      <li className="">
                       
                        <Link className="mainLink" href="/teams">
                        Agents
                        </Link>


                      </li>
                      <li className="">
                        <a href="" className="mainLink">
                          Achievements
                        </a>
                      </li>
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
                        ></button>
                      </div>
                    </div>
                    <div className="offcanvas-body">
                      <ul className="list-unstyled dropList">
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/careers">
                            Career
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Media
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Blogs and News
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Dubai Guide
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            Investment Guide
                          </a>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <a className="nav-link" href="">
                            FAQ's
                          </a>
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
                    <div className="my-auto text-uppercase text-end fs-14 navMob14 text-white">
                      <div>
                        <span className="fw-bold">Toll free</span> 800 72 888
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary rounded-0 fs-12 btn-sm w-100"
                    >
                      SELL WITH US
                    </button>
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

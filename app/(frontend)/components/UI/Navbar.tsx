"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
function Navbar() {
  const homePage = usePathname() === "/" ? true : false;
  const [isMobile, setIsMobile] = useState(false);
  const closeRef = useRef(null);
  const expandPropertyDropdown = [
    "/properties",
    "/ready",
    "/buy",
    "/rent",
    "/offplan",
    "/luxuryProperties",
  ].includes(usePathname());

  const mobileNav = [
    "/properties",
    "/ready",
    "/buy",
    "/rent",
    "/offplan",
    '/projects',
    '/developers',
    '/communities',
    "/luxuryProperties",
  ].includes(usePathname());

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    {
      !isMobile && (
        <nav className="navbar bg-white">
        <div className="container py-3">
          <div className="my-auto">
            <Link href={{ pathname: "/" }} className="navbar-brand">
              <img
                src="/images/logo_blue.png"
                alt="Range Internation Property Investments"
                className="img-fluid navMobLogo"
                width="175"
              />
            </Link>
          </div>
          <div className="my-auto">
            <div className="d-flex navMobRev">
              <ul className="navMainPc d-none d-lg-flex d-md-flex navMenu my-auto me-3">

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
                      className="dropdown-toggle nav-link "
                      data-toggle="dropdown" href="/properties"
                     
                    >
                      Properties <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="dropdown navDropSub dropdown-submenu">
                        <a
                          className="dropdown-toggle mainLink"
                          data-toggle="dropdown" href="/buy"
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

                <li className="dropdown navDropMain nav-item">
                  <a
                    className="dropdown-toggle nav-link "
                    data-toggle="dropdown"
                  >
                    Insights<b className="caret"></b>
                  </a>
                  <ul className="dropdown-menu">
                   
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
                    data-toggle="dropdown" href="/about"
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
                    data-toggle="dropdown" href="/contactUs"
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
                        Careers
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
                          src="/images/logo_blue.png"
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

                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/properties"
                          onClick={() => closeRef.current.click()}
                        >
                          Properties
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/projects"
                          onClick={() => closeRef.current.click()}
                        >
                           Projects
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/communities"
                          onClick={() => closeRef.current.click()}
                        >
                           Communities
                        </Link>
                      </li>

                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/developers"
                          onClick={() => closeRef.current.click()}
                        >
                           Developers
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link
                          className="nav-link"
                          href="/teams"
                          onClick={() => closeRef.current.click()}
                        >
                          Meet the Team
                        </Link>
                      </li>

                      <li className="nav-item py-3 border-bottom mobItemLink">
                        <Link className="nav-link" href="/about" onClick={() => closeRef.current.click()}>
                          About Range
                        </Link>
                      </li>

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
                          Careers
                        </Link>
                      </li>
                      <li className="nav-item py-3 border-bottom">
                        <Link className="nav-link" href="/medias"  onClick={() => closeRef.current.click()}>
                          Media
                        </Link>
                      </li>
                      {/* <li className="nav-item py-3 border-bottom" >
                        <Link className="nav-link" href="/blogs" onClick={() => closeRef.current.click()}>
                          Blogs and News
                        </Link>
                      </li> */}
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
      )
    }
       
        {isMobile && !mobileNav &&(
        <nav className="navbar bg-white">
          <div className="container justify-content-start">
            <div className="col-4">
                  <img
                    src="/images/icons/menu.png"
                    alt="Range Internation Property Investments"
                    className="img-fluid navMobMen cursor-pointer"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight2"
                    width="25"
                  />
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasRight2"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <div className="">
                        <Link href={{ pathname: "/" }} className="navbar-brand">
                          <img
                            src="/images/logo_blue.png"
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

                        <li className="nav-item py-3 border-bottom mobItemLink">
                          <Link
                            className="nav-link"
                            href="/properties"
                            onClick={() => closeRef.current.click()}
                          >
                            Properties
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom mobItemLink">
                          <Link
                            className="nav-link"
                            href="/projects"
                            onClick={() => closeRef.current.click()}
                          >
                             Projects
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom mobItemLink">
                          <Link
                            className="nav-link"
                            href="/communities"
                            onClick={() => closeRef.current.click()}
                          >
                             Communities
                          </Link>
                        </li>

                        <li className="nav-item py-3 border-bottom mobItemLink">
                          <Link
                            className="nav-link"
                            href="/developers"
                            onClick={() => closeRef.current.click()}
                          >
                             Developers
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom mobItemLink">
                          <Link
                            className="nav-link"
                            href="/teams"
                            onClick={() => closeRef.current.click()}
                          >
                            Meet the Team
                          </Link>
                        </li>

                        <li className="nav-item py-3 border-bottom mobItemLink">
                          <Link className="nav-link" href="/about" onClick={() => closeRef.current.click()}>
                            About Range
                          </Link>
                        </li>

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
                            Careers
                          </Link>
                        </li>
                        <li className="nav-item py-3 border-bottom">
                          <Link className="nav-link" href="/medias"  onClick={() => closeRef.current.click()}>
                            Media
                          </Link>
                        </li>
                        {/* <li className="nav-item py-3 border-bottom" >
                          <Link className="nav-link" href="/blogs" onClick={() => closeRef.current.click()}>
                            Blogs and News
                          </Link>
                        </li> */}
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
            <div className="col-4">
              <Link href={{ pathname: "/" }} className="navbar-brand">
                <img
                  src="/images/logo_blue.png"
                  alt="Range Internation Property Investments"
                  className="img-fluid navMobLogo"
                  width="175"
                />
              </Link>
            </div>
          </div>
        </nav>
        )}
    </>
  );
}
export default Navbar;

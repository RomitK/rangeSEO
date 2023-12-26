import ContactModel from "../models/contactModel";
import SimpleModal from "../models/simpleModal";
function AboutDubai(props) {
  const contactSideText ="An esteemed award-winning real estate brokerage based in Dubai, UAE.";
  const pageUrl ="Home"
  return (
    <>
      <section className="bg-light my-5  p-relative aboutSectionArea">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-12 col-lg-6 col-md-6 my-auto">
                  <div className="">
                    <div className="mainHead pb-3 text-primary">
                      <h4 className="mb-0">ABOUT DUBAI</h4>
                    </div>
                    <div className="pb-4">
                      <p className="text-secondary mb-0">
                      Range International Property Investments is an esteemed award-winning real estate brokerage based in Dubai, UAE. With over two decades of unmatched experience, we have established ourselves as industry leaders, renowned for our exceptional services and deep knowledge of the real estate market locally and internationally.
                      </p>
                    </div>
                    <div className="pb-4">
                      <div
                        className="accordion benefitAccord"
                        id="accordionExample"
                      >
                        <div className="accordion-item mb-3">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              BENEFITS
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <table className="table table-borderless table-md mb-0">
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="/images/icons/benefit1.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            100% Property ownership
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit2.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Attractive Loan Options
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit3.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            10-year Golden Visa
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit3.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Permanent Residency
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit5.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            8-10% Return on Investment
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="/images/icons/benefit6.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Safest City in the World
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              TRANSACTIONS
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <table className="table table-borderless  table-md mb-0">
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit1.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            100% Property ownership
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit2.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Attractive Loan Options
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="images/icons/benefit3.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            10-year Golden Visa
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="/images/icons/benefit3.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Permanent Residency
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="/images/icons/benefit5.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            8-10% Return on Investment
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img
                                            src="/images/icons/benefit6.png"
                                            alt="range"
                                            className="img-fluid"
                                            width="25px"
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Safest City in the World
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="">
                    <SimpleModal brochure={props.brochure}/>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <div className="imgCoverBox">
                        <div className="bgAboutDubai"></div>
                     </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AboutDubai;

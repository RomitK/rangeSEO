import dynamic from 'next/dynamic';
import Image from 'next/image'
const AboutDubaiModal = dynamic(() => import('@/app/(frontend)/components/models/AboutDubaiModal'));

function AboutDubai(props) {
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
                        Dubai is a thriving city that embodies the pinnacle of ambition and innovation. Located at the heart of the United Arab Emirates, this city has risen from the desert to become a global hub of commerce and luxury. In Dubai, you'll find a dynamic blend of tradition and modernity, offering unparalleled investment opportunities and a lifestyle that redefines luxury. From its iconic skyline to pristine beaches, Dubai stands as a testament to human ingenuity, welcoming investors and those seeking a world where success knows no bounds.
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
                                          <Image loading="lazy"
                                            src="/images/icons/benefit1.png"
                                            alt="range"
                                            height={25}
                                            width={25}
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            100% Property Ownership
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <Image loading="lazy"
                                            src="/images/icons/benefit2.png"
                                            alt="range"
                                            height={25}
                                            width={25}
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
                                          <Image loading="lazy"
                                            src="/images/icons/benefit3.png"
                                            alt="range"
                                            height={25}
                                            width={25}
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
                                          <Image loading="lazy"
                                            src="/images/icons/benefit3.png"
                                            alt="range"
                                            height={25}
                                            width={25}
                                          />
                                        </div>
                                        <div className="my-auto">
                                          <small className="text-dark">
                                            Tax Free Income
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <div className="my-auto me-2">
                                          <img loading="lazy"
                                            src="/images/icons/benefit5.png"
                                            alt="range"
                                            height={25}
                                            width={25}
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
                                          <Image loading="lazy"
                                            src="/images/icons/benefit6.png"
                                            alt="range"
                                            height={25}
                                            width={25}
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
                      </div>
                    </div>
                    <div className="">
                      <AboutDubaiModal />
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

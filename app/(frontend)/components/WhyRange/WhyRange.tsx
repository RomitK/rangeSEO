import CalenderModel from "../models/calenderModel";
function WhyRange(){
    return (
        <>
        <section className="my-5">
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-12 col-md-12">
                    <div className="row">
                        <div className="col-12 col-lg-5 col-md-5 my-auto">
                            <div className="">

                                <div className="mainHead pb-3 text-primary">
                                    <h4 className="mb-0">WHY RANGE?</h4>
                                </div>
                                <div className="pb-4">
                                    <p className="text-secondary mb-0">Range International Property Investments is an esteemed award-winning real estate brokerage based in Dubai, UAE. With over two decades of unmatched experience, we have established ourselves as industry leaders, renowned for our exceptional services and deep knowledge of the real estate market locally and internationally.
                                    </p>
                                </div>
                                <div className="">
                                    <button className="btn btn-blue text-uppercase btn-lg"  data-bs-toggle="modal"
                                    data-bs-target="#bookAmeeting">Book A Call</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7 col-md-7">
                            <div className="row">
                                <div className="col-12 col-lg-6 col-md-6 my-auto">
                                    <div className="d-flex justify-content-start py-3 py-lg-5 py-md-3">
                                        <div className="my-auto me-3">
                                            <center><img src="/images/icons/why1.png"
                                                    className="img-fluid" alt="range" width="60" /></center>
                                        </div>
                                        <div className="my-auto">
                                            <div className="mainHead text-primary text-uppercase">
                                                <h4 className="fw-800 mb-0">AED 20B+</h4>
                                                <p className="text-dark mb-0 fs-20">PROPERTY SALES</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 my-auto">
                                    <div className="d-flex justify-content-start  py-3 py-lg-5 py-md-3">
                                        <div className="my-auto me-3">
                                            <center><img src="/images/icons/why2.png"
                                                    className="img-fluid" alt="range" width="60" /></center>
                                        </div>
                                        <div className="my-auto">
                                            <div className="mainHead text-primary text-uppercase">
                                                <h4 className="fw-800 mb-0">5-STAR</h4>
                                                <p className="text-dark mb-0 fs-20">CUSTOMER REVIEWS</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 my-auto">
                                    <div className="d-flex justify-content-start  py-3 py-lg-5 py-md-3">
                                        <div className="my-auto me-3">
                                            <center><img src="/images/icons/why3.png"
                                                    className="img-fluid" alt="range" width="60" /></center>
                                        </div>
                                        <div className="my-auto">
                                            <div className="mainHead text-primary text-uppercase">
                                                <h4 className="fw-800 mb-0">MULTI</h4>
                                                <p className="text-dark mb-0 fs-20">LANGUAGE AGENTS</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6 col-md-6 my-auto">
                                    <div className="d-flex justify-content-start  py-3 py-lg-5 py-md-3">
                                        <div className="my-auto me-3">
                                            <center><img src="/images/icons/why4.png"
                                                    className="img-fluid" alt="range" width="60" /></center>
                                        </div>
                                        <div className="my-auto">
                                            <div className="mainHead text-primary text-uppercase">
                                                <h4 className="fw-800 mb-0">5,000</h4>
                                                <p className="text-dark mb-0 fs-20">PROPERTY SOLD</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <CalenderModel/>

</>
    );
}
export default WhyRange;
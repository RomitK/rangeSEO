function SingleTestimonial() {
   
    return (
        <>
            <div className="swiper-slide">
                <div className="bg-light p-4">
                    <div>
                        <i className="fa fa-quote-left fs-6 text-blue"></i>
                    </div>
                    <div className="text-primary mt-1 fs-12"><span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                    <div>
                        <p className="fs-14 my-1">Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                        </p>
                    </div>
                    <div className="text-end text-blue">
                        <i className="fa fa-quote-right fs-6"></i>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start mt-2">
                            <div className="my-auto me-3">
                               
                            </div>
                            <div className="my-auto">
                                <div className="">
                                    <h4 className="fw-800 mb-0 fs-14 text-blue">Daren Axell</h4>
                                    <p className="text-primary fs-12 mb-0">Daren Axell</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-auto">
                            <a href="tel:800 72 888"
                                className="btn btn-primary rounded-0 fs-12  py-1 px-2 text-decoration-none">Contact
                                Agent</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SingleTestimonial;

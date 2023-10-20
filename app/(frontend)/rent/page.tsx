function Rent(){
    return (
        <>
             <section className="">
        <div className="container-fluid px-0">
            <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12">
                    <div className="row g-0">
                        <div className="col-12 col-lg-12 col-md-12">
                            <div className="p-3 shadow-sm">
                                <form action="">
                                    <div className="row">
                                         <div className="col">
                                            <input id="pac-input" className="controls form-control" type="text"
                                                placeholder="Search Place" />
                                        </div>
                                       
                                        <div className="col">
                                            <select name="category" id="category" className="form-select bedroomSelect">
                                                <option value="">Select Category</option>
                                                
                                            </select>
                                        </div>
                                        <div className="col">
                                            <select name="accomodation" id="accomodation" className="form-select bedroomSelect">
                                                <option value="">Select Accomodation</option>
                                                
                                            </select>
                                        </div>

                                        <div className="col">
                                            <select name="bedrooms" id="bedrooms" className="form-select bedroomSelect">
                                                <option value="">Bedrooms</option>
                                                
                                            </select>
                                        </div>
                                        <div className="col">
                                            <div className="dropdown">
                                                <div className="form-select" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                 Price
                                                </div>
                                                <div className="dropdown-menu p-4">
                                                  <div className="mb-3">
                                                    <label htmlFor="minprice" className="form-label">Minimum Price</label>
                                                    <input type="text" className="form-control" id="minprice" placeholder="0" />
                                                  </div>
                                                  <div className="mb-3">
                                                    <label htmlFor="maxprice" className="form-label">Maximum Price</label>
                                                    <input type="text" className="form-control" id="maxprice" placeholder="Any Price" />
                                                  </div>
                                                </div>
                                              </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6">
                            <div>
                                <div id="map"></div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6">
                            <div>
                                <div id="dataTable">
                                    <div>
                                        <h5>Real Estate & Homes For Sale</h5>
                                    </div>
                                    <div id="PropertyResult">

                                    </div>
                                </div>
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
export default Rent;
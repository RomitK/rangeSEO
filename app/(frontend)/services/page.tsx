import "@/public/css/developers-styles.css";

function Services(){
    return (
        <>
         
            <header>
                     <img src="/images/banner/homeBg.webp" className="headerImg" />
                     {/* <div className="p-relative">
                        <video className="d-block w-100 videoMain" 
                                autoPlay loop  preload="metadata"
                                poster="images/banner/homeBg.webp"
                               >
                                <source src="/videos/homeVideo.mp4" type="video/mp4" />
                                <source src="/videos/homeVideo.mp4" type="video/mov" />
                                Sorry, your browser doesn't support videos.
                        </video>
                        <div className="videoOverlay"></div>
                        </div> */}
            </header>
            <section className="servicePageSec">
                    <div className="container">
                         <h4 className="sctionMdTitle text-primary text-center mb-4">SERVICES</h4> 
                         <p className="fs-14 text-secondary mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                         </p>
                         <div className="row">
                               <div className="col-md-6">
                                    <div className="serviceCard">
                                          <img src="/images/banner/homeBg.webp" className="serviceCardImg" />
                                          <div className="serCardContent ">
                                              <h3 className="cardTitle text-center">Residential Sales & Leasing</h3>
                                               <p className="fs-14 text-secondary mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing 
                                                   elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                                   ut aliquip ex ea commodo consequat. 
                                                </p>  
                                                <button className="fillBtn  mrAuto cardBtn" >ENQUIRE NOW</button>                                         
                                          </div>
                                    </div>
                               </div>
                               <div className="col-md-6">
                                    <div className="serviceCard">
                                          <img src="/images/banner/homeBg.webp" className="serviceCardImg" />
                                          <div className="serCardContent ">
                                              <h3 className="cardTitle text-center">Commercial Sales & Leasing</h3>
                                               <p className="fs-14 text-secondary mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing 
                                                   elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                                   ut aliquip ex ea commodo consequat. 
                                                </p>  
                                                <button className="fillBtn  mrAuto cardBtn" >ENQUIRE NOW</button>                                         
                                          </div>
                                    </div>
                               </div>
                               <div className="col-md-6">
                                    <div className="serviceCard">
                                          <img src="/images/banner/homeBg.webp" className="serviceCardImg" />
                                          <div className="serCardContent ">
                                              <h3 className="cardTitle text-center">Residential Sales & Leasing</h3>
                                               <p className="fs-14 text-secondary mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing 
                                                   elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                                   ut aliquip ex ea commodo consequat. 
                                                </p>  
                                                <button className="fillBtn  mrAuto cardBtn" >ENQUIRE NOW</button>                                         
                                          </div>
                                    </div>
                               </div>
                               <div className="col-md-6">
                                    <div className="serviceCard">
                                          <img src="/images/banner/homeBg.webp" className="serviceCardImg" />
                                          <div className="serCardContent ">
                                              <h3 className="cardTitle text-center">Commercial Sales & Leasing</h3>
                                               <p className="fs-14 text-secondary mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing 
                                                   elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                                   ut aliquip ex ea commodo consequat. 
                                                </p>  
                                                <button className="fillBtn  mrAuto cardBtn" >ENQUIRE NOW</button>                                         
                                          </div>
                                    </div>
                               </div>
                         </div>
                    </div>
            </section>
        <section className="imgSection overlayBgClr">
                <div className="contentBox">
                    <h2>
                        CHECK YOUR ELIGIBILITY
                        FOR GOLDEN VISA
                    </h2>
                    <button className="bdrBtn largBtn ">
                          Check Now
                    </button>
                </div>
        </section>
        
        </>
    );
}
export default Services;
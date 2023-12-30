import Link from "next/link";

function LookingFor() {
  return (
    <>
      <section className="my-5">
        <div className="container">
          {/* <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-md-11">
                    <div className="row g-3">
                       
                        <div className="col-6 col-lg-3 col-md-3">
                            <div className="card cardInterest">
                                <div className="my-3">
                                    <center><img src="/images/icons/interest1.png"
                                            className="img-fluid" alt="range" width="80px" /></center>
                                </div>
                                <div className="card-body text-center">
                                    <small className="card-title">Buy/Rent</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3 col-md-3">
                            <div className="card cardInterest">
                                <div className="my-3">
                                    <center><img src="/images/icons/interest2.png"
                                            className="img-fluid" alt="range" width="80px"/></center>
                                </div>
                                <div className="card-body text-center">
                                    <small className="card-title">Sell with us</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3 col-md-3">
                            <div className="card cardInterest">
                                <div className="my-3">
                                    <center><img src="/images/icons/interest3.png"
                                            className="img-fluid" alt="range" width="80px"/></center>
                                </div>
                                <div className="card-body text-center">
                                    <small className="card-title">Property Management / Holiday Homes</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3 col-md-3">
                            <div className="card cardInterest">
                                <div className="my-3">
                                    <center><img src="/images/icons/interest4.png"
                                            className="img-fluid" alt="range" width="80px" /></center>
                                </div>
                                <div className="card-body text-center">
                                    <small className="card-title">Mortgage</small>
                                </div>
                            </div>
                        </div>                       
                    </div>
                    

                    
                </div>
              
            </div> */}

          <div className="col-12 col-lg-12 col-md-12">
            <div>
              <div className="mainHead mb-5 text-primary text-center">
                <h4>I AM INTERESTED IN</h4>
              </div>
            </div>
          </div>
          <div className="d-flex circleCardsRow">
            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/properties">
                <div className="circleContent">
                  <img
                    src="/images/icons/interest1.png"
                    className="proCricleImg"
                    alt="range"
                    width="80px"
                  />
                  <p className="text">Buying/Renting</p>
                </div>
              </Link>
              <div className="nbrCircle">
                <h6>01</h6>
              </div>
            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/sell">
                <div className="circleContent">
                  <img
                    src="/images/icons/interest2.png"
                    className="proCricleImg"
                    alt="range"
                    width="80px"
                  />
                  <p className="text">Selling</p>
                </div>
              </Link>
              <div className="nbrCircle">
                <h6>02</h6>
              </div>
            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/services">
                <div className="circleContent">
                  <img
                    src="/images/icons/interest2.png"
                    className="proCricleImg"
                    alt="range"
                    width="80px"
                  />
                  <p className="text">Property Management</p>
                </div>
              </Link>
              <div className="nbrCircle">
                <h6>03</h6>
              </div>
            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/services">
                <div className="circleContent">
                  <img
                    src="/images/icons/interest3.png"
                    className="proCricleImg"
                    alt="range"
                    width="80px"
                  />
                  <p className="text">Holiday Homes</p>
                </div>
              </Link>
              <div className="nbrCircle">
                <h6>04</h6>
              </div>
            </div>
            {/* Circle box End */}

            {/* Circle box Start */}
            <div className="proCircleCard">
              <Link className="proCircleBox" href="/services">
                <div className="circleContent">
                  <img
                    src="/images/icons/interest4.png"
                    className="proCricleImg"
                    alt="range"
                    width="80px"
                  />
                  <p className="text"> Mortgage </p>
                </div>
              </Link>
              <div className="nbrCircle">
                <h6>05</h6>
              </div>
            </div>
            {/* Circle box End */}
          </div>

          <div className="col-12 col-lg-12 col-md-12">
            <div className="borderBottom"></div>
          </div>
        </div>
      </section>

      {/* <div className="socialfixBar">
           <a className="socialfixLink whatsapp">
               <i className="fa fa-whatsapp" aria-hidden="true"></i>
           </a>
           <a className="socialfixLink envelope">
               <i className="fa fa-envelope" aria-hidden="true"></i>
           </a>
      </div> */}
    </>
  );
}
export default LookingFor;

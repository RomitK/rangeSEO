function HomeSearch(){
    return (<>
     <section className="mainBg d-none d-md-block d-lg-block d-xl-block " id="home">
        <div className="p-relative">
          <video className="d-block w-100 videoMain"  autoPlay loop  preload="metadata" poster="images/banner/homeBg.webp">
            <source src="/videos/home2.mp4" type="video/mp4" />
            <source src="/videos/home2.mp4" type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video>
          <div className="videoOverlay"></div>
        </div>
        <div className="searchOnVid">
          <div className="container">
            <div className="row">

              <div className="col-12 col-lg-12">
                <div className="row justify-content-center my-5">
                  <div className="col-12 col-lg-6 col-md-10">
                    
                    <form role="form" className=" formBgMain">
                     
                          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />
                            <label className="btn btn-outline-primary" htmlFor="btnradio1"> Buy</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                            <label className="btn btn-outline-primary" htmlFor="btnradio2">Rent</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                            <label className="btn btn-outline-primary" htmlFor="btnradio3">Sale</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" />
                            <label className="btn btn-outline-primary" htmlFor="btnradio4">Mortgage</label>
                          </div>
                          <div className="search-input">
                            <a href="" target="_blank" hidden></a>
                            <input type="text" placeholder="Developer, Community, Project, Property" />
                            <div className="autocom-box">
                            </div>
                            <div className="icon"><i className="fa fa-search"></i></div>
                          </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>);
}
export default HomeSearch;
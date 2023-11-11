function HomeSearch(){
    return (<>
     <section className="mainBg  d-md-block d-lg-block d-xl-block " id="home">
        <div className="p-relative">
          <video className="d-block w-100 videoMain"  autoPlay loop  preload="metadata" poster="images/banner/homeBg.webp">
            <source src="/videos/home4.mp4" type="video/mp4" />
            <source src="/videos/home4.mp4" type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video>
          <div className="videoOverlay"></div>
        </div>
        <div className="searchOnVid">
          <div className="container">
            <div className="row">

              <div className="col-12 col-lg-12">
               
                    
                    <div role="form" className=" formBgMain">
                     
                         
                          
                          <div className="headerForm">
                              <ul className="nav nav-pills frmTabList" id="pills-tab" >
                                      <button className="nav-link active"  data-bs-toggle="pill" data-bs-target="#ProTab-1"  aria-selected="true">
                                           Buy
                                      </button>
                                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#ProTab-2" aria-selected="false">
                                           Sell
                                      </button>
                                      <button className="nav-link"  data-bs-toggle="pill" data-bs-target="#ProTab-3"  aria-selected="false">
                                           Rent
                                      </button>
                              </ul>
                              <div className="tab-content" id="pills-tabContent">
                                  <div className="tab-pane show active" id="ProTab-1">
                                        <div className="search-input frmSearcBar">
                                             <input type="text" placeholder="Buy Search" />
                                             <i className="fa fa-search"></i>
                                        </div>
                                  </div>
                                  <div className="tab-pane" id="ProTab-2" >
                                        <div className="search-input frmSearcBar">
                                            <input type="text" placeholder="Sell Search" />
                                            <i className="fa fa-search"></i>
                                        </div>
                                  </div>
                                  <div className="tab-pane" id="ProTab-3" >
                                        <div className="search-input frmSearcBar">
                                            <input type="text" placeholder="Rent Search" />
                                            <i className="fa fa-search"></i>
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
    </>);
}
export default HomeSearch;
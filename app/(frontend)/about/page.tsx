import "@/public/css/about-styles.css";

function About(){
    return (
        <>
          <header>
                  <img src="images/banner/homeBg.webp" className="headerSimpleImg"/>
          </header>
          <section className="aboutPgSection">
                    <div className="container">
                         <h4 className="sctionMdTitle text-primary ">ABOUT RANGE</h4>
                         <p className="fs-14 text-secondary mb-4">
                             Lorem Ipsum, automated, and futuristic approach to the Dubai property market.
                             Our state-of-the-art marketing ensures a competitive edge with modern and 
                             advanced strategies. Experience bespoke services tailored to deliver accurate 
                             results and ultimate customer satisfaction.
                         </p>
                         <p className="fs-14 text-secondary mb-5">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                             eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                             sunt in culpa qui officia deserunt mollit anim id est laborum.
                             

                         </p>

                         <div className="row">
                             <div className="col-md-6">
                                <div className="simpleCard">
                                    <img src="images/icons/mission-icon.png" className="cardIcon" /> 
                                    <h3 className="cardTitle text-center">MISSION</h3>
                                    <p className="fs-12 text-secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                             </div>
                             <div className="col-md-6">
                                <div className="simpleCard">
                                    <img src="images/icons/vision-icon.png" className="cardIcon" /> 
                                    <h3 className="cardTitle text-center">VISION</h3>
                                    <p className="fs-12 text-secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                             </div>
                         </div>
                    </div>
                   
          </section>
          <section className="leadersSection">
                  <div className="container">
                       <h4 className="sctionMdTitle text-primary mb-5">MEET THE LEADERS</h4>
                       <div className="row">
                            <div className="col-md-4">
                                    <div className="userCard">
                                        <img src="images/team/team-img-1.png" className="leaderImg" />
                                        <div className="cardContent ">
                                            <h5 className="crdTitle">Nitin Chopra</h5>
                                            <p className="crdText">CEO/Founder</p>
                                            <a href="#" className="fillBtn  crdReadMorebtn mrAuto">READ MORE</a>
                                        </div>
                                    </div>
                                    
                            </div>
                            <div className="col-md-4">
                                    <div className="userCard">
                                        <img src="images/team/team-img-2.png" className="leaderImg" />
                                        <div className="cardContent ">
                                            <h5 className="crdTitle">Lester Verma </h5>
                                            <p className="crdText">Managing Partner</p>
                                            <a href="#" className="fillBtn  crdReadMorebtn mrAuto">READ MORE</a>
                                        </div>
                                    </div>
                                    
                            </div>
                            <div className="col-md-4">
                                    <div className="userCard">
                                        <img src="images/team/team-img-3.png" className="leaderImg" />
                                        <div className="cardContent ">
                                            <h5 className="crdTitle">Brendon Baker</h5>
                                            <p className="crdText">Managing Director</p>
                                            <a href="#" className="fillBtn  crdReadMorebtn mrAuto">READ MORE</a>
                                        </div>
                                    </div>
                                    
                            </div>
                       </div>
                  </div>
                  
          </section>
        </>
    );
}
export default About;
import "@/public/css/about-styles.css";
import Link from "next/link";
function About() {
  return (
    <>
      <header>
        <img src="/images/banner/homeBg.webp" className="headerSimpleImg" />
      </header>
      <section className="aboutPgSection">
        <div className="container">
          <h4 className="sctionMdTitle text-primary ">ABOUT RANGE</h4>
          <p className="fs-14 text-secondary mb-4">
            Range International Property Investments is an esteemed
            award-winning real estate brokerage based in Dubai, UAE. With over
            two decades of unmatched experience, we have established ourselves
            as industry leaders, renowned for our exceptional services and deep
            knowledge of the real estate market locally and internationally.
          </p>
          {/* <p className="fs-14 text-secondary mb-5">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                             eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                             sunt in culpa qui officia deserunt mollit anim id est laborum.
                             

                         </p> */}

          <div className="row">
            <div className="col-md-6">
              <div className="simpleCard">
                <img src="/images/icons/about-mission-icon.png" className="cardIcon" />
                <h3 className="cardTitle text-center">MISSION</h3>
                <p className="fs-12 text-secondary">
                  We aspire to shape tomorrow’s real estate through unparalleled
                  services, cutting-edge products, and seamless transactions.
                  Our commitment is to redefine customer satisfaction, offer
                  diverse investment opportunities, and set new industry
                  standards.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="simpleCard">
                <img src="/images/icons/about-vision-icon.png" className="cardIcon" />
                <h3 className="cardTitle text-center">VISION</h3>
                <p className="fs-12 text-secondary">
                  Empowering aspirations in real estate, we envision excellence
                  as a premier brokerage in the UAE, expanding our influence
                  across diverse markets. We aim to unlock untapped potential in
                  real estate technology, propelling us to pioneer and craft
                  bespoke products tailored for international markets,
                  ultimately reshaping the global real estate landscape.
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
                <img src="/images/team/nitin.png" className="leaderImg" />
                <div className="cardContent ">
                  <h5 className="crdTitle">Nitin Chopra</h5>
                  <p className="crdText">CEO/Founder</p>
                  <Link href={`/management`} className="fillBtn  crdReadMorebtn mrAuto" >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="userCard">
                <img src="/images/team/lester.png" className="leaderImg" />
                <div className="cardContent ">
                  <h5 className="crdTitle">Lester Verma </h5>
                  <p className="crdText">Managing Partner</p>
                  <Link href={`/management`} className="fillBtn  crdReadMorebtn mrAuto" >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="userCard">
                <img src="/images/team/brendon.png" className="leaderImg" />
                <div className="cardContent ">
                  <h5 className="crdTitle">Brendon Baker</h5>
                  <p className="crdText">Managing Director</p>
                  <Link href={`/management`} className="fillBtn  crdReadMorebtn mrAuto" >
                    READ MORE
                  </Link>
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

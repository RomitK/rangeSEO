import Link from "next/link";
import { useGetAllManagementData } from "@/src/services/ManagementService";

function AboutPage() {
  const { managementsData } = useGetAllManagementData();
  return (
    <>
      <header className="aboutHeader">
        <img
          src="/images/banner/aboutUsBanner.webp"
          className="headerSimpleImg"
          alt="header"
        />
      </header>
      <section className="aboutPgSection">
        <div className="container">
          <h4 className="sctionMdTitle text-primary ">ABOUT RANGE</h4>
          <p className="fs-14 text-secondary mb-4">
          Range International Property Investments is an esteemed award-winning real estate brokerage based in Dubai, UAE. With over two decades of unmatched experience, we have established ourselves as industry leaders, renowned for our exceptional services and deep knowledge of the real estate market locally and internationally. Our dynamic and innovative team of industry experts is dedicated to delivering exceptional results while building lasting relationships based on professionalism, integrity, and trust. <br/><br/>
          Our forte goes beyond sales & leases of residential, commercial, and off-plan properties. Our expertise extends to Financial Consultancy, Wealth Management, Property Valuation, and Mortgage services. By closely monitoring market trends, we identify high-return investment opportunities, providing you with a seamless and customer-focused experience. Our commitment to research and guidance allows you to have access to extensive premium real estate opportunities in today’s dynamic market. Experience the difference with Range and unlock extraordinary possibilities in the ever-changing real estate landscape.
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
                <img
                  src="/images/icons/about-mission-icon.png"
                  className="cardIcon"
                  alt="mission"
                />
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
                <img
                  src="/images/icons/about-vision-icon.png"
                  className="cardIcon"
                  alt="vission"
                />
                <h3 className="cardTitle text-center">VISION</h3>
                <p className="fs-12 text-secondary">
                  Empowering real estate aspirations, we strive to become a
                  premier brokerage in the UAE, with a vision to expand
                  globally. We focus on leveraging innovative real estate
                  technology to explore untapped potential, crafting bespoke
                  products to reshape the global real estate landscape.
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
            {managementsData &&
              managementsData.map(function (management, index) {
                return (
                  <div className="col-md-4" key={management.id}>
                    <div className="userCard">
                      <img
                        src={management.image}
                        className="leaderImg"
                        alt={management.name}
                      />
                      <div className="cardContent ">
                        <h5 className="crdTitle">{management.name}</h5>
                        <p className="crdText">{management.designation}</p>
                        <Link
                          href={`/managements/${management?.slug}`}
                          className="fillBtn  crdReadMorebtn mrAuto"
                        >
                          READ MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
export default AboutPage;

"use client";
import { SWRProvider } from "@/app/swr-provider";
import { useGetAllTeamData } from "@/src/services/TeamService";
import { useState, useEffect } from "react";
import Link from "next/link";
import "@/public/css/about-styles.css";

const TeamPage = () => {
  return (
    <>
      <SWRProvider> {/* Wrap the SWRProvider around the component */}
        <TeamContent />
      </SWRProvider>
    </>
  );
};

const TeamContent = () => { // Define the content in a separate component
  const { teamsData, isLoading, isError, mutate } = useGetAllTeamData();
  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;

      if (isMobileDevice) {
        document.body.style.overflow = 'auto';
      }

      setIsMobileDev(isMobileDevice);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      {/* <header className="aboutHeader">
        <img loading="lazy" 
          src="/images/banner/teamBanner.webp"
          className="headerSimpleImg"
          alt="team"
        />
      </header> */}
      <section className="section meetOurTeam">
        <div className="container">
          <h4 className={`sctionMdTitle text-primary text-center ${isMobileDev ? "mb-3" : ""}`}>
            MEET THE TEAM
          </h4>
          <p className={`fs-12 text-secondary mxWdtext ${isMobileDev ? "mb-3" : "mb-5"}`}>
            Meet the exceptional team at Range International Property
            Investments, the driving force behind our success. With a wealth of
            experience and a keen understanding of the real estate market, they
            excel at forging strong client relationships and delivering
            outstanding results.
          </p>
        </div>
      </section>
      <section className="teamSection">
        <div className="container">
          <div className="TeamRow">
            {teamsData &&
              teamsData.map(function (team, index) {
                return (
                  <div className="teamCard" key={team.id} >
                    <div className="imgBox">
                      <img loading="lazy"
                        src={team?.image}
                        className="mainCrd"
                        alt={team?.name}
                      />
                    </div>
                    <div className="teamContentBox">
                      <div className="teamContent">
                        <h5 className="title">{team?.name}</h5>
                        <p className="titleText">{team?.designation}</p>
                        <p className="titleText"> {team?.languages.join(', ')} </p>
                      </div>
                      <div className="socialLinkList">
                        {team && team?.contact && (
                          <a
                            href={"tel:" + team?.contact}
                            className="text-decoration-none socialLink"
                            target="_blanket"
                          >
                            <img loading="lazy"
                              src="/images/icons/phone-icon.png"
                              className="crdSocialIcon"
                              alt="phone"
                            />
                          </a>
                        )}
                        {team && team?.email && (
                          <a
                            href={"mailto:" + team?.email}
                            className="text-decoration-none socialLink"
                            target="_blanket"
                          >
                            <img loading="lazy"
                              src="/images/icons/mail-icon.png"
                              className="crdSocialIcon"
                              alt="mail"
                            />
                          </a>
                        )}

                        {team && team?.whatsapp && (
                          <a
                            href={"https://wa.me/" + team?.whatsapp + "?text=Hi, " + team?.name + " Please let me know more about investing in Dubai Real Estate"}
                            className="text-decoration-none socialLink"
                            target="_blanket"
                          >
                            <img loading="lazy"
                              // src="/images/icons/team-whatsapp1.png"
                              src="/images/icons/whatsapp-icon.png"
                              className="crdSocialIcon"
                              alt="whatsapp"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <button className="bdrBtn mrAuto loadBtn mb-5">View All</button> */}
        </div>
      </section>
    </>
  );
};

export default TeamPage;

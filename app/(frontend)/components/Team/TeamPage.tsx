import Link from "next/link";
import { useGetAllTeamData } from "@/src/services/TeamService";

function TeamPage() {
  const { teamsData } = useGetAllTeamData();
  return (
    <>
      <header>
        <img
          src="images/banner/banner-2.png"
          className="headerSimpleImg"
          alt="team"
        />
      </header>
      <section className="section meetOurTeam">
        <div className="container">
          <h4 className="sctionMdTitle text-primary text-center mb-5">
            MEET THE TEAM
          </h4>
          <p className="fs-12 text-secondary mxWdtext mb-5">
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
                  <div className="teamCard" key={team.id}>
                    <div className="imgBox">
                      <img
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
                            <img
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
                            <img
                              src="/images/icons/mail-icon.png"
                              className="crdSocialIcon"
                              alt="mail"
                            />
                          </a>
                        )}

                        {team && team?.whatsapp && (
                          <a
                            href={"https://wa.me/" + team?.whatsapp+"?text=Hi, "+ team?.name +" Please let me know more about investing in Dubai Real Estate"}
                            className="text-decoration-none socialLink"
                            target="_blanket"
                          >
                            <img
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
          <button className="bdrBtn mrAuto loadBtn mb-5">View All</button>
        </div>
      </section>
    </>
  );
}
export default TeamPage;

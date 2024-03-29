"use client";
import { SWRProvider } from "@/app/swr-provider";
import { useGetAllManagementData } from "@/src/services/ManagementService";
import { useState, useEffect } from "react";
import Link from "next/link";
import "@/public/css/about-styles.css";

const AboutPage = () => {
  return (
    <>
      <SWRProvider> {/* Wrap the SWRProvider around the component */}
        <AboutContent />
      </SWRProvider>
    </>
  );
};

const AboutContent = () => { // Define the content in a separate component
  const { managementsData, isLoading, isError, mutate } = useGetAllManagementData();

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
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
                      loading="lazy"
                      src={management.image}
                      className="leaderImg"
                      alt={management.name}
                    />
                    <div className="cardContent ">
                      <h5 className="crdTitle">{management.name}</h5>
                      <p className="">{management.designation}</p>
                      <Link
                        href={`/managements/${management?.slug}`}
                        className="fillBtn crdReadMorebtn mrAuto managementReadMore"
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
  );
};

export default AboutPage;

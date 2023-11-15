"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { useGetAllDeveloperData } from "@/src/services/DeveloperService";

function DeveloperList({ params }) {
  const { developersData } = useGetAllDeveloperData();

  const [developers, setDevelopers] = useState([]);
  const [visibleDevelopers, setVisibleDevelopers] = useState([]);

  const onNextPage = () => {
    const newDevelopers = developers.slice(0, visibleDevelopers.length * 2);
    setVisibleDevelopers(newDevelopers);
  };

  useEffect(() => {
    setDevelopers(developersData);
    setVisibleDevelopers(developersData?.slice(0, 3));
  }, [developersData]);

  return (
    <section className="developersSection">
      <div className="container">
        <h4 className="sctionMdTitle text-primary text-center mb-5">
          DEVELOPERS
        </h4>
        <div className="row">
          {visibleDevelopers?.map(function (developer, index) {
            return (
              <Link
                href={`/developers/${developer?.slug}`}
                className="col-md-4"
                key={developer.id}
              >
                <div className="partnerBox">
                  <img
                    src={developer.logo}
                    className="logoImg"
                    alt={developer.name}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        {developers?.length != visibleDevelopers?.length && (
          <button className="bdrBtn mrAuto loadBtn mt-4" onClick={onNextPage}>
            view All
          </button>
        )}
      </div>
    </section>
  );
}
export default DeveloperList;

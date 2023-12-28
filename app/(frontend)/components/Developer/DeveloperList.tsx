"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { useGetAllDeveloperData } from "@/src/services/DeveloperService";
import axios from "axios";

function DeveloperList({ params }) {
  const { developersData } = useGetAllDeveloperData();
  const [links, setLinks] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [visibleDevelopers, setVisibleDevelopers] = useState([]);

  const onNextPage = () => {
    let url = links?.next;
    axios
      .get(url)
      .then((res) => {
        setDevelopers([...developers, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setDevelopers(developersData?.data);
    setLinks(developersData?.links);

  }, [developersData]);

  return (
    <section className="developersSection">
      <div className="container">
        <h4 className="sctionMdTitle text-primary text-center mb-5">
          DEVELOPERS
        </h4>
        <div className="row">
          {developers?.map(function (developer, index) {
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

        {links?.next && (
            <button className="bdrBtn mrAuto loadBtn mt-4" onClick={onNextPage}>
              View More
            </button>
        )}

      </div>
    </section>
  );
}
export default DeveloperList;

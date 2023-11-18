"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useGetAllFaqsData } from "@/src/services/FaqService";
import parse from "html-react-parser";
import "@/public/css/faq-styles.css";

function FaqsPage() {
  const [query, setQuery] = useState("");
  const { faqsData } = useGetAllFaqsData(query);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <section className="faqSection">
        <div className="container">
          <h4 className="sctionMdTitle text-primary mb-4">
            DUBAI REAL ESTATE FAQ
          </h4>

          <div className="faqSearchBar">
            <input
              type="search"
              className="searchInputField"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="searchBtn">
              <i className="fa fa-search searchIcon"></i> Search{" "}
            </button>
          </div>

          <div className="accordion" id="FAQAccordion">
            {faqsData &&
              faqsData?.map((faq, index) => {
                return (
                  <div className="accordion-item" key={index + "faq"}>
                    <button
                      className={`accordion-button ${
                        activeIndex != index ? " collapsed" : ""
                      } `}
                      data-bs-toggle="collapse"
                      data-bs-target={"#faqCollapse-" + index}
                      aria-expanded={activeIndex == index ? true : false}
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                    >
                      {faq.question}
                    </button>
                    <div
                      id={"faqCollapse-" + index}
                      className={`accordion-collapse collapse  ${
                        activeIndex == index ? " show" : ""
                      } `}
                      data-bs-parent="#FAQAccordion"
                    >
                      <div className="accordion-body">
                        <p className="fs-14 text-secondary">
                          {faq && faq.answer && parse(faq?.answer ?? "")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <section className="sectionBanner">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="bnrTitle">Still need help?</h2>
              <p className="fs-12 text-secondary">
                Click on the blue round button at the bottom right corner of
                this page. You can <br />
                also email our support team at{" "}
                <a href="#" className="fs-12">
                  info@range.ae
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <Link className="fillBtn contactBtn btn" href="/contactUs">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default FaqsPage;

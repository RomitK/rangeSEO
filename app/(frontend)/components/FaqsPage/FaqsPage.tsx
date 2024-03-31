"use client";
import React, { useRef, useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import Link from "next/link";
import { useGetAllFaqsData } from "@/src/services/FaqService";
import parse from "html-react-parser";
import "@/public/css/faq-styles.css";

const FaqsPage = () => {
  return (
    <SWRProvider>
      <FaqsPageContent />
    </SWRProvider>
  );
}
const FaqsPageContent = () => {
  const [query, setQuery] = useState("");
  const { faqsData } = useGetAllFaqsData(query);
  const [activeIndex, setActiveIndex] = useState(0);
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
  return (
    <>
      <section className="faqSection">
        <div className="container">
          {/* <h4 className="sctionMdTitle text-primary mb-4">
            DUBAI REAL ESTATE FAQ
          </h4> */}


          <div className={`location-heading-div text-center ${isMobileDev ? "" : "padding"}`}>
            <h2 className="location-heading">Frequently Ask Questions</h2>
          </div>
          <div className={`upper-heading-div text-center ${isMobileDev ? "" : " padding-bottom"}`}>
            <span className="upper-heading">FAQs</span>
            <span>
              <i className="fa-solid fa-horizontal-rule"></i>
            </span>
          </div>

          <div className={`faqSearchBar ${isMobileDev ? "my-3" : ""}`}>
            <input
              type="search"
              className="searchInputField"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className={`searchBtn ${isMobileDev ? "g-0 w-auto" : ""}`}>
              <i className="fa fa-search searchIcon"></i> Search{" "}
            </button>
          </div>
          {/* <div className="accordion" id="FAQAccordion"> */}
          <div className="accordion">
            {faqsData &&
              faqsData?.map((faq, index) => {
                return (
                  <div className="accordion-item" key={index + "faq"}>
                    <button
                      className={`accordion-button ${activeIndex != index ? " collapsed" : ""
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
                      className={`accordion-collapse collapse  ${activeIndex == index ? " show" : ""
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
    </>
  );
}
export default FaqsPage;

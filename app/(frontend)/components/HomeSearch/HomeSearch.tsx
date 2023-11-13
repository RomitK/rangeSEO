import React from "react";
import { useState } from "react";
import Link from "next/link";

function HomeSearch() {
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  async function changeSearch(e) {
    if (e.target.value.trim() === "") {
      setShowSuggestion(false);
    }
    if (e.target.value.trim() != "") {
      const val = e.target.value;
      const apiUrl = process.env.API_HOST + "search?keyword=" + val;
      try {
        // Make a GET request to the API
        const response = await fetch(apiUrl);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        const data2 = data.data.slice(0, 7);
        for (let i = 0; i < data2.length; i++) {
          const originalText = data2[i].name;
          const formattedText = originalText.replace(
            new RegExp(`(${val})`, "gi"),
            "<strong>$1</strong>"
          );
          data2[i].name = formattedText;
        }
        setShowSuggestion(true);
        setSuggestion(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  return (
    <>
      <section className="mainBg  d-md-block d-lg-block d-xl-block overlayBg homeHeader" id="home">
        <div className="p-relative">
          <video
            className="d-block w-100 videoMain"
            autoPlay
            loop
            preload="metadata"
            poster="images/banner/homeBg.webp"
          >
            <source src="/videos/home4.mp4" type="video/mp4" />
            <source src="/videos/home4.mp4" type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video>
          <div className="videoOverlay"></div>
        </div>
        <div className="headerForm">
                              <ul className="nav nav-pills frmTabList" id="pills-tab" >
                                      <button className="nav-link active"  data-bs-toggle="pill" data-bs-target="#ProTab-1"  aria-selected="true">
                                           Buy
                                      </button>
                                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#ProTab-2" aria-selected="false">
                                           Sell
                                      </button>
                                      <button className="nav-link"  data-bs-toggle="pill" data-bs-target="#ProTab-3"  aria-selected="false">
                                           Rent
                                      </button>
                              </ul>
                              {/* <div className="tab-content" id="pills-tabContent">
                                  <div className="tab-pane show active" id="ProTab-1">
                                        <div className="search-input frmSearcBar">
                                             <input type="text" placeholder="Buy Search" />
                                             <i className="fa fa-search"></i>
                                        </div>
                                  </div>
                                  <div className="tab-pane" id="ProTab-2" >
                                        <div className="search-input frmSearcBar">
                                            <input type="text" placeholder="Sell Search" />
                                            <i className="fa fa-search"></i>
                                        </div>
                                  </div>
                                  <div className="tab-pane" id="ProTab-3" >
                                        <div className="search-input frmSearcBar">
                                            <input type="text" placeholder="Rent Search" />
                                            <i className="fa fa-search"></i>
                                        </div>
                                  </div>
                              </div> */}
                              <div className="search-input frmSearcBar">
                                            <input type="text" placeholder="Search" />
                                            <i className="fa fa-search"></i>
                                        </div>
          </div>
        
      </section>
    </>
  );
}
export default HomeSearch;

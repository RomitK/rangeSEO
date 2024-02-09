import React from "react";
import { useState } from "react";
import Link from "next/link";

function HomeSearch() {
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  async function changeSearch(e) {
    if (e.target.value.trim() === "") {
      setShowSuggestion(false);
      return;
    }
    if (e.target.value.trim() != "") {
      const val = e.target.value;
      const apiUrl = process.env.API_HOST + "searchR?keyword=" + val;
      try {
        // Make a GET request to the API
        const response = await fetch(apiUrl);

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        //const data2 = data.data.slice(0, 7);
        const data2 = data.data;
        for (let i = 0; i < data2.length; i++) {
          const originalText = data2[i].name;
          const formattedText = originalText.replace(
            new RegExp(`(${val})`, "gi"),
            "<strong>$1</strong>"
          );
          //console.log(formattedText);
          data2[i].name = formattedText;
        }
        if (e.target.value.trim() === "" || data2.length === 0 ) {
          setShowSuggestion(false);
        } else {

          setShowSuggestion(true);
        }
        setSuggestion(data2);
        //console.log(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  return (
    <>
      <section
        className="mainBg  d-md-block d-lg-block d-xl-block overlayBg homeHeader"
        id="home"
      >



        <div className="p-relative videoContainer ">
          <video
            className="d-block w-100 videoMain propertyDesktopItemLink"
            muted playsInline autoPlay loop
            preload="metadata"
            poster="videos/homeSearchBannerImageWithText.jpg"
          >
            <source src="/videos/dk-version-3.mp4" type="video/mp4" />
            <source src="/videos/dk-version-3.mp4" type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video>

          <video
            id="mobItemLink"
            className="d-block w-100 videoMain"
            muted playsInline autoPlay loop
            preload="metadata"
            poster="videos/homeSearchBannerImage.jpg"
          >
            <source src="/videos/dk-mobile.mp4" type="video/mp4" />
            <source src="/videos/dk-mobile.mp4" type="video/mov" />
            Sorry, your browser doesn't support videos.
          </video>

          <div className="videoOverlay"></div>
        </div>
        <div className="headerForm propertyDesktopItemLink">
          <ul className="nav nav-pills frmTabList" id="pills-tab">
            <Link href="/buy" className="nav-link active">
              Buy
            </Link>
            <Link href="/rent" className="nav-link">
              Rent
            </Link>
            <Link href="/sell" className="nav-link">
              Sell
            </Link>
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
            <input type="text" placeholder="Type your search..." onChange={changeSearch} />
            <i className="fa fa-search"></i>
          </div>
          <div id="suggestion-box" style={{height: "200px",overflow: "auto"}}>
            {showSuggestion && (
              <div id="suggestion">
                {suggestion.map((sug, index) => (
                  <div key={index}>
                    <Link
                      className="suggestion-link"
                      href={
                        sug.type
                      }
                    >
                      <i className="bi bi-geo-alt-fill text-primary" />
                      &nbsp;&nbsp;
                      <span
                        dangerouslySetInnerHTML={{
                          __html: sug.name,
                        }}
                      />
                    </Link>
                    <br />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default HomeSearch;

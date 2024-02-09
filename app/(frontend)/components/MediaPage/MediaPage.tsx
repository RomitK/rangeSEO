"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useGetMedias } from "@/src/services/MediaService";
import axios from "axios";

function MediaPage({ params }) {
  const [form, setForm] = useState({});
  const { mediaData } = useGetMedias("", form);
  const [links, setLinks] = useState(null);
  const [medias, setMedias] = useState([]);
  const [news, setNews] = useState([]);
  const [awards, setAwards] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [isMobileDev, setIsMobileDev] = useState(false);
  useEffect(() => {
    
    const handleResize = () => {
      // Check if the window width is below a certain threshold (e.g., 768 pixels for mobile)
      const isMobileDevice = window.innerWidth < 768;
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

  const onNextPage = () => {
    let url = links?.next;
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        if (form[key].value) {
          url += `${key}=${form[key].value}&`;
        }
      }
    }
    axios
      .get(url)
      .then((res) => {
        setMedias([...medias, ...res.data.data.data]);
        setLinks(res.data.data.links);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setMedias(mediaData?.all?.data);
    setNews(mediaData?.news?.data);
    setAwards(mediaData?.awards?.data);
    setBlogs(mediaData?.blogs?.data);
    setCelebrations(mediaData?.celebrations?.data);
    console.log(mediaData?.celebrations)
    setEvents(mediaData?.events?.data);
    //setLinks(mediaData?.links);
  }, [mediaData]);

  function isEmptyObject() {
    const o = { ...form };
    return Object.keys(o).every(function (x) {
      if (Array.isArray(o[x])) {
        return o[x].length > 0 ? false : true;
      } else {
        return o[x].value === "" || o[x].value === null;
      }
    });
  }

  return (
    <>
      <section>
        <div className="container">
          <div className={`mainHead mb-3 text-primary text-center mxWd  ${isMobileDev ? "" : "pt-5"}`}>
            <h4 className="mb-2 pt-2">MEDIA</h4>
            <span className="lineShape mb-2"></span>
          </div>
          <div className="proGalleryArea">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#allTab"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#newTab"
                  aria-selected="false"
                >
                  NEWS
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#blogTab"
                  aria-selected="false"
                >
                  BLOGS
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#awardTab"
                  aria-selected="true"
                >
                  AWARDS
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#celebrationTab"
                  aria-selected="false"
                >
                  CELEBRATION
                </button>
              </li>
              
            </ul>
            <div className="tab-content" id="myTabContent">
              {/* Tab 1 Contant Area Start */}
              <div className="tab-pane fade show active" id="allTab">
                <div className="row">
                  {medias?.map(function (media, index) {
                    return (
                      <div className="col-md-4" key={media.id}>
                        <Link
                          href={`/medias/${media?.slug}`}
                          className="blogCard proGalleryCard"
                        >
                          <div className="bCardHead">
                            <img src={media.image} alt={media.title} className="eventCardImg" />
                            <span className="cdTagBtn"> {media.type}</span>
                            <div className="overlay">
                              <p className="crdText">{media.short_content}</p>
                            </div>
                          </div>
                          <p>{media.title}</p>
                          <span className="text-primary">{media.date}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tab 1 Contant Area End */}
              {/* Tab 2 Contant Area Start */}
              <div className="tab-pane fade" id="newTab">
                <div className="row">
                {news?.map(function (media, index) {
                    return (
                      <div className="col-md-4" key={media.id}>
                        <Link
                          href={`/medias/${media?.slug}`}
                          className="blogCard proGalleryCard"
                        >
                          <div className="bCardHead">
                            <img src={media.image} alt={media.title} className="eventCardImg" />
                            <span className="cdTagBtn"> {media.type}</span>
                            <div className="overlay">
                              <p className="crdText">{media.short_content}</p>
                            </div>
                          </div>
                          <p>{media.title}</p>
                          <span className="text-primary">{media.date}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tab 2 Contant Area End */}
              {/* Tab 3 Contant Area Start */}
              <div className="tab-pane fade" id="blogTab">
                <div className="row">
                {blogs?.map(function (media, index) {
                    return (
                      <div className="col-md-4" key={media.id}>
                        <Link
                          href={`/medias/${media?.slug}`}
                          className="blogCard proGalleryCard"
                        >
                          <div className="bCardHead">
                            <img src={media.image} alt={media.title} className="eventCardImg" />
                            <span className="cdTagBtn"> {media.type}</span>
                            <div className="overlay">
                              <p className="crdText">{media.short_content}</p>
                            </div>
                          </div>
                          <p>{media.title}</p>
                          <span className="text-primary">{media.date}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tab 3 Contant Area End */}
              {/* Tab 4 Contant Area Start */}
              <div className="tab-pane fade" id="awardTab">
                <div className="row">
                {awards?.map(function (media, index) {
                    return (
                      <div className="col-md-4" key={media.id}>
                        <Link
                          href={`/medias/${media?.slug}`}
                          className="blogCard proGalleryCard"
                        >
                          <div className="bCardHead">
                            <img src={media.image} alt={media.title} className="eventCardImg" />
                            <span className="cdTagBtn"> {media.type}</span>
                            <div className="overlay">
                              <p className="crdText">{media.short_content}</p>
                            </div>
                          </div>
                          <p>{media.title}</p>
                          <span className="text-primary">{media.date}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tab 4 Contant Area End*/}
              {/* Tab 5 Contant Area Start */}
              <div className="tab-pane fade" id="celebrationTab">
                <div className="row">
                {celebrations?.map(function (media, index) {
                    return (
                      <div className="col-md-4" key={media.id}>
                        <Link
                          href={`/medias/${media?.slug}`}
                          className="blogCard proGalleryCard"
                        >
                          <div className="bCardHead">
                            <img src={media.image} alt={media.title} className="eventCardImg" />
                            <span className="cdTagBtn"> {media.type}</span>
                            <div className="overlay">
                              <p className="crdText">{media.short_content}</p>
                            </div>
                          </div>
                          <p>{media.title}</p>
                          <span className="text-primary">{media.date}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tab 5 Contant Area End */}
              {/* Tab 6 Contant Area Start */}
              <div className="tab-pane fade" id="eventTab">
                <div className="row">
                {events?.map(function (media, index) {
                    return (
                      <div className="col-md-4" key={media.id}>
                        <Link
                          href={`/medias/${media?.slug}`}
                          className="blogCard proGalleryCard"
                        >
                          <div className="bCardHead">
                            <img src={media.image} alt={media.title} className="eventCardImg" />
                            <span className="cdTagBtn"> {media.type}</span>
                            <div className="overlay">
                              <p className="crdText">{media.short_content}</p>
                            </div>
                          </div>
                          <p>{media.title}</p>
                          <span className="text-primary">{media.date}</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tab 6 Contant Area End */}
            </div>
          </div>
          {/* <button className="viewLinkBtn mb-5">View All</button> */}
        </div>
      </section>
    </>
  );
}
export default MediaPage;

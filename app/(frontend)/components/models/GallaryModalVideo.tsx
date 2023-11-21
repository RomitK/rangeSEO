"use client";
import React from "react";

import "@/public/css/gallery-modal-styles.css";

function GallaryModalVideo(props) {
  return (
    <>
      <button
        className="gallerymodalBtn"
        data-bs-toggle="modal"
        data-bs-target="#gallaryModalVideo"
      >
        <i className="fa fa-play" aria-hidden="true"></i>
        PLAY VIDEO
      </button>

      <div
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        id="gallaryModalVideo"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-lg modalBookMeet ">
          <div className="modal-content">
            <div className="modal-header border-0 justify-content-end p-1">
              <button
                type="button"
                className="bg-transparent border-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-circle text-primary"></i>
              </button>
            </div>

            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            <div className="modal-body  p-0 rounded-1 m-2">
              <div className="row g-0">
                <div className="col-12 col-lg-12 col-md-12 descricalenderCol">
                  <video
                    className="d-block w-100 galleryMdlvideo"
                    autoPlay
                    loop
                    muted
                    preload="metadata"
                    poster="/images/services/service-header.webp"
                  >
                    <source src={props.video} type="video/mp4" />
                    <source src={props.video} type="video/mov" />
                    Sorry, your browser doesn't support videos.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GallaryModalVideo;

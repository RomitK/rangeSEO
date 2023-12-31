"use client";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "@/public/css/gallery-modal-styles.css";
import { Pagination, Navigation } from "swiper/modules";
import ReactPlayer from "react-player/lazy";
function GallaryModalVideo(props) {
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setPlay(false);
  };
  const handleShow = () => {
    setShow(true);
    setPlay(true);
  };

  return (
    <>
      <button
        className="gallerymodalBtn"
        data-bs-toggle="modal"
        data-bs-target="#gallaryModalVideo"
        onClick={handleShow}
      >
        <i className="fa fa-play" aria-hidden="true"></i>
        PLAY VIDEO
      </button>

      <Modal show={show} onHide={handleClose} keyboard={false} size="lg">
        <Modal.Header className="border-0 justify-content-end p-1">
          <button
            type="button"
            className="bg-transparent border-0"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="bi bi-x-circle text-primary"></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-0">
            <div className="col-12 col-lg-12 col-md-12 descricalenderCol">
              <div className="d-block w-100">
                <ReactPlayer
                  className="player-wrapper"
                  width="100%"
                  onEnded={props.onEnd}
                  playing={play}
                  config={{
                    youtube: {
                      playerVars: {
                        autoplay: 0,
                        controls: 1,
                      },
                    },
                  }}
                  url={props.video}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default GallaryModalVideo;

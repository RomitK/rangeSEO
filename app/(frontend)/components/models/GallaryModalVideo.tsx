"use client";
import React from 'react';

import "@/public/css/gallery-modal-styles.css";



function GallaryModalVideo() {
  return (
    <>
         <button  className="gallerymodalBtn" data-bs-toggle="modal" data-bs-target="#gallaryModalVideo">
             <i className="fa fa-play" aria-hidden="true"></i>
               PLAY VIDEO
        </button>

        <div className="modal fade" id="gallaryModalVideo"  aria-hidden="true">
           <div className="modal-dialog modal-lg">
                <div className="modal-content">
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                     <video className="d-block w-100 galleryMdlvideo"
                            autoPlay
                            loop
                            muted
                            preload="metadata"
                            poster="/images/services/service-header.webp">
                               <source src="/videos/services.mp4" type="video/mp4" />
                               <source src="/videos/services.mp4" type="video/mov" />
                                Sorry, your browser doesn't support videos.
                    </video>

                
                </div>
              
            </div>
       </div>
    </>
  );
}
export default GallaryModalVideo;

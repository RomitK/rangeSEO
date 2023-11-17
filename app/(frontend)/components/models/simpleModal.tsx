import React, { useState } from "react";






function SimpleModal(){
  
    return (
        <>
            <div className="modalArea">
                <button type="button" className="btn btn-blue text-uppercase btn-lg broucherBtn" data-bs-toggle="modal" data-bs-target="#simpleModal">
                    DOWNLOAD BROCHURE
                </button>

                <div className="modal fade" id="simpleModal"   aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                    
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    
                            <div className="modal-body">
                                <div className="row">
                                        <div className="col-md-5">
                                              <div className="mdlContentBox">
                                                     <img src="/images/logo.png" className="modalLogo"/>
                                                   <h1>
                                                         Download Brochure By filling your details
                                                   </h1>
                                              </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="formMdlBox">
                                                <div className="row ">
                                                    <div className="col-12 mb-2">
                                                        <input className="form-control cntInptField" placeholder="Name"  type="text" value="" />
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <input className="form-control cntInptField" placeholder="Email Address"  type="email" value="" />
                                                    </div>
                                                    <div className="col-12 mb-2">
                                                        <input className="form-control cntInptField" placeholder="Phone Number"   type="text" value="" />
                                                    </div>
                                                    <div className="col-12">
                                                            <textarea className="form-control cntInptField textareaField" placeholder="Message"></textarea>
                                                    </div>
                                                    <input className="fillBtn submitBtn" type="submit" value="Submit" />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SimpleModal;
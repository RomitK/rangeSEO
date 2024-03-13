"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

function Thankyou() {
    const router = useRouter();

    return (
        <>
            <section className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 my-auto">
                                    <div className="secHead text-center mb-3 thank-you-page-content">
                                        <img src="/images/icons/check.png" alt="tick" width={100} className="img-fluid" /><br /><br />
                                        <h5 className="">Thank you for Contacting Us. A member from our team will ring you shortly.</h5>
                                    </div>
                                    <div className="text-center">
                                        <Link href={{ pathname: "/" }}>
                                            <button className="btn btn-primary px-5 text-uppercase rounded-0 btn-lg">
                                                <i className="bi bi-arrow-left"></i>&nbsp;
                                                Back To Home
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Thankyou;

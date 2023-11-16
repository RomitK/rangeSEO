"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";

function ContactSection()
{
    return (
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
    );
}
export default ContactSection
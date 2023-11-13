

"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import ContactPage from "../components/ContactPage/ContactPage";
import "@/public/css/contact-Us-styles.css";

function ContactUs() {
  return (
    <>
      <SWRProvider>
        <ContactPage></ContactPage>
      </SWRProvider>
    </>
  );
}
export default ContactUs;

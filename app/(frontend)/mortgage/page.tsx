"use client";
import React, { useState, useEffect } from "react";
import { SWRProvider } from "@/app/swr-provider";
import MortgagePage from "@/app/(frontend)/components/Mortgage/mortgagePage"


function mortgage() {
  return (
    <>
      <SWRProvider>
        <MortgagePage/>
      </SWRProvider>
    </>
  );
}
export default mortgage;

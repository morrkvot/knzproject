import React from "react";
import SharedHeader from "../components/SharedHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

export default function CommonLayout({ children }) {
  return (
    <>
      <SharedHeader />
      {children}
    </>
  );
}

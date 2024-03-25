import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import "react-datepicker/dist/react-datepicker.css";
import { Suspense } from 'react';
import Loader from "@/app/(frontend)/components/UI/Loader";

function Layout(props) {
  return (
    <>
      <Header />
      <Navbar />

      <section>{props.children}</section>

      {/* <Footer /> */}
    </>
  );
}

export default Layout;

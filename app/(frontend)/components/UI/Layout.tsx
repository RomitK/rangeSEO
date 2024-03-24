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
      <Suspense fallback={<Loader />}>
        <section>{props.children}</section>
      </Suspense>
      <Footer />
    </>
  );
}

export default Layout;

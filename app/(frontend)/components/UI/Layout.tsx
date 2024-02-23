import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import "react-datepicker/dist/react-datepicker.css";

function Layout(props) {
  return (
    <>
      <Header />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PBWHF5MF"
          height="0"
          width="0"
          className="hidden-iframe"
        ></iframe>
      </noscript>
      <Navbar />
      <section>{props.children}</section>
      <Footer />
    </>
  );
}

export default Layout;

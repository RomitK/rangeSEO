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

      <Suspense fallback={<FooterPlaceholder />}>
        <Footer />
      </Suspense>
    </>
  );
}

// Placeholder component for the footer
function FooterPlaceholder() {
  return (
    <footer style={{ minHeight: "100px" }}>
      {/* You can customize the placeholder styling */}
      <div>Loading...</div>
    </footer>
  );
}

export default Layout;

import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import "react-datepicker/dist/react-datepicker.css";
function Layout(props){
    return (
        <>
        <Header/>
        <Navbar/>
        <section>
            {props.children}
        </section>

        <div className="floatingBtn">
        <div className="iconMain shake">
            <a target="_blank" href="https://api.whatsapp.com/send?phone=+971586851659&amp;text=Hi, I would like to explore the Range`s services ">
                <img className="" src="images/icons/whatsapp.png" alt="chatIcon" width="60"/>
            </a>
        </div>
    </div>
        <Footer/>
        </>
    );
}
export default Layout;
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

function Layout(props){
    return (
        <>
        <Header/>
        <Navbar/>
        <section>
            {props.children}
        </section>
        <Footer/>
        </>
    );
}
export default Layout;
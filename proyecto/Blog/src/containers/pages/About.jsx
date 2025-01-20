
import Header from "components/About/header";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import {useEffect} from "react"; 
import TestStats from "components/About/teststats";
import Images from "components/About/images";
import Clients from "components/About/clients";

function About() {
  useEffect(()=>{
          window.scrollTo(0, 0);
        },[])
  return (
    <Layout>
        <Navbar/>
        <div className="pt-28">
            <Header/>
            <TestStats/>
            <Images/>
            <Clients/>
        </div>
          
        <Footer/>
    </Layout>
  )
}
export default About;
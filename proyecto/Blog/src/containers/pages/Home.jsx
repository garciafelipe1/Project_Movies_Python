import Incentives from "components/home/incentives";
import Header from "../../components/home/header";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import UseCases from "components/home/UseCases";
import Features from "components/home/features1";
import CTA from "components/home/calltoaction1";
import LogoCloud from "components/home/OurClients";
import BlogList from "components/home/Bloglist";
import { useEffect } from 'react';
import {motion} from "framer-motion";


function Home() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Layout>
        <Navbar/>
        <div className="pt-28">
          <Header/>
          <Incentives/>
          <UseCases/>
          <Features/>
          <CTA/>
          <LogoCloud/>
          <BlogList/>
        </div>
          
        <Footer/>
    </Layout>
  )
}
export default Home;
import Header from "components/cases/header";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import CasesList from "components/cases/CaseList";
import {useEffect} from "react";  
import { Helmet } from "react-helmet-async";
function Cases() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Layout>
      
    
        <Navbar/>
        <div className="pt-28">
          <Header/>
          <CasesList/>
        </div>
          
        <Footer/>
    </Layout>
  )
}
export default Cases;
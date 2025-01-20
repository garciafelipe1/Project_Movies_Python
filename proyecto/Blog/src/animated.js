import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Error404 from "./containers/errors/Error404";
import Home from './containers/pages/Home';
import Cases from './containers/pages/Cases'; // Ruta correcta para Cases
import Services from './containers/pages/Services';  // Ruta correcta para Services
import About from './containers/pages/About';  // Ruta correcta para About
import Carrers from './containers/pages/Carrers';  // Ruta correcta para Carrers
import Blog from './containers/pages/Blog';  // Ruta correcta para Blog
import Contact from './containers/pages/Contact';

import {AnimatePresence} from "framer-motion";

export function AnimatedRoutes() {
  const location = useLocation();
  return (

    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/casos" element={<Cases />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/carreras" element={<Carrers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="*" element={<Error404 />} />
    </Routes>

    </AnimatePresence>


    
  );
}

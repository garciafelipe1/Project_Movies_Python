import { BrowserRouter as Router, Route, Routes, Link,useLocation } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux"; 
import React from 'react';
import { Helmet,HelmetProvider  } from 'react-helmet-async';
import { AnimatedRoutes } from './animated.js';
  // Asegúrate de importar el componente Contact
 // Asegúrate de importar el componente Error404


function App() {
  
  return (
    
    <HelmetProvider>
      <Helmet>
        <title>Garcia-Agency Marketing</title>
        <meta name="description" content="Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones." />
        <meta name="keywords" content='agencia de software, agencia de marketing, creacion de pagina web' />
        <meta name="robots" content='all' />
        <link rel="canonical" href="https://www.FelipeGarcia.com/" />
        <meta name="author" content='FelipeGarcia' />
        <meta name="publisher" content='FelipeGarcia' />

        {/* Social Media Tags */}
        <meta property="og:title" content='FelipeGarcia' />
        <meta property="og:description" content='Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones.' />
        <meta property="og:url" content="https://www.FelipeGarcia.com/" />
        <meta property="og:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />

        <meta name="twitter:title" content='Felipe Garcia' />
        <meta
            name="twitter:description"
            content='Agencia de software y marketing digital. Servicios de creacion de pagina web y desarrollo de aplicaciones.'
        />
        <meta name="twitter:image" content='https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg' />
        <meta name="twitter:card" content="summary_large_image" />

      </Helmet>

      <Provider store={store}>





    <Router>
          
          <AnimatedRoutes/>
      </Router>



      </Provider>
    </HelmetProvider>
    
  );
}

export default App;

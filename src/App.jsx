import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import Services from './components/Services'; // (If you made this earlier)

function App() {
  return (
    <div className="w-full overflow-x-hidden bg-brand-black text-white selection:bg-brand-cyan selection:text-black">
      <Navbar />
      
      {/* Sections with IDs for scrolling */}
      <div id="hero">
        <Hero />
      </div>

     <div id="services">
        <Services />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <div id="contact">
        <Footer />
      </div>

    

    </div>
  );
}

export default App;
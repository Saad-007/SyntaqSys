import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    /* 'scroll-smooth' handles the transitions between IDs.
       'bg-[#F5F5F7]' ensures visual consistency with your Features cards.
    */
    <div className="w-full min-h-screen overflow-x-hidden bg-[#F5F5F7] scroll-smooth selection:bg-black selection:text-white">
      <Navbar />
      
      <main>
        <section id="hero" className="relative z-10">
          <Hero />
        </section>

        {/* Features acts as the bridge with a solid background to prevent Hero overlap */}
        <section id="feature" className="relative z-20 bg-[#F5F5F7]">
          <Features />
        </section>

        <section id="services" className="relative z-10">
          <Services />
        </section>

        <section id="work" className="relative z-10">
          <Work />
        </section>

        <section id="contact" className="relative z-10">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
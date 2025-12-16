import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Statistics from './components/Statistics';
import VideoTestimonials from './components/VideoTestimonials';
import Courses from './components/Courses';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      <FloatingWhatsApp />
      <Hero />
      <Benefits />
      <About />
      <Testimonials />
      <Statistics />
      <VideoTestimonials />
      <Courses />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

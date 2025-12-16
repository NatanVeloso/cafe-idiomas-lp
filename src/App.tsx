import FAQ from './components/FAQ';
import Hero from './components/Hero';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Courses from './components/Courses';
import Contact from './components/Contact';
import { useState, useEffect } from 'react';
import Benefits from './components/Benefits';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import VideoTestimonials from './components/VideoTestimonials';

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

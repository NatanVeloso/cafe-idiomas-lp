import { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import FAQ from './components/FAQ';
import Hero from './components/Hero';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Benefits from './components/Benefits';
import LanguageGoals from './components/LanguageGoals';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import PortalShowcase from './components/PortalShowcase';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import VideoTestimonials from './components/VideoTestimonials';
import { IS_LANGUAGE_PAGE } from './variant';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white">
        <Header isScrolled={isScrolled} />
        <FloatingWhatsApp />
        <main>
          <Hero />
          <Benefits />
          {IS_LANGUAGE_PAGE && <LanguageGoals />}
          {/* /ingles e /frances: página mais curta, quem chega já escolheu o idioma. */}
          {!IS_LANGUAGE_PAGE && <About />}
          <Testimonials />
          <Statistics />
          <VideoTestimonials />
          <PortalShowcase />
          <Courses />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;

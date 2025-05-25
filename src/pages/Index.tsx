// src/pages/Index.tsx

import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import TechStackSection from '../components/TechStackSection'; 
import ProjectsSection from '../components/ProjectSection';
import SocialLinksSection from '../components/SocialLinksSection'

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (aboutRef.current) {
        const top = aboutRef.current.getBoundingClientRect().top;
        setIsAboutVisible(top < window.innerHeight * 0.8);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-frameworkx-black">
        <div className="w-16 h-16 border-t-4 border-frameworkx-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-frameworkx-black overflow-x-hidden min-h-screen pb-12">
      <ParticleBackground />
      <Navbar />

      {/* Hero */}
      <section id="landing" className="content px-4 relative">
        <Hero />
      </section>

      {/* About */}
      <section id="about" ref={aboutRef}>
        <AboutSection isVisible={isAboutVisible} />
      </section>

      {/* Tech Stack */}
      <TechStackSection /> 

      {/* Projects */}
      <ProjectsSection />

      {/* Social Links */}
      <SocialLinksSection />
    </div>
  );
};

export default Index;

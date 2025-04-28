
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FloatingBubble from '../components/FloatingBubble';
import AboutSection from '../components/AboutSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [bubbleAnchored, setBubbleAnchored] = useState(false);
  
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const heroBubbleRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if About section is visible
      if (aboutSectionRef.current) {
        const aboutRect = aboutSectionRef.current.getBoundingClientRect();
        const isVisible = aboutRect.top < window.innerHeight * 0.8;
        setIsAboutVisible(isVisible);
        
        // Calculate animation progress based on scroll
        const scrollProgress = Math.min(
          Math.max((window.scrollY - window.innerHeight * 0.5) / (window.innerHeight * 0.3), 0),
          1
        );
        setBubbleAnchored(scrollProgress >= 0.9);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize positions
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-frameworkx-black">
        <div className="w-16 h-16 border-t-4 border-frameworkx-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-frameworkx-black overflow-x-hidden min-h-[200vh]">
      <ParticleBackground />
      
      {/* Add Navbar */}
      <Navbar />
      
      {/* Hero section */}
      <div className="content px-4 relative">
        <Hero />
        
        {/* Floating About Bubble at center-bottom within hero section */}
        <div 
          ref={heroBubbleRef} 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <FloatingBubble 
            label="About" 
            isActive={false}
            isVisible={!bubbleAnchored}
          />
        </div>
      </div>
      
      {/* About section */}
      <div ref={aboutSectionRef}>
        <AboutSection isVisible={isAboutVisible} />
        
        {/* Anchored About Bubble at top left of About section */}
        <div className="absolute" style={{ 
          left: '8px',
          top: aboutSectionRef.current ? aboutSectionRef.current.getBoundingClientRect().top + window.scrollY + 16 : 0
        }}>
          <FloatingBubble 
            label="About" 
            isActive={true}
            isVisible={bubbleAnchored}
            isAnchored={true}
          />
        </div>
      </div>
      
      {/* Adding enough space for scrolling */}
      <div className="h-[150vh]"></div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FloatingBubble from '../components/FloatingBubble';
import AboutSection from '../components/AboutSection';
import ConnectingLine from '../components/ConnectingLine';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const [aboutSectionPosition, setAboutSectionPosition] = useState({ x: 0, y: 0 });
  const [lineProgress, setLineProgress] = useState(0);
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
        
        // Calculate bubble positions and animation progress
        if (isVisible && heroBubbleRef.current) {
          // Get the current positions
          const aboutRect = aboutSectionRef.current.getBoundingClientRect();
          const heroBubbleRect = heroBubbleRef.current.getBoundingClientRect();
          
          // Set the start position (hero bubble)
          const startPos = {
            x: heroBubbleRect.left + heroBubbleRect.width / 2,
            y: heroBubbleRect.top + heroBubbleRect.height / 2
          };
          
          // Set the end position (about section title)
          const endPos = {
            x: aboutRect.left - 50,
            y: aboutRect.top + 30
          };
          
          // Save positions for the connecting line
          setBubblePosition(startPos);
          setAboutSectionPosition(endPos);
          
          // Calculate animation progress based on scroll
          const scrollProgress = Math.min(
            Math.max((window.scrollY - window.innerHeight * 0.5) / (window.innerHeight * 0.3), 0),
            1
          );
          setLineProgress(scrollProgress);
          setBubbleAnchored(scrollProgress >= 0.9);
        }
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
      
      {/* Connecting line between bubbles */}
      <ConnectingLine 
        startPoint={bubblePosition}
        endPoint={aboutSectionPosition}
        progress={lineProgress}
        isVisible={isAboutVisible && lineProgress > 0}
      />
      
      {/* About section */}
      <div ref={aboutSectionRef}>
        <AboutSection isVisible={isAboutVisible} />
        
        {/* Anchored About Bubble at About section */}
        <div className="absolute" style={{ 
          left: `${aboutSectionPosition.x}px`, 
          top: `${aboutSectionPosition.y}px`,
          transform: 'translate(-50%, -50%)'
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

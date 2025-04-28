
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FloatingBubble from '../components/FloatingBubble';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
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
      <div className="content px-4">
        <Hero />
      </div>
      
      {/* Floating About Bubble at center-bottom */}
      <FloatingBubble 
        label="About" 
        isActive={false}
        isVisible={true}
        centerBottomWhenVisible={true}
      />
      
      {/* Adding enough space for scrolling */}
      <div className="h-[150vh]"></div>
    </div>
  );
};

export default Index;


import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FloatingBubble from '../components/FloatingBubble';
import ConnectingLine from '../components/ConnectingLine';
import AboutSection from '../components/AboutSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aboutBubbleAnchored, setAboutBubbleAnchored] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [showAboutSection, setShowAboutSection] = useState(false);
  
  // For scrolling animations
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Threshold values for animations (in pixels scrolled)
  const BUBBLE_ANCHOR_THRESHOLD = 200;
  const LINE_DRAW_START = BUBBLE_ANCHOR_THRESHOLD;
  const LINE_DRAW_END = BUBBLE_ANCHOR_THRESHOLD + 200;
  const ABOUT_SECTION_SHOW = BUBBLE_ANCHOR_THRESHOLD + 100;
  
  // Calculate bubble position based on scroll
  const bubbleY = useTransform(
    scrollY, 
    [0, BUBBLE_ANCHOR_THRESHOLD], 
    [window.innerHeight - 100, 80]
  );
  
  const bubbleX = useTransform(
    scrollY, 
    [0, BUBBLE_ANCHOR_THRESHOLD], 
    [window.innerWidth / 2 - 32, 80]
  );

  // Monitor scroll position and trigger animations accordingly
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Anchor bubble when scrolled past threshold
    if (latest > BUBBLE_ANCHOR_THRESHOLD && !aboutBubbleAnchored) {
      setAboutBubbleAnchored(true);
    } else if (latest <= BUBBLE_ANCHOR_THRESHOLD && aboutBubbleAnchored) {
      setAboutBubbleAnchored(false);
    }
    
    // Calculate line drawing progress
    if (latest >= LINE_DRAW_START) {
      const progress = Math.min((latest - LINE_DRAW_START) / (LINE_DRAW_END - LINE_DRAW_START), 1);
      setLineProgress(progress);
    } else {
      setLineProgress(0);
    }
    
    // Show about section
    if (latest >= ABOUT_SECTION_SHOW && !showAboutSection) {
      setShowAboutSection(true);
    } else if (latest < ABOUT_SECTION_SHOW && showAboutSection) {
      setShowAboutSection(false);
    }
  });

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
    <div 
      ref={containerRef} 
      className="relative w-full bg-frameworkx-black overflow-x-hidden min-h-[200vh]"
    >
      <ParticleBackground />
      
      {/* Add Navbar */}
      <Navbar />
      
      {/* Hero section */}
      <div className="content px-4">
        <Hero />
      </div>
      
      {/* Floating About Bubble */}
      {!aboutBubbleAnchored ? (
        <motion.div
          className="absolute"
          style={{ 
            x: bubbleX, 
            y: bubbleY,
          }}
        >
          <FloatingBubble 
            label="About" 
            isActive={false}
            isVisible={true}
          />
        </motion.div>
      ) : (
        <FloatingBubble 
          label="About" 
          isAnchored={true} 
          isActive={true}
          anchoredPosition={{ x: 80, y: 80 }}
        />
      )}
      
      {/* Connecting Line */}
      {aboutBubbleAnchored && (
        <ConnectingLine 
          startPoint={{ x: 88, y: 88 }}  // Center of the anchored bubble
          endPoint={{ x: 88, y: 300 }}   // End point for the line
          progress={lineProgress}
          thickness={2}
          color="white"
          glow={true}
          isVisible={aboutBubbleAnchored}
        />
      )}
      
      {/* About Section */}
      <AboutSection isVisible={showAboutSection} />
      
      {/* Adding enough space for scrolling */}
      <div className="h-[150vh]"></div>
    </div>
  );
};

export default Index;

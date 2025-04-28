
import React, { useEffect, useState, useRef } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FloatingBubble from '../components/FloatingBubble';
import ConnectingLine from '../components/ConnectingLine';
import Section from '../components/Section';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Track scroll direction
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const prevScrollY = useRef(0);
  
  // Section and bubble visibility states
  const [bubbleVisibility, setBubbleVisibility] = useState({
    about: true,    // Only About is visible initially
    projects: false,
    ailab: false,
    learn: false,
    connect: false
  });
  
  const [bubbleStates, setBubbleStates] = useState({
    about: false,
    projects: false,
    ailab: false,
    learn: false,
    connect: false
  });
  
  // Track visibility of each section
  const [sectionVisibility, setSectionVisibility] = useState({
    about: false,
    projects: false,
    ailab: false,
    learn: false,
    connect: false
  });

  // Get viewport height for calculations
  const vh = window.innerHeight;
  
  // Define the scroll thresholds for each bubble and section
  const thresholds = {
    about: 0.1,
    projects: 0.3,
    ailab: 0.5,
    learn: 0.7,
    connect: 0.9
  };

  // Monitor scroll progress and direction
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollY > prevScrollY.current) {
      setScrollDirection('down');
    } else if (currentScrollY < prevScrollY.current) {
      setScrollDirection('up');
    }
    prevScrollY.current = currentScrollY;
    
    // Calculate current scroll progress relative to viewport height
    const normalizedScroll = currentScrollY / (document.body.scrollHeight - vh);
    
    // Handle About section visibility
    if (normalizedScroll >= thresholds.about) {
      // Make bubble visible if not already
      if (!bubbleVisibility.about) {
        setBubbleVisibility(prev => ({ ...prev, about: true }));
      }
      
      // Anchor bubble if scrolling down
      if (scrollDirection === 'down' && !bubbleStates.about) {
        setBubbleStates(prev => ({ ...prev, about: true }));
        setSectionVisibility(prev => ({ ...prev, about: true }));
      }
    } else if (normalizedScroll < thresholds.about && scrollDirection === 'up') {
      // Un-anchor bubble if scrolling up
      setBubbleStates(prev => ({ ...prev, about: false }));
      setSectionVisibility(prev => ({ ...prev, about: false }));
    }
    
    // Handle Projects section visibility
    if (normalizedScroll >= thresholds.projects) {
      // Make bubble visible
      if (!bubbleVisibility.projects) {
        setBubbleVisibility(prev => ({ ...prev, projects: true }));
      }
      
      // Anchor bubble if scrolling down
      if (scrollDirection === 'down' && !bubbleStates.projects) {
        setBubbleStates(prev => ({ ...prev, projects: true }));
        setSectionVisibility(prev => ({ ...prev, projects: true }));
      }
    } else if (normalizedScroll < thresholds.projects && scrollDirection === 'up') {
      // Un-anchor bubble and hide it if scrolling up
      setBubbleStates(prev => ({ ...prev, projects: false }));
      setSectionVisibility(prev => ({ ...prev, projects: false }));
      
      if (normalizedScroll < thresholds.projects - 0.05) {
        setBubbleVisibility(prev => ({ ...prev, projects: false }));
      }
    }
    
    // Handle AI Lab section visibility
    if (normalizedScroll >= thresholds.ailab) {
      // Make bubble visible
      if (!bubbleVisibility.ailab) {
        setBubbleVisibility(prev => ({ ...prev, ailab: true }));
      }
      
      // Anchor bubble if scrolling down
      if (scrollDirection === 'down' && !bubbleStates.ailab) {
        setBubbleStates(prev => ({ ...prev, ailab: true }));
        setSectionVisibility(prev => ({ ...prev, ailab: true }));
      }
    } else if (normalizedScroll < thresholds.ailab && scrollDirection === 'up') {
      // Un-anchor bubble and hide it if scrolling up
      setBubbleStates(prev => ({ ...prev, ailab: false }));
      setSectionVisibility(prev => ({ ...prev, ailab: false }));
      
      if (normalizedScroll < thresholds.ailab - 0.05) {
        setBubbleVisibility(prev => ({ ...prev, ailab: false }));
      }
    }
    
    // Handle Learn section visibility
    if (normalizedScroll >= thresholds.learn) {
      // Make bubble visible
      if (!bubbleVisibility.learn) {
        setBubbleVisibility(prev => ({ ...prev, learn: true }));
      }
      
      // Anchor bubble if scrolling down
      if (scrollDirection === 'down' && !bubbleStates.learn) {
        setBubbleStates(prev => ({ ...prev, learn: true }));
        setSectionVisibility(prev => ({ ...prev, learn: true }));
      }
    } else if (normalizedScroll < thresholds.learn && scrollDirection === 'up') {
      // Un-anchor bubble and hide it if scrolling up
      setBubbleStates(prev => ({ ...prev, learn: false }));
      setSectionVisibility(prev => ({ ...prev, learn: false }));
      
      if (normalizedScroll < thresholds.learn - 0.05) {
        setBubbleVisibility(prev => ({ ...prev, learn: false }));
      }
    }
    
    // Handle Connect section visibility
    if (normalizedScroll >= thresholds.connect) {
      // Make bubble visible
      if (!bubbleVisibility.connect) {
        setBubbleVisibility(prev => ({ ...prev, connect: true }));
      }
      
      // Anchor bubble if scrolling down
      if (scrollDirection === 'down' && !bubbleStates.connect) {
        setBubbleStates(prev => ({ ...prev, connect: true }));
        setSectionVisibility(prev => ({ ...prev, connect: true }));
      }
    } else if (normalizedScroll < thresholds.connect && scrollDirection === 'up') {
      // Un-anchor bubble and hide it if scrolling up
      setBubbleStates(prev => ({ ...prev, connect: false }));
      setSectionVisibility(prev => ({ ...prev, connect: false }));
      
      if (normalizedScroll < thresholds.connect - 0.05) {
        setBubbleVisibility(prev => ({ ...prev, connect: false }));
      }
    }
  });

  // Calculate line progress based on scroll position
  const getLineProgress = (start: number, end: number) => {
    const scrollPos = scrollYProgress.get();
    const progress = (scrollPos - start) / (end - start);
    return Math.max(0, Math.min(1, progress));
  };

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
    <div ref={containerRef} className="relative w-full bg-frameworkx-black overflow-x-hidden">
      <ParticleBackground />
      
      {/* Add Navbar */}
      <Navbar />
      
      {/* Hero section */}
      <div className="content px-4">
        <Hero />
      </div>
      
      {/* About Bubble */}
      <FloatingBubble 
        label="About" 
        isAnchored={bubbleStates.about}
        isActive={sectionVisibility.about}
        isVisible={bubbleVisibility.about}
        initialPosition={{ x: window.innerWidth / 2 - 50, y: window.innerHeight - 150 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.15 }}
      />
      
      {/* Projects Bubble */}
      <FloatingBubble 
        label="Projects" 
        isAnchored={bubbleStates.projects}
        isActive={sectionVisibility.projects}
        isVisible={bubbleVisibility.projects}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.35 }}
      />
      
      {/* AI Lab Bubble */}
      <FloatingBubble 
        label="AI Lab" 
        isAnchored={bubbleStates.ailab}
        isActive={sectionVisibility.ailab}
        isVisible={bubbleVisibility.ailab}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.55 }}
      />
      
      {/* Learn Bubble */}
      <FloatingBubble 
        label="Learn AI" 
        isAnchored={bubbleStates.learn}
        isActive={sectionVisibility.learn}
        isVisible={bubbleVisibility.learn}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.75 }}
      />
      
      {/* Connect Bubble */}
      <FloatingBubble 
        label="Connect" 
        isAnchored={bubbleStates.connect}
        isActive={sectionVisibility.connect}
        isVisible={bubbleVisibility.connect}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.95 }}
      />
      
      {/* Connecting Lines between bubbles */}
      {bubbleVisibility.about && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.15 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.35 }}
          progress={getLineProgress(thresholds.about, thresholds.projects)}
          thickness={3}
          isVisible={bubbleVisibility.projects}
        />
      )}
      
      {bubbleVisibility.projects && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.35 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.55 }}
          progress={getLineProgress(thresholds.projects, thresholds.ailab)}
          thickness={3}
          isVisible={bubbleVisibility.ailab}
        />
      )}
      
      {bubbleVisibility.ailab && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.55 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.75 }}
          progress={getLineProgress(thresholds.ailab, thresholds.learn)}
          thickness={3}
          isVisible={bubbleVisibility.learn}
        />
      )}
      
      {bubbleVisibility.learn && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.75 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.95 }}
          progress={getLineProgress(thresholds.learn, thresholds.connect)}
          thickness={3}
          isVisible={bubbleVisibility.connect}
        />
      )}
      
      {/* Content sections */}
      <div className="min-h-screen pt-screen">
        {/* About Section */}
        <div className="min-h-screen flex items-center ml-32">
          <Section title="About Frameworkx" isVisible={sectionVisibility.about} animationDelay={0.3}>
            <p className="mb-4">
              Frameworkx is at the forefront of artificial intelligence research and development, 
              dedicated to accelerating AI integration into everyday life in meaningful ways.
            </p>
            <p className="mb-4">
              Founded by a team of AI researchers and engineers, we combine cutting-edge technology 
              with practical applications to create solutions that enhance human capabilities.
            </p>
            <p>
              Our mission is to make AI accessible, ethical, and beneficial for everyone, 
              pushing the boundaries of what's possible while ensuring responsible innovation.
            </p>
          </Section>
        </div>
        
        {/* Projects Section */}
        <div className="min-h-screen flex items-center ml-32">
          <Section title="Our Projects" isVisible={sectionVisibility.projects} animationDelay={0.3}>
            <p className="mb-4">
              Frameworkx leads multiple projects across various domains, from natural language 
              processing systems to computer vision applications and robotics integrations.
            </p>
            <p className="mb-4">
              Our flagship project, XiloAI, provides an accessible framework for businesses 
              to implement custom AI solutions without extensive technical expertise.
            </p>
            <p>
              We collaborate with partners in healthcare, education, and sustainable development 
              to create AI tools that address real-world challenges and improve lives.
            </p>
          </Section>
        </div>
        
        {/* AI Lab Section */}
        <div className="min-h-screen flex items-center ml-32">
          <Section title="AI Lab" isVisible={sectionVisibility.ailab} animationDelay={0.3}>
            <p className="mb-4">
              The Frameworkx AI Lab is our innovation center where researchers and engineers 
              experiment with emerging technologies and develop new AI paradigms.
            </p>
            <p className="mb-4">
              We focus on pushing the boundaries of machine learning models, reinforcement learning, 
              and neural network architectures to create more capable and efficient AI systems.
            </p>
            <p>
              Our lab maintains open-source initiatives that contribute to the broader AI community, 
              fostering collaboration and accelerating progress across the field.
            </p>
          </Section>
        </div>
        
        {/* Learn AI Section */}
        <div className="min-h-screen flex items-center ml-32">
          <Section title="Learn AI" isVisible={sectionVisibility.learn} animationDelay={0.3}>
            <p className="mb-4">
              We believe that AI education should be accessible to everyone. Our learning resources 
              range from beginner-friendly introductions to advanced technical courses.
            </p>
            <p className="mb-4">
              Frameworkx offers workshops, online courses, and hands-on tutorials designed to 
              empower developers, business leaders, and curious minds to understand and use AI.
            </p>
            <p>
              Our educational approach emphasizes practical skills alongside conceptual understanding, 
              allowing learners to apply AI techniques to solve real problems.
            </p>
          </Section>
        </div>
        
        {/* Connect Section */}
        <div className="min-h-screen flex items-center ml-32">
          <Section title="Connect With Us" isVisible={sectionVisibility.connect} animationDelay={0.3}>
            <p className="mb-4">
              We're always looking to collaborate with passionate individuals and organizations 
              who share our vision for responsible AI advancement.
            </p>
            <p className="mb-4">
              Whether you're interested in partnering on a project, joining our team, 
              or simply learning more about our work, we'd love to hear from you.
            </p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={sectionVisibility.connect ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button className="px-8 py-3 bg-frameworkx-accent text-white rounded-md transition-all duration-300 button-glow">
                Get In Touch
              </button>
            </motion.div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Index;

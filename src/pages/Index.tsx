
import React, { useEffect, useState, useRef } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import FloatingBubble from '../components/FloatingBubble';
import ConnectingLine from '../components/ConnectingLine';
import Section from '../components/Section';
import { useScroll, useTransform, motion } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end"]
  });

  // Track visibility of each section
  const [sectionVisibility, setSectionVisibility] = useState({
    about: false,
    projects: false,
    ailab: false,
    learn: false,
    connect: false
  });

  // Track bubble anchoring states
  const [bubbleStates, setBubbleStates] = useState({
    about: false,
    projects: false,
    ailab: false,
    learn: false,
    connect: false
  });

  // Line progress based on scroll
  const lineProgress1 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const lineProgress2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const lineProgress3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const lineProgress4 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // Handle scroll events to control animations
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Anchor About bubble when scrolled past threshold
      if (scrollPosition > windowHeight * 0.1 && !bubbleStates.about) {
        setBubbleStates(prev => ({ ...prev, about: true }));
        // Show About section with slight delay after bubble anchors
        setTimeout(() => {
          setSectionVisibility(prev => ({ ...prev, about: true }));
        }, 500);
      }
      
      // Anchor Projects bubble
      if (scrollPosition > windowHeight * 0.3 && !bubbleStates.projects) {
        setBubbleStates(prev => ({ ...prev, projects: true }));
        setTimeout(() => {
          setSectionVisibility(prev => ({ ...prev, projects: true }));
        }, 500);
      }
      
      // Anchor AI Lab bubble
      if (scrollPosition > windowHeight * 0.5 && !bubbleStates.ailab) {
        setBubbleStates(prev => ({ ...prev, ailab: true }));
        setTimeout(() => {
          setSectionVisibility(prev => ({ ...prev, ailab: true }));
        }, 500);
      }
      
      // Anchor Learn bubble
      if (scrollPosition > windowHeight * 0.7 && !bubbleStates.learn) {
        setBubbleStates(prev => ({ ...prev, learn: true }));
        setTimeout(() => {
          setSectionVisibility(prev => ({ ...prev, learn: true }));
        }, 500);
      }
      
      // Anchor Connect bubble
      if (scrollPosition > windowHeight * 0.9 && !bubbleStates.connect) {
        setBubbleStates(prev => ({ ...prev, connect: true }));
        setTimeout(() => {
          setSectionVisibility(prev => ({ ...prev, connect: true }));
        }, 500);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bubbleStates]);

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
        initialPosition={{ x: window.innerWidth / 2 - 50, y: window.innerHeight - 150 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.15 }}
      />
      
      {/* Projects Bubble */}
      <FloatingBubble 
        label="Projects" 
        isAnchored={bubbleStates.projects}
        isActive={sectionVisibility.projects}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.35 }}
      />
      
      {/* AI Lab Bubble */}
      <FloatingBubble 
        label="AI Lab" 
        isAnchored={bubbleStates.ailab}
        isActive={sectionVisibility.ailab}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.55 }}
      />
      
      {/* Learn Bubble */}
      <FloatingBubble 
        label="Learn AI" 
        isAnchored={bubbleStates.learn}
        isActive={sectionVisibility.learn}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.75 }}
      />
      
      {/* Connect Bubble */}
      <FloatingBubble 
        label="Connect" 
        isAnchored={bubbleStates.connect}
        isActive={sectionVisibility.connect}
        initialPosition={{ x: -100, y: -100 }}
        anchoredPosition={{ x: 30, y: window.innerHeight * 0.95 }}
      />
      
      {/* Connecting Lines between bubbles */}
      {bubbleStates.about && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.15 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.35 }}
          progress={lineProgress1.get()}
          thickness={3}
        />
      )}
      
      {bubbleStates.projects && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.35 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.55 }}
          progress={lineProgress2.get()}
          thickness={3}
        />
      )}
      
      {bubbleStates.ailab && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.55 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.75 }}
          progress={lineProgress3.get()}
          thickness={3}
        />
      )}
      
      {bubbleStates.learn && (
        <ConnectingLine 
          startPoint={{ x: 38, y: window.innerHeight * 0.75 + 16 }}
          endPoint={{ x: 38, y: window.innerHeight * 0.95 }}
          progress={lineProgress4.get()}
          thickness={3}
        />
      )}
      
      {/* Content sections */}
      <div className="min-h-screen pt-screen">
        {/* About Section */}
        <div className="min-h-screen flex items-center ml-32">
          <Section title="About Frameworkx" isVisible={sectionVisibility.about}>
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
          <Section title="Our Projects" isVisible={sectionVisibility.projects}>
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
          <Section title="AI Lab" isVisible={sectionVisibility.ailab}>
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
          <Section title="Learn AI" isVisible={sectionVisibility.learn}>
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
          <Section title="Connect With Us" isVisible={sectionVisibility.connect}>
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

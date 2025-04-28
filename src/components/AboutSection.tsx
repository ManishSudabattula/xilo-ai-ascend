
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  // Animation variants for the container and child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      id="about-section"
      className="flex flex-col items-start w-full max-w-4xl mx-auto p-8 mt-16"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h2 
        className="text-4xl font-thin mb-6 text-left hero-text-shadow"
        variants={childVariants}
      >
        About Frameworkx
      </motion.h2>
      
      <motion.div
        className="text-left text-frameworkx-text text-lg"
        variants={childVariants}
      >
        <p className="mb-4">
          Frameworkx is a revolutionary platform accelerating AI integration into everyday applications. 
          We bridge the gap between cutting-edge AI research and practical implementation, 
          enabling developers to harness the power of artificial intelligence without the complexity.
        </p>
        
        <p className="mb-4">
          Our mission is to democratize AI technology, making it accessible and usable for developers 
          across all skill levels. Through our comprehensive toolkit, intuitive interfaces, 
          and extensive documentation, we're transforming how applications utilize AI capabilities.
        </p>
        
        <p>
          Founded by a team of AI researchers and experienced developers, Frameworkx combines 
          academic rigor with practical software engineering to deliver AI solutions that are 
          both powerful and easy to implement.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;

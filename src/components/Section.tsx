
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  align?: 'left' | 'right' | 'center';
  animationDelay?: number;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  children, 
  isVisible,
  align = 'left',
  animationDelay = 0
}) => {
  const textAlignClass = {
    'left': 'text-left',
    'right': 'text-right',
    'center': 'text-center'
  }[align];
  
  const containerAlignClass = {
    'left': 'items-start',
    'right': 'items-end',
    'center': 'items-center'
  }[align];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        delay: animationDelay,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: 30,
      transition: { 
        duration: 0.6, 
        ease: "easeInOut" 
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      className={`flex flex-col ${containerAlignClass} w-full max-w-4xl mx-auto p-8 mb-32`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h2 
        className={`text-4xl font-thin mb-6 ${textAlignClass} hero-text-shadow`}
        variants={childVariants}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className={`${textAlignClass} text-frameworkx-text text-lg`}
        variants={childVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Section;

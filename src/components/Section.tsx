
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  align?: 'left' | 'right' | 'center';
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  children, 
  isVisible,
  align = 'left'
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

  return (
    <motion.div
      className={`flex flex-col ${containerAlignClass} w-full max-w-4xl mx-auto p-8 mb-32`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2 
        className={`text-4xl font-thin mb-6 ${textAlignClass} hero-text-shadow`}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className={`${textAlignClass} text-frameworkx-text text-lg`}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Section;

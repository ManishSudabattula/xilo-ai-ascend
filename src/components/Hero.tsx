
import React from 'react';
import { motion } from 'framer-motion';
import TypedText from './TypedText';
import XiloBot from './XiloBot';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <XiloBot />
      
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 hero-text-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        Accelerating AI Into Life
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="mb-12"
      >
        <TypedText />
      </motion.div>
    </div>
  );
};

export default Hero;

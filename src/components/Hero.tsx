import React from 'react';
import { motion } from 'framer-motion';
import TypedText from './TypedText';
import XiloBot from './XiloBot';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Gradient Background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
                   w-[100vw] h-[350px] rounded-b-[300px]
                   bg-gradient-to-r from-[#3E196E] via-[#45CAFF] to-[#FFC07C]
                   opacity-30 blur-3xl"
      />

      <div className="-mt-32">
        <XiloBot />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-5xl mb-6 hero-text-shadow relative z-10 font-thin md:text-8xl"
        >
          Accelerating AI into Life
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="mb-12 relative z-10"
        >
          <TypedText />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

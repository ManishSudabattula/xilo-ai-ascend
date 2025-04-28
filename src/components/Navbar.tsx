
import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/lovable-uploads/4e2205d8-6d1e-429d-9411-a18c7c0d7754.png" 
          alt="FrameWorkx Logo" 
          className="w-10 h-10 invert"
        />
        <span className="text-xl font-bold text-frameworkx-text">FrameWorkx</span>
      </motion.div>
    </nav>
  );
};

export default Navbar;

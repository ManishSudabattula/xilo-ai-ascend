
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const XiloBot: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const moveEyes = (eyeRef: HTMLDivElement | null) => {
      if (!eyeRef) return;
      
      const eye = eyeRef.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;
      
      // Calculate angle and distance
      const dx = mousePosition.x - eyeCenterX;
      const dy = mousePosition.y - eyeCenterY;
      
      // Adjust movement range for full eye area coverage
      const maxMove = 3;
      
      // Increase sensitivity for vertical movement to better see upward
      const moveX = Math.min(Math.max(dx / 40, -1), 1) * maxMove;
      const moveY = Math.min(Math.max(dy / 30, -1), 1) * maxMove;
      
      eyeRef.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    moveEyes(leftEyeRef.current);
    moveEyes(rightEyeRef.current);
  }, [mousePosition]);

  return (
    <motion.div 
      className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative w-full h-full">
        <motion.img 
          src="/lovable-uploads/3415b00d-0871-4eec-8332-4aea9d2fc114.png" 
          alt="Xilo Bot"
          className="w-full h-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        {/* Eye pupils - smaller size and adjusted position */}
        <div 
          className="absolute left-[38%] top-[38%] w-1 h-1 bg-white rounded-full" 
          ref={leftEyeRef} 
          style={{ transition: 'transform 0.1s ease-out' }} 
        />
        <div 
          className="absolute right-[38%] top-[38%] w-1 h-1 bg-white rounded-full" 
          ref={rightEyeRef}
          style={{ transition: 'transform 0.1s ease-out' }} 
        />
      </div>
    </motion.div>
  );
};

export default XiloBot;

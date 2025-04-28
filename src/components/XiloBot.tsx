import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const XiloBot: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);

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
    const moveEyes = (eyeRef: HTMLDivElement | null, isRightEye: boolean = false) => {
      if (!eyeRef) return;
      
      const eye = eyeRef.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;
      
      const dx = mousePosition.x - eyeCenterX;
      const dy = mousePosition.y - eyeCenterY;
      
      const angle = Math.atan2(dy, dx);
      
      const eyeRadius = Math.min(eye.width, eye.height) * 0.2;
      
      const moveX = Math.cos(angle) * eyeRadius;
      const moveY = Math.sin(angle) * eyeRadius;
      
      eyeRef.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    moveEyes(leftEyeRef.current, false);
    moveEyes(rightEyeRef.current, true);
  }, [mousePosition]);

  return (
    <motion.div 
      className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      ref={botRef}
    >
      <div className="relative w-full h-full">
        <motion.img 
          src="/lovable-uploads/157c6496-b0ae-407f-916f-c9ac7e766fc2.png" 
          alt="Xilo Bot"
          className="w-full h-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        <div className="absolute left-[30%] top-[30%] w-[15%] h-[15%] rounded-full overflow-hidden">
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-black rounded-full" 
            ref={leftEyeRef} 
            style={{ transition: 'transform 0.1s ease-out' }} 
          />
        </div>
        
        <div className="absolute right-[30%] top-[30%] w-[15%] h-[15%] rounded-full overflow-hidden">
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-black rounded-full" 
            ref={rightEyeRef}
            style={{ transition: 'transform 0.1s ease-out' }} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default XiloBot;

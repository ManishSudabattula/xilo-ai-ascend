
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const XiloBot: React.FC = () => {
  const botRef = useRef<HTMLDivElement>(null);
  const botHeadRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update head position based on mouse position
  useEffect(() => {
    if (!botRef.current || !botHeadRef.current) return;

    const botRect = botRef.current.getBoundingClientRect();
    const botCenterX = botRect.left + botRect.width / 2;
    const botCenterY = botRect.top + botRect.height / 2;

    // Calculate angle between the bot center and the mouse position
    const dx = mousePosition.x - botCenterX;
    const dy = mousePosition.y - botCenterY;
    
    // Calculate head movement with improved responsiveness
    const maxHeadMovement = 25; // Increased for more noticeable movement
    const headMovementX = Math.min(Math.max(dx / 20, -1), 1) * maxHeadMovement;
    const headMovementY = Math.min(Math.max(dy / 20, -1), 1) * maxHeadMovement;

    // Apply transformation to the bot head with smoother transitions
    botHeadRef.current.style.transform = `translate(${headMovementX}px, ${headMovementY}px)`;
    botHeadRef.current.style.transition = 'transform 0.2s ease-out';
    
  }, [mousePosition]);

  return (
    <motion.div 
      ref={botRef}
      className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-6" // Further decreased size
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Container for the head to allow independent movement */}
      <div 
        ref={botHeadRef} 
        className="relative w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <motion.img 
          src="/lovable-uploads/3415b00d-0871-4eec-8332-4aea9d2fc114.png" 
          alt="Xilo Bot"
          className="w-full h-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default XiloBot;

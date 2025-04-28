
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMouse } from 'react-use';

const XiloBot: React.FC = () => {
  const botRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(botRef);

  useEffect(() => {
    if (!botRef.current || !leftEyeRef.current || !rightEyeRef.current) return;

    const botRect = botRef.current.getBoundingClientRect();
    const botCenterX = botRect.left + botRect.width / 2;
    const botCenterY = botRect.top + botRect.height / 2;

    // Calculate angle between the bot center and the mouse position
    const dx = mouse.docX - botCenterX;
    const dy = mouse.docY - botCenterY;
    
    // Limit eye movement - more subtle tracking
    const maxEyeMovement = 6;
    const eyeMovementX = Math.min(Math.max(dx / 50, -1), 1) * maxEyeMovement;
    const eyeMovementY = Math.min(Math.max(dy / 50, -1), 1) * maxEyeMovement;

    // Apply transformation to eyes
    leftEyeRef.current.style.transform = `translate(${eyeMovementX}px, ${eyeMovementY}px)`;
    rightEyeRef.current.style.transform = `translate(${eyeMovementX}px, ${eyeMovementY}px)`;
    
  }, [mouse.docX, mouse.docY]);

  return (
    <motion.div 
      ref={botRef}
      className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 cursor-follower"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.img 
        src="/lovable-uploads/3415b00d-0871-4eec-8332-4aea9d2fc114.png" 
        alt="Xilo Bot"
        className="w-full h-full animate-float"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      
      {/* The bot's eyes for tracking */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Left eye */}
        <div className="absolute left-[31%] top-[36%] w-4 h-4">
          <div ref={leftEyeRef} className="w-2 h-2 bg-white rounded-full transition-transform duration-200"></div>
        </div>
        
        {/* Right eye */}
        <div className="absolute right-[31%] top-[36%] w-4 h-4">
          <div ref={rightEyeRef} className="w-2 h-2 bg-white rounded-full transition-transform duration-200"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default XiloBot;

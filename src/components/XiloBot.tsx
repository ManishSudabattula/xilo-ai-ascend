
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMouse } from 'react-use';

const XiloBot: React.FC = () => {
  const botRef = useRef<HTMLDivElement>(null);
  const botHeadRef = useRef<HTMLImageElement>(null);
  const mouse = useMouse(botRef);

  useEffect(() => {
    if (!botRef.current || !botHeadRef.current) return;

    const botRect = botRef.current.getBoundingClientRect();
    const botCenterX = botRect.left + botRect.width / 2;
    const botCenterY = botRect.top + botRect.height / 2;

    // Calculate angle between the bot center and the mouse position
    const dx = mouse.docX - botCenterX;
    const dy = mouse.docY - botCenterY;
    
    // Increased movement range and made more responsive
    const maxHeadMovement = 20;
    const headMovementX = Math.min(Math.max(dx / 25, -1), 1) * maxHeadMovement;
    const headMovementY = Math.min(Math.max(dy / 25, -1), 1) * maxHeadMovement;

    // Apply transformation to the bot head
    botHeadRef.current.style.transform = `translate(${headMovementX}px, ${headMovementY}px)`;
    
  }, [mouse.docX, mouse.docY]);

  return (
    <motion.div 
      ref={botRef}
      className="relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-6" // Decreased size from w-64/h-64 to w-48/h-48
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Container for the head to allow independent movement */}
      <div className="relative w-full h-full">
        <motion.img 
          ref={botHeadRef}
          src="/lovable-uploads/3415b00d-0871-4eec-8332-4aea9d2fc114.png" 
          alt="Xilo Bot"
          className="absolute w-full h-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ willChange: 'transform' }} // Optimize for animation performance
        />
      </div>
    </motion.div>
  );
};

export default XiloBot;

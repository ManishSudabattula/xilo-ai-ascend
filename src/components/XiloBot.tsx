
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
    
    // Limit head movement - subtle tracking
    const maxHeadMovement = 10;
    const headMovementX = Math.min(Math.max(dx / 60, -1), 1) * maxHeadMovement;
    const headMovementY = Math.min(Math.max(dy / 60, -1), 1) * maxHeadMovement;

    // Apply transformation to the bot head
    botHeadRef.current.style.transform = `translate(${headMovementX}px, ${headMovementY}px)`;
    
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
        ref={botHeadRef}
        src="/lovable-uploads/3415b00d-0871-4eec-8332-4aea9d2fc114.png" 
        alt="Xilo Bot"
        className="w-full h-full animate-float"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default XiloBot;

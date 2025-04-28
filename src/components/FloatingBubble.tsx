
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface FloatingBubbleProps {
  label: string;
  isAnchored?: boolean;
  isActive?: boolean;
  initialPosition?: { x: number, y: number };
  anchoredPosition?: { x: number, y: number };
  onAnchorComplete?: () => void;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({
  label,
  isAnchored = false,
  isActive = false,
  initialPosition = { x: 0, y: 0 },
  anchoredPosition = { x: 0, y: 0 },
  onAnchorComplete
}) => {
  const controls = useAnimation();
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Floating animation when not anchored
  const floatingAnimation: Variants = {
    floating: {
      y: [0, -10, 0],
      x: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    anchored: {
      x: anchoredPosition.x,
      y: anchoredPosition.y,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Glow animation when active
  const glowAnimation: Variants = {
    normal: {
      boxShadow: "0 0 5px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3)",
    },
    active: {
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.5,
        repeat: 1,
        repeatType: "reverse"
      }
    }
  };

  useEffect(() => {
    if (isAnchored) {
      controls.start("anchored").then(() => {
        if (onAnchorComplete) onAnchorComplete();
      });
    } else {
      controls.start("floating");
    }
  }, [isAnchored, controls, onAnchorComplete]);

  useEffect(() => {
    if (isActive) {
      controls.start("active");
    } else {
      controls.start("normal");
    }
  }, [isActive, controls]);

  return (
    <motion.div
      ref={bubbleRef}
      className="absolute"
      initial={{ x: initialPosition.x, y: initialPosition.y }}
      animate={controls}
      variants={floatingAnimation}
    >
      <motion.div 
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-frameworkx-black bg-opacity-70 backdrop-blur-sm border border-white border-opacity-30 cursor-pointer z-40`}
        variants={glowAnimation}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-frameworkx-text font-medium text-sm">{label}</span>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBubble;

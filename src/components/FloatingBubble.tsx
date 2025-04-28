
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface FloatingBubbleProps {
  label: string;
  isAnchored?: boolean;
  isActive?: boolean;
  isVisible?: boolean;
  initialPosition?: { x: number, y: number };
  anchoredPosition?: { x: number, y: number };
  onAnchorComplete?: () => void;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({
  label,
  isAnchored = false,
  isActive = false,
  isVisible = true,
  initialPosition = { x: 0, y: 0 },
  anchoredPosition = { x: 0, y: 0 },
  onAnchorComplete
}) => {
  const controls = useAnimation();
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Enhanced floating animation with gentler movement
  const floatingAnimation: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    floating: {
      opacity: 1,
      scale: 1,
      y: [0, -15, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    },
    anchored: {
      opacity: 1,
      scale: 1,
      x: anchoredPosition.x,
      y: anchoredPosition.y,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced glow animation when active
  const glowAnimation: Variants = {
    normal: {
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.3)",
    },
    active: {
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.6)",
      transition: {
        boxShadow: { duration: 0.8 },
      }
    }
  };

  useEffect(() => {
    if (!isVisible) {
      controls.start("hidden");
      return;
    }

    if (isAnchored) {
      controls.start("anchored").then(() => {
        if (onAnchorComplete) onAnchorComplete();
      });
    } else {
      controls.start("floating");
    }
  }, [isAnchored, controls, onAnchorComplete, isVisible]);

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
      className="z-50"
      initial="hidden"
      animate={controls}
      variants={floatingAnimation}
      style={{ x: initialPosition.x, y: initialPosition.y }}
    >
      <motion.div 
        className="flex items-center justify-center w-16 h-16 rounded-full bg-frameworkx-black bg-opacity-70 backdrop-blur-sm border border-white border-opacity-40 cursor-pointer z-50"
        variants={glowAnimation}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-frameworkx-text font-medium text-sm">{label}</span>
      </motion.div>
    </motion.div>
  );
};

export default FloatingBubble;

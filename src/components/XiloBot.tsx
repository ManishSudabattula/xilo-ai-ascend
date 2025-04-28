import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const XiloBot: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // container refs to get the eye sockets' positions
  const leftEyeContainerRef = useRef<HTMLDivElement>(null);
  const rightEyeContainerRef = useRef<HTMLDivElement>(null);
  // pupil refs to apply the transforms
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const movePupil = (
      container: HTMLDivElement | null,
      pupil: HTMLDivElement | null
    ) => {
      if (!container || !pupil) return;

      // get socket center
      const socketRect = container.getBoundingClientRect();
      const centerX = socketRect.left + socketRect.width / 2;
      const centerY = socketRect.top + socketRect.height / 2;

      // vector from eye center to mouse
      const dx = mousePosition.x - centerX;
      const dy = mousePosition.y - centerY;
      const angle = Math.atan2(dy, dx);

      // compute how far the pupil can travel inside the socket
      const pupilRect = pupil.getBoundingClientRect();
      const maxX = (socketRect.width - pupilRect.width) / 2;
      const maxY = (socketRect.height - pupilRect.height) / 2;

      // scale down so it never reaches the very edge
      const travelX = Math.cos(angle) * maxX * 0.8;
      const travelY = Math.sin(angle) * maxY * 0.8;

      pupil.style.transform = `translate(${travelX}px, ${travelY}px)`;
    };

    movePupil(leftEyeContainerRef.current, leftPupilRef.current);
    movePupil(rightEyeContainerRef.current, rightPupilRef.current);
  }, [mousePosition]);

  return (
    <motion.div
      className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Bot image */}
      <motion.img
        src="/lovable-uploads/157c6496-b0ae-407f-916f-c9ac7e766fc2.png"
        alt="Xilo Bot"
        className="w-full h-full"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />

      {/* Left eye socket */}
      <div
        ref={leftEyeContainerRef}
        className="absolute left-[36%] top-[34%] w-4 h-4 rounded-full overflow-hidden"
      >
        <div
          ref={leftPupilRef}
          className="absolute left-1/2 top-1/2 w-1/3 h-1/3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        />
      </div>

      {/* Right eye socket */}
      <div
        ref={rightEyeContainerRef}
        className="absolute left-[55%] top-[34%] w-4 h-4 rounded-full overflow-hidden"
      >
        <div
          ref={rightPupilRef}
          className="absolute left-1/2 top-1/2 w-1/3 h-1/3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        />
      </div>
    </motion.div>
  );
};

export default XiloBot;

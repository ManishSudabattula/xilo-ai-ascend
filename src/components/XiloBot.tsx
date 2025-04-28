import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const XiloBot: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const leftEyeContainerRef = useRef<HTMLDivElement>(null);
  const rightEyeContainerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  useEffect(() => {
    const movePupil = (container: HTMLDivElement | null, pupil: HTMLDivElement | null) => {
      if (!container || !pupil) return;
      const socket = container.getBoundingClientRect();
      const cx = socket.left + socket.width / 2;
      const cy = socket.top + socket.height / 2;
      const dx = mousePosition.x - cx;
      const dy = mousePosition.y - cy;
      const angle = Math.atan2(dy, dx);
      const pRect = pupil.getBoundingClientRect();
      const maxX = (socket.width - pRect.width) / 2;
      const maxY = (socket.height - pRect.height) / 2;
      const tx = Math.cos(angle) * maxX * 0.8;
      const ty = Math.sin(angle) * maxY * 0.8;
      pupil.style.transform = `translate(${tx}px, ${ty}px)`;
    };
    movePupil(leftEyeContainerRef.current, leftPupilRef.current);
    movePupil(rightEyeContainerRef.current, rightPupilRef.current);
  }, [mousePosition]);
  return <motion.div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6" initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8,
    ease: 'easeOut'
  }}>
      <motion.img src="/lovable-uploads/157c6496-b0ae-407f-916f-c9ac7e766fc2.png" alt="Xilo Bot" className="w-full h-full" animate={{
      scale: [1, 1.02, 1]
    }} transition={{
      repeat: Infinity,
      duration: 6,
      ease: 'easeInOut'
    }} />

      {/* Left eye */}
      <div ref={leftEyeContainerRef} className="absolute left-[36%] top-[33%] w-4.5 h-4.5 rounded-full overflow-hidden">
        <div ref={leftPupilRef} className="absolute left-1/2 top-1/2 w-1/3 h-1/3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out" />
      </div>

      {/* Right eye */}
      <div ref={rightEyeContainerRef} className="absolute left-[61%] top-[35%] w-7 h-7 rounded-full overflow-hidden">
        <div ref={rightPupilRef} className="absolute left-1/2 top-1/2 w-1/4 h-1/4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out" />
      </div>
    </motion.div>;
};
export default XiloBot;
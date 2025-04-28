
import { useState, useCallback } from 'react';

export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({
    normalizedX: 0,
    normalizedY: 0,
    targetX: 0,
    targetY: 0
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const mouseX = (event.clientX - window.innerWidth / 2) / 3000;
    const mouseY = (event.clientY - window.innerHeight / 2) / 3000;
    
    setMousePosition({
      normalizedX: mouseX,
      normalizedY: mouseY,
      targetX: (event.clientX / window.innerWidth) * 2 - 1,
      targetY: -(event.clientY / window.innerHeight) * 2 + 1
    });
  }, []);

  return { mousePosition, handleMouseMove };
};


import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

interface ConnectingLineProps {
  startPoint: Point;
  endPoint: Point;
  progress: number;
  thickness?: number;
  color?: string;
  glow?: boolean;
  curviness?: number;
}

const ConnectingLine: React.FC<ConnectingLineProps> = ({
  startPoint,
  endPoint,
  progress,
  thickness = 2,
  color = "white",
  glow = true,
  curviness = 30
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate control points for curved path
    const controlPoint1 = {
      x: startPoint.x + Math.random() * curviness - curviness/2,
      y: startPoint.y + (endPoint.y - startPoint.y) * 0.33
    };
    
    const controlPoint2 = {
      x: endPoint.x + Math.random() * curviness - curviness/2,
      y: startPoint.y + (endPoint.y - startPoint.y) * 0.66
    };
    
    // Draw path
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.bezierCurveTo(
      controlPoint1.x, controlPoint1.y,
      controlPoint2.x, controlPoint2.y,
      endPoint.x, endPoint.y
    );
    
    // Set line style
    ctx.lineCap = "round";
    ctx.lineWidth = thickness;
    
    // Add glow effect
    if (glow) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
    }
    
    // Create gradient for line
    const gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.4)");
    ctx.strokeStyle = gradient;
    
    // Calculate stroke length for animation
    const length = calculatePathLength(startPoint, controlPoint1, controlPoint2, endPoint);
    const drawLength = length * progress;
    
    // Animate drawing the path
    ctx.stroke();
    
    // Helper function to calculate approximate path length of a bezier curve
    function calculatePathLength(p0: Point, p1: Point, p2: Point, p3: Point) {
      // Approximate bezier curve length
      const steps = 10;
      let length = 0;
      let prevPoint = p0;
      
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        
        // Cubic bezier formula
        const point = {
          x: Math.pow(1-t, 3) * p0.x + 
             3 * Math.pow(1-t, 2) * t * p1.x + 
             3 * (1-t) * Math.pow(t, 2) * p2.x + 
             Math.pow(t, 3) * p3.x,
          y: Math.pow(1-t, 3) * p0.y + 
             3 * Math.pow(1-t, 2) * t * p1.y + 
             3 * (1-t) * Math.pow(t, 2) * p2.y + 
             Math.pow(t, 3) * p3.y
        };
        
        // Add segment length
        length += Math.sqrt(Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2));
        prevPoint = point;
      }
      
      return length;
    }
    
  }, [startPoint, endPoint, progress, thickness, color, glow, curviness]);
  
  return (
    <motion.canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default ConnectingLine;


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
  isVisible?: boolean;
}

const ConnectingLine: React.FC<ConnectingLineProps> = ({
  startPoint,
  endPoint,
  progress,
  thickness = 2,
  color = "white",
  glow = true,
  curviness = 30,
  isVisible = true
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

    if (!isVisible) return;
    
    // Calculate control points for curved path - make curve more pronounced
    const controlPoint1 = {
      x: startPoint.x + Math.random() * curviness * 1.5 - curviness/2,
      y: startPoint.y + (endPoint.y - startPoint.y) * 0.33
    };
    
    const controlPoint2 = {
      x: endPoint.x + Math.random() * curviness * 1.5 - curviness/2,
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
    
    // Set line style - make thicker for better visibility
    ctx.lineCap = "round";
    ctx.lineWidth = thickness + 1;
    
    // Add stronger glow effect
    if (glow) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
    }
    
    // Create gradient for line - brighter
    const gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
    ctx.strokeStyle = gradient;
    
    // Calculate stroke length for animation
    const length = calculatePathLength(startPoint, controlPoint1, controlPoint2, endPoint);
    const drawLength = length * progress;
    
    // Animate drawing the path
    drawPathWithProgress(ctx, startPoint, controlPoint1, controlPoint2, endPoint, progress);
    
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

    // Helper function to draw path with progress
    function drawPathWithProgress(
      ctx: CanvasRenderingContext2D,
      p0: Point,
      p1: Point,
      p2: Point,
      p3: Point,
      progress: number
    ) {
      if (progress <= 0) return;
      
      const steps = 100;
      const maxT = Math.min(1, progress);
      let prevPoint = p0;
      
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      
      for (let i = 1; i <= steps * maxT; i++) {
        const t = i / steps;
        if (t > maxT) break;
        
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
        
        ctx.lineTo(point.x, point.y);
        prevPoint = point;
      }
      
      ctx.stroke();
    }
    
  }, [startPoint, endPoint, progress, thickness, color, glow, curviness, isVisible]);
  
  return (
    <motion.canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default ConnectingLine;

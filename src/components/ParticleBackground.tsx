import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles with reduced count
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Generate random positions in a wider circular area
    for(let i = 0; i < particlesCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 10; // Increased radius for even wider spread
      
      positions[i] = Math.cos(angle) * radius;     // x
      positions[i + 1] = Math.sin(angle) * radius; // y
      positions[i + 2] = (Math.random() - 0.5) * 2;    // z
      
      // Base colors (purple-blue with higher initial brightness)
      colors[i] = 0.7;     // R - increased base red
      colors[i + 1] = 0.5; // G - increased base green
      colors[i + 2] = 1.0; // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7 // Increased base opacity
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 10;
    
    // Mouse tracking with smoother transitions
    let mouseX = 0;
    let mouseY = 0;
    let normalizedMouseX = 0;
    let normalizedMouseY = 0;
    let targetNormalizedMouseX = 0;
    let targetNormalizedMouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 3000; // Reduced sensitivity
      mouseY = (event.clientY - window.innerHeight / 2) / 3000;
      
      // Set target values for smooth interpolation
      targetNormalizedMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetNormalizedMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation and particle connection logic
    const connectParticles = () => {
      const positionAttribute = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array;
      const colorAttribute = particlesGeometry.getAttribute('color') as THREE.BufferAttribute;
      const colors = new Float32Array(colorAttribute.array);
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      
      // Smooth mouse position interpolation
      normalizedMouseX += (targetNormalizedMouseX - normalizedMouseX) * 0.05;
      normalizedMouseY += (targetNormalizedMouseY - normalizedMouseY) * 0.05;
      
      for(let i = 0; i < positions.length; i += 3) {
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];
        
        // Enhanced glow effect
        const dx = x1 - (normalizedMouseX * 8);
        const dy = y1 - (normalizedMouseY * 8);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        const glowRadius = 4; // Increased glow radius
        const intensity = Math.max(0, 1 - (distanceToMouse / glowRadius));
        const smoothIntensity = Math.pow(intensity, 1.5); // Smoother falloff
        
        // Update colors with enhanced glow
        colors[i] = 0.7 + smoothIntensity * 0.3;     // R
        colors[i + 1] = 0.5 + smoothIntensity * 0.5; // G
        colors[i + 2] = 1.0;                         // B
        
        // Connection logic with smoother transitions
        for(let j = i + 3; j < positions.length; j += 3) {
          const x2 = positions[j];
          const y2 = positions[j + 1];
          const z2 = positions[j + 2];
          
          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2) +
            Math.pow(z2 - z1, 2)
          );
          
          if(distance < 2.5 && Math.random() > 0.85) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
            
            // Enhanced line glow
            const lineIntensity = Math.max(
              smoothIntensity,
              Math.max(0, 1 - (Math.sqrt(
                Math.pow(x2 - (normalizedMouseX * 8), 2) +
                Math.pow(y2 - (normalizedMouseY * 8), 2)
              ) / glowRadius))
            );
            
            const baseColor = 0.4 + lineIntensity * 0.6;
            lineColors.push(baseColor, baseColor * 0.8, 1);
            lineColors.push(baseColor, baseColor * 0.8, 1);
          }
        }
      }
      
      // Update color buffer with new colors
      colorAttribute.set(colors);
      colorAttribute.needsUpdate = true;
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      
      return new THREE.LineSegments(lineGeometry, lineMaterial);
    };
    
    let lineSegments = connectParticles();
    scene.add(lineSegments);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle rotation
      particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.02;
      particlesMesh.rotation.y += (mouseX * 0.5 - particlesMesh.rotation.y) * 0.02;
      
      // Update connections and glow effect
      if (Math.random() > 0.95) {
        scene.remove(lineSegments);
        lineSegments = connectParticles();
        scene.add(lineSegments);
      }
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="canvas-container" />;
};

export default ParticleBackground;

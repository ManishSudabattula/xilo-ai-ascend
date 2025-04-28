
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
    const particlesCount = 100; // Further reduced for cleaner look
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const intensities = new Float32Array(particlesCount); // For glow effect
    
    // Create line segments for connections
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.15,
      transparent: true
    });

    // Generate random positions in a wider circular area
    for(let i = 0; i < particlesCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8; // Increased radius for wider spread
      
      positions[i] = Math.cos(angle) * radius;     // x
      positions[i + 1] = Math.sin(angle) * radius; // y
      positions[i + 2] = (Math.random() - 0.5) * 2;    // z - more depth variation
      
      // Base colors (purple-blue)
      colors[i] = 0.6;     // R
      colors[i + 1] = 0.4; // G
      colors[i + 2] = 1.0; // B
      
      intensities[i / 3] = 0.0; // Initial intensity for glow effect
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08, // Slightly larger particles
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 10; // Moved camera back for wider view
    
    // Mouse tracking with normalized coordinates
    let mouseX = 0;
    let mouseY = 0;
    let normalizedMouseX = 0;
    let normalizedMouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 2000;
      mouseY = (event.clientY - window.innerHeight / 2) / 2000;
      
      // Calculate normalized mouse position for glow effect
      normalizedMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      normalizedMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation
    const connectParticles = () => {
      const positionAttribute = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array;
      const colorAttribute = particlesGeometry.getAttribute('color') as THREE.BufferAttribute;
      const colorArray = colorAttribute.array;
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      
      for(let i = 0; i < positions.length; i += 3) {
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];
        
        // Update particle glow based on distance to mouse
        const dx = x1 - (normalizedMouseX * 8); // Scale to match world space
        const dy = y1 - (normalizedMouseY * 8);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        const glowRadius = 3; // Radius of glow effect
        const intensity = Math.max(0, 1 - (distanceToMouse / glowRadius));
        
        // Update colors with glow - using the properly defined colorArray
        // Create a temporary array with new colors
        const newR = 0.6 + intensity * 0.4;     // R - increase red for glow
        const newG = 0.4 + intensity * 0.3;     // G - increase green for glow
        const newB = 1.0;                       // B - keep blue constant
        
        // Update using the proper set method instead of direct modification
        colorArray[i] = newR;
        colorArray[i + 1] = newG;
        colorArray[i + 2] = newB;
        
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
            
            // Make connections brighter near mouse
            const lineIntensity = Math.max(
              intensity,
              Math.max(0, 1 - (Math.sqrt(
                Math.pow(x2 - (normalizedMouseX * 8), 2) +
                Math.pow(y2 - (normalizedMouseY * 8), 2)
              ) / glowRadius))
            );
            
            const baseColor = 0.3 + lineIntensity * 0.7;
            lineColors.push(baseColor, baseColor * 0.6, 1);
            lineColors.push(baseColor, baseColor * 0.6, 1);
          }
        }
      }
      
      // Notify Three.js that colors have been updated
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

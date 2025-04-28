
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
    const particlesCount = 120; // Decreased from 200 for less visual complexity
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Create line segments for connections
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.15, // Reduced from 0.2 for subtler lines
      transparent: true
    });

    // Generate random positions in a wide circular area
    for(let i = 0; i < particlesCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 6;
      
      positions[i] = Math.cos(angle) * radius;     // x
      positions[i + 1] = Math.sin(angle) * radius; // y
      positions[i + 2] = (Math.random() - 0.5);    // z - slight depth variation
      
      // Purple-blue gradient colors with reduced opacity
      colors[i] = 0.5 + Math.random() * 0.5;     // R
      colors[i + 1] = 0.3 + Math.random() * 0.4; // G
      colors[i + 2] = 1.0;                       // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5 // Reduced from 0.6 for subtler particles
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 8;
    
    // Mouse movement effect with reduced sensitivity
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 2000; // Reduced sensitivity
      mouseY = (event.clientY - window.innerHeight / 2) / 2000;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation
    const connectParticles = () => {
      const positionAttribute = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array;
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      
      for(let i = 0; i < positions.length; i += 3) {
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];
        
        for(let j = i + 3; j < positions.length; j += 3) {
          const x2 = positions[j];
          const y2 = positions[j + 1];
          const z2 = positions[j + 2];
          
          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2) +
            Math.pow(z2 - z1, 2)
          );
          
          // More strict connection rules for stability
          if(distance < 2.5 && Math.random() > 0.85) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
            
            const alpha = 1 - (distance / 2.5);
            lineColors.push(0.5, 0.3, 1, 0.5, 0.3, 1);
          }
        }
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      
      return new THREE.LineSegments(lineGeometry, lineMaterial);
    };
    
    let lineSegments = connectParticles();
    scene.add(lineSegments);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Reduced rotation speed for more stability
      particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.02;
      particlesMesh.rotation.y += (mouseX * 0.5 - particlesMesh.rotation.y) * 0.02;
      
      // Update connections less frequently
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

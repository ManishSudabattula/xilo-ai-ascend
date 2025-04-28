
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useParticleSystem } from '../hooks/useParticleSystem';
import { useMouseTracking } from '../hooks/useMouseTracking';
import { createLineSystem, updateParticleConnections } from '../utils/particleUtils';

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
    
    // Create particle system
    const { geometry: particlesGeometry, material: particlesMaterial } = useParticleSystem();
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 10;
    
    // Create line system
    const { geometry: lineGeometry, material: lineMaterial } = createLineSystem();
    let lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);
    
    // Mouse tracking
    let normalizedMouseX = 0;
    let normalizedMouseY = 0;
    let targetNormalizedMouseX = 0;
    let targetNormalizedMouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX - window.innerWidth / 2) / 3000;
      const mouseY = (event.clientY - window.innerHeight / 2) / 3000;
      
      targetNormalizedMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetNormalizedMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth mouse position interpolation
      normalizedMouseX += (targetNormalizedMouseX - normalizedMouseX) * 0.05;
      normalizedMouseY += (targetNormalizedMouseY - normalizedMouseY) * 0.05;
      
      // Update particle connections
      const positionAttribute = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const colorAttribute = particlesGeometry.getAttribute('color') as THREE.BufferAttribute;
      
      const { linePositions, lineColors } = updateParticleConnections(
        positionAttribute.array as Float32Array,
        colorAttribute.array as Float32Array,
        normalizedMouseX,
        normalizedMouseY
      );
      
      // Update colors
      colorAttribute.needsUpdate = true;
      
      // Update line segments
      if (Math.random() > 0.95) {
        scene.remove(lineSegments);
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
        lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineSegments);
      }
      
      // Gentle rotation
      particlesMesh.rotation.x += (normalizedMouseY * 0.5 - particlesMesh.rotation.x) * 0.02;
      particlesMesh.rotation.y += (normalizedMouseX * 0.5 - particlesMesh.rotation.y) * 0.02;
      
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

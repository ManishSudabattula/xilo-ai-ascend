
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export const useParticleSystem = () => {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 100;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  
  // Generate random positions in a wider circular area
  for(let i = 0; i < particlesCount * 3; i += 3) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 10;
    
    positions[i] = Math.cos(angle) * radius;
    positions[i + 1] = Math.sin(angle) * radius;
    positions[i + 2] = (Math.random() - 0.5) * 2;
    
    colors[i] = 0.7;
    colors[i + 1] = 0.5;
    colors[i + 2] = 1.0;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  return {
    geometry: particlesGeometry,
    material: new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7
    })
  };
};

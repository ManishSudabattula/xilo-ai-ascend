
import * as THREE from 'three';

export const createLineSystem = () => {
  return {
    geometry: new THREE.BufferGeometry(),
    material: new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5
    })
  };
};

export const updateParticleConnections = (
  positions: Float32Array,
  colors: Float32Array,
  mouseX: number,
  mouseY: number
) => {
  const linePositions: number[] = [];
  const lineColors: number[] = [];
  const glowRadius = 4;

  for(let i = 0; i < positions.length; i += 3) {
    const x1 = positions[i];
    const y1 = positions[i + 1];
    const z1 = positions[i + 2];
    
    const dx = x1 - (mouseX * 8);
    const dy = y1 - (mouseY * 8);
    const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
    const intensity = Math.max(0, 1 - (distanceToMouse / glowRadius));
    const smoothIntensity = Math.pow(intensity, 1.5);
    
    colors[i] = 0.7 + smoothIntensity * 0.3;
    colors[i + 1] = 0.5 + smoothIntensity * 0.5;
    colors[i + 2] = 1.0;
    
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
        linePositions.push(x1, y1, z1, x2, y2, z2);
        
        const lineIntensity = Math.max(
          smoothIntensity,
          Math.max(0, 1 - (Math.sqrt(
            Math.pow(x2 - (mouseX * 8), 2) +
            Math.pow(y2 - (mouseY * 8), 2)
          ) / glowRadius))
        );
        
        const baseColor = 0.4 + lineIntensity * 0.6;
        lineColors.push(
          baseColor, baseColor * 0.8, 1,
          baseColor, baseColor * 0.8, 1
        );
      }
    }
  }

  return { linePositions, lineColors };
};

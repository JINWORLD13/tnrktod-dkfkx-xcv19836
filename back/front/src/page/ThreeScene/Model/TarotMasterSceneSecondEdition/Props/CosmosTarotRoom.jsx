import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
export function EmissiveGoldenMesh({ nodes, materials }) {
  const meshRef = useRef();
  const goldenColor = new THREE.Color('#FFD700'); 
  const emissiveMaterial = new THREE.MeshStandardMaterial({
    color: materials['Material_0.012'].color, 
    emissive: goldenColor, 
    emissiveIntensity: 1, 
    metalness: 1, 
    roughness: 1, 
  });
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity =
        1 + (Math.sin(state.clock.elapsedTime) + 1) * 2;
    }
  });
  return (
    <mesh
      ref={meshRef}
      geometry={nodes.Mesh_0011.geometry}
      material={emissiveMaterial}
      position={[0, 0.376, -0.724]}
      scale={0.511}
    />
  );
}

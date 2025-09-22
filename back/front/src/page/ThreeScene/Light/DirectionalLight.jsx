import React, { useRef } from 'react';
import {
  useHelper,
} from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
export default function DirectionalLight(props) {
  const lightRef = useRef(); 
  return (
    <>
        <directionalLight
          position={[0, 5, 5]}
          intensity={5}
          ref={lightRef}
          color={'yellow'}
          shadow-mapSize={[1024, 1024]}
          castShadow
        >
          <orthographicCamera attach="shadow-camera" args={[3, 0, 0, 0]} />
        </directionalLight>
    </>
  );
}

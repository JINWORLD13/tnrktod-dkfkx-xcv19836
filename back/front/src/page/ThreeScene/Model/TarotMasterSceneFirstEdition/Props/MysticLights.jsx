import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
export default function MysticLights() {
  const crystalLight = useRef();
  const candleLight1 = useRef();
  const candleLight2 = useRef();
  const candleLight3 = useRef();
  useFrame((state, delta) => {
    if (candleLight1.current) {
      candleLight1.current.intensity = 0.8 + Math.random() * 0.2;
    }
    if (candleLight2.current) {
      candleLight2.current.intensity = 0.8 + Math.random() * 0.2;
    }
    if (candleLight3.current) {
      candleLight3.current.intensity = 0.8 + Math.random() * 0.2;
    }
  });
  return (
    <>
      {}
      <pointLight
        ref={crystalLight}
        position={[0.045, 27.315, 4.358]}
        intensity={2}
        color="#9370DB"
        distance={30}
        decay={2}
      />
      {}
      <spotLight
        ref={candleLight1}
        position={[-12.679, 32.908, 22.176]} 
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#FFA500"
        distance={40}
        decay={2}
      />
      <spotLight
        ref={candleLight2}
        position={[-18.892, 32.908, 22.176]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#FFA500"
        distance={40}
        decay={2}
      />
      <spotLight
        ref={candleLight3}
        position={[-25.356, 32.908, 22.176]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#FFA500"
        distance={40}
        decay={2}
      />
      {}
      <ambientLight intensity={0.1} color="#2A0A4C" />
    </>
  );
}

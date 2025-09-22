import { Stars } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
export default function SpinningStar(props) {
  const startRef = useRef(null);
  const isAnimating = useRef(true); 
  useFrame((state, delta) => {
    if (isAnimating.current && startRef.current) {
      startRef.current.rotation.x += 0.0005 * delta;
      startRef.current.rotation.y += 0.005 * delta;
    }
  });
  useEffect(() => {
    return () => {
      isAnimating.current = false;
      if (startRef.current) {
        startRef.current.geometry?.dispose(); 
        startRef.current.material?.dispose(); 
        if (startRef.current.material) {
          if (Array.isArray(startRef.current.material)) {
            startRef.current.material.forEach(mat => mat.dispose());
          } else {
            startRef.current.material.dispose();
          }
        }
        startRef.current = null; 
      }
    };
  }, []);
  const { scene } = useThree();
  useEffect(() => {
    return () => {
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [scene]);
  return (
    <Stars
      ref={startRef}
      radius={1}
      depth={5}
      count={1000}
      factor={0.6}
      saturation={1}
      fade
      speed={0.5}
      visible={props?.visible}
    />
  );
}

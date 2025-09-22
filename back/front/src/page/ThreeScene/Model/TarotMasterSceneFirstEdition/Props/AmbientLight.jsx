import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
export const AmbientLight = ({intensity=10, ...props}) => {
  const ambientLightRef = useRef();
  const { scene } = useThree();
    useEffect(() => {
      return () => {
        if (ambientLightRef.current) {
          scene.remove(ambientLightRef.current);
          ambientLightRef.current.dispose();
        }
      };
    }, [scene]);
    return <ambientLight ref={ambientLightRef} intensity={intensity} />;
  return;
};

import { useFrame, useThree, extend } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { MathUtils, PerspectiveCamera, Vector3 } from 'three';
extend({ PerspectiveCamera: PerspectiveCamera });
export const DynamicCameraForNew = ({
  isWaiting = false,
  isAnswered = false,
  isReadyToShowDurumagi = false,
}) => {
  const { camera } = useThree();
  const targetPositionRef = useRef(new Vector3());
  const targetFovRef = useRef(30);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(prev => {
      return isWaiting || (isAnswered && !isReadyToShowDurumagi);
    });
    const targetPosition = visible ? [0, 0, 5.2] : [0, 0.03 , 0.1];
    targetPositionRef.current.set(...targetPosition);
  }, [visible, isWaiting, isAnswered, isReadyToShowDurumagi]); 
  useFrame(() => {
    camera.position.lerp(targetPositionRef.current, 0.1);
    camera.fov = MathUtils.lerp(camera.fov, targetFovRef.current, 0.1);
    camera.updateProjectionMatrix();
    const lookAtPosition = visible ? [0, 0, 0] : [0, 0.02, 0];
    camera.lookAt(...lookAtPosition);
  });
  useFrame((state, delta) => {
    const FPS = 30;
    if (delta > 1 / FPS) return; 
  });
  return null;
};

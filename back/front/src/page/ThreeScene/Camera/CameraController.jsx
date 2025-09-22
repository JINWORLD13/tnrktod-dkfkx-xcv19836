import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
export const CameraController = ({ isWaiting }) => {
  const { camera } = useThree();
  useEffect (() => {
    if (isWaiting) {
      camera.position.set(0, 1.7, 5);
    } else {
      camera.position.set(0, 1.7, 3);
    }
    camera.fov = 30;
    camera.updateProjectionMatrix();
  }, [isWaiting, camera]);
  return null;
};

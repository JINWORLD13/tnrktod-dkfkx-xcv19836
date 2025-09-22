import { useFrame, useThree, extend } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PerspectiveCamera } from 'three';
import { MathUtils, Vector3 } from 'three';
extend({ PerspectiveCamera: PerspectiveCamera });
export const DynamicCamera = ({
  isWaiting = false,
  isAnswered = false,
  answer,
  isReadyToShowDurumagi = false,
  isDoneAnimationOfBackground,
  whichTarot,
  isVoucherModeOn,
  targetPositionWhenMagicCircleVisible = [0, 1.2, 5.2],
  targetPositionWhenMagicCircleInvisible = [0, 1.7, 3],
  lookAtPositionWhenMagicCircleVisible = [0, 1.25, 1],
  lookAtPositionWhenMagicCircleInvisible = [0, 1.5, 1],
}) => {
  const { camera } = useThree();
  const targetPositionRef = useRef(new Vector3());
  const targetFovRef = useRef(30);
  const [isMagicCircleVisible, setMagicCircleVisible] = useState(true);
  const notInitialAdsMode = !(
    whichTarot === 2 &&
    !isVoucherModeOn &&
    !isWaiting &&
    isAnswered &&
    !isReadyToShowDurumagi &&
    !isDoneAnimationOfBackground &&
    answer?.length === 0
  );
  useEffect(() => {
    setMagicCircleVisible(prev => {
      if (!notInitialAdsMode) return prev;
      return isWaiting || (isAnswered && !isReadyToShowDurumagi);
    });
    const targetPosition = isMagicCircleVisible
      ? targetPositionWhenMagicCircleVisible
      : targetPositionWhenMagicCircleInvisible;
    targetPositionRef.current.set(...targetPosition);
  }, [isMagicCircleVisible, isWaiting, isAnswered, isReadyToShowDurumagi]); 
  useFrame(() => {
    camera.position.lerp(targetPositionRef.current, 0.1);
    camera.fov = MathUtils.lerp(camera.fov, targetFovRef.current, 0.1);
    camera.updateProjectionMatrix();
    const lookAtPosition = isMagicCircleVisible
      ? lookAtPositionWhenMagicCircleVisible
      : lookAtPositionWhenMagicCircleInvisible;
    camera.lookAt(...lookAtPosition);
  });
  return null;
};

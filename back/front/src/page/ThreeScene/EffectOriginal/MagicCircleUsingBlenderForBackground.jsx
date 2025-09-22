import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Color, DoubleSide, Euler, MathUtils, Vector3 } from 'three';
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
const MagicCircle = React.memo(function MagicCircle({
  initialPosition = [0.005, 1.3, 0.7],
  targetPosition = [0, 1.3, 0.7],
  scale = [0.5, 0.5, 0.5],
  color = new Color(`hsl(${(1 / 10) * 360}, 100%, 50%)`),
  rotateSpeed = 0.01 + 1 * 0.005,
  initialRotationAxis = new Vector3(1, 1, 1).normalize(),
  orbitAxis = new Vector3(1, 1, 1).normalize(),
  orbitSpeed = 0.5,
  expansionSpeed = 0.5,
  transitionDuration = 2,
  visible,
}) {
  const { scene } = useGLTF('/assets/model/magic-circle/magicCircle.gltf');
  const ref = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [expanding, setExpanding] = useState(false);
  const [orbiting, setOrbiting] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [currentScale, setCurrentScale] = useState(scale.map(s => s * 0.6));
  const rotationRef = useRef(new Euler(0, 0, 0));
  const [preExpansionRotateSpeed, setPreExpansionRotateSpeed] = useState(
    rotateSpeed * 300
  );
  const lastExpandedPosition = useRef(initialPosition);
  const resetAnimation = useCallback(() => {
    setPosition(initialPosition);
    setExpanding(false);
    setOrbiting(false);
    setTransitioning(false);
    setIntensity(1);
    setOrbitAngle(0);
    setExpansionProgress(0);
    setTransitionProgress(0);
    setOpacity(0);
    setCurrentScale(scale.map(s => s * 0.6));
    rotationRef.current.set(0, 0, 0);
    setPreExpansionRotateSpeed(rotateSpeed * 300);
    lastExpandedPosition.current = initialPosition;
  }, [initialPosition, scale, rotateSpeed]);
  useEffect(() => {
    if (visible) {
      resetAnimation();
      const timeout = setTimeout(() => {
        setExpanding(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [visible]);
  const calculateOrbitPosition = useCallback((angle) => {
    const orbitRadius = new Vector3(...targetPosition)
      .sub(new Vector3(...initialPosition))
      .length();
    return new Vector3(...initialPosition).add(
      new Vector3().setFromSphericalCoords(
        orbitRadius,
        orbitAxis.y * Math.PI + angle,
        orbitAxis.x * Math.PI * 2
      )
    );
  }, [initialPosition, targetPosition, orbitAxis]);
  useFrame((state, delta) => {
    if (!visible) return;
    if (opacity < 1) {
      setOpacity(prev => Math.min(prev + delta, 0.5));
    }
    if (!expanding && !orbiting && !transitioning) {
      rotationRef.current.x +=
        preExpansionRotateSpeed * initialRotationAxis.x * delta;
      rotationRef.current.y +=
        preExpansionRotateSpeed * initialRotationAxis.y * delta;
      rotationRef.current.z +=
        preExpansionRotateSpeed * initialRotationAxis.z * delta;
      ref.current.setRotationFromEuler(rotationRef.current);
    } else if (expanding && !orbiting && !transitioning) {
      setExpansionProgress(prev => {
        const newProgress = prev + delta * expansionSpeed;
        if (newProgress >= 1) {
          lastExpandedPosition.current = position;
          setTransitioning(true);
          return 1;
        }
        return newProgress;
      });
      const easedProgress = easeOutCubic(expansionProgress);
      const newPosition = [
        MathUtils.lerp(
          initialPosition[0],
          targetPosition[0],
          easedProgress
        ),
        MathUtils.lerp(
          initialPosition[1],
          targetPosition[1],
          easedProgress
        ),
        MathUtils.lerp(
          initialPosition[2],
          targetPosition[2],
          easedProgress
        ),
      ];
      setPosition(newPosition);
      const newScale = scale.map(s => s * (0.1 + 0.9 * easedProgress));
      setCurrentScale(newScale);
    } else if (transitioning) {
      setTransitionProgress(prev => {
        const newProgress = prev + delta / (transitionDuration * 0.5);
        if (newProgress >= 1) {
          setTransitioning(false);
          setOrbiting(true);
          return 0;  
        }
        return newProgress;
      });
      const easedTransition = easeInOutCubic(transitionProgress);
      const orbitStartPosition = calculateOrbitPosition(0);
      const transitionPosition = new Vector3(...lastExpandedPosition.current).lerp(
        orbitStartPosition,
        easedTransition
      );
      setPosition(transitionPosition.toArray());
      const lookAtPosition = new Vector3(...initialPosition);
      ref.current.lookAt(lookAtPosition);
    } else if (orbiting) {
      setTransitionProgress(prev => {
        const newProgress = prev + delta / transitionDuration;
        return newProgress >= 1 ? 1 : newProgress;
      });
      const easedTransition = easeInOutCubic(transitionProgress);
      setOrbitAngle(prev => prev + orbitSpeed * delta * easedTransition);
      const orbitPosition = calculateOrbitPosition(orbitAngle);
      const finalPosition = new Vector3(...position).lerp(
        orbitPosition,
        easedTransition
      );
      setPosition(finalPosition.toArray());
      const lookAtPosition = new Vector3(...initialPosition);
      ref.current.lookAt(lookAtPosition);
    }
    setIntensity(Math.abs(Math.sin(state.clock.getElapsedTime())) * 2);
  });
  if (!visible) return null;
  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      position={position}
      scale={currentScale}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={Math.min(opacity * 2, 1)}
        side={DoubleSide}
        depthWrite={false}
      />
    </primitive>
  );
});
useGLTF.preload('/assets/model/magic-circle/magicCircle.gltf');
export function MagicCircleGroup({
  position = [0.005, 1.25, 0],
  visible = true,
}) {
  const circles = useMemo(() => {
    const circleCount = 8; 
    return Array.from({ length: circleCount }, (_, i) => {
      const angle = (i / circleCount) * Math.PI * 2;
      const randomAxis = new Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const rotationSize = 2.5; 
      const targetPosition = [
        position[0] + Math.cos(angle) * 0.35 * rotationSize,
        position[1] + Math.sin(angle) * 0.35 * rotationSize,
        position[2] + (0.01 * rotationSize - 0.35), 
      ];
      const color = new Color(
        `hsl(${(i / circleCount) * 360}, 100%, 70%)`
      );
      const rotateSpeed = 0.01 + i * 0.05; 
      const orbitSpeed = 0.1 + Math.random() * 0.01; 
      const expansionSpeed = 0.3 + Math.random() * 5;
      const circleSize = [1, 1, 1].map(value => value * 0.5);
      return (
        <MagicCircle
          key={i}
          initialPosition={position}
          targetPosition={targetPosition}
          scale={circleSize}
          color={color}
          rotateSpeed={rotateSpeed}
          initialRotationAxis={randomAxis}
          orbitAxis={randomAxis}
          orbitSpeed={orbitSpeed}
          expansionSpeed={expansionSpeed}
          visible={visible}
        />
      );
    });
  }, [position, visible]);
  return <group>{circles}</group>;
}

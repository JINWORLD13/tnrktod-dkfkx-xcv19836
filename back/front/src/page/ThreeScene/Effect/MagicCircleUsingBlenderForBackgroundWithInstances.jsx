import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Color, Euler, MathUtils, Matrix4, Vector3 } from 'three';
import { useGLTF, Instance, Instances } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
extend({ EffectComposer, Bloom });
import { limitFPS } from '../Function/limitFPS';
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
const MagicCircleUsingBlender = React.forwardRef(({ count, ...props }, ref) => {
  const gltfResult = useGLTF('/assets/model/magic-circle/magicCircle.gltf');
  const { scene, nodes, materials } = useMemo(() => gltfResult, [gltfResult]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (scene && nodes && materials) {
      setIsLoaded(true);
    }
  }, [scene, nodes, materials]);
  if (!isLoaded) {
    return null;
  }
  const firstMesh = scene.children.find(child => child.isMesh);
  if (!firstMesh) {
    console.error('No mesh found in the GLTF model');
    return null;
  }
  return (
    <Instances
      limit={count}
      ref={ref}
      geometry={firstMesh.geometry}
      material={firstMesh.material}
    >
      {Array.from({ length: count }, (_, index) => (
        <Instance key={index} {...props} />
      ))}
    </Instances>
  );
});
useGLTF.preload('/assets/model/magic-circle/magicCircle.gltf');
const MagicCircleWithGlowUsingBlender = React.memo(
  function MagicCircleWithGlowUsingBlender({
    initialPosition = [0.005, 1.3, 0],
    targetPosition = [0, 1.3, 0],
    initialScale = 0.15,
    expandedScale = 0.5,
    color = new Color(`hsl(${(1 / 10) * 360}, 100%, 50%)`),
    rotateSpeed = 0.01 + 1 * 0.005,
    initialRotationAxis = new Vector3(1, 1, 1).normalize(),
    expansionSpeed = 0.5,
    index,
    startExpansion,
  }) {
    const ref = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [expanding, setExpanding] = useState(false);
    const [orbiting, setOrbiting] = useState(false);
    const [intensity, setIntensity] = useState(1);
    const [expansionProgress, setExpansionProgress] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [currentScale, setCurrentScale] = useState(initialScale);
    const rotationRef = useRef(new Euler(0, 0, 0));
    const [preExpansionRotateSpeed, setPreExpansionRotateSpeed] = useState(
      rotateSpeed * 300
    );
    const rotationAngle = useRef(0);
    const { camera } = useThree();
    useEffect(() => {
      if (startExpansion) {
        setExpanding(true);
      }
    }, [startExpansion]);
    useFrame((state, delta) => {
      if (opacity < 1) {
        setOpacity(prev => Math.min(prev + delta, 0.5));
      }
      if (!expanding && !orbiting) {
        rotationRef.current.x +=
          preExpansionRotateSpeed * initialRotationAxis.x * delta;
        rotationRef.current.y +=
          preExpansionRotateSpeed * initialRotationAxis.y * delta;
        rotationRef.current.z +=
          preExpansionRotateSpeed * initialRotationAxis.z * delta;
        if (ref.current) {
          ref.current.rotation.copy(rotationRef.current);
        }
      } else {
        setExpansionProgress(prev => {
          const newProgress = prev + delta * expansionSpeed;
          return newProgress >= 1 ? 1 : newProgress;
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
          initialPosition[2],
        ];
        setPosition(newPosition);
        const newScale =MathUtils.lerp(
          initialScale,
          expandedScale,
          easedProgress
        );
        setCurrentScale(newScale);
        if (expansionProgress >= 1 && !orbiting) {
          setOrbiting(true);
        }
        if (ref.current) {
          const cameraDirection = new Vector3(0, 0, -1);
          cameraDirection.applyQuaternion(camera.quaternion);
          const rotationMatrix = new Matrix4().lookAt(
            new Vector3(),
            cameraDirection,
            camera.up
          );
          const rotationY = new Matrix4().makeRotationY(Math.PI / 2);
          if (orbiting) {
            rotationAngle.current += rotateSpeed * delta;
            const rotationZ = new Matrix4().makeRotationZ(
              rotationAngle.current
            );
            rotationMatrix.multiply(rotationZ).multiply(rotationY);
          } else {
            rotationMatrix.multiply(rotationY);
          }
          ref.current.quaternion.setFromRotationMatrix(rotationMatrix);
        }
      }
      setIntensity(Math.abs(Math.sin(state.clock.getElapsedTime())) * 2);
    });
    return (
      <Instance
        ref={ref}
        position={position}
        scale={[currentScale, currentScale, currentScale]}
        color={color}
      >
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </Instance>
    );
  }
);
export function MagicCircleGroupUsingBlenderForBackground({
  position = [0.005, 1.25, 0],
  setDoneAnimationOfBackground,
  visible,
  ...props
}) {
  const [key, setKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [startExpansion, setStartExpansion] = useState(false);
  const 궤적 = '원';
  const circleCount = 8;
  const spreadRadius = 1;
  const zRange = 0;
  useEffect(() => {
    if (visible && !isAnimating) {
      setIsAnimating(true);
      setKey(prevKey => prevKey + 1);
      const expansionTimeout = setTimeout(() => {
        setStartExpansion(true);
      }, 3000);
      const animatingTime = setTimeout(() => {
        setIsAnimating(false);
      }, 6000);
      const DoneAnimationOfBackgroundtime = setTimeout(() => {
        setDoneAnimationOfBackground(true);
      }, 6000);
      return () => {
        clearTimeout(expansionTimeout);
        clearTimeout(animatingTime);
        clearTimeout(DoneAnimationOfBackgroundtime);
      };
    } else if (!visible) {
      setIsAnimating(false);
      setStartExpansion(false);
    }
  }, [visible]);
  const circles = useMemo(() => {
    const circleArray = [];
    for (let i = 0; i < circleCount; i++) {
      let angle;
      let randomAxis;
      let targetPosition;
      if (궤적 === '원') {
        angle = (i / circleCount) * Math.PI * 2;
        randomAxis = new Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();
        targetPosition = [
          position[0] + Math.cos(angle) * spreadRadius,
          position[1] + Math.sin(angle) * spreadRadius,
          position[2] + (Math.random() - 0.5) * zRange,
        ];
      } else if (궤적 === '반원') {
        angle = (i / (circleCount - 1)) * Math.PI;
        randomAxis = new Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();
        targetPosition = [
          position[0] + Math.cos(angle) * spreadRadius,
          position[1] + Math.sin(angle) * spreadRadius,
          position[2] + (Math.random() - 0.5) * zRange,
        ];
      }
      let color;
      if (i === 6) {
        color = new Color(`hsl(${(i / circleCount) * 360}, 100%, 80%)`);
      } else if (i === 5) {
        color = new Color(`hsl(${(i / circleCount) * 360}, 100%, 80%)`);
      } else {
        color = new Color(`hsl(${(i / circleCount) * 360}, 100%, 70%)`);
      }
      const rotateSpeed = 0.1 + i * 0.09;
      const expansionSpeed = 1.5 + Math.random() * 0.1;
      circleArray.push(
        <MagicCircleWithGlowUsingBlender
          key={`${i}-${key}`}
          initialPosition={position}
          targetPosition={targetPosition}
          color={color}
          rotateSpeed={rotateSpeed}
          initialRotationAxis={randomAxis}
          expansionSpeed={expansionSpeed}
          index={i}
          initialScale={0.15}
          expandedScale={0.4}
          startExpansion={startExpansion}
          renderOrder={circleCount - i}
          {...props}
        />
      );
    }
    return circleArray;
  }, [
    circleCount,
    position,
    spreadRadius,
    zRange,
    key,
    props,
    궤적,
    startExpansion,
  ]);
  return visible ? (
    <>
      <MagicCircleUsingBlender count={circleCount}>
        {circles}
      </MagicCircleUsingBlender>
      <EffectComposer>
        <Bloom
          intensity={0.75}
          luminanceThreshold={0.01}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>
    </>
  ) : null;
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Shadow, Billboard, useTexture } from '@react-three/drei';
import { LayerMaterial, Depth } from 'lamina';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
export function ExplodingGlow({
  finalScale,
  isAnswered,
  isDoneAnimationOfBackground,
  isReadyToShowDurumagi,
  setReadyToShowDurumagi,
  visibleForExplosion,
  ...props
}) {
  const [invisible, setInvisible] = useState(false);
  return (
    <>
      <group
        position={[0.005, 1.25, 0.85]}
        visible={visibleForExplosion && !invisible}
      >
        <mesh>
          <Glow
            finalScale={finalScale}
            isAnswered={isAnswered}
            isDoneAnimationOfBackground={isDoneAnimationOfBackground}
            isReadyToShowDurumagi={isReadyToShowDurumagi}
            setReadyToShowDurumagi={setReadyToShowDurumagi}
            visibleForExplosion={visibleForExplosion}
            setInvisible={setInvisible}
          />
        </mesh>
      </group>
    </>
  );
}
const Glow = ({
  color = 'white',
  initialLayerScale = 0.3,
  initialScale = 0.3,
  finalScale = 34,
  animationDuration = 2000,
  animationStartTime = 0,
  near = -2, 
  far = 1.4, 
  setReadyToShowDurumagi,
  isAnswered,
  isDoneAnimationOfBackground,
  isReadyToShowDurumagi,
  visibleForExplosion,
  setInvisible,
}) => {
  const [animatedScale, setAnimatedScale] = useSpring(() => ({
    scale: initialScale, 
    config: {
      mass: 1, 
      tension: 300, 
      friction: 60, 
      duration: 10000, 
    },
  }));
  const [layerScale, setLayerScale] = useSpring(() => ({
    scale: initialLayerScale, 
  }));
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScale({
        scale: finalScale,
        config: { duration: animationDuration },
      });
    }, animationStartTime);
    return () => {
      clearTimeout(timer);
    };
  }, [finalScale]);
  let timerForDurumagi;
  useEffect(() => {
    if (isDoneAnimationOfBackground) {
      timerForDurumagi = setTimeout(() => {
        setReadyToShowDurumagi(true);
      }, animationDuration + 2500);
    }
    return () => {
      clearTimeout(timerForDurumagi);
    };
  }, [isDoneAnimationOfBackground]);
  useEffect(() => {
    if (isReadyToShowDurumagi) {
      setInvisible(prev => {
        return true;
      });
    }
    if (!isAnswered && !isReadyToShowDurumagi) {
      setInvisible(prev => {
        return false;
      });
    }
    return () => {};
  }, [isReadyToShowDurumagi, isAnswered]);
  return (
    <Billboard>
      <animated.mesh scale={animatedScale.scale}>
        <circleGeometry args={[0.2, 100]} />
        <LayerMaterial
          transparent
          depthWrite={false}
          blending={THREE.CustomBlending}
          blendEquation={THREE.AddEquation}
          blendSrc={THREE.SrcAlphaFactor}
          blendDst={THREE.DstAlphaFactor}
        >
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="normal"
            near={near * layerScale}
            far={far * layerScale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-15 * layerScale}
            far={far * 0.7 * layerScale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-10 * layerScale}
            far={far * 0.68 * layerScale}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
      </animated.mesh>
    </Billboard>
  );
};

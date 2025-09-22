import React, { useEffect, useState } from 'react';
import { Billboard } from '@react-three/drei';
import { LayerMaterial, Depth } from 'lamina';
import { useSpring, animated } from '@react-spring/three';
import { AddEquation, CustomBlending, DstAlphaFactor, SrcAlphaFactor } from 'three';
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
  finalScale = 20,
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
  const [{ scale }, api] = useSpring(() => ({
    scale: initialScale,
    config: {
      mass: 1,
      tension: 300,
      friction: 60,
    },
  }));
  const [layerScale, setLayerScale] = useSpring(() => ({
    scale: initialLayerScale,
  }));
  useEffect(() => {
    const timer = setTimeout(() => {
      api.start({
        scale: finalScale,
        config: { duration: animationDuration },
      });
    }, animationStartTime);
    return () => {
      clearTimeout(timer);
    };
  }, [finalScale, animationDuration, animationStartTime, api]);
  let timerForDurumagi;
  useEffect(() => {
    if (isDoneAnimationOfBackground) {
      timerForDurumagi = setTimeout(() => {
        setReadyToShowDurumagi(true);
      }, animationDuration + 500);
    }
    return () => {
      clearTimeout(timerForDurumagi);
    };
  }, [isDoneAnimationOfBackground, animationDuration, setReadyToShowDurumagi]);
  useEffect(() => {
    if (isReadyToShowDurumagi) {
      setInvisible(true);
    }
    if (!isAnswered && !isReadyToShowDurumagi) {
      setInvisible(false);
    }
    return () => {};
  }, [isReadyToShowDurumagi, isAnswered, setInvisible]);
  return (
    <Billboard>
      <animated.mesh scale={scale}>
        <circleGeometry args={[0.2, 100]} />
        <LayerMaterial
          transparent
          depthWrite={false}
          blending={CustomBlending}
          blendEquation={AddEquation}
          blendSrc={SrcAlphaFactor}
          blendDst={DstAlphaFactor}
        >
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="normal"
            near={near * layerScale.scale}
            far={far * layerScale.scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-15 * layerScale.scale}
            far={far * 0.7 * layerScale.scale}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="add"
            near={-10 * layerScale.scale}
            far={far * 0.68 * layerScale.scale}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
      </animated.mesh>
    </Billboard>
  );
};

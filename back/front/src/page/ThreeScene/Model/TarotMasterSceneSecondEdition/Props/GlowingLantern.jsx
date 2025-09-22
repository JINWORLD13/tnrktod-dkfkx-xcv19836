import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import * as THREE from 'three';
import { Sparkles, Shadow, Billboard } from '@react-three/drei';
import { LayerMaterial, Depth } from 'lamina';
import { useFrame, useThree } from '@react-three/fiber';
export default memo(function GlowingLantern({
  size = 0.01,
  amount = 50,
  color = 'white',
  emissive,
  glow,
  setLightOn,
  ...props
}) {
  const [isAmbientLightOn, setIsAmbientLightOn] = useState(true);
  const [isLighted, setIsLighted] = useState(true);
  const switchAmbientLight = () => {
    if (isAmbientLightOn === true) {
      setIsAmbientLightOn(false);
      if (isLighted === false) {
        setLightOn(false);
      }else{
        setLightOn(true);
      }
    } else {
      setIsAmbientLightOn(true);
      setLightOn(true);
    }
  };
  return (
    <>
      {isLighted === true ? (
        <>
          {}
          <Glow
            scale={size * 8.5}
            near={3}
            color={glow || emissive || color}
            position={[0.37, 1, 1]}
          />
          <ambientLight intensity={2} />
        </>
      ) : null}
      {isLighted === false ? (
        <>
          <ambientLight intensity={`${isAmbientLightOn === true ? 2 : 0}`} />
        </>
      ) : null}
      <mesh
        {...props}
        onClick={e => {
          e.stopPropagation;
          switchAmbientLight();
        }}
      >
        <cylinderGeometry
          args={[0.03, 0.03, 0.15]} 
        />
        <meshPhysicalMaterial
          roughness={0}
          color={color}
          emissive={emissive || color}
          envMapIntensity={0.2}
        />
      </mesh>
      <mesh
        position={[0.23, 1.019, 0.7]}
        onClick={e => {
          e.stopPropagation;
          if (isLighted === true) {
            setIsLighted(false);
            if (isAmbientLightOn === true) {
              setLightOn(true);
            }else{
              setLightOn(false);
            }
          } else {
            setIsLighted(true);
            setLightOn(true);
          }
        }}
      >
        {}
        <cylinderGeometry
          args={[0.03, 0.03, 0.07]} 
        />
        <meshPhysicalMaterial roughness={0} color={'gray'} />
        {isAmbientLightOn === true || isLighted === true ? (
          <Shadow
            rotation={[-Math.PI / 2, 0, 0]}
            scale={size * 2}
            position={[0, -0.035, 0]}
            color={emissive}
            opacity={0.5}
          />
        ) : (
          <Shadow
            rotation={[-Math.PI / 2, 0, 0]}
            scale={size}
            position={[0, -0.035, 0]}
            color={emissive}
            opacity={0.5}
          />
        )}
      </mesh>
    </>
  );
});
const Glow = ({ color, scale = 0.1, near = -2, far = 1.4, position }) => (
  <Billboard position={position}>
    <mesh>
      <circleGeometry args={[1 * scale, 15]} />
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
          near={near * scale}
          far={far * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={0.5}
          mode="add"
          near={-40 * scale}
          far={far * 1.2 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-15 * scale}
          far={far * 0.7 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-10 * scale}
          far={far * 0.68 * scale}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
    </mesh>
  </Billboard>
);

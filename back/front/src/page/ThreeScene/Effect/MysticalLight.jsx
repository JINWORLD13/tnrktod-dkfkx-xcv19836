import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import { LayerMaterial, Depth } from "lamina";
import { useSpring, animated } from "@react-spring/three";
import { AdditiveBlending, Vector3 } from "three";
export function MysticalLight({
  finalScale = 0.3,
  position = [0.005, 1.25, 0.85],
  count = 60,
  visible,
  ...props
}) {
  return (
    <group position={position} {...props}>
      {}
      <LightRays count={count} />
    </group>
  );
}
const RotatingGlow = ({
  color = "white",
  initialScale = 0.3, 
  finalScale = 0.3,
  animationDuration = 1500,
  animationStartTime = 500,
  near = -0.5,
  far = 0.5,
}) => {
  const [animatedScale] = useSpring(() => ({
    scale: [initialScale, initialScale, initialScale], 
    from: { scale: [initialScale, initialScale, initialScale] },
    to: { scale: [finalScale, finalScale, finalScale] },
    config: { duration: animationDuration },
    delay: animationStartTime,
  }));
  return (
    <Billboard>
      <animated.mesh scale={animatedScale.scale}>
        <sphereGeometry args={[0.2, 64, 64]} />
        <LayerMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        >
          {}
          <Depth
            colorA={color}
            colorB="black"
            alpha={1}
            mode="normal"
            near={near}
            far={far}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={0.5}
            mode="add"
            near={-2}
            far={far * 0.7}
            origin={[0, 0, 0]}
          />
          <Depth
            colorA={color}
            colorB="black"
            alpha={0.5}
            mode="add"
            near={-1}
            far={far * 0.68}
            origin={[0, 0, 0]}
          />
        </LayerMaterial>
      </animated.mesh>
    </Billboard>
  );
};
const LightRays = ({ count = 1000, radius = 0.5 }) => {
  const ref = useRef();
  const [rays, setRays] = useState([]);
  useEffect(() => {
    const newRays = Array.from({ length: count }, () => {
      const randomRadius = Math.random() * radius;
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      const x = randomRadius * Math.sin(phi) * Math.cos(theta);
      const y = randomRadius * Math.sin(phi) * Math.sin(theta);
      const z = randomRadius * Math.cos(phi);
      return {
        start: new Vector3(0, 0, 0),
        end: new Vector3(x, y, z),
        width: Math.random() * 0.002 + 0.0005,
        speed: Math.random() * 0.5 + 0.5,
        offset: Math.random() * Math.PI * 2,
        pulseDuration: Math.random() * 2, 
      };
    });
    setRays(newRays);
  }, [count, radius]);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.0002;
      ref.current.rotation.y += 0.0003;
    }
  });
  return (
    <group ref={ref}>
      {rays.map((ray, index) => (
        <Ray key={index} {...ray} />
      ))}
    </group>
  );
};
const Ray = ({ start, end, width, speed, offset, pulseDuration }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const pulseProgress = (Math.sin(time * (Math.PI / pulseDuration)) + 1) / 2;
      const scaleFactor = Math.sin(time * speed + offset) * 0.2 + 0.8;
      ref.current.scale.z = scaleFactor;
      const movement = new Vector3(
        Math.sin(time * speed * 0.3 + offset) * 0.01,
        Math.cos(time * speed * 0.3 + offset) * 0.01,
        Math.sin(time * speed * 0.4 + offset) * 0.01
      );
      ref.current.position.copy(movement);
      const currentEnd = new Vector3().lerpVectors(start, end, pulseProgress);
      ref.current.geometry.setFromPoints([start, currentEnd]);
    }
  });
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial
        color="white"
        transparent
        opacity={0.7}
        linewidth={width}
      />
    </line>
  );
};

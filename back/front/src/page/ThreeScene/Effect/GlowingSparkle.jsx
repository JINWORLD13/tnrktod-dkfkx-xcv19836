import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, Instance, Instances } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { BufferAttribute } from 'three';
export function GlowingSparkle({
  count = 2000,
  scale = 4,
  size = 0.005,
  speed = 0.00001,
  color = 'white',
  radius = 1,
  position = [0.005, 1.25, 0.7],
  orbitRadius = 0.5,
  startDelay = 0,
  ...props
}) {
  const particlesRef = useRef();
  const magicParticlesRef = useRef();
  const orbitingSparklesRefs = useRef(
    Array(10)
      .fill()
      .map(() => React.createRef())
  );
  useEffect(() => {
    return () => {
      if (particlesRef.current) {
        particlesRef.current.children.forEach(child => {
          child.geometry?.dispose();
          child.material?.dispose();
        });
        particlesRef.current = null;
      }
      if (magicParticlesRef.current) {
        const { geometry, material } = magicParticlesRef.current;
        if (geometry) {
          geometry.dispose();
        }
        if (material) {
          material.dispose();
        }
        magicParticlesRef.current = null;
      }
      orbitingSparklesRefs.current.forEach(ref => {
        if (ref.current) {
          ref.current.geometry?.dispose();
          ref.current.material?.dispose();
        }
      });
      orbitingSparklesRefs.current = null;
    };
  }, []);
  const [startTime, setStartTime] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setStartTime(performance.now() / 1000 + startDelay);
  }, [startDelay]);
  const { scene } = useThree();
  useEffect(() => {
    return () => {
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [scene]);
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * 0.8 + Math.random() * radius * 0.2;
      data.push({
        initialPosition: [0, 0, 0],
        finalPosition: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        scale: [size, size, size],
      });
    }
    return data;
  }, [count, radius, size]);
  const magicPositions = useMemo(() => {
    const points = [];
    const segments = 64;
    const rings = 32;
    for (let i = 0; i < rings; i++) {
      const phi = (i / rings) * Math.PI;
      for (let j = 0; j < segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(0, 0, 0);
      }
    }
    for (let i = 0; i < 500; i++) {
      points.push(0, 0, 0);
    }
    return new Float32Array(points);
  }, []);
  useEffect(() => {
    if (magicParticlesRef.current) {
      const positionAttribute = new BufferAttribute(magicPositions, 3);
      magicParticlesRef.current.geometry.setAttribute(
        'position',
        positionAttribute
      );
    }
    return () => {
      if (magicParticlesRef.current) {
        const { geometry, material } = magicParticlesRef.current;
        if (geometry) {
          const attribute = geometry.getAttribute('position');
          if (attribute) {
            attribute.dispose();
          }
          geometry.deleteAttribute('position');
          geometry.dispose();
        }
        if (material) {
          if (Array.isArray(material)) {
            material.forEach(mat => mat.dispose());
          } else {
            material.dispose();
          }
        }
        magicParticlesRef.current = null;
      }
    };
  }, [magicPositions]);
  useFrame(state => {
    if (startTime === null) return;
    const currentTime = state.clock.getElapsedTime();
    const animationTime = currentTime - startTime;
    if (animationTime < 0) return;
    if (!isAnimating && animationTime >= 0) {
      setIsAnimating(true);
    }
    const progress = Math.min(animationTime / 2, 1); 
    particlesRef.current.children.forEach((child, i) => {
      const data = particleData[i];
      if (isAnimating) {
        if (progress < 1) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = progress * (radius * 0.8 + Math.random() * radius * 0.2);
          child.position.x = r * Math.sin(phi) * Math.cos(theta);
          child.position.y = r * Math.sin(phi) * Math.sin(theta);
          child.position.z = r * Math.cos(phi);
        } else {
          const x = child.position.x;
          const y = child.position.y;
          const z = child.position.z;
          const distance = Math.sqrt(x * x + y * y + z * z);
          const angle = animationTime * speed;
          const newX = x * Math.cos(angle) - z * Math.sin(angle);
          const newZ = z * Math.cos(angle) + x * Math.sin(angle);
          child.position.x =
            newX * (distance / Math.sqrt(newX * newX + newZ * newZ));
          child.position.z =
            newZ * (distance / Math.sqrt(newX * newX + newZ * newZ));
        }
      }
    });
    if (
      magicParticlesRef.current &&
      magicParticlesRef.current.geometry.attributes.position
    ) {
      const positionAttribute =
        magicParticlesRef.current.geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        let x, y, z;
        if (progress < 1) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = progress * (radius * 0.8 + Math.random() * radius * 0.2);
          x = r * Math.sin(phi) * Math.cos(theta);
          y = r * Math.sin(phi) * Math.sin(theta);
          z = r * Math.cos(phi);
        } else {
          x = positionAttribute.array[i3];
          y = positionAttribute.array[i3 + 1];
          z = positionAttribute.array[i3 + 2];
          const pulseFactor = Math.sin(animationTime * 2 + i) * 0.02;
          const distance = Math.sqrt(x * x + y * y + z * z);
          x = x * (1 + pulseFactor) * (radius / distance);
          y = y * (1 + pulseFactor) * (radius / distance);
          z = z * (1 + pulseFactor) * (radius / distance);
        }
        positionAttribute.array[i3] = x;
        positionAttribute.array[i3 + 1] = y;
        positionAttribute.array[i3 + 2] = z;
      }
      positionAttribute.needsUpdate = true;
    }
    orbitingSparklesRefs.current.forEach((ref, index) => {
      if (ref.current) {
        if (progress < 1) {
          const orbitProgress = Math.min(progress * 2, 1);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          ref.current.position.x =
            orbitProgress * orbitRadius * Math.sin(phi) * Math.cos(theta);
          ref.current.position.y =
            orbitProgress * orbitRadius * Math.sin(phi) * Math.sin(theta);
          ref.current.position.z = orbitProgress * orbitRadius * Math.cos(phi);
        } else {
          const orbitTime = animationTime * speed + (index * Math.PI * 2) / 10;
          ref.current.position.x = Math.cos(orbitTime) * orbitRadius;
          ref.current.position.y = Math.sin(orbitTime) * orbitRadius * 0.5;
          ref.current.position.z = Math.sin(orbitTime) * orbitRadius;
        }
      }
    });
  });
  return (
    <group position={position}>
      <Instances limit={count} ref={particlesRef}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
        {particleData.map((data, i) => (
          <Instance
            key={i}
            position={data.initialPosition}
            scale={data.scale}
          />
        ))}
      </Instances>
      <points ref={magicParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={magicPositions?.length / 3}
            array={magicPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size * 0.5}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      {orbitingSparklesRefs.current.map((ref, index) => (
        <Sparkles
          key={index}
          ref={ref}
          count={1}
          scale={scale / 4}
          size={size * 10}
          speed={0}
          noise={0}
        />
      ))}
    </group>
  );
}

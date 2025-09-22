import React, { useRef, useState, useEffect, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
export const MagicCircleForBackground = memo(function MagicCircleForBackground({
  initialPosition = [0.005, 1.3, 0],
  targetPosition = [0, 1.3, 0],
  scale = [0.5, 0.5, 0.5],
  color = new THREE.Color(`hsl(${(1 / 10) * 360}, 100%, 50%)`),
  rotateSpeed = 0.01 + 1 * 0.005,
  initialRotationAxis = new THREE.Vector3(1, 1, 1).normalize(),
  orbitAxis = new THREE.Vector3(1, 1, 1).normalize(),
  orbitSpeed = 0.5,
  expansionSpeed = 0.5,
  transitionDuration = 2,
  size = 0.7, 
}) {
  const ref = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [expanding, setExpanding] = useState(false);
  const [orbiting, setOrbiting] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [currentScale, setCurrentScale] = useState(scale.map(s => s * size)); 
  const rotationRef = useRef(new THREE.Euler(0, 0, 0));
  const [preExpansionRotateSpeed, setPreExpansionRotateSpeed] = useState(
    rotateSpeed * 300
  ); 
  const magicCircleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const segments = 64;
    const radius = 1.0 * size; 
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      vertices.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
    }
    const innerRadius = 0.9 * size; 
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      vertices.push(
        Math.cos(theta) * innerRadius,
        Math.sin(theta) * innerRadius,
        0
      );
    }
    for (let i = 0; i < segments; i++) {
      indices.push(i, i + 1, i + segments + 1);
      indices.push(i, i + segments + 1, i + segments + 2);
    }
    const pentagonRadius = 0.7 * size; 
    const pentagonVertices = 5;
    const pentagonStart = vertices.length / 3;
    for (let i = 0; i <= pentagonVertices; i++) {
      const theta = (i / pentagonVertices) * Math.PI * 2 - Math.PI / 2;
      vertices.push(
        Math.cos(theta) * pentagonRadius,
        Math.sin(theta) * pentagonRadius,
        0
      );
    }
    for (let i = 0; i < pentagonVertices; i++) {
      indices.push(pentagonStart + i, pentagonStart + i + 1);
    }
    const rotatedPentagonStart = vertices.length / 3;
    for (let i = 0; i <= pentagonVertices; i++) {
      const theta =
        (i / pentagonVertices) * Math.PI * 2 -
        Math.PI / 2 +
        (36 * Math.PI) / 180;
      vertices.push(
        Math.cos(theta) * pentagonRadius,
        Math.sin(theta) * pentagonRadius,
        0
      );
    }
    for (let i = 0; i < pentagonVertices; i++) {
      indices.push(rotatedPentagonStart + i, rotatedPentagonStart + i + 1);
    }
    const innermostRadius = 0.4 * size; 
    const innermostStart = vertices.length / 3;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      vertices.push(
        Math.cos(theta) * innermostRadius,
        Math.sin(theta) * innermostRadius,
        0
      );
    }
    for (let i = 0; i < segments; i++) {
      indices.push(innermostStart + i, innermostStart + i + 1);
    }
    const starPoints = 5;
    const starOuterRadius = 0.3 * size; 
    const starInnerRadius = 0.12 * size; 
    const starStart = vertices.length / 3;
    for (let i = 0; i <= starPoints * 2; i++) {
      const theta = (i / starPoints) * Math.PI;
      const r = i % 2 === 0 ? starOuterRadius : starInnerRadius;
      vertices.push(Math.cos(theta) * r, Math.sin(theta) * r, 0);
    }
    for (let i = 0; i < starPoints * 2 - 1; i++) {
      indices.push(starStart, starStart + i + 1, starStart + i + 2);
    }
    const moonRadius = 0.16 * size; 
    const moonCenter = [0.5 * size, 0.5 * size]; 
    const moonStart = vertices.length / 3;
    for (let i = 0; i <= segments / 2; i++) {
      const theta = (i / (segments / 2)) * Math.PI;
      vertices.push(
        moonCenter[0] + Math.cos(theta) * moonRadius,
        moonCenter[1] + Math.sin(theta) * moonRadius,
        0
      );
    }
    for (let i = segments / 2; i >= 0; i--) {
      const theta = (i / (segments / 2)) * Math.PI;
      vertices.push(
        moonCenter[0] + Math.cos(theta) * moonRadius * 0.8,
        moonCenter[1] + Math.sin(theta) * moonRadius,
        0
      );
    }
    for (let i = 0; i < segments; i++) {
      indices.push(moonStart, moonStart + i + 1, moonStart + i + 2);
    }
    const positionAttribute = new THREE.Float32BufferAttribute(vertices, 3);
    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }, [size]); 
  useEffect(() => {
    return () => {
      if (magicCircleGeometry) {
        magicCircleGeometry.dispose(); 
      }
    };
  }, [magicCircleGeometry]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpanding(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
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
      ref.current.setRotationFromEuler(rotationRef.current);
    } else if (expanding && !orbiting) {
      setExpansionProgress(prev => {
        const newProgress = prev + delta * expansionSpeed;
        return newProgress >= 1 ? 1 : newProgress;
      });
      const easedProgress = easeOutCubic(expansionProgress);
      const newPosition = [
        THREE.MathUtils.lerp(
          initialPosition[0],
          targetPosition[0],
          easedProgress
        ),
        THREE.MathUtils.lerp(
          initialPosition[1],
          targetPosition[1],
          easedProgress
        ),
        initialPosition[2], 
      ];
      setPosition(newPosition);
      const newScale = scale.map(s => s * size * (1 + 2 * easedProgress));
      setCurrentScale(newScale);
      if (expansionProgress >= 1) {
        setOrbiting(true);
      }
      ref.current.rotation.x = 0;
      ref.current.rotation.y = 0;
    } else if (orbiting) {
      setPosition(targetPosition);
      ref.current.rotation.x = 0;
      ref.current.rotation.y = 0;
    }
    ref.current.rotation.z += rotateSpeed * delta;
    setIntensity(Math.abs(Math.sin(state.clock.getElapsedTime())) * 2);
  });
  return (
    <group>
      <mesh
        ref={ref}
        position={position}
        scale={currentScale}
        geometry={magicCircleGeometry}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments
        ref={ref}
        position={position}
        scale={currentScale}
        geometry={magicCircleGeometry}
      >
        <lineBasicMaterial color={color} transparent opacity={opacity * 10} />
      </lineSegments>
    </group>
  );
});
export function MagicCircleGroupForBackground({
  position = [0.005, 1.35, 0],
  ...props
}) {
  const circles = [];
  const circleCount = 8; 
  const spreadRadius = 1; 
  const zRange = 0; 
  for (let i = 0; i < circleCount; i++) {
    const angle = (i / circleCount) * Math.PI * 2; 
    const randomAxis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const targetPosition = [
      position[0] + Math.cos(angle) * spreadRadius,
      position[1] + Math.sin(angle) * spreadRadius,
      position[2] + (Math.random() - 0.5) * zRange, 
    ];
    const color = new THREE.Color(`hsl(${(i / circleCount) * 360}, 100%, 70%)`);
    const rotateSpeed = 0.01 + i * 0.03; 
    const expansionSpeed = 0.5 + Math.random() * 0.1; 
    const scale = [0.2, 0.2, 0.2];
    circles.push(
      <MagicCircleForBackground
        key={i}
        initialPosition={position}
        targetPosition={targetPosition}
        scale={scale}
        color={color}
        rotateSpeed={rotateSpeed}
        initialRotationAxis={randomAxis}
        expansionSpeed={expansionSpeed}
      />
    );
  }
  return <group>{circles}</group>;
}

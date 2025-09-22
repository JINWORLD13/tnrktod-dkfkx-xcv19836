import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Shadow, Billboard, useTexture } from '@react-three/drei';
import { LayerMaterial, Depth } from 'lamina';
import { useSpring, animated } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';
export function BigMagicCircle({
  count = 10,
  speed = 0.5,
  color = 'white',
  radius = 2,
  position = [0.005, 1.25, 0.7],
  orbitRadius = 1, 
  visible,
  ...props
}) {
  const particlesRef = useRef();
  const magicParticlesRef = useRef();
  const orbitingSparklesRefs = useRef(
    Array(10)
      .fill()
      .map(() => React.createRef())
  );
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
  const positions = useMemo(() => {
    return new Float32Array(count * 3).map((_, i) => {
      const angle = (i / count) * Math.PI * 200;
      return i % 3 === 1
        ? 0
        : Math.cos(angle) * radius * (i % 3 === 0 ? 1 : -1);
    });
  }, [count, radius]);
  const magicPositions = useMemo(() => {
    const points = [];
    const segments = 64;
    const innerRadius = 0.4;
    const outerRadius = 0.6;
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        Math.cos(theta) * outerRadius,
        Math.sin(theta) * outerRadius,
        0
      );
    }
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        Math.cos(theta) * innerRadius,
        Math.sin(theta) * innerRadius,
        0
      );
    }
    for (let i = 0; i < 5; i++) {
      const theta1 = (i / 5) * Math.PI * 2;
      const theta2 = (((i + 2) % 5) / 5) * Math.PI * 2;
      points.push(
        Math.cos(theta1) * outerRadius,
        Math.sin(theta1) * outerRadius,
        0,
        Math.cos(theta2) * outerRadius,
        Math.sin(theta2) * outerRadius,
        0
      );
    }
    for (let i = 0; i < 50; i++) {
      const r = Math.random() * innerRadius;
      const theta = Math.random() * Math.PI * 2;
      points.push(Math.cos(theta) * r, Math.sin(theta) * r, 0);
    }
    return new Float32Array(points);
  }, []);
  useFrame((state, delta) => {
    if (
      particlesRef.current &&
      particlesRef.current.geometry.attributes.position
    ) {
      const time = state.clock.getElapsedTime();
      const positionAttribute =
        particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const angle = (i / count) * Math.PI * 2 + time * speed;
        positionAttribute.array[i3] = Math.cos(angle) * radius;
        positionAttribute.array[i3 + 1] = Math.sin(time + i) * 0.2; 
        positionAttribute.array[i3 + 2] = Math.sin(angle) * radius;
      }
      positionAttribute.needsUpdate = true;
    }
    if (
      magicParticlesRef.current &&
      magicParticlesRef.current.geometry.attributes.position
    ) {
      const time = state.clock.getElapsedTime();
      const positionAttribute =
        magicParticlesRef.current.geometry.attributes.position;
      for (let i = 0; i < positionAttribute.count; i++) {
        const i3 = i * 3;
        const x = positionAttribute.array[i3];
        const y = positionAttribute.array[i3 + 1];
        const z = positionAttribute.array[i3 + 2];
        positionAttribute.array[i3] = x + Math.sin(time + i) * 0.001;
        positionAttribute.array[i3 + 1] = y + Math.cos(time + i) * 0.001;
        positionAttribute.array[i3 + 2] = z + Math.sin(time * 0.5 + i) * 0.001;
      }
      positionAttribute.needsUpdate = true;
    }
    orbitingSparklesRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const orbitTime =
          state.clock.getElapsedTime() * speed + (index * Math.PI * 2) / 10;
        ref.current.position.x = Math.cos(orbitTime) * orbitRadius;
        ref.current.position.y = Math.sin(orbitTime) * orbitRadius * 0.5;
        ref.current.position.z = Math.sin(orbitTime) * orbitRadius;
      }
    });
  });
  const magicCircleRef = useRef();
  const magicCircleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    drawMagicCircle(ctx, canvas.width / 2, canvas.height / 2, 0, color);
    return new THREE.CanvasTexture(canvas);
  }, [color]);
  useEffect(() => {
    return () => {
      magicCircleTexture.dispose();
    };
  }, [magicCircleTexture]);
  useFrame((state, delta) => {
    if (magicCircleRef.current) {
      magicCircleRef.current.rotation.z += delta * speed;
    }
  });
  function drawMagicCircle(
    ctx,
    centerX,
    centerY,
    time,
    color,
    useGlow = true, 
    fontWeight = '100' 
  ) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    function drawGlowingText(text, x, y, color, size = '12rem', rotation = 0) {
      ctx.save();
      ctx.font = `${fontWeight} ${size} Arial`;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      if (useGlow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 3;
        ctx.fillStyle = color;
        for (let i = 0; i < 20; i++) {
          ctx.fillText(text, 0, 0);
        }
      }
      ctx.fillStyle = useGlow ? 'rgb(255, 255, 255, 0.7)' : color;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    function drawGlowingLine(drawFunc, color) {
      ctx.save();
      if (useGlow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
          drawFunc();
        }
      } else {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        drawFunc();
      }
      ctx.restore();
    }
    drawGlowingLine(() => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.stroke();
    }, color);
    drawGlowingLine(() => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.stroke();
    }, color);
    drawGlowingLine(() => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + time;
        const x = centerX + 220 * Math.cos(angle);
        const y = centerY + 220 * Math.sin(angle);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }, color);
    drawGlowingLine(() => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + time + Math.PI / 6;
        const x = centerX + 220 * Math.cos(angle);
        const y = centerY + 220 * Math.sin(angle);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }, color);
    drawGlowingLine(() => {
      const segments = 60;
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const angle = ((Math.PI * 2) / segments) * i;
        const xOuter = centerX + 240 * Math.cos(angle);
        const yOuter = centerY + 240 * Math.sin(angle);
        const xInner = centerX + 200 * Math.cos(angle);
        const yInner = centerY + 200 * Math.sin(angle);
        ctx.moveTo(xOuter, yOuter);
        ctx.lineTo(xInner, yInner);
      }
      ctx.stroke();
    }, color);
    drawGlowingText('✧', centerX + 70, centerY - 90, 'blue');
    drawGlowingText(
      '☽',
      centerX - 160,
      centerY + 60,
      'rgb(128, 0, 128)',
      '12rem',
      Math.PI / 1.3
    );
    drawGlowingText('☉', centerX - 230, centerY - 90, 'red');
    drawGlowingText('✦', centerX + 80, centerY + 220, 'rgb(255, 215, 0)');
  }
  return (
    <>
      <group position={position} visible={visible}>
        {}
        <mesh ref={magicCircleRef}>
          <planeGeometry args={[orbitRadius * 2, orbitRadius * 2]} />
          <meshBasicMaterial
            map={magicCircleTexture}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, CanvasTexture, Color, DoubleSide } from 'three';
function colorToRGBA(color, opacity, brightness) {
  if (typeof color === 'string' && color.startsWith('rgba')) {
    return color; 
  }
  const tempColor = new Color(color);
  tempColor.multiplyScalar(brightness);
  return `rgba(${Math.round(tempColor.r * 255)}, ${Math.round(
    tempColor.g * 255
  )}, ${Math.round(tempColor.b * 255)}, ${opacity})`;
}
export function BigMagicCircle({
  count = 10,
  speed = 0.5,
  color = 'white',
  radius = 2,
  position = [0.005, 1.25, 0.7],
  orbitRadius = 1,
  visible,
  innerCircleColor = 'skyblue',
  innerCircleOpacity = 0.4,
  innerCircleBrightness = 0, 
  glowColor = 'skyblue',
  glowOpacity = 0, 
  glowBrightness = 1,
  glowIntensity = 0.5, 
  ...props
}) {
  const particlesRef = useRef();
  const magicParticlesRef = useRef();
  const orbitingSparklesRefs = useRef(
    Array(10)
      .fill()
      .map(() => React.createRef())
  );
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
  useEffect(() => {
    if (particlesRef.current) {
      const positionAttribute = new BufferAttribute(positions, 3);
      particlesRef.current.geometry.setAttribute('position', positionAttribute);
    }
    if (magicParticlesRef.current) {
      const positionAttribute = new BufferAttribute(magicPositions, 3);
      magicParticlesRef.current.geometry.setAttribute(
        'position',
        positionAttribute
      );
    }
    return () => {
      if (particlesRef.current) {
        const { geometry, material } = particlesRef.current;
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
        particlesRef.current = null;
      }
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
  }, [positions, magicPositions]);
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
  useEffect(() => {
    return () => {
      magicCircleRef.current = null;
      if(magicCircleTexture) magicCircleTexture?.dispose()
    };
  }, []);
  const magicCircleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    let finalInnerCircleColor = innerCircleColor;
    let finalGlowColor = glowColor;
    if (!innerCircleColor.startsWith('rgba')) {
      finalInnerCircleColor = colorToRGBA(
        innerCircleColor,
        innerCircleOpacity ?? 0.3,
        innerCircleBrightness
      );
    }
    if (!glowColor.startsWith('rgba')) {
      finalGlowColor = colorToRGBA(
        glowColor,
        glowOpacity ?? 0.5,
        glowBrightness
      );
    }
    drawMagicCircle(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      0,
      color,
      finalInnerCircleColor,
      finalGlowColor,
      glowIntensity
    );
    return new CanvasTexture(canvas);
  }, [
    color,
    innerCircleColor,
    innerCircleOpacity,
    innerCircleBrightness,
    glowColor,
    glowOpacity,
    glowBrightness,
    glowIntensity,
  ]);
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
    innerCircleColor,
    glowColor,
    glowIntensity,
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
        ctx.shadowBlur = 15;
        ctx.fillStyle = color;
        for (let i = 0; i < 20; i++) {
          ctx.fillText(text, 0, 0);
        }
      }
      ctx.fillStyle = useGlow ? 'rgb(255, 255, 255, 0.9)' : color;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    function drawGlowingLine(drawFunc, color) {
      ctx.save();
      if (useGlow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
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
    ctx.beginPath();
    ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
    ctx.fillStyle = innerCircleColor;
    ctx.fill();
    if (useGlow) {
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        240
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.8, glowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'source-over';
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
      <group position={position}>
        <mesh ref={magicCircleRef}>
          <planeGeometry args={[orbitRadius * 2, orbitRadius * 2]} />
          <meshBasicMaterial
            map={magicCircleTexture}
            transparent
            opacity={0.8}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

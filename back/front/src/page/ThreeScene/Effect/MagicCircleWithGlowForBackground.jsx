import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, Color, Euler, MathUtils, Vector3 } from 'three';
import { DoubleSide } from 'three';
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function drawGlowingLine(ctx, drawFunc, color, useGlow = true) {
  ctx.save();
  if (useGlow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 40;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
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
export const MagicCircleWithGlow = function MagicCircleWithGlow({
  initialPosition = [0.005, 1.3, 0],
  targetPosition = [0, 1.3, 0],
  scale = 0.4, 
  color = new Color(`hsl(${(1 / 10) * 360}, 100%, 50%)`),
  rotateSpeed = 0.01 + 1 * 0.005,
  initialRotationAxis = new Vector3(1, 1, 1).normalize(),
  expansionSpeed = 0.5,
}) {
  const ref = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [expanding, setExpanding] = useState(false); 
  const [orbiting, setOrbiting] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [currentScale, setCurrentScale] = useState(scale);
  const rotationRef = useRef(new Euler(0, 0, 0));
  const [preExpansionRotateSpeed, setPreExpansionRotateSpeed] = useState(
    rotateSpeed * 300
  ); 
  const magicCircleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    const segments = 64;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const drawMagicCircle = () => {
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 500, 0, Math.PI * 2);
          ctx.stroke();
        },
        color.getStyle()
      );
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 450, 0, Math.PI * 2);
          ctx.stroke();
        },
        color.getStyle()
      );
      drawGlowingLine(
        ctx,
        () => {
          for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const outerX = centerX + Math.cos(angle) * 500;
            const outerY = centerY + Math.sin(angle) * 500;
            const innerX = centerX + Math.cos(angle) * 450;
            const innerY = centerY + Math.sin(angle) * 450;
            ctx.beginPath();
            ctx.moveTo(outerX, outerY);
            ctx.lineTo(innerX, innerY);
            ctx.stroke();
          }
        },
        color.getStyle(),
        false 
      );
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * 350;
            const y = centerY + Math.sin(angle) * 350;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        },
        color.getStyle()
      );
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle =
              (i / 5) * Math.PI * 2 - Math.PI / 2 + (36 * Math.PI) / 180;
            const x = centerX + Math.cos(angle) * 350;
            const y = centerY + Math.sin(angle) * 350;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        },
        color.getStyle()
      );
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
          ctx.stroke();
        },
        color.getStyle()
      );
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          for (let i = 0; i < 10; i++) {
            const angle = (i / 5) * Math.PI;
            const r = i % 2 === 0 ? 150 : 60;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        },
        color.getStyle()
      );
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          ctx.arc(centerX + 0, centerY + 0, 80, 0, Math.PI * 2);
          ctx.moveTo(centerX + 0 + 64, centerY + 0);
          ctx.arc(centerX + 0, centerY + 0, 64, 0, Math.PI * 2, true);
          ctx.stroke();
        },
        color.getStyle()
      );
      function drawMoon(ctx, centerX, centerY, moonType = 'crescent') {
        const moonCenterX = centerX + 150;
        const moonCenterY = centerY - 0;
        const moonRadius = 200;
        drawGlowingLine(
          ctx,
          () => {
            ctx.beginPath();
            if (moonType === 'waning_crescent') {
              ctx.arc(
                moonCenterX,
                moonCenterY,
                moonRadius,
                -Math.PI / 2,
                Math.PI / 2
              );
              ctx.arc(
                moonCenterX - moonRadius * 0.3,
                moonCenterY,
                moonRadius * 0.9,
                Math.PI / 2,
                -Math.PI / 2,
                true
              );
            } else if (moonType === 'waxing_crescent') {
              ctx.arc(
                moonCenterX,
                moonCenterY,
                moonRadius,
                Math.PI / 2,
                -Math.PI / 2
              );
              ctx.arc(
                moonCenterX + moonRadius * 0.3,
                moonCenterY,
                moonRadius * 0.9,
                -Math.PI / 2,
                Math.PI / 2,
                true
              );
            } else if (moonType === 'first_quarter') {
              ctx.arc(
                moonCenterX,
                moonCenterY,
                moonRadius,
                -Math.PI / 2,
                Math.PI / 2
              );
              ctx.lineTo(moonCenterX, moonCenterY - moonRadius);
            } else {
              ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
            }
            ctx.closePath();
            ctx.stroke();
            if (moonType !== 'full') {
              ctx.fillStyle = color.getStyle();
            }
          },
          color.getStyle()
        );
      }
      drawMoon(ctx, centerX, centerY, 'waning_crescent'); 
    };
    drawMagicCircle();
    return new CanvasTexture(canvas);
  }, [color]);
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
      const newScale = scale * (1 + 2 * easedProgress);
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
        scale={[currentScale, currentScale, currentScale]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={magicCircleTexture}
          transparent
          opacity={Math.min(opacity * 2, 1)}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
export function MagicCircleGroupForBackground({
  position = [0.005, 1.25, 0],
  setDoneAnimationOfBackground,
  visible,
  ...props
}) {
  const [key, setKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const circles = [];
  const 궤적 = '원'; 
  const circleCount = 8;
  const spreadRadius = 1;
  const zRange = 0;
  let animatingTime;
  let DoneAnimationOfBackgroundtime;
  useEffect(() => {
    if (visible && !isAnimating) {
      setIsAnimating(true);
      setKey(prevKey => prevKey + 1);
      animatingTime = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
      DoneAnimationOfBackgroundtime = setTimeout(() => {
        setDoneAnimationOfBackground(true);
      }, 6000);
    } else if (!visible) {
      setIsAnimating(false);
    }
    return () => {
      if(animatingTime) clearTimeout(animatingTime);
      if(DoneAnimationOfBackgroundtime) clearTimeout(DoneAnimationOfBackgroundtime);
    }
  }, [visible, setDoneAnimationOfBackground]);
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
    const color = new Color(`hsl(${(i / circleCount) * 360}, 100%, 70%)`);
    const rotateSpeed = 0.01 + i * 0.03;
    const expansionSpeed = 0.5 + Math.random() * 0.1;
    circles.push(
      <MagicCircleWithGlow
        key={`${i}-${key}`}
        initialPosition={position}
        targetPosition={targetPosition}
        color={color}
        rotateSpeed={rotateSpeed}
        initialRotationAxis={randomAxis}
        expansionSpeed={expansionSpeed}
        {...props}
      />
    );
  }
  return <group visible={visible}>{circles}</group>;
}

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, Color, Euler, MathUtils, Matrix4, Vector3 } from 'three';
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
const MagicCircle = React.memo(function MagicCircle({
  initialPosition = [0.005, 1.3, 0.7],
  targetPosition = [0, 1.3, 0.7],
  scale = [0.5, 0.5, 0.5],
  color = new Color(`hsl(${(1 / 10) * 360}, 100%, 50%)`),
  rotateSpeed = 0.01 + 1 * 0.005,
  initialRotationAxis = new Vector3(1, 1, 1).normalize(),
  orbitAxis = new Vector3(1, 1, 1).normalize(),
  orbitSpeed = 0.5,
  expansionSpeed = 0.5,
  transitionDuration = 2,
  visible,
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
  const [currentScale, setCurrentScale] = useState(scale.map(s => s * 0.6)); 
  const rotationRef = useRef(new Euler(0, 0, 0));
  const [preExpansionRotateSpeed, setPreExpansionRotateSpeed] = useState(
    rotateSpeed * 300
  );
  const resetAnimation = useCallback(() => {
    setPosition(initialPosition);
    setExpanding(false);
    setOrbiting(false);
    setIntensity(1);
    setOrbitAngle(0);
    setExpansionProgress(0);
    setTransitionProgress(0);
    setOpacity(0);
    setCurrentScale(scale.map(s => s * 0.6));
    rotationRef.current.set(0, 0, 0);
    setPreExpansionRotateSpeed(rotateSpeed * 300);
  }, [initialPosition, scale, rotateSpeed]);
  useEffect(() => {
    if (visible) {
      resetAnimation();
      const timeout = setTimeout(() => {
        setExpanding(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [visible]);
  const magicCircleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const drawMagicCircle = () => {
      const segments = 64;
      drawGlowingLine(
        ctx,
        () => {
          ctx.beginPath();
          ctx.arc(centerX, centerY, 225, 0, Math.PI * 2);
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
          for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const outerX = centerX + Math.cos(angle) * 225;
            const outerY = centerY + Math.sin(angle) * 225;
            const innerX = centerX + Math.cos(angle) * 200;
            const innerY = centerY + Math.sin(angle) * 200;
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
          for (let i = 0; i <= 5; i++) {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const x = centerX + Math.cos(angle) * 150;
            const y = centerY + Math.sin(angle) * 150;
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
          for (let i = 0; i <= 5; i++) {
            const angle =
              (i / 5) * Math.PI * 2 - Math.PI / 2 + (36 * Math.PI) / 180;
            const x = centerX + Math.cos(angle) * 150;
            const y = centerY + Math.sin(angle) * 150;
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
          ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
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
            const r = i % 2 === 0 ? 56.25 : 22.5;
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
          ctx.arc(centerX + 93.75, centerY + 93.75, 30, 0, Math.PI * 2);
          ctx.moveTo(centerX + 93.75 + 24, centerY + 93.75);
          ctx.arc(centerX + 93.75, centerY + 93.75, 24, 0, Math.PI * 2, true);
          ctx.stroke();
        },
        color.getStyle()
      );
    };
    drawMagicCircle();
    return new CanvasTexture(canvas);
  }, [color]);
  useFrame((state, delta) => {
    if (!visible) return;
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
        MathUtils.lerp(
          initialPosition[2],
          targetPosition[2],
          easedProgress
        ),
      ];
      setPosition(newPosition);
      const newScale = scale.map(s => s * (0.1 + 0.9 * easedProgress));
      setCurrentScale(newScale);
      if (expansionProgress >= 1) {
        setOrbiting(true);
      }
    } else if (orbiting) {
      setTransitionProgress(prev => {
        const newProgress = prev + delta / transitionDuration;
        return newProgress >= 1 ? 1 : newProgress;
      });
      const easedTransition = easeInOutCubic(transitionProgress);
      setOrbitAngle(prev => prev + orbitSpeed * delta * easedTransition);
      const orbitRadius = new Vector3(...targetPosition)
        .sub(new Vector3(...initialPosition))
        ?.length();
      const orbitPosition = new Vector3(...initialPosition).add(
        new Vector3().setFromSphericalCoords(
          orbitRadius,
          orbitAxis.y * Math.PI + orbitAngle,
          orbitAxis.x * Math.PI * 2
        )
      );
      const finalPosition = new Vector3(...position).lerp(
        orbitPosition,
        easedTransition
      );
      setPosition(finalPosition.toArray());
      const lookAtPosition = new Vector3(...initialPosition);
      ref.current.lookAt(lookAtPosition);
    }
    setIntensity(Math.abs(Math.sin(state.clock.getElapsedTime())) * 2);
  });
  if (!visible) return null;
  return (
    <mesh ref={ref} position={position} scale={currentScale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={magicCircleTexture}
        transparent
        opacity={Math.min(opacity * 2, 1)}
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
});
export function MagicCircleGroup({
  position = [0.005, 1.25, 0],
  visible = true,
}) {
  const circles = useMemo(() => {
    const circleCount = 18; 
    return Array.from({ length: circleCount }, (_, i) => {
      const angle = (i / circleCount) * Math.PI * 2;
      const randomAxis = new Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const rotationSize = 2.5; 
      const targetPosition = [
        position[0] + Math.cos(angle) * 0.35 * rotationSize,
        position[1] + Math.sin(angle) * 0.35 * rotationSize,
        position[2] + (0.01 * rotationSize - 0.35), 
      ];
      const color = new Color(
        `hsl(${(i / circleCount) * 360}, 100%, 70%)`
      );
      const rotateSpeed = 0.01 + i * 0.05; 
      const orbitSpeed = 0.1 + Math.random() * 0.01; 
      const expansionSpeed = 0.3 + Math.random() * 5; 
      const circleSize = [1, 1, 1].map(value => value * 0.5); 
      return (
        <MagicCircle
          key={i}
          initialPosition={position}
          targetPosition={targetPosition}
          scale={circleSize}
          color={color}
          rotateSpeed={rotateSpeed}
          initialRotationAxis={randomAxis}
          orbitAxis={randomAxis}
          orbitSpeed={orbitSpeed}
          expansionSpeed={expansionSpeed}
          visible={visible}
        />
      );
    });
  }, [position, visible]);
  return <group>{circles}</group>;
}

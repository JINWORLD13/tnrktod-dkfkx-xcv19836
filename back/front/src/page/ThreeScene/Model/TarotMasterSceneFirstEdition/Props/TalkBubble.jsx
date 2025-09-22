import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial, Shape, ShapeGeometry } from 'three';
export default memo(function TalkBubble(props) {
  const balloonRef = useRef();
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
  } = props?.stateGroup;
  useEffect(() => {
    return () => {
      if (balloonRef.current) {
        balloonRef.current.traverse(object => {
          if (object.isMesh) {
            object.geometry.dispose(); 
            object.material.dispose(); 
          }
        });
      }
      balloonRef.current = null;
    };
  }, []);
  return (
    <>
      <group name="TalkBubble" ref={balloonRef} {...props}>
        {props?.answerForm?.isWaiting === true ? (
          <WaitingTalk
            whichTarot={whichTarot}
            spreadListNumber={questionForm?.spreadListNumber}
            isLightOn={props?.isLightOn}
          />
        ) : (
          <GreetingTalk isLightOn={props?.isLightOn} />
        )}
        {}
        {}
      </group>
    </>
  );
});
const WaitingTalk = ({ whichTarot, spreadListNumber, isLightOn, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const meshRefs = useRef([]); 
  const textRef = useRef(); 
  useEffect(() => {
    return () => {
      meshRefs.current.forEach(mesh => {
        if (mesh) {
          mesh.geometry.dispose();
          mesh.material.dispose();
          mesh.current = null;
        }
      });
      meshRefs.current = [];
      if (textRef.current) {
        textRef.current.geometry?.dispose();
        textRef.current.material?.dispose();
        textRef.current = null;
      }
    };
  }, []);
  return (
    <>
      {isLightOn === true && (
        <Text
          ref={textRef}
          color={'gold'}
          font={`${
            browserLanguage === 'ja'
              ? '/assets/font/Kosugi_Maru/KosugiMaru-Regular.ttf'
              : '/assets/font/Dongle/Dongle-Regular.ttf'
          }`}
          fontSize={browserLanguage === 'ja' ? 0.05 : 0.076}
          fontWeight={800}
          position={[0.71, 1.7, 0.01]}
          lineHeight={browserLanguage === 'ja' ? 1.2 : 0.9}
        >
          {`\t${t('talk.wait')}\n${t(
            `talk.time_${
              whichTarot === 2
                ? 'normal'
                : whichTarot === 3
                ? spreadListNumber === 0
                  ? 'deep_one'
                  : 'deep'
                : spreadListNumber === 0
                ? 'serious_one'
                : 'serious'
            }`
          )}\n${t('talk.you_know')}\n${t('talk.tarot1')}\n${t('talk.tarot2')}`}
        </Text>
      )}
      <mesh
        name="TalkBubbleMaterial1"
        position={[0.7, 1.7, 0]}
        ref={el => (meshRefs.current[0] = el)}
      >
        <circleGeometry args={[0.42]} />
        <meshPhongMaterial color={'black'} flatShading />
      </mesh>
      <mesh
        name="TalkBubbleMaterial1_1"
        position={[0.7, 1.7, -0.01]}
        ref={el => (meshRefs.current[1] = el)}
      >
        <circleGeometry args={[0.435]} />
        <meshPhongMaterial color={'#4E064E'} flatShading />
      </mesh>
    </>
  );
};
const GreetingTalk = memo(({ isLightOn }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const meshRefs = useRef([]); 
  const textRef = useRef(); 
  const shapeRef = useRef(); 
  const shapeShadowRef = useRef(); 
  useEffect(() => {
    return () => {
      if (shape) shape.dispose();
      if (shapeShadow) shapeShadow.dispose();
    };
  }, []);
  useEffect(() => {
    return () => {
      if (shapeRef.current) {
        shapeRef.current.dispose();
        shapeRef.current = null;
      }
      if (shapeShadowRef.current) {
        shapeShadowRef.current.dispose();
        shapeShadowRef.current = null;
      }
      meshRefs.current.forEach(mesh => {
        if (mesh) {
          mesh.material.dispose();
          mesh.current = null;
        }
      });
      meshRefs.current = [];
      if (textRef.current) {
        textRef.current.geometry?.dispose();
        textRef.current.material?.dispose();
        textRef.current = null;
      }
    };
  }, []);
  const { shape, shapeShadow } = useMemo(() => {
    const mainShape = new Shape();
    const width = 0.85;
    const height = 0.35;
    const radius = 0.18;
    mainShape.moveTo(0, radius);
    mainShape.lineTo(0, height - radius);
    mainShape.quadraticCurveTo(0, height, radius, height);
    mainShape.lineTo(width - radius, height);
    mainShape.quadraticCurveTo(width, height, width, height - radius);
    mainShape.lineTo(width, radius);
    mainShape.quadraticCurveTo(width, 0, width - radius, 0);
    mainShape.lineTo(radius, 0);
    mainShape.quadraticCurveTo(0, 0, 0, radius);
    const shadowShape = new Shape();
    const shadowWidth = width + 0.03;
    const shadowHeight = height + 0.03;
    shadowShape.moveTo(0, radius);
    shadowShape.lineTo(0, shadowHeight - radius);
    shadowShape.quadraticCurveTo(0, shadowHeight, radius, shadowHeight);
    shadowShape.lineTo(shadowWidth - radius, shadowHeight);
    shadowShape.quadraticCurveTo(
      shadowWidth,
      shadowHeight,
      shadowWidth,
      shadowHeight - radius
    );
    shadowShape.lineTo(shadowWidth, radius);
    shadowShape.quadraticCurveTo(shadowWidth, 0, shadowWidth - radius, 0);
    shadowShape.lineTo(radius, 0);
    shadowShape.quadraticCurveTo(0, 0, 0, radius);
    const shapeGeom = new ShapeGeometry(mainShape);
    const shapeShadowGeom = new ShapeGeometry(shadowShape);
    shapeRef.current = shapeGeom;
    shapeShadowRef.current = shapeShadowGeom;
    return { shape: shapeGeom, shapeShadow: shapeShadowGeom };
  }, []);
  return (
    <>
      {isLightOn === true && (
        <Text
          ref={textRef}
          color={'gold'}
          font={`${
            browserLanguage === 'ja'
              ? '/assets/font/Kosugi_Maru/KosugiMaru-Regular.ttf'
              : '/assets/font/Dongle/Dongle-Regular.ttf'
          }`}
          fontSize={browserLanguage === 'ja' ? 0.05 : 0.076}
          fontWeight={800}
          position={
            browserLanguage === 'ja' ? [0.73, 1.71, 0.01] : [0.71, 1.71, 0.01]
          }
          lineHeight={browserLanguage === 'ja' ? 1.2 : 0.9}
          textAlign="center" 
          anchorX="center" 
          anchorY="middle" 
        >
          {`\t${t('talk.hello')}\n${t('talk.welcome')}\n${t(
            'talk.click_instruction'
          )}`}
          {}
        </Text>
      )}
      <mesh
        name="TalkBubbleMain"
        position={[0.295, 1.5, 0]}
        ref={el => (meshRefs.current[0] = el)}
      >
        <primitive object={shape} />
        <meshPhongMaterial color={'black'} flatShading />
      </mesh>
      <mesh
        name="TalkBubbleShadow"
        position={[0.283, 1.4845, -0.01]}
        ref={el => (meshRefs.current[1] = el)}
      >
        <primitive object={shapeShadow} />
        <meshPhongMaterial color={'#4E064E'} flatShading />
      </mesh>
    </>
  );
});
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import useLanguageChange from '../../../../../hooks/useEffect/useLanguageChange';
import { limitFPS } from '../../../Function/limitFPS';
const CustomText = () => {
  const textRef = useRef();
  useEffect(() => {
    const loadFont = async () => {
      const loader = new FontLoader();
      loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        const geometry = new TextGeometry('Hello!', {
          font: font,
          size: 1,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelOffset: 0,
          bevelSegments: 5,
        });
        geometry.computeBoundingBox();
        geometry.center();
        const textMesh = new Mesh(
          geometry,
          new MeshBasicMaterial({ color: 0xffffff })
        );
        textRef.current = textMesh;
      });
    };
    loadFont();
    return () => {
      if (textRef.current) {
        const { geometry, material } = textRef.current;
        geometry.dispose(); 
        material.dispose(); 
        textRef.current = null; 
      }
    };
  }, []);
  useFrame(() => {
    if (textRef.current) {
      textRef.current.position.x = 0.07; 
      textRef.current.position.y = 1.07; 
      textRef.current.position.z = 0.1; 
    }
  });
  return <primitive object={textRef} />;
};

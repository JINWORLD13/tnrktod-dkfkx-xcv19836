import React, {
  memo,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Float, Html, useFont } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { Shape, ShapeGeometry } from 'three';
export default function TalkBubbleForVertical(props) {
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
  return (
    <>
      <group name="TalkBubbleForVertical" ref={balloonRef} {...props}>
        {props?.answerForm?.isWaiting === true ? (
          <WaitingTalk
            whichTarot={whichTarot}
            spreadListNumber={questionForm?.spreadListNumber}
            isLightOn={props?.isLightOn}
          />
        ) : (
          <GreetingTalk isLightOn={props?.isLightOn} />
        )}
        <mesh name="TalkBubbleMaterial2" position={[-0.295, 1.55, 0]}>
          <circleGeometry args={[0.05, 120]} />
          <meshPhongMaterial color={'black'} />
        </mesh>
        <mesh name="TalkBubbleMaterial2_1" position={[-0.3, 1.55, -0.05]}>
          <circleGeometry args={[0.06, 120]} />
          <meshPhongMaterial color={'#4E064E'} />
        </mesh>
        <mesh name="TalkBubbleMaterial3" position={[-0.27, 1.45, 0]}>
          <circleGeometry args={[0.03, 120]} />
          <meshPhongMaterial color={'black'} />
        </mesh>
        <mesh name="TalkBubbleMaterial3_1" position={[-0.275, 1.45, -0.05]}>
          <circleGeometry args={[0.04, 120]} />
          <meshPhongMaterial color={'#4E064E'} />
        </mesh>
      </group>
    </>
  );
}
const WaitingTalk = memo(
  ({ whichTarot, spreadListNumber, isLightOn, ...props }) => {
    const { t } = useTranslation();
    const browserLanguage = useLanguageChange();
    const roundedRectShape = useMemo(() => {
      const shape = new Shape();
      const width = 0.67;
      const height = 0.5;
      const radius = 0.1; 
      shape.moveTo(0, radius);
      shape.lineTo(0, height - radius);
      shape.quadraticCurveTo(0, height, radius, height);
      shape.lineTo(width - radius, height);
      shape.quadraticCurveTo(width, height, width, height - radius);
      shape.lineTo(width, radius);
      shape.quadraticCurveTo(width, 0, width - radius, 0);
      shape.lineTo(radius, 0);
      shape.quadraticCurveTo(0, 0, 0, radius);
      return new ShapeGeometry(shape);
    }, []);
    const roundedRectShapeForOutter = useMemo(() => {
      const shape = new Shape();
      const width = 0.7;
      const height = 0.55;
      const radius = 0.1; 
      shape.moveTo(0, radius);
      shape.lineTo(0, height - radius);
      shape.quadraticCurveTo(0, height, radius, height);
      shape.lineTo(width - radius, height);
      shape.quadraticCurveTo(width, height, width, height - radius);
      shape.lineTo(width, radius);
      shape.quadraticCurveTo(width, 0, width - radius, 0);
      shape.lineTo(radius, 0);
      shape.quadraticCurveTo(0, 0, 0, radius);
      return new ShapeGeometry(shape);
    }, []);
    return (
      <>
        {isLightOn === true && (
          <Text
            color={'gold'}
            font={`${
              browserLanguage === 'ja'
                ? '/assets/font/Potta_One/PottaOne-Regular.ttf'
                : '/assets/font/Dongle/Dongle-Regular.ttf'
            }`}
            fontSize={`${browserLanguage === 'ja' ? 0.045 : 0.072}`}
            fontWeight={800}
            position={[0.0, 1.9, 0.01]}
            lineHeight={`${browserLanguage === 'ja' ? 1.2 : 0.9}`}
          >
            {`\t${t(
              `talk.time_${
                whichTarot === 2
                  ? 'normal_vertical'
                  : whichTarot === 3
                  ? spreadListNumber === 0
                    ? 'deep_one_vertical'
                    : 'deep_vertical'
                  : spreadListNumber === 0
                  ? 'serious_one_vertical'
                  : 'serious_vertical'
              }`
            )}\n${t(`talk.you_know_vertical`)}\n${t(
              `talk.tarot1_vertical`
            )}\n${t(`talk.tarot2_vertical`)}`}
          </Text>
        )}
        <mesh name="TalkBubbleMaterial1" position={[-0.335, 1.65, 0]}>
          <primitive object={roundedRectShape} />
          <meshPhongMaterial color={'black'} flatShading />
        </mesh>
        <mesh name="TalkBubbleMaterial1_1" position={[-0.35, 1.63, -0.05]}>
          <primitive object={roundedRectShapeForOutter} />
          <meshPhongMaterial color={'#4E064E'} flatShading />
        </mesh>
      </>
    );
  }
);
const GreetingTalk = memo(({ isLightOn, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const roundedRectShape = useMemo(() => {
    const shape = new Shape();
    const width = 0.67;
    const height = 0.5;
    const radius = 0.1; 
    shape.moveTo(0, radius);
    shape.lineTo(0, height - radius);
    shape.quadraticCurveTo(0, height, radius, height);
    shape.lineTo(width - radius, height);
    shape.quadraticCurveTo(width, height, width, height - radius);
    shape.lineTo(width, radius);
    shape.quadraticCurveTo(width, 0, width - radius, 0);
    shape.lineTo(radius, 0);
    shape.quadraticCurveTo(0, 0, 0, radius);
    return new ShapeGeometry(shape);
  }, []);
  const roundedRectShapeForOutter = useMemo(() => {
    const shape = new Shape();
    const width = 0.7;
    const height = 0.55;
    const radius = 0.1; 
    shape.moveTo(0, radius);
    shape.lineTo(0, height - radius);
    shape.quadraticCurveTo(0, height, radius, height);
    shape.lineTo(width - radius, height);
    shape.quadraticCurveTo(width, height, width, height - radius);
    shape.lineTo(width, radius);
    shape.quadraticCurveTo(width, 0, width - radius, 0);
    shape.lineTo(radius, 0);
    shape.quadraticCurveTo(0, 0, 0, radius);
    return new ShapeGeometry(shape);
  }, []);
  return (
    <>
      {isLightOn === true && (
        <Text
          color={'gold'}
          font={`${
            browserLanguage === 'ja'
              ? '/assets/font/Potta_One/PottaOne-Regular.ttf'
              : '/assets/font/Dongle/Dongle-Regular.ttf'
          }`}
          fontSize={`${browserLanguage === 'ja' ? 0.045 : 0.072}`}
          fontWeight={800}
          position={[0.0, 1.9, 0.01]}
          lineHeight={`${browserLanguage === 'ja' ? 1.2 : 0.9}`}
        >
          {`${t('talk.welcome_vertical')}\n${t(
            'talk.click_instruction_vertical'
          )}\n${t('talk.choose_spread_vertical')}\n${t('talk.usage_vertical')}`}
        </Text>
      )}
      <mesh name="TalkBubbleMaterial1" position={[-0.335, 1.65, 0]}>
        <primitive object={roundedRectShape} />
        <meshPhongMaterial color={'black'} flatShading />
      </mesh>
      <mesh name="TalkBubbleMaterial1_1" position={[-0.35, 1.63, -0.05]}>
        <primitive object={roundedRectShapeForOutter} />
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
        const textMesh = new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        textRef.current = textMesh;
      });
    };
    loadFont();
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

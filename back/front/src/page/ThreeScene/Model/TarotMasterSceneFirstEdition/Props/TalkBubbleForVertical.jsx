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
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { Shape, ShapeGeometry } from 'three';
export default memo(function TalkBubbleForVertical(props) {
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
        {}
        {}
      </group>
    </>
  );
});
const WaitingTalk = memo(
  ({ whichTarot, spreadListNumber, isLightOn, ...props }) => {
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
    useEffect(() => {
      return () => {
        if (roundedRectShape) roundedRectShape.dispose();
        if (roundedRectShapeForOutter) roundedRectShapeForOutter.dispose();
      };
    }, []);
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
            ref={textRef}
            color={'gold'}
            font={`${
              browserLanguage === 'ja'
                ? '/assets/font/Kosugi_Maru/KosugiMaru-Regular.ttf'
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
        <mesh
          name="TalkBubbleMaterial1"
          position={[-0.335, 1.65, 0]}
          ref={el => (meshRefs.current[0] = el)}
        >
          <primitive object={roundedRectShape} />
          <meshPhongMaterial color={'black'} flatShading />
        </mesh>
        <mesh
          name="TalkBubbleMaterial1_1"
          position={[-0.35, 1.63, -0.05]}
          ref={el => (meshRefs.current[1] = el)}
        >
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
  useEffect(() => {
    return () => {
      if (roundedRectShape) roundedRectShape.dispose();
      if (roundedRectShapeForOutter) roundedRectShapeForOutter.dispose();
    };
  }, []);
  const roundedRectShape = useMemo(() => {
    const shape = new Shape();
    const width = browserLanguage === 'ja' ? 0.715 : 0.69;
    const height = browserLanguage === 'ja' ? 0.27 : 0.29;
    const radius = 0.1; 
    const number = browserLanguage === 'en' ? -0.04 : -0.02;
    shape.moveTo(number, radius);
    shape.lineTo(number, height - radius);
    shape.quadraticCurveTo(number, height, radius + number, height);
    shape.lineTo(width - radius, height);
    shape.quadraticCurveTo(width, height, width, height - radius);
    shape.lineTo(width, radius);
    shape.quadraticCurveTo(width, 0, width - radius, 0);
    shape.lineTo(radius, 0);
    shape.quadraticCurveTo(number, 0, number, radius);
    return new ShapeGeometry(shape);
  }, [browserLanguage]);
  const roundedRectShapeForOutter = useMemo(() => {
    const shape = new Shape();
    const width = browserLanguage === 'ja' ? 0.745 : 0.72;
    const height = browserLanguage === 'ja' ? 0.29 : 0.32;
    const radius = 0.1; 
    const number = browserLanguage === 'en' ? -0.04 : -0.02;
    shape.moveTo(number, radius);
    shape.lineTo(number, height - radius);
    shape.quadraticCurveTo(number, height, radius + number, height);
    shape.lineTo(width - radius, height);
    shape.quadraticCurveTo(width, height, width, height - radius);
    shape.lineTo(width, radius);
    shape.quadraticCurveTo(width, 0, width - radius, 0);
    shape.lineTo(radius, 0);
    shape.quadraticCurveTo(number, 0, number, radius);
    return new ShapeGeometry(shape);
  }, [browserLanguage]);
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
          fontSize={`${browserLanguage === 'ja' ? 0.045 : 0.072}`}
          fontWeight={800}
          position={
            browserLanguage === 'ja'
              ? [0.015, 1.86, 0.01]
              : browserLanguage === 'en'
              ? [0.0, 1.87, 0.01]
              : [0.0, 1.87, 0.01]
          }
          lineHeight={`${browserLanguage === 'ja' ? 1.2 : 0.9}`}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {`${t('talk.welcome_vertical')}\n${t(
            'talk.click_instruction_vertical'
          )}`}
          {}
        </Text>
      )}
      <mesh
        name="TalkBubbleMaterial1"
        position={
          browserLanguage === 'en'
            ? [-0.32, 1.725, 0]
            : browserLanguage === 'ja'
            ? [-0.345, 1.723, -0.12]
            : [-0.335, 1.725, 0]
        }
        ref={el => (meshRefs.current[0] = el)}
      >
        <primitive object={roundedRectShape} />
        <meshPhongMaterial color={'black'} flatShading />
      </mesh>
      <mesh
        name="TalkBubbleMaterial1_1"
        position={
          browserLanguage === 'en'
            ? [-0.335,  1.715, -0.05]
            : browserLanguage === 'ja'
            ? [-0.360, 1.713, -0.125]
            : [-0.35, 1.715, -0.05]
        }
        ref={el => (meshRefs.current[1] = el)}
      >
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
import { Mesh } from 'three';
import { MeshBasicMaterial } from 'three';
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

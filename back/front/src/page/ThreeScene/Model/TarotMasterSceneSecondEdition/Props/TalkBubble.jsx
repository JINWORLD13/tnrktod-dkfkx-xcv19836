import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Float, Html, useFont } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
export default function TalkBubble(props) {
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
        <mesh name="TalkBubbleMaterial2" position={[0.2, 1.75, 0]}>
          <circleGeometry args={[0.05, 120]} />
          <meshPhongMaterial color={"black"} />
        </mesh>
        <mesh name="TalkBubbleMaterial2_1" position={[0.2, 1.75, -0.01]}>
          <circleGeometry args={[0.06, 120]} />
          <meshPhongMaterial color={"#4E064E"} />
        </mesh>
        <mesh name="TalkBubbleMaterial3" position={[0.15, 1.65, 0]}>
          <circleGeometry args={[0.03, 120]} />
          <meshPhongMaterial color={"black"} />
        </mesh>
        <mesh name="TalkBubbleMaterial3_1" position={[0.15, 1.65, -0.01]}>
          <circleGeometry args={[0.04, 120]} />
          <meshPhongMaterial color={"#4E064E"} />
        </mesh>
      </group>
    </>
  );
}
const WaitingTalk = ({ whichTarot, spreadListNumber, isLightOn, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return (
    <>
      {isLightOn === true && (
        <Text
          color={"gold"}
          font={`${
            browserLanguage === "ja"
              ? "/assets/font/Potta_One/PottaOne-Regular.ttf"
              : "/assets/font/Dongle/Dongle-Regular.ttf"
          }`}
          fontSize={`${browserLanguage === "ja" ? 0.05 : 0.076}`}
          fontWeight={800}
          position={[0.71, 1.7, 0.01]}
          lineHeight={`${browserLanguage === "ja" ? 1.2 : 0.9}`}
        >
          {`\t${t("talk.wait")}\n${t(
            `talk.time_${
              whichTarot === 2
                ? "normal"
                : whichTarot === 3
                ? spreadListNumber === 0
                  ? "deep_one"
                  : "deep"
                : spreadListNumber === 0
                ? "serious_one"
                : "serious"
            }`
          )}\n${t(`talk.you_know`)}\n${t(`talk.tarot1`)}\n${t(`talk.tarot2`)}`}
        </Text>
      )}
      <mesh name="TalkBubbleMaterial1" position={[0.7, 1.7, 0]}>
        <circleGeometry args={[0.42]} />
        <meshPhongMaterial color={"black"} flatShading />
      </mesh>
      <mesh name="TalkBubbleMaterial1_1" position={[0.7, 1.7, -0.01]}>
        <circleGeometry args={[0.435]} />
        <meshPhongMaterial color={"#4E064E"} flatShading />
      </mesh>
    </>
  );
};
const GreetingTalk = memo(({ isLightOn, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return (
    <>
      {isLightOn === true && (
        <Text
          color={"gold"}
          font={`${
            browserLanguage === "ja"
              ? "/assets/font/Potta_One/PottaOne-Regular.ttf"
              : "/assets/font/Dongle/Dongle-Regular.ttf"
          }`}
          fontSize={`${browserLanguage === "ja" ? 0.05 : 0.076}`}
          fontWeight={800}
          position={[0.7, 1.7, 0.01]}
          lineHeight={`${browserLanguage === "ja" ? 1.2 : 0.9}`}
        >
          {`\t${t("talk.hello")}\n${t("talk.welcome")}\n${t(
            "talk.click_instruction"
          )}\n\t${t("talk.choose_spread")}\n\t${t("talk.usage")}`}
        </Text>
      )}
      <mesh name="TalkBubbleMaterial1" position={[0.7, 1.7, 0]}>
        <circleGeometry args={[0.42]} />
        <meshPhongMaterial color={"black"} flatShading />
      </mesh>
      <mesh name="TalkBubbleMaterial1_1" position={[0.7, 1.7, -0.01]}>
        <circleGeometry args={[0.435]} />
        <meshPhongMaterial color={"#4E064E"} flatShading />
      </mesh>
    </>
  );
});
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import useLanguageChange from "../../../../../hooks/useEffect/useLanguageChange";
const CustomText = () => {
  const textRef = useRef();
  useEffect(() => {
    const loadFont = async () => {
      const loader = new FontLoader();
      loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
        const geometry = new TextGeometry("Hello!", {
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

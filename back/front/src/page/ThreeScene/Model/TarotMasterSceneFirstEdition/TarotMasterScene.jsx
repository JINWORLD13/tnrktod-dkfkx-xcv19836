import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  memo,
  useMemo,
} from 'react';
import { TOUCH } from 'three'; 
import { OrbitControls, Stars, Float, Text3D } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import useWindowSizeState from '../../../../hooks/useState/useWindowSizeState.jsx';
import GlowingLantern from './Props/GlowingLantern.jsx';
import TalkBubbleForVertical from './Props/TalkBubbleForVertical.jsx';
import { detectHorizon } from '../../../../function/detectHorizon.js';
import TalkBubble from './Props/TalkBubble.jsx';
import { GlowingSparkle } from '../../Effect/GlowingSparkle.jsx';
import { BigMagicCircle } from '../../Effect/BigMagicCircle.jsx';
import { ExplodingGlow } from '../../Effect/ExplodingGlow.jsx';
import { DynamicCamera } from '../../Camera/DynamicCamera.jsx';
import { MagicCircleGroupUsingBlenderForBackground } from '../../Effect/MagicCircleUsingBlenderForBackground.jsx';
import { MagicCircleUsingBlenderGroup } from '../../Effect/MagicCircleUsingBlender.jsx';
import { Capacitor } from '@capacitor/core';
import { SceneResourceCleanUp } from '../../Function/SceneResourceCleanUp.jsx';
import Model from './Props/Model.jsx';
import { Bloom, EffectComposer, Outline } from '@react-three/postprocessing';
export default function TarotMasterScene({
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  updateTarotManualModalOpen,
  setReadyToShowDurumagi,
  setDoneAnimationOfBackground,
  userInfo,
  isClickedForTodayCard,
  ...props
}) {
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
    isReadyToShowDurumagi,
    isDoneAnimationOfBackground,
    isVoucherModeOn,
    isAdsWatched,
    ...rest
  } = stateGroup;
  const {
    handleAnsweredState,
    handleCardForm,
    handleQuestionForm,
    handleResetAll,
    handleResetDeck,
    handleSpreadValue,
    handleWhichTarot,
    ...rest2
  } = handleStateGroup;
  let camera = { position: [0, 1.7, 3], fov: 30 };
  const [cleanUp, setCleanUp] = useState(() => {
    return 0;
  });
  const [isTalkBubbleClosed, setTalkBubbleClosed] = useState(false);
  const { windowWidth, windowHeight } = useWindowSizeState();
  const [clickStatusForTalkBubble, setClickStatusForTalkBubble] =
    useState(true);
  const [isLightOn, setLightOn] = useState(true);
  const [visibleExceptDuringPlaying, setVisibleExceptDuringPlaying] =
    useState(true);
  const [visibleDuringPlaying, setVisibleDuringPlaying] = useState(false);
  const [visibleForExplosion, setVisibleForExplosion] = useState(false);
  const notInitialAdsMode = !(
    whichTarot === 2 &&
    !isVoucherModeOn &&
    !answerForm?.isWaiting &&
    answerForm?.isAnswered &&
    !isReadyToShowDurumagi &&
    !isDoneAnimationOfBackground &&
    answerForm?.answer?.length === 0
  );
  useEffect(() => {
    setTalkBubbleClosed(prev => {
      if (clickStatusForTalkBubble) return false;
      return true;
    });
  }, [windowWidth, isReadyToShowDurumagi]);
  useEffect(() => {
    setVisibleExceptDuringPlaying(prev => {
      if (!notInitialAdsMode) return prev;
      return (
        (!answerForm?.isWaiting && !answerForm?.isAnswered) ||
        (answerForm?.isAnswered &&
          isDoneAnimationOfBackground &&
          isReadyToShowDurumagi)
      );
    });
    setVisibleDuringPlaying(prev => {
      if (!notInitialAdsMode) return prev;
      return (
        answerForm?.isWaiting ||
        (answerForm?.isAnswered && !isReadyToShowDurumagi)
      );
    });
    setVisibleForExplosion(prev => {
      return answerForm?.isAnswered && isDoneAnimationOfBackground;
    });
  }, [
    answerForm?.isWaiting,
    answerForm?.isAnswered,
    isDoneAnimationOfBackground,
    isReadyToShowDurumagi,
  ]);
  return (
    <>
      <Canvas
        id={'myCanvas'}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={camera}
      >
        <SceneResourceCleanUp
          isWaiting={answerForm?.isWaiting}
          isAnswered={answerForm?.isAnswered}
          isReadyToShowDurumagi={isReadyToShowDurumagi}
          modalForm={modalForm}
          userInfo={userInfo}
          cleanUp={cleanUp}
        />
        <Suspense fallback={null}>
          <DynamicCamera
            isWaiting={answerForm?.isWaiting}
            isAnswered={answerForm?.isAnswered}
            answer={answerForm?.answer}
            isReadyToShowDurumagi={isReadyToShowDurumagi}
            isDoneAnimationOfBackground={isDoneAnimationOfBackground}
            whichTarot={whichTarot}
            isVoucherModeOn={isVoucherModeOn}
          />
          <EffectComposer>
            <Bloom
              intensity={0.15}
              luminanceThreshold={0.01}
              luminanceSmoothing={10}
              height={300}
            />
            <Outline edgeStrength={10} edgeGlow={0} edgeThickness={1} />
          </EffectComposer>
          <Model
            scale={0.03}
            stateGroup={stateGroup}
            setStateGroup={setStateGroup}
            toggleModalGroup={toggleModalGroup}
            handleStateGroup={handleStateGroup}
            setTalkBubbleClosed={setTalkBubbleClosed}
            setClickStatusForTalkBubble={setClickStatusForTalkBubble}
            updateTarotManualModalOpen={updateTarotManualModalOpen}
            isDoneAnimationOfBackground={isDoneAnimationOfBackground}
            visible={visibleExceptDuringPlaying}
            userInfo={userInfo}
            isClickedForTodayCard={isClickedForTodayCard}
          />
          {visibleExceptDuringPlaying && (
            <group>
              {}
              {}
              <directionalLight
                position={[0.0, 1.2, -0.4]}
                intensity={0.5} 
                color={0xffffff}
                castShadow={false} 
              />
              <pointLight
                position={[0.0, 1.2, -0.4]} 
                intensity={0.1}
                color="#cc99ff" 
                distance={1}
                decay={2}
              />
              <pointLight
                position={[0.0, 1.5, 1]} 
                intensity={4}
                color="#ff9f50" 
                distance={10}
                decay={1.5}
              />
              <pointLight
                position={[0.0, 1.26, -0.42]} 
                intensity={0.2}
                color="#ff9f50"
                distance={1}
                decay={1.5}
              />
              <spotLight
                position={[0, 2, 0]} 
                angle={0.8}
                penumbra={1}
                intensity={15}
                color="#ff9f50"
                castShadow
                target-position={[0, 0, 0]}
              />
              <pointLight
                position={[0.0, 1.2, -0.1]} 
                intensity={0.7}
                color="#cc99ff" 
                distance={0.5}
                decay={2}
              />
              <spotLight
                position={[0.0, 2, -1]} 
                angle={0.8}
                penumbra={1}
                intensity={1}
                color="#ff9f50"
                castShadow
                target-position={[0, 0, -1]}
              />
            </group>
          )}
          {visibleForExplosion && (
            <ExplodingGlow
              isAnswered={answerForm?.isAnswered}
              isDoneAnimationOfBackground={isDoneAnimationOfBackground}
              isReadyToShowDurumagi={isReadyToShowDurumagi}
              setReadyToShowDurumagi={setReadyToShowDurumagi}
              visibleForExplosion={visibleForExplosion}
            />
          )}
          {visibleDuringPlaying && (
            <group>
              <ambientLight intensity={10} />
              <BigMagicCircle visible={visibleDuringPlaying} />
              {}
              <GlowingSparkle visible={visibleDuringPlaying} />
            </group>
          )}
          {visibleDuringPlaying && (
            <group>
              <MagicCircleGroupUsingBlenderForBackground
                setDoneAnimationOfBackground={setDoneAnimationOfBackground}
                visible={visibleDuringPlaying}
              />
              <MagicCircleUsingBlenderGroup visible={visibleDuringPlaying} />
            </group>
          )}
          {isTalkBubbleClosed === false &&
            !answerForm?.isWaiting &&
            !answerForm?.isAnswered && (
              <group>
                {}
                {detectHorizon() === true && (
                  <TalkBubble
                    size={[1, 1, 1]}
                    radius={0.1}
                    answerForm={answerForm}
                    stateGroup={stateGroup}
                    isLightOn={isLightOn}
                  />
                )}
                {}
                {detectHorizon() === false && (
                  <TalkBubbleForVertical
                    size={[1, 1, 1]}
                    radius={0.1}
                    answerForm={answerForm}
                    stateGroup={stateGroup}
                    isLightOn={isLightOn}
                  />
                )}
              </group>
            )}
        </Suspense>
        <fogExp2 attach="fog" args={['#ff9f50', 0.02]} />
        <color attach="background" args={['#000000']} />
        <StartSpin />
        {}
        {visibleExceptDuringPlaying && (
          <OrbitControls
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 3}
            minAzimuthAngle={-Math.PI / 5} 
            maxAzimuthAngle={Math.PI / 5} 
            enableZoom={false}
            rotateSpeed={3} 
            touches={{
              ONE: TOUCH.ROTATE,
              TWO: TOUCH.NONE, 
            }}
            makeDefault
            enableDamping={true} 
            dampingFactor={0.01} 
            enablePan={false} 
            autoRotate={false} 
          />
        )}
        {}
      </Canvas>
    </>
  );
}
function StartSpin(props) {
  const startRef = useRef();
  useFrame((state, delta) => {
    startRef.current.rotation.x += 0.0005 * delta;
    startRef.current.rotation.y += 0.005 * delta;
  });
  useEffect(() => {
    return () => {
      startRef.current = null;
    };
  }, []);
  return (
    <>
      <Stars
        ref={startRef}
        radius={1}
        depth={5}
        count={1000}
        factor={0.6}
        saturation={1}
        fade
        speed={0.5}
      />
    </>
  );
}

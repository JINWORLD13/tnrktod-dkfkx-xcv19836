import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useCrystalAction } from '../../../Action/useCrystalAction';
import { useCandleAction } from '../../../Action/useCandleAction';
import {
  useWindowLeftDoorAction,
  useWindowRightDoorAction,
} from '../../../Action/useWindowDoorAction';
import { hasAccessToken } from '../../../../../utils/tokenCookie';
import { hasAccessTokenForPreference } from '../../../../../utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const MODEL_PATH = '/assets/model/character-fbx/model.gltf';
export default memo(function Model({
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  setTalkBubbleClosed,
  updateTarotManualModalOpen,
  isDoneAnimationOfBackground,
  visible, 
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
    ...rest
  } = stateGroup;
  const {
    updateBlinkModalForLoginOpen,
    updateCardForm,
    setAdsWatched,
    ...restOfSetStateGroup
  } = setStateGroup;
  const { toggleSpreadModal, toggleTarotModal } = toggleModalGroup;
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
  const group = useRef();
  const [windowLeftDoorMaterialAction, setWindowLeftDoorAction] =
    useState(false);
  const [windowRightDoorMaterialAction, setWindowRightDoorAction] =
    useState(false);
  const [leftDoorClick, setLeftDoorClick] = useState(0);
  const [rightDoorClick, setRightDoorClick] = useState(0);
  const [isMagicOn, setMagicOn] = useState(false);
  const gltfResult = useGLTF(MODEL_PATH);
  let { scene, animations, ...propsOfGLTF } = useMemo(
    () => gltfResult,
    [gltfResult]
  );
  let clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  let { nodes, materials } = useGraph(clone);
  let { actions, mixer } = useAnimations(animations, group);
  const [time, setTime] = useState(0);
  const openTarotManualModal = useCallback(
    e => {
      e.stopPropagation();
      if (answerForm?.isWaiting === true || !visible) return;
      updateTarotManualModalOpen(true);
    },
    [updateTarotManualModalOpen]
  );
  useEffect(() => {
    return () => {
      Object.values(nodes).forEach(node => {
        if (node.geometry) {
          node.geometry.dispose();
        }
      });
      Object.values(materials).forEach(material => {
        if (material.map) material.map.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.roughnessMap) material.roughnessMap.dispose();
        material.dispose();
      });
      clone.traverse(object => {
        if (object.isMesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(mat => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      if (mixer) {
        mixer.stopAllAction();
      }
      if (group.current && group.current.parent) {
        group.current.parent.remove(group.current);
      }
    };
  }, [nodes, materials, clone, mixer, actions]);
  useCrystalAction(
    actions,
    answerForm?.isWaiting,
    answerForm?.isAnswered,
    isReadyToShowDurumagi,
    setMagicOn
  );
  useCandleAction(
    actions,
    time,
    windowLeftDoorMaterialAction,
    windowRightDoorMaterialAction,
    leftDoorClick,
    rightDoorClick,
    answerForm?.isWaiting
  );
  let handleWindowLeftDoorAction = useWindowLeftDoorAction(
    actions,
    windowLeftDoorMaterialAction,
    setWindowLeftDoorAction,
    leftDoorClick,
    setLeftDoorClick
  );
  let handleWindowRightDoorAction = useWindowRightDoorAction(
    actions,
    windowRightDoorMaterialAction,
    setWindowRightDoorAction,
    rightDoorClick,
    setRightDoorClick
  );
  const openSpreadModal = async e => {
    e.stopPropagation();
    if (
      answerForm?.isWaiting === true ||
      answerForm?.isAnswered === true ||
      !visible ||
      modalForm.spread === true ||
      modalForm.tarot === true
    )
      return;
    if (answerForm?.isWaiting === false) {
      if (!(await hasAccessTokenForPreference()) && isNative) {
        updateBlinkModalForLoginOpen(true);
        return;
      }
      if (!hasAccessToken() && !isNative) {
        updateBlinkModalForLoginOpen(true);
        return;
      }
      if (
        userInfo?.email === '' ||
        userInfo?.email === undefined ||
        userInfo?.email === null
      )
        return;
      if (isClickedForTodayCard) return;
      updateCardForm(prevCardForm => ({
        ...prevCardForm,
        shuffle: 0,
        isReadyToShuffle: false,
        isSuffleFinished: false,
        spread: false,
        flippedIndex: [],
        selectedCardIndexList: [],
      }));
      setAdsWatched(false);
      const modalTimer = setTimeout(() => {
        toggleSpreadModal(true, 0, '', 0);
      }, 100);
      if (visible) {
        handleResetAll();
      }
      return () => clearTimeout(modalTimer);
    }
  };
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="BookShelfBack"
          position={[-74.196, 6, -42.466]}
          rotation={[Math.PI / 2, 0, 0.02]}
          scale={[0.278, 0.313, 0.313]}
          visible={visible}
        >
          <group
            name="f9975f3d322242a9b0797efe69668448fbx001"
            rotation={[-Math.PI, 0, 0]}
          >
            <group name="RootNode001">
              <group name="Cylinder005001" scale={2.54}>
                <mesh
                  name="Cylinder005_bookshelf_0001"
                  geometry={nodes.Cylinder005_bookshelf_0001.geometry}
                  material={materials.bookshelf}
                  position={[11.006, 8.736, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.706, 1, 1]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0003"
                  geometry={nodes.Cylinder005_bookshelf_0003.geometry}
                  material={materials.bookshelf}
                  position={[198.051, 11.982, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.706, 1, 1]}
                />
              </group>
              <group name="Object001001" scale={2.54}>
                <mesh
                  name="Object001_books_0001"
                  geometry={nodes.Object001_books_0001.geometry}
                  material={materials.books}
                  position={[11.006, 8.736, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.706, 1, 1]}
                />
                <mesh
                  name="Object001_books_0003"
                  geometry={nodes.Object001_books_0003.geometry}
                  material={materials.books}
                  position={[198.051, 11.982, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.706, 1, 1]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="BookShelfSide"
          position={[-96.896, 6, -27.266]}
          rotation={[Math.PI / 2, 0, -1.551]}
          scale={[0.278, 0.313, 0.313]}
          visible={visible}
        >
          <group
            name="f9975f3d322242a9b0797efe69668448fbx002"
            rotation={[Math.PI, 0, 0]}
          >
            <group name="RootNode002">
              <group name="Cylinder005002" scale={2.54}>
                <mesh
                  name="Cylinder005_bookshelf_0002"
                  geometry={nodes.Cylinder005_bookshelf_0002.geometry}
                  material={materials.bookshelf}
                  position={[-17.554, -1.059, 0]}
                  rotation={[0, 0, 0.017]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0004"
                  geometry={nodes.Cylinder005_bookshelf_0004.geometry}
                  material={materials.bookshelf}
                  position={[-17.554, -1.059, 0]}
                  rotation={[0, 0, 0.017]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0005"
                  geometry={nodes.Cylinder005_bookshelf_0005.geometry}
                  material={materials.bookshelf}
                  position={[-12.226, -242.374, 0]}
                  rotation={[0, 0, -3.124]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0006"
                  geometry={nodes.Cylinder005_bookshelf_0006.geometry}
                  material={materials.bookshelf}
                  position={[-12.226, -242.374, 0]}
                  rotation={[0, 0, -3.124]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0007"
                  geometry={nodes.Cylinder005_bookshelf_0007.geometry}
                  material={materials.bookshelf}
                  position={[-87.13, -2.266, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.705, 1, 1]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0008"
                  geometry={nodes.Cylinder005_bookshelf_0008.geometry}
                  material={materials.bookshelf}
                  position={[-87.13, -2.266, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.705, 1, 1]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0009"
                  geometry={nodes.Cylinder005_bookshelf_0009.geometry}
                  material={materials.bookshelf}
                  position={[-81.812, -243.079, 0]}
                  rotation={[0, 0, -3.124]}
                  scale={[0.705, 1, 1]}
                />
                <mesh
                  name="Cylinder005_bookshelf_0010"
                  geometry={nodes.Cylinder005_bookshelf_0010.geometry}
                  material={materials.bookshelf}
                  position={[-81.812, -243.079, 0]}
                  rotation={[0, 0, -3.124]}
                  scale={[0.705, 1, 1]}
                />
              </group>
              <group name="Object001002" scale={2.54}>
                <mesh
                  name="Object001_books_0002"
                  geometry={nodes.Object001_books_0002.geometry}
                  material={materials.books}
                  position={[-17.554, -1.059, 0]}
                  rotation={[0, 0, 0.017]}
                />
                <mesh
                  name="Object001_books_0004"
                  geometry={nodes.Object001_books_0004.geometry}
                  material={materials.books}
                  position={[-17.554, -1.059, 0]}
                  rotation={[0, 0, 0.017]}
                />
                <mesh
                  name="Object001_books_0005"
                  geometry={nodes.Object001_books_0005.geometry}
                  material={materials.books}
                  position={[-12.226, -242.374, 0]}
                  rotation={[0, 0, -3.124]}
                />
                <mesh
                  name="Object001_books_0006"
                  geometry={nodes.Object001_books_0006.geometry}
                  material={materials.books}
                  position={[-12.226, -242.374, 0]}
                  rotation={[0, 0, -3.124]}
                />
                <mesh
                  name="Object001_books_0007"
                  geometry={nodes.Object001_books_0007.geometry}
                  material={materials.books}
                  position={[-87.13, -2.266, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.705, 1, 1]}
                />
                <mesh
                  name="Object001_books_0008"
                  geometry={nodes.Object001_books_0008.geometry}
                  material={materials.books}
                  position={[-87.13, -2.266, 0]}
                  rotation={[0, 0, 0.017]}
                  scale={[0.705, 1, 1]}
                />
                <mesh
                  name="Object001_books_0009"
                  geometry={nodes.Object001_books_0009.geometry}
                  material={materials.books}
                  position={[-81.812, -243.079, 0]}
                  rotation={[0, 0, -3.124]}
                  scale={[0.705, 1, 1]}
                />
                <mesh
                  name="Object001_books_0010"
                  geometry={nodes.Object001_books_0010.geometry}
                  material={materials.books}
                  position={[-81.812, -243.079, 0]}
                  rotation={[0, 0, -3.124]}
                  scale={[0.705, 1, 1]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="CrystalBallSet"
          position={[0.145, 27.315, 4.358]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={5.671}
        >
          <group name="CrystalBallSet001">
            <group name="CrystalBallSet002" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="CrystalBallCenterMaterialSet"
                position={[0.015, 2.593, 0.024]}
                scale={0.099}
              >
                <mesh
                  name="CrystalBallCenterMaterial"
                  geometry={nodes.CrystalBallCenterMaterial.geometry}
                  material={materials['Material.001']}
                />
              </group>
              <group
                name="CrystalBallObjectSet"
                position={[0.032, 2.616, 0]}
                scale={[0.949, 0.885, 0.949]}
                onClick={openSpreadModal}
              >
                <mesh
                  name="CrystalBallObject"
                  geometry={nodes.CrystalBallObject.geometry}
                  material={materials.crystal_ball}
                />
              </group>
              <group
                name="CrystalBallPlate"
                position={[0, 1.681, 0]}
                scale={[0.612, 0.19, 0.612]}
                visible={visible}
              >
                <mesh
                  name="CrystalBallPlateObject"
                  geometry={nodes.CrystalBallPlateObject.geometry}
                  material={materials.crystal_ball_plate}
                />
              </group>
              <group
                name="LightInCrystalBallSet"
                position={[0.007, 2.605, 0.011]}
                scale={0.182}
              >
                <mesh
                  name="CrystalBallLightObject"
                  geometry={nodes.CrystalBallLightObject.geometry}
                  material={materials.crystal_ball_light}
                  rotation={[0, 0, 1.124]}
                  scale={1.351}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="CandleSet001"
          position={[-16.756, 32.908, 10.176]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <mesh
            name="CylinderObject001"
            geometry={nodes.CylinderObject001.geometry}
            material={materials.cylinder_and_simji}
            position={[0.001, 0, 0.001]}
          >
            <mesh
              name="CandleObject001"
              geometry={nodes.CandleObject001.geometry}
              material={materials['candle.001']}
              position={[0.059, 0.063, 95.045]}
            >
              <mesh
                name="CandleWickObject001"
                geometry={nodes.CandleWickObject001.geometry}
                material={materials.cylinder_and_simji}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="CandleLightSet001"
                  position={[-0.446, 0.146, 17.857]}
                  rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                >
                  <mesh
                    name="CandleLightObject001"
                    geometry={nodes.CandleLightObject001.geometry}
                    material={materials['candle_fire.001']}
                    position={[0, 0, -0.545]}
                    rotation={[0, 1.571, 0]}
                  />
                </group>
              </mesh>
            </mesh>
          </mesh>
        </group>
        <group
          name="CandleSet"
          position={[11.944, 32.908, 23.676]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <mesh
            name="CylinderObject"
            geometry={nodes.CylinderObject.geometry}
            material={materials.cylinder_and_simji}
            position={[0.001, 0, 0.001]}
          >
            <mesh
              name="CandleObject"
              geometry={nodes.CandleObject.geometry}
              material={materials['candle.001']}
              position={[0.059, 0.063, 95.045]}
            >
              <mesh
                name="CandleWickObject"
                geometry={nodes.CandleWickObject.geometry}
                material={materials.cylinder_and_simji}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="CandleLightSet"
                  position={[-0.446, 0.146, 17.857]}
                  rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                >
                  <mesh
                    name="CandleLightObject"
                    geometry={nodes.CandleLightObject.geometry}
                    material={materials['candle_fire.001']}
                    position={[0, 0, -0.545]}
                    rotation={[0, 1.571, 0]}
                  />
                </group>
              </mesh>
            </mesh>
          </mesh>
        </group>
        <group
          name="CandleSet003"
          position={[17.844, 32.908, 10.176]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <mesh
            name="CylinderObject003"
            geometry={nodes.CylinderObject003.geometry}
            material={materials.cylinder_and_simji}
            position={[0.001, 0, 0.001]}
          >
            <mesh
              name="CandleObject003"
              geometry={nodes.CandleObject003.geometry}
              material={materials['candle.001']}
              position={[0.059, 0.063, 95.045]}
            >
              <mesh
                name="CandleWickObject003"
                geometry={nodes.CandleWickObject003.geometry}
                material={materials.cylinder_and_simji}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="CandleLightSet003"
                  position={[-0.446, 0.146, 17.857]}
                  rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                >
                  <mesh
                    name="CandleLightObject003"
                    geometry={nodes.CandleLightObject003.geometry}
                    material={materials['candle_fire.001']}
                    position={[0, 0, -0.545]}
                    rotation={[0, 1.571, 0]}
                  />
                </group>
              </mesh>
            </mesh>
          </mesh>
        </group>
        <group
          name="CandleSet002"
          position={[-11.292, 32.908, 23.176]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <mesh
            name="CylinderObject002"
            geometry={nodes.CylinderObject002.geometry}
            material={materials.cylinder_and_simji}
            position={[0, 0, 0]}
          >
            <mesh
              name="CandleObject002"
              geometry={nodes.CandleObject002.geometry}
              material={materials['candle.001']}
              position={[0.059, 0.063, 95.045]}
            >
              <mesh
                name="CandleWickObject002"
                geometry={nodes.CandleWickObject002.geometry}
                material={materials.cylinder_and_simji}
                position={[-0.14, -0.209, 65.587]}
              >
                <group
                  name="CandleLightSet002"
                  position={[-0.446, 0.146, 17.857]}
                  rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                >
                  <mesh
                    name="CandleLightObject002"
                    geometry={nodes.CandleLightObject002.geometry}
                    material={materials['candle_fire.001']}
                    rotation={[0, 1.571, 0]}
                  />
                </group>
              </mesh>
            </mesh>
          </mesh>
        </group>
        <group
          name="WindowSet"
          position={[0.264, 68.919, -55.18]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.098, 0.099, 0.086]}
          visible={visible}
        >
          <group
            name="WindowSet001"
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group
              name="WIndowSet002"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <group name="WindowSet003" position={[0, 0.219, -1.117]}>
                <group
                  name="WindowLeftDoorSet"
                  position={[1.036, 0.13, -4.634]}
                  onClick={e => {
                    if (answerForm?.isWaiting || answerForm?.isnswered) return;
                    handleWindowLeftDoorAction(e);
                    const time =
                      actions?.windowLeftDoorMaterialAction?.time ?? 0;
                    setTime(() => {
                      if (time === 0 && windowLeftDoorMaterialAction === false)
                        return 2000;
                      return time * 1000;
                    });
                  }}
                >
                  <group name="WindowLeftDoorSet001">
                    <group
                      name="WindowLeftDoorObject"
                      position={[2.625, 0.03, 7.188]}
                      scale={[1.728, 1, 0.941]}
                    >
                      <mesh
                        name="WindowLeftDoor"
                        geometry={nodes.WindowLeftDoor.geometry}
                        material={materials.window_glass}
                      />
                      <mesh
                        name="WindowLeftDoor_1"
                        geometry={nodes.WindowLeftDoor_1.geometry}
                        material={materials.window_frame}
                      />
                    </group>
                  </group>
                </group>
                <group
                  name="WindowRightDoorSet"
                  position={[-1.127, 0.13, -0.888]}
                  onClick={e => {
                    if (answerForm?.isWaiting || answerForm?.isAnswered) return;
                    handleWindowRightDoorAction(e);
                    const time =
                      actions?.windowRightDoorMaterialAction?.time ?? 0;
                    setTime(() => {
                      if (time === 0 && windowRightDoorMaterialAction === false)
                        return 2000;
                      return time * 1000;
                    });
                  }}
                >
                  <group
                    name="WindowRightDoorObject"
                    position={[-2.537, 0.039, 3.442]}
                    scale={[1.725, 1, 0.941]}
                  >
                    <mesh
                      name="WindowRightDoor"
                      geometry={nodes.WindowRightDoor.geometry}
                      material={materials.window_frame}
                    />
                    <mesh
                      name="WindowRightDoor_1"
                      geometry={nodes.WindowRightDoor_1.geometry}
                      material={materials.window_glass}
                    />
                  </group>
                </group>
                <mesh
                  name="WindowFrameObject"
                  geometry={nodes.WindowFrameObject.geometry}
                  material={materials.window_frame}
                  position={[-0.026, 0, -1.107]}
                  scale={[1.811, 1, 1.984]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="HaningLampSet"
          position={[0, 80.752, -0.529]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={27.882}
          visible={visible}
        >
          <mesh
            name="ChandelierObject"
            geometry={nodes.ChandelierObject.geometry}
            material={materials.chandelier}
            position={[0.022, 1.506, -0.463]}
            rotation={[-1.571, -1.564, -1.571]}
            scale={[0.076, 0.12, 0.12]}
          >
            <mesh
              name="ChandelierCandleObject"
              geometry={nodes.ChandelierCandleObject.geometry}
              material={materials.candle}
              position={[0.47, -3.359, -1.721]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject"
                geometry={nodes.ChandelierCandleWickObject.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="Empty"
                  position={[-0.024, -1.162, 20.187]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={[17.937, 17.938, 17.938]}
                >
                  <mesh
                    name="ChandelierCandleLightObject"
                    geometry={nodes.ChandelierCandleLightObject.geometry}
                    material={materials.candle_fire}
                    position={[0.002, -0.225, -0.064]}
                    scale={0.094}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject001"
              geometry={nodes.ChandelierCandleObject001.geometry}
              material={materials.candle}
              position={[0.47, -1.713, -3.366]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject001"
                geometry={nodes.ChandelierCandleWickObject001.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="Empty001"
                  position={[-0.024, -1.162, 18.393]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject001"
                    geometry={nodes.ChandelierCandleLightObject001.geometry}
                    material={materials.candle_fire}
                    position={[-0.012, -0.194, 0.043]}
                    scale={0.1}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject002"
              geometry={nodes.ChandelierCandleObject002.geometry}
              material={materials.candle}
              position={[0.47, 1.738, -3.374]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject002"
                geometry={nodes.ChandelierCandleWickObject002.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.14, -0.209, 65.587]}
              >
                <group
                  name="Empty002"
                  position={[-0.024, -1.162, 18.393]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject002"
                    geometry={nodes.ChandelierCandleLightObject002.geometry}
                    material={materials.candle_fire}
                    position={[0.018, 0.129, 0.027]}
                    scale={0.121}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject003"
              geometry={nodes.ChandelierCandleObject003.geometry}
              material={materials.candle}
              position={[0.47, 3.394, -1.738]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject003"
                geometry={nodes.ChandelierCandleWickObject003.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="Empty003"
                  position={[-0.024, -1.162, 18.394]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject003"
                    geometry={nodes.ChandelierCandleLightObject003.geometry}
                    material={materials.candle_fire}
                    position={[0.059, 0.185, 0.004]}
                    scale={0.135}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject004"
              geometry={nodes.ChandelierCandleObject004.geometry}
              material={materials.candle}
              position={[0.47, 3.383, 1.73]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject004"
                geometry={nodes.ChandelierCandleWickObject004.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.14, -0.209, 65.587]}
              >
                <group
                  name="Empty004"
                  position={[-0.024, -1.162, 18.394]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject004"
                    geometry={nodes.ChandelierCandleLightObject004.geometry}
                    material={materials.candle_fire}
                    position={[-0.014, 0.175, 0.04]}
                    scale={0.131}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject005"
              geometry={nodes.ChandelierCandleObject005.geometry}
              material={materials.candle}
              position={[0.47, 1.741, 3.375]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject005"
                geometry={nodes.ChandelierCandleWickObject005.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="Empty005"
                  position={[-0.024, -1.162, 18.393]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject005"
                    geometry={nodes.ChandelierCandleLightObject005.geometry}
                    material={materials.candle_fire}
                    position={[-0.003, -0.043, 0.019]}
                    scale={0.105}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject006"
              geometry={nodes.ChandelierCandleObject006.geometry}
              material={materials.candle}
              position={[0.47, -1.708, 3.393]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject006"
                geometry={nodes.ChandelierCandleWickObject006.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="Empty006"
                  position={[-0.024, -1.162, 18.393]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject006"
                    geometry={nodes.ChandelierCandleLightObject006.geometry}
                    material={materials.candle_fire}
                    position={[0.035, -0.153, 0.027]}
                    scale={0.094}
                  />
                </group>
              </mesh>
            </mesh>
            <mesh
              name="ChandelierCandleObject007"
              geometry={nodes.ChandelierCandleObject007.geometry}
              material={materials.candle}
              position={[0.47, -3.34, 1.726]}
              rotation={[0, 1.571, 0]}
              scale={[0.017, 0.017, 0.026]}
            >
              <mesh
                name="ChandelierCandleWickObject007"
                geometry={nodes.ChandelierCandleWickObject007.geometry}
                material={materials['cylinder_and_simji.001']}
                position={[-0.141, -0.209, 65.587]}
              >
                <group
                  name="Empty007"
                  position={[-0.024, -1.162, 18.393]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={14.398}
                >
                  <mesh
                    name="ChandelierCandleLightObject007"
                    geometry={nodes.ChandelierCandleLightObject007.geometry}
                    material={materials.candle_fire}
                    position={[0, -0.192, -0.129]}
                    scale={0.097}
                  />
                </group>
              </mesh>
            </mesh>
          </mesh>
        </group>
        <group
          name="ArmatureLeftLeg"
          position={[4.251, 28.559, -20.085]}
          rotation={[0, 0, 3.123]}
          scale={3.97}
          onClick={e => e.stopPropagation()}
        >
          <primitive object={nodes.Bone} />
          <skinnedMesh
            name="LeftLegObject"
            geometry={nodes.LeftLegObject.geometry}
            material={materials.body}
            skeleton={nodes.LeftLegObject.skeleton}
          />
          <skinnedMesh
            name="LeftShoeObject"
            geometry={nodes.LeftShoeObject.geometry}
            material={materials.staff_and_shoes}
            skeleton={nodes.LeftShoeObject.skeleton}
          />
        </group>
        <group
          name="ArmatureRightLeg"
          position={[-4.021, 28.049, -20.12]}
          rotation={[0, 0, 3.123]}
          scale={3.97}
          onClick={e => e.stopPropagation()}
        >
          <primitive object={nodes.Bone_1} />
          <skinnedMesh
            name="RightLegObject"
            geometry={nodes.RightLegObject.geometry}
            material={materials.body}
            skeleton={nodes.RightLegObject.skeleton}
          />
          <skinnedMesh
            name="RightShoeObject"
            geometry={nodes.RightShoeObject.geometry}
            material={materials.staff_and_shoes}
            skeleton={nodes.RightShoeObject.skeleton}
          />
        </group>
        <group
          name="ArmatureBody"
          position={[0.016, 29.377, -20.087]}
          rotation={[0.119, 0, 0]}
          scale={5.114}
          onClick={e => e.stopPropagation()}
        >
          <primitive object={nodes.Bone_2} />
          <primitive object={nodes.neutral_bone} />
          <skinnedMesh
            name="BodyObject"
            geometry={nodes.BodyObject.geometry}
            material={materials.body}
            skeleton={nodes.BodyObject.skeleton}
          />
          <skinnedMesh
            name="TailObject"
            geometry={nodes.TailObject.geometry}
            material={materials.body}
            skeleton={nodes.TailObject.skeleton}
          />
        </group>
        <group
          name="ArmatureLeftArm"
          position={[5.197, 34.426, -19.996]}
          rotation={[0, 0, -2.165]}
          scale={4.54}
          onClick={e => e.stopPropagation()}
        >
          <primitive object={nodes.Bone_3} />
          <skinnedMesh
            name="LeftArmObject"
            geometry={nodes.LeftArmObject.geometry}
            material={materials.body}
            skeleton={nodes.LeftArmObject.skeleton}
          />
        </group>
        <group
          name="ArmatureRightArm"
          position={[-5.803, 33.748, -20.042]}
          rotation={[0, 0, 2.165]}
          scale={4.54}
          onClick={e => e.stopPropagation()}
        >
          <primitive object={nodes.Bone_4} />
          <skinnedMesh
            name="RightArmObject"
            geometry={nodes.RightArmObject.geometry}
            material={materials.body}
            skeleton={nodes.RightArmObject.skeleton}
          />
          <skinnedMesh
            name="StaffObject"
            geometry={nodes.StaffObject.geometry}
            material={materials.staff_and_shoes}
            skeleton={nodes.StaffObject.skeleton}
          />
        </group>
        <group
          name="ArmatureHead"
          position={[-0.596, 39.294, -19.944]}
          scale={5.114}
          onClick={e => {
            if (answerForm?.isWaiting || answerForm?.isAnswered) return;
            e.stopPropagation();
            setTalkBubbleClosed(prev => !prev);
            props?.setClickStatusForTalkBubble(prev => !prev);
          }}
        >
          <primitive object={nodes.Bone_5} />
          <group name="FaceObject">
            <skinnedMesh
              name="Face"
              geometry={nodes.Face.geometry}
              material={materials.ear_and_mouse}
              skeleton={nodes.Face.skeleton}
            />
            <skinnedMesh
              name="Face_1"
              geometry={nodes.Face_1.geometry}
              material={materials.eye}
              skeleton={nodes.Face_1.skeleton}
            />
            <skinnedMesh
              name="Face_2"
              geometry={nodes.Face_2.geometry}
              material={materials.body}
              skeleton={nodes.Face_2.skeleton}
            />
            <skinnedMesh
              name="Face_3"
              geometry={nodes.Face_3.geometry}
              material={materials.mouth}
              skeleton={nodes.Face_3.skeleton}
            />
            <skinnedMesh
              name="Face_4"
              geometry={nodes.Face_4.geometry}
              material={materials.chick}
              skeleton={nodes.Face_4.skeleton}
            />
          </group>
          <group
            name="HatObject"
            onClick={e => {
              if (answerForm?.isWaiting || answerForm?.isAnswered) return;
              e.stopPropagation();
              setTalkBubbleClosed(prev => !prev);
              props?.setClickStatusForTalkBubble(prev => !prev);
            }}
          >
            <skinnedMesh
              name="Hat"
              geometry={nodes.Hat.geometry}
              material={materials.hat_buckle}
              skeleton={nodes.Hat.skeleton}
            />
            <skinnedMesh
              name="Hat_1"
              geometry={nodes.Hat_1.geometry}
              material={materials.hat_belt}
              skeleton={nodes.Hat_1.skeleton}
            />
            <skinnedMesh
              name="Hat_2"
              geometry={nodes.Hat_2.geometry}
              material={materials.cloth}
              skeleton={nodes.Hat_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="MouthObject"
            geometry={nodes.MouthObject.geometry}
            material={materials.ear_and_mouse}
            skeleton={nodes.MouthObject.skeleton}
            onClick={e => {
              if (answerForm?.isWaiting || answerForm?.isAnswered) return;
              e.stopPropagation();
              setTalkBubbleClosed(prev => !prev);
              props?.setClickStatusForTalkBubble(prev => !prev);
            }}
          />
          <group
            name="SunglassObject"
            onClick={e => {
              if (answerForm?.isWaiting || answerForm?.isAnswered) return;
              e.stopPropagation();
              setTalkBubbleClosed(prev => !prev);
              props?.setClickStatusForTalkBubble(prev => !prev);
            }}
          >
            <skinnedMesh
              name="Sunglass"
              geometry={nodes.Sunglass.geometry}
              material={materials.background_circle}
              skeleton={nodes.Sunglass.skeleton}
            />
            <skinnedMesh
              name="Sunglass_1"
              geometry={nodes.Sunglass_1.geometry}
              material={materials.cloth}
              skeleton={nodes.Sunglass_1.skeleton}
            />
          </group>
        </group>
        <mesh
          name="BookObject"
          geometry={nodes.BookObject.geometry}
          material={materials.book}
          position={[-20.9, 36.9, 17.8]}
          rotation={[-0.388, 0.385, 1.725]}
          scale={5.069}
          onClick={openTarotManualModal}
          visible={visible}
        />
        <mesh
          name="TarotCardObject"
          geometry={nodes.TarotCardObject.geometry}
          material={materials.tarot_card}
          position={[-5.907, 32.885, 18.7]}
          rotation={[-1.571, -0.001, 2.699]}
          scale={0.069}
          onClick={e => e.stopPropagation()}
          visible={visible}
        />
        <mesh
          name="TarotCardObject001"
          geometry={nodes.TarotCardObject001.geometry}
          material={materials.tarot_card}
          position={[-1.702, 32.885, 21.4]}
          rotation={[-1.571, -0.001, 3.022]}
          scale={0.069}
          onClick={e => e.stopPropagation()}
          visible={visible}
        />
        <mesh
          name="TarotCardObject002"
          geometry={nodes.TarotCardObject002.geometry}
          material={materials.tarot_card}
          position={[3.002, 32.885, 21.2]}
          rotation={[-1.571, -0.001, -2.966]}
          scale={0.069}
          onClick={e => e.stopPropagation()}
          visible={visible}
        />
        <mesh
          name="TarotCardObject003"
          geometry={nodes.TarotCardObject003.geometry}
          material={materials.tarot_card}
          position={[7.007, 32.885, 18.7]}
          rotation={[-1.571, -0.001, -2.662]}
          scale={0.069}
          onClick={e => e.stopPropagation()}
          visible={visible}
        />
        <group
          name="RoomObject"
          position={[-0.363, 20.158, -58.831]}
          rotation={[-Math.PI / 2, 0, -0.003]}
          scale={[1.035, 0.568, 0.568]}
          visible={visible}
        >
          <mesh
            name="Room"
            geometry={nodes.Room.geometry}
            material={materials.room_velvet}
          />
          <mesh
            name="Room_1"
            geometry={nodes.Room_1.geometry}
            material={materials.table}
          />
          <mesh
            name="Room_2"
            geometry={nodes.Room_2.geometry}
            material={materials.room_default}
          />
        </group>
        <mesh
          name="MagicObject"
          geometry={nodes.MagicObject.geometry}
          material={materials.Magic}
          position={[-16.26, 42.992, -3.378]}
          rotation={[2.045, -0.603, -0.759]}
          scale={-1.623}
          visible={isMagicOn}
        />
        <mesh
          name="MagicCircleObject"
          geometry={nodes.MagicCircleObject.geometry}
          material={materials['magic_cirlce.001']}
          position={[0.419, 32.881, 11.263]}
          scale={4.959}
          visible={visible}
        />
      </group>
    </group>
  );
});
useGLTF.preload(MODEL_PATH);

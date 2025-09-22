import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { useCrystalAction } from '../../../Action/useCrystalAction';
import useCandleAction from '../../../Action/useCandleAction';
import {
  useWindowLeftDoorAction,
  useWindowRightDoorAction,
} from '../../../Action/useWindowDoorAction';
import NumberHandlers from '../../../Function/NumberHandlers';
import { limitFPS } from '../../../Function/limitFPS';
export default memo(function CharacterAllCrystalScene({
  stateGroup,
  toggleModalGroup,
  handleStateGroup,
  setTalkBubbleClosed,
  updateTarotManualModalOpen,
  isDoneAnimationOfBackground,
  visible, 
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
  const navigate = useNavigate();
  const group = useRef();
  const [windowLeftDoorMaterialAction, setWindowLeftDoorAction] =
    useState(false);
  const [windowRightDoorMaterialAction, setWindowRightDoorAction] =
    useState(false);
  const [leftDoorClick, setLeftDoorClick] = useState(0);
  const [rightDoorClick, setRightDoorClick] = useState(0);
  const gltfResult = useGLTF(
    '/assets/model/character-fbx/character_all_crystal_scene_without_tongue.gltf'
  );
  const { scene, nodes, materials, animations } = useMemo(
    () => gltfResult,
    [gltfResult]
  );
  const { actions } = useAnimations(animations, group);
  const [time, setTime] = useState(0);
  const openTarotManualModal = useCallback(
    e => {
      e.stopPropagation();
      updateTarotManualModalOpen(true);
    },
    [updateTarotManualModalOpen]
  );
  const { outNumber01, onNumber01, outNumber02, onNumber02 } = NumberHandlers({
    materials,
    answerForm,
  });
  useCrystalAction(
    actions,
    answerForm?.isWaiting,
    answerForm?.isAnswered,
    isReadyToShowDurumagi
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
  const handlenNumber01Click = e => {
    if (answerForm?.isWaiting || answerForm?.isAnswered) {
      return;
    }
    e.stopPropagation();
    if (answerForm?.isWaiting === false) {
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
    <group ref={group} {...props} >
      <group name="Scene">
        <group
          name="Studio"
          position={[3.475, 16.404, -0.861]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={0.045}
          visible={visible}
        >
          <group name="Studio001" />
        </group>
        <group
          name="Studio002"
          position={[3.475, 16.404, -0.861]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={0.045}
          visible={visible}
        >
          <group name="Studio003">
            <group
              name="RoomMaterial"
              position={[-122.18, -195.006, 343.159]}
              rotation={[0, 0, 3.139]}
              scale={12.577}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <mesh
                name="RoomMaterial_1"
                geometry={nodes.RoomMaterial_1.geometry}
                material={materials['Velvet.001']}
              />
              <mesh
                name="RoomMaterial_2"
                geometry={nodes.RoomMaterial_2.geometry}
                material={materials.Table}
              />
              <mesh
                name="RoomMaterial_3"
                geometry={nodes.RoomMaterial_3.geometry}
                material={materials.Default}
              />
            </group>
          </group>
        </group>
        <group
          name="WindowSet"
          position={[1.318, 68.919, -55.18]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.098, 0.099, 0.086]}
          visible={visible}
        >
          <group name="WindowSet001" rotation={[Math.PI / 2, 0, 0]}>
            <group name="WIndowSet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <group name="Window" position={[0, 0.219, -1.117]}>
                <group
                  name="WindowLeftDoor"
                  position={[-1.127, 0.13, -0.888]}
                  onClick={e => {
                    if (answerForm?.isWaiting || answerForm?.isAnswered) return;
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
                  <group
                    name="WindowLeftDoorMaterial"
                    position={[-0.819, 0.039, 3.442]}
                    rotation={[0, 0, 0.001]}
                    scale={[0.978, 1, 0.941]}
                  >
                    <mesh
                      name="WindowLeftDoorMaterial_1"
                      geometry={nodes.WindowLeftDoorMaterial_1.geometry}
                      material={materials.Window_Mat}
                    />
                    <mesh
                      name="WindowLeftDoorMaterial_2"
                      geometry={nodes.WindowLeftDoorMaterial_2.geometry}
                      material={materials.Window_Glass_Mat}
                    />
                  </group>
                </group>
                <group
                  name="WindowRightDoor"
                  position={[1.036, 0.13, -4.634]}
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
                  <group name="WindowRightDoor001">
                    <group
                      name="WindowRightDoorMaterial"
                      position={[1.065, 0.03, 7.188]}
                      scale={[1.003, 1, 0.941]}
                    >
                      <mesh
                        name="WindowRightDoorMaterial_1"
                        geometry={nodes.WindowRightDoorMaterial_1.geometry}
                        material={materials.Window_Glass_Mat}
                      />
                      <mesh
                        name="WindowRightDoorMaterial_2"
                        geometry={nodes.WindowRightDoorMaterial_2.geometry}
                        material={materials.Window_Mat}
                      />
                    </group>
                  </group>
                </group>
                <mesh
                  name="WindowFrameMaterial"
                  geometry={nodes.WindowFrameMaterial.geometry}
                  material={materials.Window_Mat}
                  position={[0.102, 0, -1.107]}
                  scale={[1.012, 1, 1.984]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="CrystalBallSet"
          position={[0.045, 27.315, 4.358]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={5.671}
          onClick={e => {
            if (answerForm?.isWaiting || answerForm?.isAnswered) return;
            e.stopPropagation();
            setTalkBubbleClosed(prev => !prev);
            props?.setClickStatusForTalkBubble(prev => !prev);
          }}
        >
          <group name="CrystalBallSet001">
            <group name="CrystalBallSet002" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="CrystalBall"
                position={[0.032, 2.616, 0]}
                scale={[0.949, 0.885, 0.949]}
              >
                <mesh
                  name="CrystalBallMaterial"
                  geometry={nodes.CrystalBallMaterial.geometry}
                  material={materials['Material.003']}
                />
              </group>
              <group
                name="CrystalBallCenterMaterial"
                position={[0.015, 2.593, 0.024]}
                scale={0.099}
              >
                <mesh
                  name="CrystalBallCenterMaterialMaterial"
                  geometry={nodes.CrystalBallCenterMaterialMaterial.geometry}
                  material={materials['Material.001']}
                />
              </group>
              <group
                name="CrystalBallPlate"
                position={[0, 1.681, 0]}
                scale={[0.612, 0.19, 0.612]}
                visible={visible}
              >
                <mesh
                  name="CrystalBallPlateMaterial"
                  geometry={nodes.CrystalBallPlateMaterial.geometry}
                  material={materials['Material.002']}
                />
              </group>
              <group
                name="LightInCrystalBall2"
                position={[0.007, 2.605, 0.011]}
                scale={0.182}
              >
                <mesh
                  name="LightInCrystalBallMaterial2"
                  geometry={nodes.LightInCrystalBallMaterial2.geometry}
                  material={materials['Material.005']}
                  rotation={[0, 0, 1.124]}
                  scale={1.351}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="CharacterArmature"
          position={[0.499, 34.945, -17.864]}
          rotation={[Math.PI, 0, 3.139]}
          scale={-6.162}
          onClick={e => e.stopPropagation()}
        >
          <primitive object={nodes.Bone} />
          <primitive object={nodes.neutral_bone} />
          <group name="MickeyMaterial">
            <skinnedMesh
              name="MickeyMaterial_1"
              geometry={nodes.MickeyMaterial_1.geometry}
              material={materials.FUegdMat}
              skeleton={nodes.MickeyMaterial_1.skeleton}
            />
            <skinnedMesh
              name="MickeyMaterial_2"
              geometry={nodes.MickeyMaterial_2.geometry}
              material={materials.white}
              skeleton={nodes.MickeyMaterial_2.skeleton}
            />
            <skinnedMesh
              name="MickeyMaterial_3"
              geometry={nodes.MickeyMaterial_3.geometry}
              material={materials.black}
              skeleton={nodes.MickeyMaterial_3.skeleton}
            />
            <skinnedMesh
              name="MickeyMaterial_4"
              geometry={nodes.MickeyMaterial_4.geometry}
              material={materials.paw}
              skeleton={nodes.MickeyMaterial_4.skeleton}
            />
            <skinnedMesh
              name="MickeyMaterial_5"
              geometry={nodes.MickeyMaterial_5.geometry}
              material={materials.clothes}
              skeleton={nodes.MickeyMaterial_5.skeleton}
            />
          </group>
        </group>
        <group
          name="RightCandle"
          position={[-12.679, 32.908, 22.176]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <group
            name="899109988ea446b3ae8995f95019d406fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="RootNode001">
              <group name="Plane002" />
              <group name="Cylinder001" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="Cylinder001_Material_#33_0"
                  geometry={nodes['Cylinder001_Material_#33_0'].geometry}
                  material={materials.Material_33}
                />
              </group>
              <group
                name="Cylinder003"
                position={[0.059, 95.045, -0.063]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Cylinder003_Material_#31_0"
                  geometry={nodes['Cylinder003_Material_#31_0'].geometry}
                  material={materials.Material_31}
                />
              </group>
              <group
                name="Cylinder005"
                position={[-0.081, 160.632, 0.145]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Cylinder005_Material_#33_0"
                  geometry={nodes['Cylinder005_Material_#33_0'].geometry}
                  material={materials.Material_33}
                />
              </group>
              <group name="Plane001" position={[0.018, 178.488, 0]}>
                <mesh
                  name="Plane001_Material_#35_0"
                  geometry={nodes['Plane001_Material_#35_0'].geometry}
                  material={materials.Material_35}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="MiddleCandle"
          position={[-18.892, 32.908, 22.176]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <group
            name="899109988ea446b3ae8995f95019d406fbx002"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="RootNode003">
              <group name="Cylinder001002" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="Cylinder001_Material_#33_0002"
                  geometry={nodes['Cylinder001_Material_#33_0002'].geometry}
                  material={materials.Material_33}
                />
              </group>
              <group
                name="Cylinder003002"
                position={[0.06, 95.045, -0.063]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Cylinder003_Material_#31_0002"
                  geometry={nodes['Cylinder003_Material_#31_0002'].geometry}
                  material={materials.Material_31}
                  position={[-0.001, 0, 0]}
                />
              </group>
              <group
                name="Cylinder005002"
                position={[-0.081, 160.632, 0.145]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Cylinder005_Material_#33_0002"
                  geometry={nodes['Cylinder005_Material_#33_0002'].geometry}
                  material={materials.Material_33}
                />
              </group>
              <group name="Plane001002" position={[0.018, 178.488, 0]}>
                <mesh
                  name="Plane001_Material_#35_0002"
                  geometry={nodes['Plane001_Material_#35_0002'].geometry}
                  material={materials.Material_35}
                />
              </group>
              <group
                name="Plane002002"
                position={[0.018, 178.488, 0]}
                rotation={[0, -1.571, 0]}
              />
            </group>
          </group>
        </group>
        <group
          name="LeftCandle"
          position={[-25.356, 32.908, 22.176]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.067}
          visible={visible}
        >
          <group
            name="899109988ea446b3ae8995f95019d406fbx001"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="RootNode002">
              <group name="Cylinder001001" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="Cylinder001_Material_#33_0001"
                  geometry={nodes['Cylinder001_Material_#33_0001'].geometry}
                  material={materials.Material_33}
                  position={[0, 0, 0]}
                />
              </group>
              <group
                name="Cylinder003001"
                position={[0.06, 95.045, -0.063]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Cylinder003_Material_#31_0001"
                  geometry={nodes['Cylinder003_Material_#31_0001'].geometry}
                  material={materials.Material_31}
                />
              </group>
              <group
                name="Cylinder005001"
                position={[-0.081, 160.632, 0.145]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Cylinder005_Material_#33_0001"
                  geometry={nodes['Cylinder005_Material_#33_0001'].geometry}
                  material={materials.Material_33}
                />
              </group>
              <group name="Plane001001" position={[0.018, 178.489, 0]}>
                <mesh
                  name="Plane001_Material_#35_0001"
                  geometry={nodes['Plane001_Material_#35_0001'].geometry}
                  material={materials.Material_35}
                  position={[0, 0.003, 0]}
                />
              </group>
              <group name="Plane002001" position={[0, 0, 0]} scale={0.01} />
            </group>
          </group>
        </group>
        <group
          name="Studio004"
          position={[3.475, 16.404, -0.861]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          scale={0.045}
          visible={visible}
        >
          <group name="Studio005" />
        </group>
        <group
          name="Number_02"
          position={[3.605, 35.548, 9.347]}
          rotation={[-0.485, 0, -Math.PI]}
          scale={[-2.867, -2.867, -0.317]}
          onPointerOver={onNumber02}
          onPointerOut={outNumber02}
          onClick={e => {
            if (answerForm?.isWaiting || answerForm?.isAnswered) return;
            e.stopPropagation();
            if (answerForm?.isWaiting === false && visible)
              openTarotManualModal(e);
          }}
          visible={visible}
        >
          <mesh
            name="Number_02_1"
            geometry={nodes.Number_02_1.geometry}
            material={materials.Table}
          />
          <mesh
            name="Number_02_2"
            geometry={nodes.Number_02_2.geometry}
            material={materials.number_two}
          />
        </group>
        <group
          name="Number_01"
          position={[-2.654, 35.548, 9.347]}
          rotation={[-0.485, 0, -Math.PI]}
          scale={[-2.867, -2.867, -0.317]}
          onPointerOver={onNumber01}
          onPointerOut={outNumber01}
          onClick={handlenNumber01Click}
          visible={visible}
        >
          <mesh
            name="Number_01_1"
            geometry={nodes.Number_01_1.geometry}
            material={materials.Table}
          />
          <mesh
            name="Number_01_2"
            geometry={nodes.Number_01_2.geometry}
            material={materials.number_one}
          />
        </group>
      </group>
    </group>
  );
});
useGLTF.preload(
  '/assets/model/character-fbx/character_all_crystal_scene_without_tongue.gltf'
);

import React from 'react';
import TarotMasterScene from '../ThreeScene/Model/TarotMasterSceneFirstEdition/TarotMasterScene.jsx';
const TarotPage = ({
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
}) => {
  return (
    <>
      {}
      {}
      <TarotMasterScene
        position={[0, 0, 0]}
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
        toggleModalGroup={toggleModalGroup}
        handleStateGroup={handleStateGroup}
        setReadyToShowDurumagi={setReadyToShowDurumagi}
        updateTarotManualModalOpen={updateTarotManualModalOpen}
        setDoneAnimationOfBackground={setDoneAnimationOfBackground}
        userInfo={userInfo}
        isClickedForTodayCard={isClickedForTodayCard}
      />
    </>
  );
};
export default TarotPage;

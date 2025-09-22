import {
  CelticCross,
  CelticCrossForAnswer,
  FiveCardsRelationship,
  FourCards,
  SingleCard,
  SixCardsSixPeriods,
  ThreeCards,
  ThreeCardsADay,
  ThreeCardsSolution,
  ThreeCardsThreeWayChoice,
  ThreeCardsTime,
  TwoCards,
  TwoCardsBinaryChoice,
} from '../../Page/TarotCardForm/TarotCardTableForm.jsx';
import styles from '../../styles/scss/_AnswerCardImagesModal.module.scss';
const AnswerCardImagesModal = ({ stateGroup, setWhichCardPosition }) => {
  const { answerForm, whichCardPosition, ...rest } = stateGroup;
  const { spreadInfo, ...rest2 } = answerForm;
  return (
    <div className={styles['answer-card-images-contianer']}>
      {spreadInfo.spreadListNumber === 100 ? (
        <SingleCard className={'answer-modal'} spreadInfo={spreadInfo} />
      ) : null}
      {spreadInfo.spreadListNumber === 200 ? (
        <TwoCards
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 201 ? (
        <TwoCardsBinaryChoice
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 300 ? (
        <ThreeCards
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 301 ? (
        <ThreeCardsTime
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 302 ? (
        <ThreeCardsSolution
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 303 ? (
        <ThreeCardsADay
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 304 ? (
        <ThreeCardsThreeWayChoice
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 400 ? (
        <FourCards
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 501 ? (
        <FiveCardsRelationship
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 600 ? (
        <SixCardsSixPeriods
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 601 ? (
        <SixCardsSixPeriods
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 602 ? (
        <SixCardsSixPeriods
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
      {spreadInfo.spreadListNumber === 1000 ? (
        <CelticCrossForAnswer
          className={'answer-modal'}
          spreadInfo={spreadInfo}
          whichCardPosition={whichCardPosition}
          setWhichCardPosition={setWhichCardPosition}
        />
      ) : null}
    </div>
  );
};
export default AnswerCardImagesModal;

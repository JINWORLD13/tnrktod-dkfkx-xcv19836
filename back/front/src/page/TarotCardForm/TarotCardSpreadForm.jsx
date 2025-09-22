import React from 'react';
import OneCardSpreadForm from './TarotCardSpreadForm/OneCardSpreadForm.jsx';
import TwoCardSpreadForm from './TarotCardSpreadForm/TwoCardsSpreadForm.jsx';
import ThreeCardsSpreadForm from './TarotCardSpreadForm/ThreeCardsSpreadForm.jsx';
import ThreeCardsTimeSpreadForm from './TarotCardSpreadForm/ThreeCardsTimeSpreadForm.jsx';
import ThreeCardsSolutionSpreadForm from './TarotCardSpreadForm/ThreeCardsSolutionSpreadForm.jsx';
import FourCardsSpreadForm from './TarotCardSpreadForm/FourCardsSpreadForm.jsx';
import FiveCardsSpreadForm from './TarotCardSpreadForm/FiveCardsSpreadForm.jsx';
import SixCardsTimeSpreadForm from './TarotCardSpreadForm/SixCardsTimeSpreadForm.jsx';
import SevenCardsSpreadForm from './TarotCardSpreadForm/SevenCardsSpreadForm.jsx';
import EightCardsSpreadForm from './TarotCardSpreadForm/EightCardsSpreadForm.jsx';
import NineCardsSpreadForm from './TarotCardSpreadForm/NineCardsSpreadForm.jsx';
import CelticCrossSpreadForm from './TarotCardSpreadForm/CelticCrossSpreadForm.jsx';
import { useTotalCardsNumber } from '../../hooks/dispatch/tarotDispatch.jsx';
import TwoCardsBinaryChoiceSpreadForm from './TarotCardSpreadForm/TwoCardsBinaryChoiceSpreadForm.jsx';
import FiveCardsRelationshipSpreadForm from './TarotCardSpreadForm/FiveCardsRelationshipSpreadForm.jsx';
import ThreeCardsADaySpreadForm from './TarotCardSpreadForm/ThreeCardsADaySpreadForm.jsx';
import ThreeCardsThreeWayChoiceSpreadForm from './TarotCardSpreadForm/ThreeCardsThreeWayChoiceSpreadForm.jsx';
const TarotCardSpreadForm = props => {
  const totalCardsNumber = useTotalCardsNumber();
  const spreadListNumber = props?.questionForm?.spreadListNumber;
  if (totalCardsNumber === 1 && spreadListNumber === 100)
    return (
      <OneCardSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
      />
    );
  if (totalCardsNumber === 2 && spreadListNumber === 200)
    return (
      <TwoCardSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 2 && spreadListNumber === 201)
    return (
      <TwoCardsBinaryChoiceSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 3 && spreadListNumber === 300)
    return (
      <ThreeCardsSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 3 && spreadListNumber === 301)
    return (
      <ThreeCardsTimeSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 3 && spreadListNumber === 302)
    return (
      <ThreeCardsSolutionSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 3 && spreadListNumber === 303)
    return (
      <ThreeCardsADaySpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 3 && spreadListNumber === 304)
    return (
      <ThreeCardsThreeWayChoiceSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 4 && spreadListNumber === 400)
    return (
      <FourCardsSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 5 && spreadListNumber === 501)
    return (
      <FiveCardsRelationshipSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 6 && spreadListNumber === 600)
    return (
      <SixCardsTimeSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 6 && spreadListNumber === 601)
    return (
      <SixCardsTimeSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 6 && spreadListNumber === 602)
    return (
      <SixCardsTimeSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 7 && spreadListNumber === 700)
    return (
      <SevenCardsSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 8 && spreadListNumber === 800)
    return (
      <EightCardsSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 9 && spreadListNumber === 900)
    return (
      <NineCardsSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
  if (totalCardsNumber === 10 && spreadListNumber === 1000)
    return (
      <CelticCrossSpreadForm
        cardForm={props?.cardForm}
        updateCardForm={props?.updateCardForm}
        whichCardPosition={props?.whichCardPosition}
        setWhichCardPosition={props?.setWhichCardPosition}
      />
    );
};
export default TarotCardSpreadForm;

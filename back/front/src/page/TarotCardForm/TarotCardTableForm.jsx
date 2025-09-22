import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_TarotCardTableForm.module.scss';
import Card from '../../UI/Card.jsx';
import {
  backImagePath,
  tarotCardImageFileFolderPath,
  tarotCardImageFilesList,
  tarotCardImageFilesPathList,
} from '../../data/images/images.jsx';
import { useSelectedTarotCards } from '../../hooks/dispatch/tarotDispatch.jsx';
const TarotCardTableForm = () => {
  return (
    <>
      <div className={styles['container']}>
        <div>
          <SpreadCase title={'Single Card'}>
            <SingleCard />
          </SpreadCase>
          <SpreadCase title={'Two Cards'}>
            <TwoCards />
          </SpreadCase>
          <SpreadCase title={'Three Cards'}>
            <ThreeCards />
          </SpreadCase>
        </div>
        <div>
          <SpreadCase title={'Past, Present, Future'}>
            <ThreeCardsTime />
          </SpreadCase>
          <SpreadCase title={'Four Cards'}>
            <FourCards />
          </SpreadCase>
          <SpreadCase title={'Celtic Cross'}>
            <CelticCross />
          </SpreadCase>
        </div>
      </div>
    </>
  );
};
export default TarotCardTableForm;
export const SpreadCase = props => {
  return (
    <>
      <Card className={styles['spread-container']}>
        <div className={styles['spread-box']}>{props.children}</div>
        <div>{props.title}</div>
      </Card>
    </>
  );
};
export const SingleCard = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem?.split(' (')[0] ?? null,
      reversed:
        elem?.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-single']}`}>
        {selectedTarotCards?.length === 1 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const TwoCards = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-two']}`}>
        {selectedTarotCards?.length === 2 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const TwoCardsBinaryChoice = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-two']}`}>
        {selectedTarotCards?.length === 2 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const ThreeCards = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        {selectedTarotCards?.length === 3 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const ThreeCardsTime = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        {selectedTarotCards?.length === 3 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const ThreeCardsSolution = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        {selectedTarotCards?.length === 3 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const ThreeCardsADay = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        {selectedTarotCards?.length === 3 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const ThreeCardsThreeWayChoice = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        {selectedTarotCards?.length === 3 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const FourCards = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-four']}`}>
        {selectedTarotCards?.length === 4 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const FiveCardsRelationship = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-five']}`}>
        {selectedTarotCards?.length === 5 ? (
          <>
            <TarotCardFrontForFiveCardsRelationship
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <div>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            </div>
            <div>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            </div>
            <div>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export const SixCardsSixPeriods = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-six']}`}>
        {selectedTarotCards?.length === 6 ? (
          <>
            <TarotCardFront
              className={`${answerModal}`}
              spreadInfo={spreadInfo}
              whichCardPosition={props?.whichCardPosition}
              setWhichCardPosition={props?.setWhichCardPosition}
            />
          </>
        ) : (
          <>
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </>
        )}
      </div>
    </>
  );
};
export const CelticCross = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr?.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const [isClicked, setIsClicked] = useState(false);
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  const imagePathByName = cardName => {
    if (selectedTarotCards?.length !== 0) {
      const foundCardFileName = tarotCardImageFilesList?.find(indexNumber => {
        return indexNumber?.split('_').slice(1).join(' ') === cardName;
      });
      return tarotCardImageFileFolderPath + '/' + foundCardFileName + '.jpg';
    }
  };
  const cards =
    selectedTarotCards?.map((card, i) => {
      return (
        <div
          key={i}
          className={`${answerModal} ${
            card?.reversed === true
              ? styles['front-for-answer-modal-reversed']
              : null
          }`}
          onClick={e => {
            setIsClicked(true);
            props?.setWhichCardPosition(prev => {
              return { isClicked: true, position: i + 1 };
            });
          }}
        >
          <img
            src={imagePathByName(card?.name)}
            alt="front"
            draggable={false}
          />
        </div>
      );
    }) ?? Array(10).fill(<div style={{ backgroundColor: 'white' }} />);
  return (
    <>
      <div className={styles['card-celtic-cross-container']}>
        <div className={`${styles['card-celtic-cross1']}`}>
          {selectedTarotCards?.length === 10 && isClicked ? (
            <>
              <div className={`${spreadModal} ${answerModal}`} />
              {cards[4]}
              <div className={`${spreadModal} ${answerModal}`} />
              {cards[3]}
              <div
                className={`${styles['card-celtic-cross1-center']} ${spreadModal} ${answerModal}`}
              >
                {cards[0]}
                {cards[1]}
              </div>
              {cards[5]}
              <div className={`${spreadModal} ${answerModal}`} />
              {cards[2]}
              <div className={`${spreadModal} ${answerModal}`} />
            </>
          ) : (
            <>
              <div className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <div className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <div
                className={`${styles['card-celtic-cross1-center']}  ${spreadModal} ${answerModal}`}
              >
                <TarotCardBack
                  className={`${spreadModal} ${answerModal}`}
                  setIsClicked={setIsClicked}
                />
                <TarotCardBack
                  className={`${spreadModal} ${answerModal}`}
                  setIsClicked={setIsClicked}
                />
              </div>
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <div className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <div className={`${spreadModal} ${answerModal}`} />
            </>
          )}
        </div>
        <div className={`${styles['card-celtic-cross2']}`}>
          {selectedTarotCards?.length === 10 && isClicked ? (
            <>
              {cards[9]}
              {cards[8]}
              {cards[7]}
              {cards[6]}
            </>
          ) : (
            <>
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
              <TarotCardBack
                className={`${spreadModal} ${answerModal}`}
                setIsClicked={setIsClicked}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export const CelticCrossForAnswer = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo.selectedTarotCardsArr.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  const imagePathByName = cardName => {
    if (selectedTarotCards?.length !== 0) {
      const foundCardFileName = tarotCardImageFilesList?.find(indexNumber => {
        return indexNumber?.split('_').slice(1).join(' ') === cardName;
      });
      return tarotCardImageFileFolderPath + '/' + foundCardFileName + '.jpg';
    }
  };
  const cards =
    selectedTarotCards?.map((card, i) => {
      return (
        <div
          key={i}
          className={`${answerModal} ${
            card?.reversed === true
              ? styles['front-for-answer-modal-reversed']
              : null
          }`}
          onClick={e => {
            props?.setWhichCardPosition(prev => {
              return { isClicked: true, position: i + 1 };
            });
          }}
        >
          <img
            src={imagePathByName(card?.name)}
            alt="front"
            draggable={false}
          />
        </div>
      );
    }) ?? Array(10).fill(<div style={{ backgroundColor: 'white' }} />);
  return (
    <>
      <div className={styles['card-celtic-cross-container']}>
        <div className={`${styles['card-celtic-cross1']}`}>
          {selectedTarotCards?.length === 10 ? (
            <>
              <div className={`${spreadModal} ${answerModal}`} />
              {cards[4]}
              <div className={`${spreadModal} ${answerModal}`} />
              {cards[3]}
              <div
                className={`${styles['card-celtic-cross1-center']} ${spreadModal} ${answerModal}`}
              >
                {cards[0]}
                {cards[1]}
              </div>
              {cards[5]}
              <div className={`${spreadModal} ${answerModal}`} />
              {cards[2]}
              <div className={`${spreadModal} ${answerModal}`} />
            </>
          ) : (
            <>
              <div className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div
                className={`${styles['card-celtic-cross1-center']}  ${spreadModal} ${answerModal}`}
              >
                <TarotCardBack className={`${spreadModal} ${answerModal}`} />
                <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              </div>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div className={`${spreadModal} ${answerModal}`} />
            </>
          )}
        </div>
        <div className={`${styles['card-celtic-cross2']}`}>
          {selectedTarotCards?.length === 10 ? (
            <>
              {cards[9]}
              {cards[8]}
              {cards[7]}
              {cards[6]}
            </>
          ) : (
            <>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export const CelticCrossForSpread = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  const selectedTarotCardsArr = props?.spreadInfo.selectedTarotCardsArr.map(
    elem => {
      return {
        name: elem.split(' (')[0] ?? null,
        reversed:
          elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
      };
    }
  );
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const handleFlip = selectedCardIndex => {
    props?.updateCardForm({
      ...props?.cardForm,
      flippedIndex: [...props?.cardForm?.flippedIndex, selectedCardIndex],
    });
  };
  const imagePath = index => {
    if (selectedTarotCards?.length !== 0) {
      const foundIndex = tarotCardImageFilesList.findIndex(
        indexNumber =>
          indexNumber.split('.')[0] === selectedTarotCards[index]['file_name']
      );
      return tarotCardImageFilesPathList[foundIndex];
    }
  };
  const isCardClicked = selectedCardIndex =>
    props?.cardForm?.flippedIndex.includes(selectedCardIndex) &&
    selectedTarotCards?.length === totalCardsNumber;
  let totalCardsNumberList = [];
  for (let i = 0; i < totalCardsNumber; i++) {
    totalCardsNumberList?.push(i);
  }
  const imagePathByName = cardName => {
    if (selectedTarotCards?.length !== 0) {
      const foundCardFileName = tarotCardImageFilesList?.find(indexNumber => {
        return indexNumber?.split('_').slice(1).join(' ') === cardName;
      });
      return tarotCardImageFileFolderPath + '/' + foundCardFileName + '.jpg';
    }
  };
  const cards = totalCardsNumberList?.map(indexNumber => {
    return (
      <>
        <div
          className={`${styles['flip']} ${
            isCardClicked(selectedTarotCards[indexNumber]?.index)
              ? styles['flip-click']
              : ''
          }`}
          onClick={() => {
            if (selectedTarotCards?.length === totalCardsNumber) {
              handleFlip(selectedTarotCards[indexNumber]?.index);
            }
          }}
        >
          {selectedTarotCards?.length >= indexNumber + 1 ? (
            <>
              {}
              <div
                className={`${styles['front']} ${
                  selectedTarotCards[indexNumber]?.reversed === true
                    ? styles['front-reversed']
                    : null
                }`}
                onClick={e => {
                  setIsClicked(true);
                  props?.setWhichCardPosition(prev => {
                    return { isClicked: true, position: indexNumber + 1 };
                  });
                }}
              >
                <img
                  src={imagePath(indexNumber)}
                  alt="front"
                  draggable={false}
                />
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  });
  return (
    <>
      <div className={styles['card-celtic-cross-container']}>
        <div className={`${styles['card-celtic-cross1']}`}>
          {selectedTarotCards?.length >= 0 ? (
            <>
              <div />
              {cards[4] ?? null}
              <div />
              {cards[3] ?? null}
              <div className={`${styles['card-celtic-cross1-center']}`}>
                {cards[0] ?? null}
                {cards[1] ?? null}
              </div>
              {cards[5] ?? null}
              <div />
              {cards[2] ?? null}
              <div />
            </>
          ) : (
            <>
              <div />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div
                className={`${styles['card-celtic-cross1-center']}  ${spreadModal} ${answerModal}`}
              >
                <TarotCardBack className={`${spreadModal} ${answerModal}`} />
                <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              </div>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <div />
            </>
          )}
        </div>
        <div className={`${styles['card-celtic-cross2']}`}>
          {selectedTarotCards?.length >= 0 ? (
            <>
              {cards[9] ?? null}
              {cards[8] ?? null}
              {cards[7] ?? null}
              {cards[6] ?? null}
            </>
          ) : (
            <>
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
              <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export const SingleCardForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-single']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const TwoCardsForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-two']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const TwoCardsBinaryChoiceForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-two']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const ThreeCardsForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const ThreeCardsTimeForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const ThreeCardsSolutionForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const ThreeCardsADayForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const ThreeCardsThreeWayChoiceForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-three']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const FourCardsForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-four']}`}>
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        <TarotCardBack className={`${spreadModal} ${answerModal}`} />
      </div>
    </>
  );
};
export const FiveCardsRelationshipForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-five']}`}>
        <div>
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        </div>
        <div>
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        </div>
        <div>
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        </div>
      </div>
    </>
  );
};
export const SixCardsTimesForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={`${styles['card-six-spread-box']}`}>
        <div className={`${styles['card-six']}`}>
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        </div>
      </div>
    </>
  );
};
export const CelticCrossForModal = ({ ...props }) => {
  const spreadModal =
    props?.className === 'spread-modal' && styles['spread-modal'];
  const answerModal =
    props?.className === 'answer-modal' && styles['answer-modal'];
  return (
    <>
      <div className={styles['card-celtic-cross-container']}>
        <div className={`${styles['card-celtic-cross1']}`}>
          <div className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <div className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <div
            className={`${styles['card-celtic-cross1-center']}  ${spreadModal} ${answerModal}`}
          >
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
            <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          </div>
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <div className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <div className={`${spreadModal} ${answerModal}`} />
        </div>
        <div className={`${styles['card-celtic-cross2']}`}>
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
          <TarotCardBack className={`${spreadModal} ${answerModal}`} />
        </div>
      </div>
    </>
  );
};
export const TarotCardBack = props => {
  return (
    <>
      <div
        className={`${styles['card-back']} ${props?.className}`}
        onClick={() => {
          props?.setIsClicked(true);
        }}
      >
        <img src={backImagePath} alt="back" draggable={false} />
      </div>
    </>
  );
};
export const TarotCardFront = ({ spreadInfo, ...props }) => {
  const selectedTarotCardsArr = spreadInfo.selectedTarotCardsArr.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed: elem.split(' (')[1].split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const imagePathByName = cardName => {
    if (selectedTarotCards?.length !== 0) {
      const foundCardFileName = tarotCardImageFilesList?.find(indexNumber => {
        return indexNumber?.split('_').slice(1).join(' ') === cardName;
      });
      return tarotCardImageFileFolderPath + '/' + foundCardFileName + '.jpg';
    }
  };
  const cards = selectedTarotCards?.map((card, i) => {
    return (
      <div
        key={i}
        className={`${props?.className} ${
          card?.reversed === true
            ? styles['front-for-answer-modal-reversed']
            : null
        }`}
        onClick={e => {
          props?.setWhichCardPosition(prev => {
            return { isClicked: true, position: i + 1 };
          });
        }}
      >
        <img src={imagePathByName(card?.name)} alt="front" draggable={false} />
      </div>
    );
  });
  return <>{cards}</>;
};
export const TarotCardFrontForFiveCardsRelationship = ({
  spreadInfo,
  ...props
}) => {
  const selectedTarotCardsArr = spreadInfo.selectedTarotCardsArr.map(elem => {
    return {
      name: elem.split(' (')[0] ?? null,
      reversed:
        elem.split(' (')[1]?.split(')')[0] === 'reversed' ? true : false,
    };
  });
  const fetchedSelectedCards = useSelectedTarotCards();
  const selectedTarotCards =
    fetchedSelectedCards === null || fetchedSelectedCards === undefined || fetchedSelectedCards?.length === 0
      ? selectedTarotCardsArr
      : fetchedSelectedCards;
  const imagePathByName = cardName => {
    if (selectedTarotCards?.length !== 0) {
      const foundCardFileName = tarotCardImageFilesList?.find(indexNumber => {
        return indexNumber?.split('_').slice(1).join(' ') === cardName;
      });
      return tarotCardImageFileFolderPath + '/' + foundCardFileName + '.jpg';
    }
  };
  const renderCard = (card, index) => (
    <div
      key={index}
      className={`${props?.className} ${
        card?.reversed === true
          ? styles['front-for-answer-modal-reversed']
          : null
      }`}
      onClick={e => {
        props?.setWhichCardPosition(prev => {
          return { isClicked: true, position: index + 1 };
        });
      }}
    >
      <img src={imagePathByName(card?.name)} alt="front" draggable={false} />
    </div>
  );
  return (
    <>
      <div>
        {selectedTarotCards?.slice(0, 2).map((card, i) => renderCard(card, i))}
      </div>
      <div>
        {selectedTarotCards
          ?.slice(2, 4)
          .map((card, i) => renderCard(card, i + 2))}
      </div>
      <div>
        {selectedTarotCards?.[4] && renderCard(selectedTarotCards[4], 4)}
      </div>
    </>
  );
};

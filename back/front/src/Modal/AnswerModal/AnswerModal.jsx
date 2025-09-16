import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Copy,
  Download,
  Sparkles,
  Info,
} from 'lucide-react';
import styles from './AnswerModal.module.scss';
import CardDetailModal from './CardDetailModal';
import { useTranslation } from 'react-i18next';
import { tarotDeck } from '../../data/TarotCardDeck/TarotCardDeck';
import { localizeTimeZone } from '../../Function/localizeTimeZone';
import { getSpreadTitle } from '../../Function/getSpreadTitle';
import { formattingDate } from '../../function/formattingDate';
import { useSelectedCardsMeaningInAnswerDurumagiModal } from '../../Hooks/useSelectedCardsMeaningInAnswerDurumagiModal';
import { translateTarotCardName } from '../../Function/cardNameTranslator';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange';
import { useSelectedTarotCards } from '../../hooks/dispatch/tarotDispatch';
import { useRenderQuestionAsLines } from '../../Function/useRenderQuestionAsLines';
import { detectComputer } from '../../function/detectComputer';

const AnswerModal = ({ answerForm = {}, whichTarot = 3, ...props }) => {
  let {
    questionInfo,
    spreadInfo,
    answer,
    language,
    timeOfCounselling,
    firstOption,
    secondOption,
    thirdOption,
    ...rest
  } = answerForm;
  questionInfo = questionInfo;
  spreadInfo = spreadInfo;
  answer =
    answer;
  language = language;

  const [showCards, setShowCards] = useState(true);
  const [showCardMeanings, setShowCardMeanings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(language === 'ja' ? 0.85 : 1.2);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardSize, setCardSize] = useState('medium');
  const [isMethodOpen, setIsMethodOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const [isTall, setIsTall] = useState(() => {
    
    if (typeof window !== 'undefined') {
      return (
        window.innerHeight >= 670 ||
        (!detectComputer() && window.screen.height >= 670)
      );
    }
    return false;
  });

  useEffect(() => {
    
    const handleResize = () => {
      const newIsTall =
        window.innerHeight >= 670 ||
        (!detectComputer() && window.screen.height >= 670);
      setIsTall(prev => {
        
        if (prev !== newIsTall) {
          return newIsTall;
        }
        return prev;
      });
    };
    
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { t } = useTranslation();
  
  let parsedAnswer = null;
  let formattedAnswer = '';
  try {
    if (typeof answer === 'string') {
      const trimmed = answer.trim();
      if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        parsedAnswer = JSON.parse(trimmed);
        formattedAnswer = formatTarotInterpretation(
          parsedAnswer,
          whichTarot,
          language,
          t
        );
      } else {
        formattedAnswer = trimmed;
      }
    } else if (typeof answer === 'object') {
      parsedAnswer = answer;
      formattedAnswer = formatTarotInterpretation(
        parsedAnswer,
        whichTarot,
        language,
        t
      );
    }
  } catch (e) {
    formattedAnswer = typeof answer === 'string' ? answer : '';
  }
  
  const cardImages = spreadInfo.selectedTarotCardsArr.map(originalCardName => {
    
    const match = originalCardName.match(/(.+) \((.+)\)/);
    const name = match ? match[1] : originalCardName;
    const direction = match ? match[2] : 'normal_direction';
    const tarotCardInfo = tarotDeck?.find((tarot, index) => {
      return tarot.name === name;
    });
    const fileName = tarotCardInfo?.file_name + '.jpg';
    return {
      name,
      image: './assets/images/deck/' + `${fileName}`,
      reversed: direction === 'reversed',
    };
  });
  const browserLanguage = useLanguageChange();
  const 마이페이지를_위한_카드_배열 = spreadInfo?.selectedTarotCardsArr?.map(
    (elem, i) => {
      const result = tarotDeck
        .map((cardInfo, i) => {
          if (cardInfo?.name === elem.split('(')[0].trim()) return cardInfo;
          return null;
        })
        ?.filter(elem => elem !== null);
      
      return result[0];
    }
  );
  const selectedTarotCardsFromHook = useSelectedTarotCards();
  const selectedTarotCards =
    selectedTarotCardsFromHook && selectedTarotCardsFromHook?.length > 0
      ? selectedTarotCardsFromHook
      : 마이페이지를_위한_카드_배열;
  
  const 카드_방향_배열 = spreadInfo?.selectedTarotCardsArr?.map((elem, i) => {
    
    return elem
      ?.split('(')[1]
      ?.trim()
      ?.slice(0, elem?.split('(')[1]?.trim()?.length - 1)
      ?.trim();
  });
  const translatedCardsNameArr = translateTarotCardName(
    spreadInfo?.selectedTarotCardsArr,
    browserLanguage
  );
  let fromAnswerModal = true; 
  const cardMeanings = useSelectedCardsMeaningInAnswerDurumagiModal(
    whichTarot,
    props?.isVoucherModeOn,
    answer,
    selectedTarotCards,
    translatedCardsNameArr,
    카드_방향_배열,
    fromAnswerModal
  );

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        if (selectedCard) {
          setSelectedCard(null);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCard]);

  const handleScroll = event => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += event.deltaY > 0 ? 30 : -30;
    }
  };

  const handleCopy = () => {
    const content = generateTextContent(
      questionInfo,
      spreadInfo,
      language,
      timeOfCounselling,
      formattedAnswer,
      cardMeanings,
      showCardMeanings
    );
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const content = generateTextContent(
      questionInfo,
      spreadInfo,
      language,
      timeOfCounselling,
      formattedAnswer,
      cardMeanings,
      showCardMeanings
    );
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `\ntarot-reading-${
      new Date().toISOString().split('T')[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCardClick = (card, index) => {
    setSelectedCard({ ...card, index });
  };

  const getCardLayoutClass = (cardCount, flagForCelticCross = 0) => {
    const spreadTitle = spreadInfo?.spreadTitle || '';
    switch (cardCount) {
      case 1:
        return 'layout-1';
      case 2:
        return 'layout-2';
      case 3:
        return 'layout-3';
      case 4:
        return 'layout-4-Row';
      case 5:
        return spreadTitle.includes('v') ? 'layout-5-V' : 'layout-5-3-2';
      case 6:
        return 'layout-6-3-3';
      case 10:
        return !spreadTitle.toLowerCase().includes('celtic')
          ? flagForCelticCross === 0
            ? 'celtic-cross'
            : 'celtic-cross-straight'
          : 'layout-10-5-5';
      default:
        return 'auto-grid';
    }
  };
  
  const getCardCountAndSizeClass = (cardCount, cardSize) => {
    const spreadTitle = spreadInfo?.spreadTitle || '';
    let countGroup;
    if (cardCount <= 3) countGroup = 'count1-3';
    else if (cardCount <= 5) {
      if (!spreadTitle.includes('v')) countGroup = 'count4-5';
      if (spreadTitle.includes('v')) countGroup = 'count5-V';
    } else if (cardCount <= 7) countGroup = 'count6-7';
    else if (cardCount <= 10) countGroup = 'count8-10';
    else countGroup = 'count11Plus';

    return `${countGroup}-${cardSize}`; 
  };

  return (
    <div className={styles.answerModalOverlay}>
      <div
        className={`${styles.answerModal} ${
          isFullscreen ? styles.fullscreen : ''
        }`}
      >
        {}
        <div className={styles.cosmicBackground}>
          <div className={styles.stars}></div>
          <div className={styles.stars2}></div>
          <div className={styles.nebula}></div>
          <div className={styles.milkyWay}></div>
          <div className={styles.extraStars}></div>
        </div>

        {}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <Sparkles className={styles.titleIcon} />
            타로 결과
          </h2>
          <div className={styles.headerControls}>
            <button
              className={`${styles.controlBtn} ${styles.methodBtn}`}
              onClick={() => setIsMethodOpen(true)}
              title="해석 과정"
            >
              <Info />
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? '전체화면 종료' : '전체화면'}
            >
              {isFullscreen ? <Minimize2 /> : <Maximize2 />}
            </button>
            <button
              className={`${styles.controlBtn} ${styles.closeBtn}`}
              onClick={() => {}}
              title="닫기"
            >
              <X />
            </button>
          </div>
        </div>

        {}
        <div
          className={`${styles.modalContent} ${
            ['large', 'extra-large'].includes(cardSize) ? styles.fluidLeft : ''
          }`}
        >
          {}
          {showCards && cardImages && cardImages.length > 0 && (
            <div
              className={`${styles.cardsSection} ${styles[`size-${cardSize}`]}`}
            >
              <div className={styles.cardsCenter}>
                <div className={styles.innerWrapper}>
                  {!spreadInfo?.spreadTitle.toLowerCase().includes('celtic') ? (
                    <div className={styles.cardsContainerWrapper}>
                      <div
                        className={`${styles.cardsContainer} 
                              ${styles[getCardLayoutClass(cardImages.length)]} 
                              ${
                                styles[
                                  getCardCountAndSizeClass(
                                    cardImages.length,
                                    cardSize
                                  )
                                ]
                              } 
                              ${
                                cardSize === 'extra-large' ? styles.xlGrid : ''
                              } 
                              ${
                                getCardLayoutClass(cardImages.length) ===
                                'auto-grid'
                                  ? styles.autoGrid
                                  : ''
                              }`}
                      >
                        {cardImages.slice(0, 6).map((card, index) => (
                          <div
                            key={index}
                            className={`${styles.tarotCard} ${
                              styles[`card-${cardSize}`]
                            }`}
                            onClick={() => handleCardClick(card, index)}
                            style={{ '--index': index }}
                          >
                            <div
                              className={`${styles.cardInner} ${styles.cardFrame}`}
                            >
                              <div className={styles.artwork}>
                                <img
                                  src={card.image}
                                  alt={`${card.name}${
                                    card.reversed ? ' (뒤집힌)' : ''
                                  } 타로 카드`}
                                  className={`${styles.cardImage} ${
                                    card.reversed ? styles.reversed : ''
                                  }`}
                                />
                              </div>
                              <div className={styles.cardOverlay}>
                                <span className={styles.cardName}>
                                  {card.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`${styles.cardsContainer} 
                              ${
                                styles[getCardLayoutClass(cardImages.length, 1)]
                              } 
                              ${
                                styles[
                                  getCardCountAndSizeClass(
                                    cardImages.length,
                                    cardSize
                                  )
                                ]
                              } 
                              ${
                                cardSize === 'extra-large' ? styles.xlGrid : ''
                              } 
                              ${
                                getCardLayoutClass(cardImages.length) ===
                                'auto-grid'
                                  ? styles.autoGrid
                                  : ''
                              }`}
                      >
                        {cardImages.slice(6, 10).map((card, index) => (
                          <div
                            key={index}
                            className={`${styles.tarotCard} ${
                              styles[`card-${cardSize}`]
                            }`}
                            onClick={() => handleCardClick(card, index)}
                            style={{ '--index': index }}
                          >
                            <div
                              className={`${styles.cardInner} ${styles.cardFrame}`}
                            >
                              <div className={styles.artwork}>
                                <img
                                  src={card.image}
                                  alt={`${card.name}${
                                    card.reversed ? ' (뒤집힌)' : ''
                                  } 타로 카드`}
                                  className={`${styles.cardImage} ${
                                    card.reversed ? styles.reversed : ''
                                  }`}
                                />
                              </div>
                              <div className={styles.cardOverlay}>
                                <span className={styles.cardName}>
                                  {card.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${styles.cardsContainer} 
                              ${styles[getCardLayoutClass(cardImages.length)]} 
                              ${
                                styles[
                                  getCardCountAndSizeClass(
                                    cardImages.length,
                                    cardSize
                                  )
                                ]
                              } 
                              ${
                                cardSize === 'extra-large' ? styles.xlGrid : ''
                              } 
                              ${
                                getCardLayoutClass(cardImages.length) ===
                                'auto-grid'
                                  ? styles.autoGrid
                                  : ''
                              }`}
                    >
                      {cardImages.map((card, index) => (
                        <div
                          key={index}
                          className={`${styles.tarotCard} ${
                            styles[`card-${cardSize}`]
                          }`}
                          onClick={() => handleCardClick(card, index)}
                          style={{ '--index': index }}
                        >
                          <div
                            className={`${styles.cardInner} ${styles.cardFrame}`}
                          >
                            <div className={styles.artwork}>
                              <img
                                src={card.image}
                                alt={`${card.name}${
                                  card.reversed ? ' (뒤집힌)' : ''
                                } 타로 카드`}
                                className={`${styles.cardImage} ${
                                  card.reversed ? styles.reversed : ''
                                }`}
                              />
                            </div>
                            <div className={styles.cardOverlay}>
                              <span className={styles.cardName}>
                                {card.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.cardsHeader}>
                <button
                  className={styles.toggleCardsBtn}
                  onClick={() => setShowCards(false)}
                >
                  <EyeOff /> <span>카드 이미지 숨기기</span>
                </button>
              </div>
            </div>
          )}

          {!showCards && cardImages && cardImages.length > 0 && (
            <button
              className={styles.showCardsBtn}
              onClick={() => setShowCards(true)}
            >
              <Eye /> <span>카드 이미지 보기</span>
            </button>
          )}

          {}
          <div className={styles.answerSection}>
            <div
              className={`${styles.answerContent} ${styles.readingText}`}
              ref={scrollContainerRef}
              onWheel={handleScroll}
              style={{
                fontSize: `${fontSize}rem`,
                ...(language === 'ja'
                  ? { fontFamily: "'Noto Sans JP', sans-serif" }
                  : {}),
              }}
            >
              {}
              {questionInfo && (
                <div className={styles.questionInfo}>
                  <h3>질문 내용</h3>
                  <>
                    {useRenderQuestionAsLines(
                      questionInfo,
                      spreadInfo,
                      language,
                      timeOfCounselling
                    )}
                  </>
                </div>
              )}

              {}
              {formattedAnswer && (
                <div className={styles.answerText}>
                  <h3 className={styles.goldShimmer}>해석 결과</h3>
                  <div className={styles.answerParagraphs}>
                    {formattedAnswer
                      .split('\n')
                      .map(
                        (paragraph, index) =>
                          paragraph.trim() && <p key={index}>{paragraph}</p>
                      )}
                  </div>
                </div>
              )}

              {}
              {showCardMeanings && cardMeanings && (
                <div className={styles.cardMeanings}>
                  <h3>카드의 기초적인 의미</h3>
                  <div style={{ whiteSpace: 'pre-line' }}>{cardMeanings}</div>
                </div>
              )}
            </div>

            {}
            <div
              className={`${styles.answerControls} ${styles.controlsScrollable}`}
            >
              <div className={styles.leftControls}>
                <button
                  className={styles.controlBtn}
                  onClick={() => setFontSize(prev => Math.min(prev * 1.1, 3))}
                  title="글씨 크기 증가"
                >
                  <Plus />
                </button>
                <button
                  className={styles.controlBtn}
                  onClick={() => setFontSize(prev => Math.max(prev / 1.1, 0.8))}
                  title="글씨 크기 감소"
                >
                  <Minus />
                </button>
                <button
                  className={styles.controlBtn}
                  onClick={() => setShowCardMeanings(!showCardMeanings)}
                  title={
                    showCardMeanings ? '카드 의미 숨기기' : '카드 의미 보기'
                  }
                >
                  {showCardMeanings ? <EyeOff /> : <Eye />}
                  <span>{showCardMeanings ? '숨기기' : '보기'}</span>
                </button>

                {}
                {cardImages && cardImages.length > 0 && (
                  <div className={styles.cardSizeControls}>
                    <label htmlFor="cardSize">카드 크기:</label>
                    <select
                      id="cardSize"
                      value={cardSize}
                      onChange={e => setCardSize(e.target.value)}
                    >
                      {isTall && <option value="small">작게</option>}
                      <option value="medium">보통</option>
                      {!(!isTall && spreadInfo?.spreadTitle.includes('v')) && (
                        <option value="large">크게</option>
                      )}
                      {}
                    </select>
                  </div>
                )}
              </div>

              <div className={styles.rightControls}>
                <button
                  className={`${styles.controlBtn} ${styles.copyBtn}`}
                  onClick={handleCopy}
                  title="클립보드에 복사"
                >
                  <Copy /> <span>복사</span>
                </button>
                <button
                  className={`${styles.controlBtn} ${styles.downloadBtn}`}
                  onClick={handleDownload}
                  title="텍스트로 다운로드"
                >
                  <Download /> <span>저장</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {}
        {isMethodOpen && (
          <div
            className={`${styles.methodPanel} ${
              isMethodOpen ? styles.open : ''
            }`}
          >
            <div className={styles.methodHeader}>
              <h3>해석 과정</h3>
              <button
                className={`${styles.controlBtn} ${styles.closeBtn}`}
                onClick={() => setIsMethodOpen(false)}
                title="닫기"
              >
                <X />
              </button>
            </div>
            <div className={styles.methodContent}>
              <p>이 해석은 다음 과정을 거쳐 생성되었습니다:</p>
              <ul>
                <li>스프레드: {spreadInfo?.spreadTitle || '기본 스프레드'}</li>
                <li>
                  카드: {spreadInfo.selectedTarotCardsArr?.join(', ') || '없음'}
                </li>
                <li>질문 맥락: {questionInfo?.question || '없음'}</li>
              </ul>
              {cardMeanings && (
                <>
                  <h4>카드 키워드</h4>
                  <div className={styles.methodMeanings}>
                    {extractAllText(cardMeanings)
                      .split('\n')
                      .map(
                        (line, idx) => line.trim() && <p key={idx}>{line}</p>
                      )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {}
        {selectedCard && (
          <CardDetailModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            language={language}
          />
        )}
      </div>
    </div>
  );
};

const prefixesForComprehensive = {
  en: '🔮 Comprehensive Interpretation',
  ko: '🔮 종합해석',
  ja: '🔮 総合解釈',
};

const prefixesForIndividual = {
  en: '🔮 Individual Card Interpretation',
  ko: '🔮 개별카드해석',
  ja: '🔮 個別カード解釈',
};

const formatIndividualCard = (index, cardData, t) => {
  const {
    englishTarotCardNameArray = [],
    translateTarotCardNameArray = [],
    directionsArray = [],
    symbolicKeywordArray = [],
    interpretationArray = [],
  } = cardData.individual || {};
  const positionMeanings =
    cardData.individual.arrOfPositionMeaningInSpread || [];

  return (
    `${index + 1}) ${
      englishTarotCardNameArray?.[index] || t('interpretation.unknown_card')
    } ` +
    `(${
      translateTarotCardNameArray?.length > 0
        ? translateTarotCardNameArray?.[index] + ', ' ||
          t('interpretation.unknown_card') + ', '
        : ''
    }` +
    `${directionsArray[index] || t('interpretation.unknown_direction')}, ` +
    `${positionMeanings[index] || t('interpretation.unknown_position')}, ` +
    `${
      symbolicKeywordArray[index] || t('interpretation.unknown_keyword')
    }): \n` +
    `${
      (interpretationArray[index][interpretationArray[index].length - 1] === '.'
        ? interpretationArray[index]
        : interpretationArray[index] + '.') ||
      t('interpretation.no_interpretation')
    }\n`
  );
};

const formatTarotInterpretation = (answer, whichTarot, language, t) => {
  let parsedAnswer = answer;
  if (typeof parsedAnswer === 'string') parsedAnswer = JSON.parse(answer);
  
  const lang = prefixesForComprehensive?.[language] ? language : 'en';
  
  const lines = [];
  
  lines.push(
    `${prefixesForComprehensive[lang]} :\n ${
      parsedAnswer?.comprehensive || t('interpretation.no_interpretation')
    }`
  );
  
  if (
    (whichTarot === 3 || whichTarot === 4) &&
    parsedAnswer?.individual?.interpretationArray?.length > 1
  ) {
    lines?.push(`\n${prefixesForIndividual[lang]} :`);
    parsedAnswer?.individual?.interpretationArray?.forEach((_, index) => {
      lines?.push(formatIndividualCard(index, parsedAnswer, t));
    });
  }
  
  return lines.join('\n');
};

function extractAllText(reactNode) {
  if (!reactNode) return '';

  if (typeof reactNode === 'string' || typeof reactNode === 'number') {
    return String(reactNode);
  }

  if (Array.isArray(reactNode)) {
    return reactNode
      .map((child, index) => extractAllText(child))
      ?.filter(text => text.trim())
      ?.join('')
      ?.split('.-')
      ?.join('.\n-')
      ?.replace(/\n{2,}/g, '\n')
      ?.replace(/([A-Z]\. )/g, '\n$1') 
      ?.split(')-')
      ?.join(')\n-')
      ?.replace(/^\nA\. /, 'A. '); 
  }

  if (reactNode.props && reactNode.props.children) {
    return extractAllText(reactNode.props.children);
  }

  return '';
}
const generateTextContent = (
  questionInfo,
  spreadInfo,
  language,
  timeOfCounselling,
  formattedAnswer,
  cardMeanings,
  showCardMeanings
) => {
  const userTimeZone = localizeTimeZone(language);
  const spreadTitle = getSpreadTitle(spreadInfo, language);
  let content = '';
  
  if (language === 'en') {
    content += `Spread Type: \n${
      spreadInfo?.spreadTitle === undefined ||
      spreadInfo?.spreadTitle === null ||
      spreadInfo?.spreadTitle === ''
        ? 'Omitted'
        : spreadTitle
    }\n`;
  } else if (language === 'ko') {
    content += `스프레드 종류: \n${
      spreadInfo?.spreadTitle === undefined ||
      spreadInfo?.spreadTitle === null ||
      spreadInfo?.spreadTitle === ''
        ? '생략'
        : spreadTitle
    }\n`;
  } else if (language === 'ja') {
    content += `スプレッドの種類: \n${
      spreadInfo?.spreadTitle === undefined ||
      spreadInfo?.spreadTitle === null ||
      spreadInfo?.spreadTitle === ''
        ? '省略'
        : spreadTitle
    }\n`;
  }
  
  if (timeOfCounselling) {
    if (language === 'en') {
      content += `\nCounselling time: \n${formattingDate(
        timeOfCounselling,
        language
      )}(${userTimeZone})\n`;
    } else if (language === 'ko') {
      content += `\n상담 일시: \n${formattingDate(
        timeOfCounselling,
        language
      )}(${userTimeZone})\n`;
    } else if (language === 'ja') {
      content += `\n相談日時: \n${formattingDate(
        timeOfCounselling,
        language
      )}(${userTimeZone})\n`;
    }
  }
  
  if (language === 'en') {
    content += `\nTopic(optional): \n${
      questionInfo?.question_topic === undefined ||
      questionInfo?.question_topic === null ||
      questionInfo?.question_topic === ''
        ? 'Omitted'
        : questionInfo?.question_topic
    }\n`;
  } else if (language === 'ko') {
    content += `\n질문 주제(생략 가능): \n${
      questionInfo?.question_topic === undefined ||
      questionInfo?.question_topic === null ||
      questionInfo?.question_topic === ''
        ? '생략'
        : questionInfo?.question_topic
    }\n`;
  } else if (language === 'ja') {
    content += `\n質問のテーマ(省略可): \n${
      questionInfo?.question_topic === undefined ||
      questionInfo?.question_topic === null ||
      questionInfo?.question_topic === ''
        ? '省略'
        : questionInfo?.question_topic
    }\n`;
  }
  
  if (language === 'en') {
    content += `\nTarget of Question(optional): \n${
      questionInfo?.subject === undefined ||
      questionInfo?.subject === null ||
      questionInfo?.subject === ''
        ? 'Omitted'
        : questionInfo?.subject
    }\n`;
  } else if (language === 'ko') {
    content += `\n질문의 대상(생략 가능): \n${
      questionInfo?.subject === undefined ||
      questionInfo?.subject === null ||
      questionInfo?.subject === ''
        ? '생략'
        : questionInfo?.subject
    }\n`;
  } else if (language === 'ja') {
    content += `\n質問の対象(省略可): \n${
      questionInfo?.subject === undefined ||
      questionInfo?.subject === null ||
      questionInfo?.subject === ''
        ? '省略'
        : questionInfo?.subject
    }\n`;
  }
  
  if (language === 'en') {
    content += `\nRelated one to the target(optional): \n${
      questionInfo?.object === undefined ||
      questionInfo?.object === null ||
      questionInfo?.object === ''
        ? 'Omitted'
        : questionInfo?.object
    }\n`;
  } else if (language === 'ko') {
    content += `\n대상의 상대(생략 가능): \n${
      questionInfo?.object === undefined ||
      questionInfo?.object === null ||
      questionInfo?.object === ''
        ? '생략'
        : questionInfo?.object
    }\n`;
  } else if (language === 'ja') {
    content += `\n対象の相手(省略可): \n${
      questionInfo?.object === undefined ||
      questionInfo?.object === null ||
      questionInfo?.object === ''
        ? '省略'
        : questionInfo?.object
    }\n`;
  }
  
  if (language === 'en') {
    content += `\nRelationship(optional)`;
    content += `\nTarget: ${questionInfo?.relationship_subject || 'Omitted'}`;
    content += `\nObject(Related one): ${
      questionInfo?.relationship_object || 'Omitted'
    }\n`;
  } else if (language === 'ko') {
    content += `\n관계(생략 가능)`;
    content += `\n질문의 대상: ${questionInfo?.relationship_subject || '생략'}`;
    content += `\n대상의 상대: ${
      questionInfo?.relationship_object || '생략'
    }\n`;
  } else if (language === 'ja') {
    content += `\n関係(省略可)`;
    content += `\n質問の対象: ${questionInfo?.relationship_subject || '省略'}`;
    content += `\n対象の相手: ${questionInfo?.relationship_object || '省略'}\n`;
  }
  
  if (
    spreadInfo?.spreadListNumber !== 201 &&
    spreadInfo?.spreadListNumber !== 304
  ) {
    if (language === 'en') {
      content += `\nStatement about the Situation(optional): \n${
        questionInfo?.situation === undefined ||
        questionInfo?.situation === null ||
        questionInfo?.situation === ''
          ? 'Omitted'
          : questionInfo?.situation
      }\n`;
    } else if (language === 'ko') {
      content += `\n질문 내용의 배경(생략 가능): \n${
        questionInfo?.situation === undefined ||
        questionInfo?.situation === null ||
        questionInfo?.situation === ''
          ? '생략'
          : questionInfo?.situation
      }\n`;
    } else if (language === 'ja') {
      content += `\n質問内容の背景(省略可): \n${
        questionInfo?.situation === undefined ||
        questionInfo?.situation === null ||
        questionInfo?.situation === ''
          ? '省略'
          : questionInfo?.situation
      }\n`;
    }
  }
  
  if (spreadInfo?.spreadListNumber === 201) {
    if (language === 'en') {
      content += `\nOption 1: \n${questionInfo?.firstOption || 'Omitted'}\n`;
      content += `\nOption 2: \n${questionInfo?.secondOption || 'Omitted'}\n`;
    } else if (language === 'ko') {
      content += `\n선택지1: \n${questionInfo?.firstOption || '생략'}\n`;
      content += `\n선택지2: \n${questionInfo?.secondOption || '생략'}\n`;
    } else if (language === 'ja') {
      content += `\n選択肢1: \n${questionInfo?.firstOption || '省略'}\n`;
      content += `\n選択肢2: \n${questionInfo?.secondOption || '省略'}\n`;
    }
  }
  
  if (spreadInfo?.spreadListNumber === 304) {
    if (language === 'en') {
      content += `\nOption 1: \n${questionInfo?.firstOption || 'Omitted'}\n`;
      content += `\nOption 2: \n${questionInfo?.secondOption || 'Omitted'}\n`;
      content += `\nOption 3: \n${questionInfo?.thirdOption || 'Omitted'}\n`;
    } else if (language === 'ko') {
      content += `\n선택지1: \n${questionInfo?.firstOption || '생략'}\n`;
      content += `\n선택지2: \n${questionInfo?.secondOption || '생략'}\n`;
      content += `\n선택지3: \n${questionInfo?.thirdOption || '생략'}\n`;
    } else if (language === 'ja') {
      content += `\n選択肢1: \n${questionInfo?.firstOption || '省略'}\n`;
      content += `\n選択肢2: \n${questionInfo?.secondOption || '省략'}\n`;
      content += `\n選択肢3: \n${questionInfo?.thirdOption || '省략'}\n`;
    }
  }
  
  if (language === 'en') {
    content += `\nQuestion: \n${
      questionInfo?.question === undefined ||
      questionInfo?.question === null ||
      questionInfo?.question === ''
        ? 'Omitted'
        : questionInfo?.question
    }\n\n`;
  } else if (language === 'ko') {
    content += `\n질문: \n${
      questionInfo?.question === undefined ||
      questionInfo?.question === null ||
      questionInfo?.question === ''
        ? '생략'
        : questionInfo?.question
    }\n\n`;
  } else if (language === 'ja') {
    content += `\n質問: \n${
      questionInfo?.question === undefined ||
      questionInfo?.question === null ||
      questionInfo?.question === ''
        ? '省略'
        : questionInfo?.question
    }\n\n`;
  }
  
  if (formattedAnswer) {
    if (language === 'en') {
      content += `\nResult:\n${formattedAnswer}\n`;
    } else if (language === 'ko') {
      content += `\n결과:\n${formattedAnswer}\n`;
    } else if (language === 'ja') {
      content += `\n結果:\n${formattedAnswer}\n`;
    }
  }
  
  if (showCardMeanings && cardMeanings) {
    if (language === 'en') {
      content += `\nCard Meanings:\n${extractAllText(cardMeanings)}\n`;
    } else if (language === 'ko') {
      content += `\n카드 의미:\n${extractAllText(cardMeanings)}\n`;
    } else if (language === 'ja') {
      content += `\nカードの意味:\n${extractAllText(cardMeanings)}\n`;
    }
  }

  return content;
};
export default AnswerModal;

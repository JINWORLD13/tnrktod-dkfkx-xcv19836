import React from 'react';

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
    `${symbolicKeywordArray[index] || t('interpretation.unknown_keyword')}): ` +
    `${interpretationArray[index] || t('interpretation.no_interpretation')}`
  );
};

const formatTarotInterpretation = (answer, whichTarot, browserLanguage, t) => {
  let parsedAnswer = answer;
  if (typeof parsedAnswer !== 'object') parsedAnswer = JSON.parse(answer);
  
  const lang = prefixesForComprehensive?.[browserLanguage]
    ? browserLanguage
    : 'en';
  
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
    lines?.push(`${prefixesForIndividual[lang]} :`);
    parsedAnswer?.individual?.interpretationArray?.forEach((_, index) => {
      lines?.push(formatIndividualCard(index, parsedAnswer, t));
    });
  }
  
  return lines.join('\n');
};

export default formatTarotInterpretation;

export function determineTarotType(answerForm, whichTarot = null) {
  if (!whichTarot) {
    if (
      typeof answerForm?.answer === 'string' &&
      !answerForm?.answer?.includes('{') &&
      !answerForm?.answer?.includes('arrOfPositionMeaningInSpread')
    ) {
      if (!answerForm?.answer?.includes('1)')) {
        whichTarot = 2;
      }
      if (answerForm?.answer?.includes('1)')) {
        whichTarot = 3;
      }
    } else if (
      typeof answerForm?.answer === 'string' &&
      answerForm?.answer?.includes('{') &&
      answerForm?.answer?.includes('arrOfPositionMeaningInSpread')
    ) {
      try {
        const parsedAnswer = JSON.parse(answerForm?.answer);
        if (!parsedAnswer?.individual) {
          whichTarot = 2;
        }
        if (parsedAnswer?.individual) {
          whichTarot = 3;
        }
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
        whichTarot = 2; 
      }
    } else if (typeof answerForm?.answer === 'object') {
      if (!answerForm?.answer?.individual) {
        whichTarot = 2;
      }
      if (answerForm?.answer?.individual) {
        whichTarot = 3;
      }
    }
  }
  return whichTarot;
}

const validate = (finalMessage, data) => {
  if (!finalMessage || typeof finalMessage !== 'string') {
    console.error("Validation error: finalMessage가 유효하지 않음");
    return false;
  }
  if (!data || typeof data !== 'object') {
    console.error("Validation error: data가 유효하지 않음");
    return false;
  }
  try {
    let cleanMessage = finalMessage.trim();
    if (cleanMessage.includes('```')) {
      cleanMessage = cleanMessage
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();
    }
    const parsedObj = JSON.parse(cleanMessage);
    if (!parsedObj || typeof parsedObj !== 'object' || Array.isArray(parsedObj)) {
      console.error("Validation error: 파싱된 객체가 유효하지 않음");
      return false;
    }
    const { spreadInfo, whichTarot, language } = data;
    if (!parsedObj.comprehensive || 
        typeof parsedObj.comprehensive !== 'string' || 
        parsedObj.comprehensive.trim().length === 0) {
      console.error("Validation error: comprehensive 필드 누락 또는 빈 문자열");
      return false;
    }
    const needsIndividual = (whichTarot === 3 || whichTarot === 4) && 
                           spreadInfo && 
                           Number(spreadInfo.cardCount) > 1;
    if (needsIndividual) {
      if (!parsedObj.individual || typeof parsedObj.individual !== 'object') {
        console.error("Validation error: individual 필드 누락 (다중 카드 스프레드)");
        return false;
      }
      const cardCount = Number(spreadInfo.cardCount);
      if (!Array.isArray(parsedObj.individual.symbolicKeywordArray) ||
          parsedObj.individual.symbolicKeywordArray.length !== cardCount) {
        console.error(`Validation error: symbolicKeywordArray 길이 불일치 (예상: ${cardCount}, 실제: ${parsedObj.individual.symbolicKeywordArray?.length})`);
        return false;
      }
      if (parsedObj.individual.interpretationArray !== "neglect." &&
          (!Array.isArray(parsedObj.individual.interpretationArray) ||
           parsedObj.individual.interpretationArray.length !== cardCount)) {
        console.error(`Validation error: interpretationArray 길이 불일치 (예상: ${cardCount}, 실제: ${parsedObj.individual.interpretationArray?.length})`);
        return false;
      }
    }
    if (!language) {
      console.warn("Validation warning: language 정보 없음, 언어 검증 건너뜀");
      return true;
    }
    const validateLanguage = (obj, targetLang) => {
      const textToCheck = JSON.stringify(obj);
      switch (targetLang) {
        case "English Language":
          const hasNonEnglish = /[ㄱ-ㅎ가-힣ひらがなカタカナ]/g.test(textToCheck);
          const hasCJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2EBEF]/u.test(textToCheck);
          if (hasNonEnglish || hasCJK) {
            console.error("Validation error: 영어가 아닌 문자 감지");
            return false;
          }
          break;
        case "Korean Language":
          const hasKorean = /[ㄱ-ㅎ가-힣]/g.test(textToCheck);
          if (!hasKorean) {
            console.error("Validation error: 한글 없음");
            return false;
          }
          const hasKoreanCJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2EBEF]/u.test(textToCheck);
          const hasJapanese = /[ひらがなカタカナ]/g.test(textToCheck);
          if (hasKoreanCJK) {
            console.error("Validation error: 한자 감지");
            return false;
          }
          if (hasJapanese) {
            console.error("Validation error: 일본어 감지");
            return false;
          }
          const comprehensiveText = JSON.stringify(obj.comprehensive);
          const hasEnglishInComp = /[a-zA-Z]/g.test(comprehensiveText);
          if (hasEnglishInComp) {
            console.error("Validation error: comprehensive에 영어 감지");
            return false;
          }
          if (needsIndividual && obj.individual) {
            if (obj.individual.interpretationArray !== "neglect.") {
              const individualText = JSON.stringify(obj.individual.interpretationArray?.join("") || "");
              const hasEnglishInInd = /[a-zA-Z]/g.test(individualText);
              if (hasEnglishInInd) {
                console.error("Validation error: individual interpretationArray에 영어 감지");
                return false;
              }
            }
            const symbolicText = JSON.stringify(obj.individual.symbolicKeywordArray?.join("") || "");
            const hasEnglishInSym = /[a-zA-Z]/g.test(symbolicText);
            if (hasEnglishInSym) {
              console.error("Validation error: symbolicKeywordArray에 영어 감지");
              return false;
            }
          }
          break;
        case "Japanese Language":
          const hasJapaneseChars = /[ひらがなカタカナ一-龯]/g.test(textToCheck);
          if (!hasJapaneseChars) {
            console.error("Validation error: 일본어 없음");
            return false;
          }
          const hasKoreanChars = /[ㄱ-ㅎ가-힣]/g.test(textToCheck);
          if (hasKoreanChars) {
            console.error("Validation error: 한글 감지");
            return false;
          }
          const jpCompText = JSON.stringify(obj.comprehensive);
          const hasEnglishInJpComp = /[a-zA-Z]/g.test(jpCompText);
          if (hasEnglishInJpComp) {
            console.error("Validation error: comprehensive에 영어 감지");
            return false;
          }
          if (needsIndividual && obj.individual) {
            if (obj.individual.interpretationArray !== "neglect.") {
              const jpIndText = JSON.stringify(obj.individual.interpretationArray?.join("") || "");
              const hasEnglishInJpInd = /[a-zA-Z]/g.test(jpIndText);
              if (hasEnglishInJpInd) {
                console.error("Validation error: individual interpretationArray에 영어 감지");
                return false;
              }
            }
            const jpSymText = JSON.stringify(obj.individual.symbolicKeywordArray?.join("") || "");
            const hasEnglishInJpSym = /[a-zA-Z]/g.test(jpSymText);
            if (hasEnglishInJpSym) {
              console.error("Validation error: symbolicKeywordArray에 영어 감지");
              return false;
            }
          }
          break;
        default:
          console.warn(`Validation warning: 알 수 없는 언어 설정: ${targetLang}`);
          return true;
      }
      return true;
    };
    if (!validateLanguage(parsedObj, language)) {
      return false;
    }
    console.log("Validation passed: 모든 검증 통과");
    return true;
  } catch (error) {
    console.error("Validation error:", error.message);
    if (error instanceof SyntaxError) {
      console.error("JSON 구문 오류. 메시지 미리보기:", finalMessage.substring(0, 200) + "...");
    }
    return false;
  }
};
module.exports = { validate };

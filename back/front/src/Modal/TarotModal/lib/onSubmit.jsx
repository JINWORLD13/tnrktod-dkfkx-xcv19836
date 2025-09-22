export const onSubmit = async (
  e,
  updatedSelectedTarotCards,
  {
    setWhichAds,
    updateQuestionForm,
    updateAnswerForm,
    setWhichCardPosition,
    setAdsWatched,
    dispatch,
    setIsWaiting,
    setIsAnswered,
    setIsDoneAnimationOfBackground,
    setIsReadyToShowDurumagi,
    questionForm,
    userInfo,
    whichTarot,
    isVoucherModeOn,
    tarotSpreadVoucherPrice,
    browserLanguage,
    props,
    tarotApi,
    isAdsFreePassValid,
  }
) => {
  e.preventDefault(); 
  setWhichAds(0);
  const tarotCardsNameArr = updatedSelectedTarotCards.map((elem, i) => {
    return elem?.name;
  });
  const reverseStatesArr = updatedSelectedTarotCards.map((elem, i) => {
    if (elem.reversed === true) {
      return 'reversed';
    } else {
      return 'normal_direction';
    }
  });
  const selectedTarotCardsArr = tarotCardsNameArr.map((elem, i) => {
    return elem + ' ' + '(' + reverseStatesArr[i] + ')';
  });
  const questionInfo =
    questionForm?.spreadListNumber === 201 ||
    questionForm?.spreadListNumber === 304
      ? {
          question_topic: questionForm['question_topic'].trim(),
          subject: questionForm?.subject.trim(),
          object: questionForm?.object.trim(),
          relationship_subject: questionForm['relationship_subject'].trim(),
          relationship_object: questionForm['relationship_object'].trim(),
          theme: questionForm?.theme.trim(),
          situation: questionForm?.situation.trim(),
          question: questionForm?.question.trim(),
          firstOption: questionForm?.['firstOption']?.trim(),
          secondOption: questionForm?.['secondOption']?.trim(),
          thirdOption: questionForm?.['thirdOption']?.trim(),
        }
      : {
          question_topic: questionForm['question_topic'].trim(),
          subject: questionForm?.subject.trim(),
          object: questionForm?.object.trim(),
          relationship_subject: questionForm['relationship_subject'].trim(),
          relationship_object: questionForm['relationship_object'].trim(),
          theme: questionForm?.theme.trim(),
          situation: questionForm?.situation.trim(),
          question: questionForm?.question.trim(),
        };
  const spreadInfo = {
    spreadTitle: questionForm?.spreadTitle,
    cardCount: questionForm?.cardCount,
    spreadListNumber: questionForm?.spreadListNumber,
    selectedTarotCardsArr: selectedTarotCardsArr,
  };
  updateQuestionForm(prev => {
    return {
      ...prev,
      cardCount: questionForm?.cardCount,
      spreadTitle: questionForm?.spreadTitle,
      spreadListNumber: questionForm?.spreadListNumber,
    };
  });
  let result;
  const currentTime = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let tarotInfo = {
    isOwned:
      userInfo?.email === import.meta.env.VITE_COS1 ||
      userInfo?.email === import.meta.env.VITE_COS2 ||
      userInfo?.email === import.meta.env.VITE_COS3 ||
      userInfo?.email === import.meta.env.VITE_COS4 
        ? true
        : false,
    questionInfo: { ...questionInfo },
    spreadInfo: { ...spreadInfo },
    tarotSpreadVoucherPrice: tarotSpreadVoucherPrice,
    language: browserLanguage,
    time: currentTime,
    formattedTime: currentTime?.toLocaleString(
      ['ko-KR', 'ja-JP', 'en-US'].find(locale =>
        locale.startsWith(browserLanguage)
      ) || 'en-US',
      {
        timeZone:
          browserLanguage === 'ko'
            ? 'Asia/Seoul'
            : browserLanguage === 'ja'
            ? 'Asia/Tokyo'
            : userTimeZone,
      }
    ),
    isVoucherModeOn:
      props?.whichTarot === 2 ? (props?.isVoucherModeOn ? true : false) : true, 
  };
  updateAnswerForm(prev => {
    return {
      ...prev,
      isWaiting: true, 
      isAnswered: false, 
      isSubmitted: true,
    };
  });
  if (
    whichTarot === 2 &&
    (isVoucherModeOn || (!isVoucherModeOn && isAdsFreePassValid(userInfo)))
  ) {
    result = await tarotApi.postQuestionForNormalForAnthropicAPI(tarotInfo);
  }
  if (whichTarot === 3) {
    result = await tarotApi.postQuestionForDeepForAnthropicAPI(tarotInfo);
  }
  if (whichTarot === 4) {
    result = await tarotApi.postQuestionForSeriousForAnthropicAPI(tarotInfo);
  }
  if (result?.response !== undefined && result?.response !== null) {
    setWhichCardPosition(prev => {
      return {
        isClicked: false,
        position: -1,
      };
    });
    const parsedObj = JSON.parse(result?.response?.answer);
    updateAnswerForm({
      questionInfo,
      spreadInfo,
      answer: parsedObj || result?.response?.answer,
      language: result.response.language,
      timeOfCounselling: result.response.timeOfCounselling,
      createdAt: result.response.createdAt,
      updatedAt: result.response.updatedAt,
      isWaiting: false,
      isSubmitted: false,
      isAnswered: true,
    });
    dispatch(setIsWaiting(false));
    dispatch(setIsAnswered(true));
    dispatch(setIsReadyToShowDurumagi(true));
    setAdsWatched(false);
    setWhichAds(0);
  }
  if (whichTarot === 2 && !isVoucherModeOn && !isAdsFreePassValid(userInfo)) {
    updateAnswerForm({
      questionInfo,
      spreadInfo,
      answer: '',
      language: tarotInfo.language,
      timeOfCounselling: tarotInfo.time,
      createdAt: '',
      updatedAt: '',
      isWaiting: false,
      isSubmitted: false,
      isAnswered: true,
    });
    dispatch(setIsWaiting(false));
    dispatch(setIsAnswered(true));
    dispatch(setIsDoneAnimationOfBackground(false));
    dispatch(setIsReadyToShowDurumagi(false));
    setAdsWatched(false);
    setWhichAds(0);
  }
};

const {
  assistantCommandFirst,
  assistantCommandForAskingForForm,
  assistantCommandForAskingForRule,
} = require("../command/assistantCommand");
const {
  userCommandFirst,
  userCommandForAsking,
  userCommandForAskingForForm,
  userCommandForAskingForRule,
  userCommandForAskingForRuleForAds,
  userCommandForAskingForFormForAds,
  userCommandForAskingForFormOfOneCard,
  userCommandForAskingForRuleOfOneCard,
} = require("../command/userCommand");
const log = {
  logValuesOfTokensForClaude: (
    input_price_per_1k,
    output_price_per_1k,
    KRWPerDollar,
    msg
  ) => {
    console.log("토큰수 계산 : ", msg?.usage);
    if (msg?.usage?.cache_read_input_tokens > 0) {
      console.log(
        "인풋값 계산 : ",
        (msg?.usage?.input_tokens + msg?.usage?.cache_read_input_tokens * 0.1) *
          input_price_per_1k *
          0.001,
        "달러"
      );
    } else {
      console.log(
        "인풋값 계산 : ",
        msg?.usage?.input_tokens * input_price_per_1k * 0.001,
        "달러"
      );
    }
    console.log(
      "아웃풋값 계산 : ",
      msg?.usage?.output_tokens * output_price_per_1k * 0.001,
      "달러"
    );
    if (msg?.usage?.cache_read_input_tokens > 0) {
      console.log(
        "토탈값 계산 : ",
        (msg?.usage?.input_tokens + msg?.usage?.cache_read_input_tokens * 0.1) *
          input_price_per_1k *
          0.001 +
          msg?.usage?.output_tokens * output_price_per_1k * 0.001,
        "달러"
      );
      console.log(
        `토탈값 원화환산 계산(환율 : ${KRWPerDollar}원 / 달러) : `,
        (msg?.usage?.input_tokens + msg?.usage?.cache_read_input_tokens * 0.1) *
          input_price_per_1k *
          0.001 *
          KRWPerDollar +
          msg?.usage?.output_tokens *
            output_price_per_1k *
            0.001 *
            KRWPerDollar,
        "원"
      );
    } else {
      console.log(
        "토탈값 계산 : ",
        msg?.usage?.input_tokens * input_price_per_1k * 0.001 +
          msg?.usage?.output_tokens * output_price_per_1k * 0.001,
        "달러"
      );
      console.log(
        `토탈값 원화환산 계산(환율 : ${KRWPerDollar}원 / 달러) : `,
        msg?.usage?.input_tokens * input_price_per_1k * 0.001 * KRWPerDollar +
          msg?.usage?.output_tokens *
            output_price_per_1k *
            0.001 *
            KRWPerDollar,
        "원"
      );
    }
  },
  logValuesOfTokens: (
    input_price_per_1k,
    output_price_per_1k,
    KRWPerDollar,
    completion
  ) => {
    console.log("토큰수 계산 : ", completion?.usage);
    console.log(
      "인풋값 계산 : ",
      completion?.usage?.prompt_tokens * input_price_per_1k * 0.001,
      "달러"
    );
    console.log(
      "아웃풋값 계산 : ",
      completion?.usage?.completion_tokens * output_price_per_1k * 0.001,
      "달러"
    );
    console.log(
      "토탈값 계산 : ",
      completion?.usage?.prompt_tokens * input_price_per_1k * 0.001 +
        completion?.usage?.completion_tokens * output_price_per_1k * 0.001,
      "달러"
    );
    console.log(
      `토탈값 원화환산 계산(환율 : ${KRWPerDollar}원 / 달러) : `,
      completion?.usage?.prompt_tokens *
        input_price_per_1k *
        0.001 *
        KRWPerDollar +
        completion?.usage?.completion_tokens *
          output_price_per_1k *
          0.001 *
          KRWPerDollar,
      "원"
    );
  },
  logSysAndUserCommand: (
    questionInfo,
    spreadInfo,
    comments,
    occupation,
    careerPath,
    decisionMaking,
    drawnCards,
    language
  ) => {
    console.log("user1 : ", userCommandFirst(language));
    console.log("assistant1 : ", assistantCommandFirst(language));
    console.log(
      "user2 : ",
      userCommandForAsking(
        questionInfo,
        spreadInfo,
        comments,
        occupation,
        careerPath,
        decisionMaking,
        drawnCards
      )
    );
    console.log("assistant2 : ", assistantCommandForAskingForForm(language));
    console.log(
      "user3 : ",
      userCommandForAskingForForm(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log("assistant3 : ", assistantCommandForAskingForRule(language));
    console.log(
      "user4 : ",
      userCommandForAskingForRule(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log(
      "assiatant4 : ",
      "Okay. Before proceeding, I'd like to inquire about the format of the response again."
    );
    console.log(
      "user5 : ",
      userCommandForAskingForForm(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log("assiatant5 : ", "Ok. Let me answer now.");
  },
  logSysAndUserCommandForOneCard: (
    questionInfo,
    spreadInfo,
    comments,
    occupation,
    careerPath,
    decisionMaking,
    drawnCards,
    language
  ) => {
    console.log("user1 : ", userCommandFirst(language));
    console.log("assistant1 : ", assistantCommandFirst(language));
    console.log(
      "user2 : ",
      userCommandForAsking(
        questionInfo,
        spreadInfo,
        comments,
        occupation,
        careerPath,
        decisionMaking,
        drawnCards
      )
    );
    console.log("assistant2 : ", assistantCommandForAskingForForm(language));
    console.log(
      "user3 : ",
      userCommandForAskingForFormOfOneCard(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log("assistant3 : ", assistantCommandForAskingForRule(language));
    console.log(
      "user4 : ",
      userCommandForAskingForRuleOfOneCard(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log(
      "assiatant4 : ",
      "Okay. Before proceeding, I'd like to inquire about the format of the response again."
    );
    console.log(
      "user5 : ",
      userCommandForAskingForFormOfOneCard(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log("assiatant5 : ", "Ok. Let me answer now.");
  },
  logSysAndUserCommandForAds: (
    questionInfo,
    spreadInfo,
    comments,
    occupation,
    careerPath,
    decisionMaking,
    drawnCards,
    whichTarot,
    isOwned,
    language
  ) => {
    console.log("user1 : ", userCommandFirst(language));
    console.log("assistant1 : ", assistantCommandFirst(language));
    console.log(
      "user2 : ",
      userCommandForAsking(
        questionInfo,
        spreadInfo,
        comments,
        occupation,
        careerPath,
        decisionMaking,
        drawnCards
      )
    );
    console.log("assistant2 : ", assistantCommandForAskingForForm(language));
    console.log(
      "user3 : ",
      userCommandForAskingForFormForAds(
        questionInfo.question,
        spreadInfo.spreadListNumber,
        spreadInfo.selectedTarotCardsArr,
        whichTarot,
        isOwned,
        language
      )
    );
    console.log("assistant3 : ", assistantCommandForAskingForRule(language));
    console.log(
      "user4 : ",
      userCommandForAskingForRuleForAds(
        questionInfo?.question,
        spreadInfo?.selectedTarotCardsArr,
        language
      )
    );
    console.log(
      "assiatant4 : ",
      "Okay. Before proceeding, I'd like to inquire about the format of the response again."
    );
    console.log(
      "user5 : ",
      userCommandForAskingForFormForAds(
        questionInfo.question,
        spreadInfo.spreadListNumber,
        spreadInfo.selectedTarotCardsArr,
        whichTarot,
        isOwned,
        language
      )
    );
    console.log("assiatant5 : ", "Ok. Let me answer now.");
  },
};
module.exports = log;

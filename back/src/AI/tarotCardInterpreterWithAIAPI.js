const { anthropic, openai, grok } = require("./model/model-list");
const { translateTarotCardName } = require("./lib/cardNameTranslator");
const {
  getSpreadDescriptions,
  getSpreadDescriptionsList,
} = require("./lib/getSpreadDescription");
const { formatTarotCards } = require("./lib/formatTarotCards");
const { getLanguageSettings } = require("./lib/getLanguageSetting");
const { stripOuterBraces } = require("./lib/stripOuterBraces");
const { validate } = require("./utils/validate");
const { TAROT_CONFIG } = require("../config/tarotConfig");
const { default: processMessage } = require("./utils/messageProcessor");
const { processTarotResult } = require("./utils/processTarotResult");
const tarotCardInterpreterWithAIAPI = async (inputData, whichTarot) => {
  const isOwned = inputData?.isOwned;
  const questionInfo = inputData?.questionInfo;
  const spreadInfo = inputData?.spreadInfo;
  const selectedTarotCardsArr = spreadInfo?.selectedTarotCardsArr;
  const isVoucherMode = inputData?.isVoucherModeOn;
  let {
    formattedTimeOfCounselling,
    language,
    occupation,
    careerPath,
    decisionMaking,
    assistant_id,
  } = getLanguageSettings(inputData);
  const cardsArr = translateTarotCardName(selectedTarotCardsArr, language);
  let drawnCardsArr = formatTarotCards(
    language,
    spreadInfo,
    selectedTarotCardsArr,
    cardsArr
  );
  let drawnCards = drawnCardsArr?.join(", ");
  const comments = getSpreadDescriptions(
    inputData?.language,
    drawnCardsArr,
    questionInfo,
    spreadInfo
  );
  let AnthropicModel, GrokModel, OpenAIModel;
  const { Sun, Moon, Star, max_tokens } = TAROT_CONFIG[whichTarot];
  AnthropicModel = Sun;
  OpenAIModel = Moon;
  GrokModel = Star;
  const rateForConsoleLog = 1460;
  const data = {
    isOwned,
    questionInfo,
    spreadInfo,
    selectedTarotCardsArr,
    formattedTimeOfCounselling,
    language,
    occupation,
    careerPath,
    decisionMaking,
    assistant_id,
    cardsArr,
    drawnCardsArr,
    drawnCards,
    comments,
    AnthropicModel,
    GrokModel,
    OpenAIModel,
    max_tokens,
    whichTarot,
    rateForConsoleLog,
    anthropic,
    openai,
    grok,
    isVoucherMode,
  };
  const finalMessage = await processMessage(data, whichTarot, isVoucherMode);
  let result;
  const validation = validate(stripOuterBraces(finalMessage), data);
  if (!validation) {
    const validatedFinalMessage = await tryAnthropicFinalMsg(
      data,
      finalMessage
    );
    const validation = validate(stripOuterBraces(validatedFinalMessage), data);
    if (validation) result = stripOuterBraces(validatedFinalMessage);
  }
  result = processTarotResult({
    result,
    finalMessage,
    whichTarot,
    spreadInfo,
    language,
    questionInfo,
    selectedTarotCardsArr,
  });
  return result;
};
module.exports = tarotCardInterpreterWithAIAPI;

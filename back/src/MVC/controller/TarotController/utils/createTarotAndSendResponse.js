const { tarotService } = require("../../../service");
async function createTarotAndSendResponse(
  inputQuestionData,
  interpretation,
  type,
  userInfo,
  res
) {
  const timeOfCounselling = inputQuestionData?.time;
  const newTarotInfo = {
    ...inputQuestionData,
    answer: interpretation,
    type: type,
    userInfo,
    timeOfCounselling,
  };
  const newTarot = await tarotService.createTarot(newTarotInfo);
  const {
    questionInfo,
    spreadInfo,
    answer,
    language,
    createdAt,
    updatedAt,
    ...rest
  } = newTarot;
  res.status(200).json({
    questionInfo,
    spreadInfo,
    answer,
    language,
    createdAt,
    updatedAt,
    timeOfCounselling,
  });
}
module.exports = createTarotAndSendResponse;

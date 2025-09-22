const log = require("../../lib/log_newly_test");
const { systemPrompt } = require("../../prompt/system-prompt");
const { userPrompt } = require("../../prompt/user-prompt");
const finalMsgInterpreterOfOpenAI = async (data, firstMessage) => {
  let {
    isOwned,
    questionInfo,
    spreadInfo,
    formattedTimeOfCounselling,
    language,
    OpenAIModel,
    max_tokens,
    whichTarot,
    rateForConsoleLog,
    openai,
    ...rest
  } = data;
  let finalResponseMsg;
  const msgs = [
    {
      role: whichTarot === 2 ? "system" : "developer",
      content: systemPrompt(whichTarot, isOwned, language),
    },
    {
      role: "user",
      content: userPrompt({
        questionInfo,
        spreadInfo,
        whichTarot,
        isOwned,
        formattedTimeOfCounselling,
        language,
      }),
    },
  ];
  if (firstMessage) {
    msgs.push({
      role: "assistant",
      content: `${firstMessage}\n
      `,
    });
    msgs.push({
      role: "user",
      content: `Please check if any error in interpretataion, upgrade the answer, and answer accordingly.
      `,
    });
  }
  try {
    finalResponseMsg = await openai?.chat?.completions?.create({
      model: OpenAIModel,
      temperature: 0.03,
      max_tokens: max_tokens,
      messages: msgs,
    });
  } catch (error) {
    console.error("OpenAI Final Msg error : ", error);
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    if (whichTarot === 2)
      log.logValuesOfTokens(
        0.00015,
        0.0006,
        rateForConsoleLog,
        finalResponseMsg
      );
    if (whichTarot === 3)
      log.logValuesOfTokens(0.005, 0.015, rateForConsoleLog, finalResponseMsg);
    if (whichTarot === 4)
      log.logValuesOfTokens(0.005, 0.015, rateForConsoleLog, finalResponseMsg);
  }
  return finalResponseMsg.choices[0].message.content;
};
module.exports = finalMsgInterpreterOfOpenAI;

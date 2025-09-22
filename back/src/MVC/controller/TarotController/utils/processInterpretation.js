function processInterpretation(interpretation, inputQuestionData) {
  let lastEightCharacters = interpretation.trim().slice(-8);
  let lastFiveCharacters = interpretation.trim().slice(-5);
  let lastFourCharacters = interpretation.trim().slice(-4);
  let finalInterpretation;
  if (lastFiveCharacters === "false") {
    finalInterpretation = interpretation.trim().slice(0, -5);
  } else if (lastFourCharacters === "true") {
    finalInterpretation = interpretation.trim().slice(0, -4);
  } else if (lastEightCharacters === "explicit") {
    finalInterpretation = interpretation.trim().slice(0, -8);
  } else {
    finalInterpretation = interpretation.trim();
  }
  const interpretationWithoutQuestionArray = finalInterpretation
    ?.trim()
    ?.split("\n")
    ?.filter((sentence) => sentence !== inputQuestionData.questionInfo.question);
  let interpretationWithoutQuestion =
    interpretationWithoutQuestionArray?.join("\n");
  return interpretationWithoutQuestion;
}
module.exports = processInterpretation;

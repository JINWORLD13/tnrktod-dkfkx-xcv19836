export const findTopFrequentQuestionTopics = (obj, topCount = 5, browserLanguage) => {
  const questionTopicArr = obj
    .map((elem, i) => {
      if (elem.language !== browserLanguage) return null;
      const questionTopic = elem?.questionInfo['question_topic'] ?? null;
      return questionTopic !== null && questionTopic !== '' && questionTopic !== undefined
        ? questionTopic
        : null;
    })
    ?.filter(
      questionTopic => questionTopic !== null && questionTopic !== '' && questionTopic !== undefined
    );
  const frequencyCounter = {};
  questionTopicArr.forEach(element => {
    frequencyCounter[element] = (frequencyCounter[element] || 0) + 1;
  });
  const sortedEntries = Object.entries(frequencyCounter).sort(
    (a, b) => b[1] - a[1]
  );
  const topQuestionTopicArr = sortedEntries.slice(0, topCount).map(entry => entry[0]);
  return topQuestionTopicArr;
};

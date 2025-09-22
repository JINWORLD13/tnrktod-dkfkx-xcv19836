import { formattingDate } from './formattingDate';
export const findQuestionsOfTopTopics = (tarotHistory, topTopicsArr) => {
  const questionsOfTopTopicsArr = topTopicsArr.map((topTopic, i) => {
    const filteredTarots = tarotHistory?.filter((tarot, i) => {
      tarot.questionInfo.question_topic === topTopic;
    });
    return filteredTarots.map((filteredTarot, i) => {
      return filteredTarot.questionInfo.question;
    });
  });
  return questionsOfTopTopicsArr;
};
export const findDatesOfTopic = (
  tarotHistory,
  topic,
  question,
  browserLanguage
) => {
  const DatesOfTopic = tarotHistory
    .map((tarot, i) => {
      if (tarot.questionInfo.question_topic !== topic) return;
      let formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      return formattedDate;
    })
    ?.filter(elem => elem !== undefined && elem !== null);
  return DatesOfTopic;
};

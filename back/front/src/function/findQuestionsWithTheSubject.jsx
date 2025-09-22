import { formattingDate } from "./formattingDate";
export const findQuestionsOfTopSubjects = (tarotHistory, topSubjectArr) => {
  const questionsOfTopSubjectsArr = topSubjectArr.map((topSubject, i) => {
    const filteredTarots = tarotHistory?.filter((tarot, i) => {
      return tarot.questionInfo.subject === topSubject;
    });
    return filteredTarots.map((filteredTarot, i) => {
      return filteredTarot.questionInfo.question;
    });
  });
  return questionsOfTopSubjectsArr;
};
export const findQuestionsOfSubject = (tarotHistory, subject) => {
  const questionsOfSubject = tarotHistory
    .map((tarot, i) => {
      if (tarot.questionInfo.subject !== subject) return;
      return tarot.questionInfo.question;
    })
    ?.filter(elem => elem !== undefined && elem !== null);
  return questionsOfSubject;
};
export const findDatesOfSubjectWithQuestion = (tarotHistory, subject, question, browserLanguage) => {
  const DatesOSubjectWithQuestion = tarotHistory
    .map((tarot, i) => {
      if (tarot.questionInfo.subject !== subject) return;
      if (tarot.questionInfo.question !== question) return;
      let formattedDate = formattingDate(tarot?.updatedAt, browserLanguage);
      return formattedDate;
    })
    ?.filter(elem => elem !== undefined && elem !== null);
  return DatesOSubjectWithQuestion;
};

export const findTopFrequentSubjects = (obj, topCount = 5, browserLanguage) => {
  const subjectArr = obj
    .map((elem, i) => {
      if (elem.language !== browserLanguage) return null;
      const subject = elem?.questionInfo?.subject ?? null;
      return subject !== null && subject !== '' && subject !== undefined
        ? subject
        : null;
    })
    ?.filter(
      subject => subject !== null && subject !== '' && subject !== undefined
    );
  const frequencyCounter = {};
  subjectArr.forEach(element => {
    frequencyCounter[element] = (frequencyCounter[element] || 0) + 1;
  });
  const sortedEntries = Object.entries(frequencyCounter).sort(
    (a, b) => b[1] - a[1]
  );
  const topSubjectArr = sortedEntries.slice(0, topCount).map(entry => entry[0]);
  return topSubjectArr;
};

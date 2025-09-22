export const isWithinThisYear = oneTarotHistory => {
  const period = oneTarotHistory?.createdAt;
  const dataDate = new Date(period);
  const currentDate = new Date();
  const dataYear = dataDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  if (currentYear === dataYear) return true;
  return false;
};
export const isWithinThisThreeMonth = oneTarotHistory => {
  const currentDate = new Date();
  const tarotCreatedDateInDB = oneTarotHistory?.createdAt;
  const tarotCreatedDate = new Date(tarotCreatedDateInDB);
  const threeMonthsLater = new Date(
    tarotCreatedDate.getFullYear(),
    tarotCreatedDate.getMonth() + 3,
    tarotCreatedDate.getDate()
  );
  let remainingTime = threeMonthsLater - currentDate;
  if (remainingTime > 0) return true;
  return false;
};
export const isWithinThisMonth = oneTarotHistory => {
  const tarotCreatedDateInDB = oneTarotHistory?.createdAt;
  const tarotCreatedDate = new Date(tarotCreatedDateInDB);
  const yearOfTarotCreatedDate = tarotCreatedDate.getFullYear();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthOfTarotCreatedDate = tarotCreatedDate.getMonth();
  const currentMonth = currentDate.getMonth();
  if (
    currentMonth === monthOfTarotCreatedDate &&
    currentYear === yearOfTarotCreatedDate
  )
    return true;
  return false;
};
export const isWithinThisWeek = oneTarotHistory => {
  const A_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;
  const tarotCreatedDateInDB = oneTarotHistory?.createdAt;
  const tarotCreatedFullDate = new Date(tarotCreatedDateInDB);
  const tarotCreatedDate = tarotCreatedFullDate.getDate();
  const tarotCreatedDay = tarotCreatedFullDate.getDay();
  const monthOfTarotCreatedDate = tarotCreatedFullDate.getMonth();
  const currentFullDate = new Date();
  const currentDate = currentFullDate.getDate(); 
  const currentDay = currentFullDate.getDay(); 
  const currentYear = currentFullDate.getFullYear();
  if((currentFullDate - tarotCreatedFullDate) > A_WEEK_IN_MILLIS) return;
  const thisWeek = new Date(currentFullDate); 
  if (currentDay - tarotCreatedDay < 0) {
    return;
  } else if (currentDay - tarotCreatedDay > 0) {
    thisWeek.setDate(currentDate - currentDay);
  } else if (currentDay - tarotCreatedDay === 0) {
    thisWeek.setDate(currentDate - currentDay);
  }
  thisWeek.setHours(0, 0, 0, 0);
  const firstDateOfThisWeek = thisWeek.getDate();
  const monthOfFirstDateOfThisWeek = thisWeek.getMonth();
  const yearOfThisWeek = thisWeek.getFullYear();
  let isThisWeek;
  if (monthOfTarotCreatedDate === monthOfFirstDateOfThisWeek) {
    isThisWeek = tarotCreatedDate >= firstDateOfThisWeek;
  }
  if (monthOfTarotCreatedDate > monthOfFirstDateOfThisWeek) {
    isThisWeek = tarotCreatedDate < firstDateOfThisWeek;
  }
  if (monthOfTarotCreatedDate < monthOfFirstDateOfThisWeek) {
    if (currentYear === yearOfThisWeek) isThisWeek = false;
    if (currentYear !== yearOfThisWeek) {
      if (tarotCreatedFullDate - thisWeek <= A_WEEK_IN_MILLIS) {
        isThisWeek = true;
      } else {
        isThisWeek = false;
      }
    }
  }
  return isThisWeek;
};
export const isWithinThisDay = oneTarotHistory => {
  const tarotCreatedDateInDB = oneTarotHistory?.createdAt;
  const tarotCreatedDate = new Date(tarotCreatedDateInDB);
  const tarotCreatedDay = new Date();
  const yearOfTarotCreatedDay = tarotCreatedDate.getFullYear();
  const currentYear = tarotCreatedDay.getFullYear();
  const monthOfTarotCreatedDay = tarotCreatedDate.getMonth();
  const currentMonth = tarotCreatedDay.getMonth();
  const dayOfTarotCreatedDay = tarotCreatedDate.getDate();
  const currentDay = tarotCreatedDay.getDate();
  const isWithinThisDay =
    dayOfTarotCreatedDay === currentDay &&
    monthOfTarotCreatedDay === currentMonth &&
    yearOfTarotCreatedDay === currentYear;
  return isWithinThisDay;
};
export const isYearAgo = oneTarotHistory => {
  const period = oneTarotHistory?.createdAt;
  const dataDate = new Date(period);
  const currentDate = new Date();
  const dataYear = dataDate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const isWithinOneYearAgo = dataDate > oneYearAgo;
  if (currentYear === dataYear || isWithinOneYearAgo) return true;
  return false;
};
export const isMonthAgo = oneTarotHistory => {
  const period = oneTarotHistory?.createdAt;
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  const dataDate = new Date(period);
  const isWithinOneMonthAgo = dataDate > oneMonthAgo;
  return isWithinOneMonthAgo;
};
export const isWeekAgo = oneTarotHistory => {
  const period = oneTarotHistory?.createdAt;
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(currentDate.getDate() - 7);
  const dataDate = new Date(period);
  const isWithinOneWeekAgo = dataDate > oneWeekAgo;
  return isWithinOneWeekAgo;
};
export const isDayAgo = oneTarotHistory => {
  const period = oneTarotHistory?.createdAt;
  const currentDate = new Date();
  const oneDayAgo = new Date(currentDate);
  oneDayAgo.setDate(currentDate.getDate() - 1);
  const dataDate = new Date(period);
  const isWithinOneDayAgo = dataDate > oneDayAgo;
  return isWithinOneDayAgo;
};

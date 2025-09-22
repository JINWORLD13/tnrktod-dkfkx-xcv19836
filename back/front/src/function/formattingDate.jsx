export const formattingDate = (mongooseDateFormat, browserLanguage) => {
  let date;
  if (mongooseDateFormat instanceof Date) {
    date = mongooseDateFormat;
  } else {
    date = new Date(mongooseDateFormat);
    if (isNaN(date.getTime())) {
      console.error('Invalid date format');
      return '';
    }
  }
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let formattedDate;
  if(!browserLanguage) return;
  switch (browserLanguage) {
    case 'ko':
      formattedDate = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      break;
    case 'ja':
      formattedDate = date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      break;
    case 'en':
      formattedDate = date.toLocaleString('en-US', {
        timeZone: userTimeZone,
      });
      break;
    default:
      formattedDate = date.toLocaleString('en-US', {
        timeZone: userTimeZone,
      });
  }
  return formattedDate;
};

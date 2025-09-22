const localTimeToUTC = (
  zd = 0, 
  year,
  month,
  day,
  hour = 0,
  min = 0,
  sec = 0
) => {
  const local = new Date(Date.UTC(year, month - 1, day, hour, min, sec));
  return new Date(local.getTime() - zd * 60 * 60 * 1000).toISOString();
};
module.exports = localTimeToUTC;

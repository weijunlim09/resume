const useSortDescDate = (data, key) => {
  const sorted = data.sort((current, next) => {
    const currentSplit = current[key].split("/");
    const currentYear = parseInt(currentSplit[2]);
    const currentMonth = parseInt(currentSplit[1]) - 1;
    const currentDay = parseInt(currentSplit[0]);

    const nextSplit = next[key].split("/");
    const nextYear = parseInt(nextSplit[2]);
    const nextMonth = parseInt(nextSplit[1]) - 1;
    const nextDay = parseInt(nextSplit[0]);

    const nextDate = new Date(nextYear, nextMonth, nextDay);
    const currentDate = new Date(currentYear, currentMonth, currentDay);
    return nextDate - currentDate;
  });
  return { sorted };
};

export default useSortDescDate;

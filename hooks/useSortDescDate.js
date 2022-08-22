const useSortDescDate = (_arguments, startDateKey) => {
  const sorted = _arguments.sort((current, next) => {
    const nextDate = new Date(next[startDateKey]);
    const currentDate = new Date(current[startDateKey]);
    return nextDate - currentDate;
  });
  return { sorted };
};

export default useSortDescDate;

const useSortDescDate = (_arguments, key) => {
  const sorted = _arguments.sort((current, next) => {
    const nextDate = new Date(next[key]);
    const currentDate = new Date(current[key]);
    return nextDate - currentDate;
  });
  return { sorted };
};

export default useSortDescDate;

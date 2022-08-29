const useSortDescDate = (data, key) => {
  const sorted = data.sort((current, next) => {
    const nextDate = new Date(next[key]);
    const currentDate = new Date(current[key]);
    return nextDate - currentDate;
  });
  return { sorted };
};

export default useSortDescDate;

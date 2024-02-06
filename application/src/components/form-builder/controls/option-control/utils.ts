const getMood = (
  value: string,
  options: { value: string; label: string; uid: string }[]
) => {
  const index = options.findIndex((option) => option.value === value);
  if (options.length % 2 === 0) {
    if (index < options.length / 2) {
      return "positive";
    }
    return "negative";
  }

  const neutralIndex = Math.floor(options.length / 2);
  if (index === neutralIndex) {
    return "neutral";
  }
  if (index < neutralIndex) {
    return "positive";
  }
  return "negative";
};

export { getMood };

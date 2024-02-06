const getMood = (value: number) => {
  if (value > 8) {
    return "positive";
  }
  if (value < 7) {
    return "negative";
  }
  return "neutral";
};

export { getMood };

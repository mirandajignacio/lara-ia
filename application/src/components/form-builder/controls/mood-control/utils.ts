const getMood = (value: string) => {
  if (value === "2") {
    return "neutral";
  }
  if (value === "1" || value === "0") {
    return "negative";
  }
  return "positive";
};

export { getMood };

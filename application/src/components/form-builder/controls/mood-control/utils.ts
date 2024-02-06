const getMood = (value: string) => {
  if (value === "2") {
    return "neutral";
  }
  if (value === "3" || value === "4") {
    return "negative";
  }
  return "positive";
};

export { getMood };

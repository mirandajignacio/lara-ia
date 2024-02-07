const withDelay = (fn: () => void, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, delay);
  });
};

export { withDelay };

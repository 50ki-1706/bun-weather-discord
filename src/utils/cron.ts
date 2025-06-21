export const convertJstToUtc = (jstHour: number): number => {
  return (jstHour - 9 + 24) % 24;
};
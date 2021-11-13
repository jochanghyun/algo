export const solution = (gems: string[]): number[] => {
  const answer = new Set(gems);
  const gemsMap = new Map<string, number>();
  let start = 0;
  let end = 0;
  let result = [0, gems.length];
  for (let i = 0; i <= gems.length; i++) {
    while (gemsMap.size === answer.size) {
      if (result[1] - result[0] >= end - start) {
        if (result[1] - result[0] !== end - start) {
          result = [start, end];
        }
      }
      const startValue = gemsMap.get(gems[start]) || 0;
      if (startValue - 1 <= 0) {
        gemsMap.delete(gems[start]);
      } else {
        gemsMap.set(gems[start], startValue - 1);
      }
      start++;
    }

    if (gemsMap.size !== answer.size) {
      const currentValue = gemsMap.get(gems[end]) || 0;
      currentValue
        ? gemsMap.set(gems[end], currentValue + 1)
        : gemsMap.set(gems[end], 1);
      end++;
    }
  }

  return [result[0] + 1, result[1]];
};

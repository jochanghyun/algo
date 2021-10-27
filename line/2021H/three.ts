export const solution = (jobs: number[][]): number[] => {
  const lastRequestTime = jobs[jobs.length - 1][0];
  let waitQueue: number[][] = [jobs.shift()];
  let currentTime: number = 1;
  const reusltArr: number[] = [];

  while (waitQueue.length !== 0) {
    const categoryCode = waitQueue[0][2];
    while (waitQueue.length && waitQueue[0][2] === categoryCode) {
      const target = waitQueue.shift();
      currentTime += target[1];
      if(reusltArr[reusltArr.length-1]!==target[2])
        reusltArr.push(target[2]);
    }
    while (jobs.length && jobs[0][0] <= currentTime) {
      waitQueue.push(jobs.shift());
    }

    const priority = Array.from(
      waitQueue.reduce((resultMap, item, index) => {
        resultMap.has(item[2])
          ? resultMap.set(item[2], resultMap.get(item[2]) + item[3])
          : resultMap.set(item[2], item[3]);
        return resultMap;
      }, new Map<number, number>())
    ).sort(([keyA, valueA], [keyB, valueB]) =>
      valueA === valueB ? keyA - keyB : valueB - valueA
    );

    waitQueue = waitQueue.sort((a, b) =>
      a[2] === priority[0][0] ? (b[2] === priority[0][0] ? 1 : -1) : -1
    );
  }
  
  return reusltArr;
};

// [요청 시각(초),	걸리는 시간(초),	분류, 번호,	중요도]

solution([
  [1, 5, 2, 3],
  [2, 2, 3, 2],
  [3, 1, 3, 3],
  [5, 2, 1, 5],
  [7, 1, 1, 1],
  [9, 1, 1, 1],
  [10, 2, 2, 9],
]); //	[2, 1, 2, 3]
solution([
  [1, 2, 1, 5],
  [2, 1, 2, 100],
  [3, 2, 1, 5],
  [5, 2, 1, 5],
]); //	[1, 2]
solution([
  [0, 2, 3, 1],
  [5, 3, 3, 1],
  [10, 2, 4, 1],
]); //	[3, 4]
solution([
  [0, 5, 1, 1],
  [2, 4, 3, 3],
  [3, 4, 4, 5],
  [5, 2, 3, 2],
]); //	[1, 3, 4]

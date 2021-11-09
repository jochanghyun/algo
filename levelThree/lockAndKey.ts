export const solution = (key: number[][], lock: number[][]): boolean => {
  const answer = lock.map((line) => line.map((number) => number?0:1));
  
  const answerString = answer.toString();
  let rotatedKey = key;
  for (let i = 0; i < 4; i++) {
    for (const a of fs(0, 0, rotatedKey, lock, answerString)) {
      return true;
    }
    rotatedKey = gorotate(rotatedKey);
  }

  return false;
};

const gorotate = (key: number[][]) => {
  const temp: number[][] = [];
  for (let i = 0; i < key.length; i++) {
    const line: number[] = [];
    for (let j = 0; j < key[i].length; j++) {
      line.push(key[key[j].length - j - 1][i]);
    }
    temp.push(line);
  }
  return temp;
};
const getStartIndex = (endIndex: number, keySize: number) => {
  return endIndex - keySize < 0 ? 0 : endIndex - keySize - 1;
};
function* fs(
  x: number,
  y: number,
  key: number[][],
  lock: number[][],
  answerString: string
): IterableIterator<any> {
  if (x === lock.length + key.length && y >= lock.length + 2 * key.length - 1)
    return;
  const compareTarget = lock.map((line, indexY) => {
    if ((y <= key.length+indexY && y+key.length-1 >= key.length+indexY)) {
      const rtArr = new Array(lock.length).fill(0);
      return rtArr.map((item,index)=>{
        if(index+key.length>=x && index+key.length<=x+key.length-1){
          const y1 = Math.abs(-y+indexY+key.length)
          const x1 = Math.abs(-x+index+key.length)
          return key[y1][x1]
        }else{
          return 0
        }
      })
    } else {
      return new Array(line.length).fill(0);

    }
  });
  if (compareTarget.toString() === answerString) {
    yield { compareTarget, x, y };
  }
  switch (true) {
    case x === lock.length + key.length:
      for (const yplus of fs(0, y + 1, key, lock, answerString)) {
        yield yplus;
      }
      break;
    case x < lock.length + 2 * key.length - 1:
      for (const xplus of fs(x + 1, y, key, lock, answerString)) {
        yield xplus;
      }
      break;
    default:
      return;
  }
}

// const a = solution(
//   [
//     [11, 12],
//     [21, 22],
//   ],
//   [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ]
// ); //	true

// const b = solution(
//   [[0, 0, 0], [1, 0, 0], [0, 1, 1]], [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
// )
 
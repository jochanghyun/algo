export const solution = (n: number) => {
  const arr = new Array(n).fill(true).map((item, index) => index + 1);
  let resultArrs = [];
  for (const a of shake(arr)) {
    resultArrs = [...resultArrs,...a];
  }
  const result = resultArrs.reduce((result, item, index) => {
    if (typeof item === "number") {
      result = [...result, item];
    } else {
      result = [...result, ...item];
    }
    return result
  }, []);
  console.log(result)
};

function* shake(arr: number[], resultSet?: any[]) {
  const p = findMinNumber(arr.length);
  const result: number[][] = [];
  if(!p) yield result
  for (let i = 0; i < p; i++) {
    result.push([]);
  }
  arr.forEach((item, index) => {
    result[index % p].push(item);
  });
  const p2 = findMinNumber(result[0].length);
  if (p2) {
    for (const r of result) {
      for(const a of shake(r)){
        yield a
      }
    }
  } else {
    yield result;
  }
}

const findMinNumber = (n: number) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return i;
  }
  return 0;
};

// solution(12); //[1,5,9,3,7,11,2,6,10,4,8,12]
// solution(18)	//[1,7,13,3,9,15,5,11,17,2,8,14,4,10,16,6,12,18]

function* _combinationsUtil<T>(
  arr: Array<T>,
  num: number,
  curr: Array<T>,
  start: number
): IterableIterator<Array<T>> {
  if (curr.length !== num && arr.length - start >= num - curr.length) {
    const size = arr.length;
    for (let index = start; index < size; index++) {
      const concat = [...curr, arr[index]];
      for (const value of _combinationsUtil(arr, num, concat, index + 1)) {
        yield value;
      }
    }
  } else if (curr.length === num) {
    yield curr;
  }
}

function* combinations<T>(
  arr: Array<T>,
  num: number
): IterableIterator<Array<T>> {
  if (num > arr.length) {
    return;
  }
  for (const value of _combinationsUtil<T>(arr, num, [], 0)) {
    yield value;
  }
}

export { combinations };

export default function solution(orders: string[], course: number[]) {
  
  const result = [];
  for (const n of course) {
    const map = new Map();  
    for (const order of orders) {
      for (const comb of combinations(order.split("").sort(), n)) {
        const combString = comb.join('').toString();
        if(!map.has(combString)){
          map.set(combString,1);
        }else{
          map.set(combString,map.get(combString)+1);
        }
      }
    }
    const max = Math.max(...map.values());
    for(const [key,value] of map.entries()){
      if(value===max){
        result.push(key);
      }
    }
  }
  
  return result;
}
console.time("1");
solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]);
console.timeEnd("1");

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

function* combinations<T>(arr: Array<T>, num: number): IterableIterator<Array<T>> {
  if (num > arr.length) {
    throw Error('Invalid input');
  }
  for (const value of _combinationsUtil<T>(arr, num, [], 0)) {
    yield value;
  }
}

export { combinations };

export default function solution(orders:string[], course:number[]){
  const set = [...new Set(orders.reduce((set,item)=>
    set+=item
  ))];
  const result = [];
  for(const length of course){
    const map = new Map();
    const selects = new Array<Array<string>>();
    for(const selected of combinations<string>(set,length)){
      selects.push(selected);
    }
    for(const select of selects){
      orders.forEach((order)=>{
        for(const s of select){
          if(!order.match(s)){
            return;
          }
        }
        map.get(select)? map.set(select,map.get(select)+1):map.set(select,1);
      })
    }
    const max = [...map.entries()].reduce((a,b)=> a[1]>b[1]?a:b)[1];
    map.forEach((value,key)=>{
      if(value===max){
        result.push(key.sort().join(''));
      }
    })
  }
  result.sort();
  console.log(result);
  return result;
}

console.time('1')
solution(	["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]);
console.timeEnd('1')
export default function solution(info: string[], query: string[]) {
  const result = [];
  const map = new Map<string, number[]>();
  console.time("1");

  for (const i of info) {
    const arr = i.split(" ");
    const value = parseInt(arr.pop());
    const k = arr.join("");
    const comb = [];
    for (let i = 0; i < 5; i++) {
      for (const c of combinations([0, 1, 2, 3], i)) {
        comb.push(c);
      }
    }

    for (const c of comb) {
      const key = arr
        .map((item, index) => {
          if (c.indexOf(index) === -1) return item;
          return "-";
        })
        .join("");
      //
      map.has(key)
        ? map.set(key, [...map.get(key), value])
        : map.set(key, [value]);
    }
  }

  for (const q of query) {
    const arr = q.replace(/(and )/g, "").split(" ");
    const value = parseInt(arr.pop());
    const key = arr.join("");
    let counter = 0;
    if (map.has(key)) {
      for (const v of map.get(key)) {
        if (v >= value) counter++;
      }
    }
    result.push(counter);
  }
  console.log(result);
  return result;
}

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

solution(
  [
    "java backend junior pizza 150",
    "python frontend senior chicken 210",
    "python frontend senior chicken 150",
    "cpp backend senior pizza 260",
    "java backend junior chicken 80",
    "python backend senior chicken 50",
  ],
  [
    "java and backend and junior and pizza 100",
    "python and frontend and senior and chicken 200",
    "cpp and - and senior and pizza 250",
    "- and backend and senior and - 150",
    "- and - and - and chicken 100",
    "- and - and - and - 150",
  ]
);

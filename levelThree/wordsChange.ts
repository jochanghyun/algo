export function solution(begin: string, target: string, words: string[]) {
  if (discard(begin, target, words)) return 0;
  const result = bfs(begin, target, words, 0);
  for (const r of result) {
    console.log(r);
  }
}

function* bfs(
  begin: string,
  target: string,
  words: string[],
  processCnt: number
): IterableIterator<any> {
  
  if (begin === target) yield {begin,target,words,processCnt};
  while (words.length !== 0) {
    const word = words.shift();
    if (!word) return;
    for (let i = 0; i < begin.length; i++) {
      if (target[i] === word[i] && begin[i] !== target[i]) {
        const a = bfs(
          begin.slice(0, i) + target[i] + begin.slice(i + 1, begin.length + 1),
          target,
          words,
          processCnt++
        );
        yield a;
      }
    }
    break;
  }
}

function discard(begin: string, target: string, words: string[]) {
  const alphabets = words
    .map((item) => item.split(""))
    .reduce((concat, item) => [...concat, ...item], []);
  const set = [...begin.split(""), ...new Set(alphabets)].join("");
  for (const a of target) {
    if (!set.match(a)) {
      return false;
    }
  }
  return true;
}

solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]);

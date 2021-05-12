

export function solution(p: string):string {
  if (p === "") return p;
  if(isBalance(p)&&isValid(p)) return p;
  for (let i = 1; i <= p.length; i++) {
    const u = p.slice(0, i);
    const v = p.slice(i);
    if (isBalance(u) && isBalance(v)) {
      if (isValid(u)) {      
        return u + solution(v);
      } else {
        return `(${solution(v)})`+u.slice(1,u.length-1).split('').map(item=>item==="("?")":"(").join(''); 
      }
    }
  }
}
console.log()

function isBalance(p: string) {
  return p.match(/[(]/g)?.length === p.match(/[)]/g)?.length;
}
function isValid(p: string) {
  let copy = p.slice();
  while (copy.length !== 0) {
    if (copy[0] === ")" || copy[copy.length - 1] === "(") break;
    copy = copy.slice(1).replace(")", "");
  }

  return copy.length === 0;
}
console.log(isBalance('()(()))('));
console.log(isValid('()(()))('));
const a = solution("(()())()")
console.log(a);
const b = solution(")(");
console.log(b);
const c = solution("()))((()")
console.log(c);

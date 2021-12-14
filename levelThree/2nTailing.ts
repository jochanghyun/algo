export const solution = (n:number):number=> {
  let prev = 1;
  let next = 1;
  let i = 1;
  let temp = 0;
  while(i!==n){
    temp = prev;
    prev = next;
    next = (temp+next)%1000000007;
    i++
  }
  return next;
}




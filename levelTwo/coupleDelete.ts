export function solution(s:string):0|1{
  const arr = [...s];
  const temp = [];
  for(let i = 0 ; i < arr.length ; i++){
    if(arr[i]===temp[temp.length-1]){
      temp.pop();
      continue;
    }
    temp.push(arr[i]);
  }
  return temp.length===0 ? 1:0;
}

console.log(solution('ada'));
//console.log(/([a-z])\1/.test('d'))
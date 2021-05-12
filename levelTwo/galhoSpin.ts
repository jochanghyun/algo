export function solution(s:string):number{
  const arr = [...s];
  let count = 0;
  for(let i = 0 ; i < arr.length ; i++){
    const temp = [...arr.slice(i,arr.length),...arr.slice(0,i)];
    isValid(temp) ? count++ : "";
  }
  return count;
}
function isValid(arr:string[]){
  const temp = [];
  while(arr.length!==0){
    switch (arr[0]) {  
      case "]":
        if (temp[temp.length - 1] !== "[") return false;
        temp.pop();
        arr.shift();
        break;
      case "}":
        if (temp[temp.length - 1] !== "{") return false;
        temp.pop();
        arr.shift();
        break;
      case ")":
        if (temp[temp.length - 1] !== "(") return false;
        temp.pop();
        arr.shift();
        break;
      default:
        temp.push(arr.shift());
        break;
    }
  }

  return temp.length === 0;
}

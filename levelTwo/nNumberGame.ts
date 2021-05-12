export function solution(n:number,t:number,m:number,p:number):string{
  const max = t*(m+1);
  let totalString = "";
  let result = "";

  for(let i = 0 ; i < max; i++){
    totalString += i.toString(n);
  }
  while(result.length !== t){
    result+=totalString[p-1];
    p+=m;
  }
  return result.toUpperCase();
}

solution(2,4,2,1);
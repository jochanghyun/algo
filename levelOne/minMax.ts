export default function solution(n:number,m:number){
  let max = Math.max(m,n);
  let min = Math.min(m,n);

  let multiple = 1;
  if(max%min===0){
    return [m,n];
  }

  let temp = 2;
  while(true){
    if(min+1===temp)break;
    if(min%temp===0){
      min /= temp;
      if(max%temp===0){
        max /= temp;
        multiple*=temp;
        temp=2;
      }else{
        min*=temp;
      }
    }
    temp++;
  }

  return [multiple*min*max,multiple];
}
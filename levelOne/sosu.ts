

export default function solution(n:number){
  const numbers = [];
  for(let i = 1; i<=n ; i++){
    numbers.push(i);
  }
  for(let i = 1; i*i<n;i++){
    if(numbers[i]){
      let num = numbers[i];
      for(let j = num*num; j<=n; j+=num){
        numbers[j-1]=0
      }
    }
  }
  const set = new Set(numbers)
  set.delete(0)
  set.delete(1)
  
  return set.size;
}
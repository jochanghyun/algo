export const solution = (small: number, target: number): number => {
  const result = {
    min: 8,
    cnt:0
  };
  let ok = false
  
  for (const a of go(small, '', target, 0, result)) {
    ok = true
  }
  console.log(result.cnt)
  return result.min === 8 && ok === false ? -1 : result.min;
};

function* go(
  small: number,
  current: string,
  target: number,
  cnt: number,
  result: { min: number ,cnt?:number}
) {
  let currentValue=0;
  
  
  if(cnt>result.min) return
  // if(target < current) return;
  // try{
  //   currentValue=eval(current)
  // }catch(e){
  //   return;
  // }
  if (target === currentValue) {
    result.min = Math.min(result.min, cnt);
    yield {cnt,current};
  }
  
  
  for(const plus of go(small,`${current}+${small}`,target,cnt+1,result)){
    yield plus
  }
  for(const minus of go(small,`${current}-${small}`,target,cnt+1,result)){
    yield minus
  }
  for(const normalPlus of go(small,`${current}${small}`,target,cnt+1,result)){
    yield normalPlus
  }
  if(current){
    for(const slush of [...go(small,`${current}/${small}`,target,cnt+1,result),...go(small,`(${current})/${small}`,target,cnt+1,result)]){
      yield slush
    }
    for(const multi of [...go(small,`${current}*${small}`,target,cnt+1,result),...go(small,`(${current})*${small}`,target,cnt+1,result)]){
      yield multi
    }
  }
}


//solution(5,12) //4

//solution(5, 31168) // -1
console.log()
console.time('ev')
eval('(3+3)*3')
console.timeEnd('ev')

console.time('pi')
'(3+3)*3'
console.timeEnd('pi')
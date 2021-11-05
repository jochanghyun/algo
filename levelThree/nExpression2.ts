export const solution = (small:number,target:number) => {
  const result = {min:8}
  let ok = false;
  for(const a of go(small,target,0,result,[])){
    ok = true
  }  
  return result.min === 8 && ok === false ? -1 : result.min;
}

function* go(small:number,target:number,deps:number,result:{min:number},map:string[]){
  if(deps>8 || deps>result.min) return;
  if(!target){
    result.min=deps
    yield deps
  };
  let smallString = small.toString();
  while(smallString.length<=5){
    const smallStringToInt = parseInt(smallString)
      for(const minus of go(small,target+smallStringToInt,deps+smallString.length,result,[...map,'minus'])){
        yield minus;
      }
      for(const plus of go(small,target-smallStringToInt,deps+smallString.length,result,[...map,'plus'])){
        yield plus;
      }
    if(target%small===0)
      for(const multi of go(small,target/smallStringToInt,deps+smallString.length,result,[...map,'multi'])){
        yield multi;
      }
    for(const slush of go(small,target*smallStringToInt,deps+smallString.length,result,[...map,'slush'])){
      yield slush;
    }
    smallString = `${smallString}${smallString[0]}`
  }
}
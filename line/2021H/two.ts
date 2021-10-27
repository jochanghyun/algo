export const solution = (research: string[], n: number, k: number) => {
  const researchLogArr: Map<string, number>[] = [];
  for (const s of research) {
    const dayMap = new Map();
    for (const c of s.split("")) {
      dayMap.has(c) ? dayMap.set(c, dayMap.get(c) + 1) : dayMap.set(c, 1);
    }
    researchLogArr.push(dayMap);
  }
  const resultMap = researchLogArr.reduce((result,item,index,arr)=> {
    item.forEach((value,key)=>{
      if(value>=k){
        if(result.prev[key]){
          result.prev[key]++
          result.cnt[key] += value;
        }else{
          result.prev[key] = 1;
          result.cnt[key] = value;
        }
      }else{
        result.prev[key] = 0;
        result.cnt[key] = 0;
      }
      if(result.prev[key]>=n && result.cnt[key]>=n*k*2){
        result.resultMap.set(key,result.cnt[key])
        return;
      }
      if(result.prev[key]>=n){
        result.prev[key] = 0;
      }
    })
    return result
  },{prev:{},cnt:{},resultMap:new Map<string,number>()}).resultMap
  if(resultMap.size===0) return "None";
  return Array.from(resultMap).sort(([keyA,valueA],[keyB,valueB])=>parseInt(keyB)-parseInt(keyA))[0][0]
};

// const a = solution(["abaaaa", "aaa", "abaaaaaa", "fzfffffffa"], 2, 2); //	"a"
// console.log(a)
// const b = solution(["yxxy","xxyyy"],	2,	1)	//"x"
// console.log(b)
// const c = solution(["yxxy","xxyyy","yz"],	2,	1)//	"y"
// console.log(c)
// const d = solution(["xy","xy"],1,1)	//"None"
// console.log(d)

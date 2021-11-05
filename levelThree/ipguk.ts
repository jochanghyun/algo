export const solution = (n:number,times:number[]):number=> {
  const result = {min:Infinity}
  console.time('1')
  for(const a of process(n,times.map<ThreadType>((item,index)=>({
    endTime:0,
    processingTime:item,
    index
  })),0,result)){
    console.log(a);
  }
  console.timeEnd('1')
  return 1
}

type ThreadType = {
  endTime:number
  processingTime:number
  index:number
}
function* process(remainWork:number,threads:ThreadType[],time:number,result:{min:number}){
  if(result.min<time) return;
  if(!remainWork){
    result.min=time;
    yield threads;
  }
  
}


const a = solution(6,[7,10]);

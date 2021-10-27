import {} from 'module';

export const solution = (arr:number[],k:number):number => {
  const oneCnt = arr.filter(item=>item).length;
  if(oneCnt<k) return 0;
  const reducedArr:number[][] = arr.reduce((result,item,index)=> {
    switch(item){
      case 1:
        result.arr.push(arr.slice(result.startIndex,index))
        result.startIndex = index+1;
    }
    if(index === arr.length-1){
      result.arr.push(arr.slice(result.startIndex));
    }
    return result
  },{arr:[],startIndex:0}).arr

  return reducedArr.reduce((result,item,index,arr)=>{
    const target = arr.slice(index,index+k+1);
    if(target.length === k+1){
      result += (target[0].length+1)*(target[target.length-1].length+1)
    }
    return result
  },0)
}

const a = solution([0,1,0,0]	,1) // 6
const b = solution([0, 1, 0, 0, 1, 1, 0]	,2)	//8
const c = solution([0, 1, 0]	,2)	//0
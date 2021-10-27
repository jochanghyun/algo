export default function solution(money:number, cost:number[]):number {
  let result = {
    total:0,
    length:0
  }
  for(let i =0; i<cost.length; i++){
    const obj = {
      total:0,
      length:0
    }
    for(let j = i ; j<cost.length; j++){
      if(obj.total+cost[j]>money){
        if(result.length<= obj.length){
          result=obj
        }
        break;
      }else{
        obj.total+=cost[j]
        obj.length++
      }
    }
  }
  return result.length
}

solution(420,[0, 900, 0, 200, 150, 0, 30, 50])
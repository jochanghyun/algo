import { createUnparsedSourceFile } from "typescript";

function solution(k:number, rates:number[]):number {
  const asset = {
    money:k,
    d:0
  }
  
  const arr = rates.reduce((result,_,i)=>{
    return [...result,rates[i+1]-_]
  },[]).slice(0,rates.length-1);
  
  const cut:number[] = arr.reduce((result,_,i)=>{
    if(rates[i+1]*_<0){
      return [...result,i+1]
    }
    return result
  },[])
  const arr2 = cut.reduce((result,_,i)=>{
    return [...result,rates.slice(_,cut[i+1])]
  },[[rates[0]]])
  for(let i=0;i<arr2.length;i++){
    if(arr2.length!==1){
      if(asset.money>= arr2[i][0]){
        asset.money -= arr2[i][0];
        
        asset.d = 1
        asset.money += arr2[i][arr2[i].length-1];
        asset.d = 0
      }
    }  
  }
  
  return asset.money;
}

solution(1000,[1200, 1000, 1100, 1200, 900, 1000, 1500, 900, 750, 1100]);
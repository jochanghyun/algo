function solution(str1:string,str2:string){
  str1=str1.toUpperCase();
  str2=str2.toUpperCase();
  
  const str1Map = new Map();
  const str2Map = new Map();
  for(let i = 0 ; i < str1.length-1; i++){
    if(/^[a-zA-Z]*$/.test(str1.slice(i,i+2))){
      
      str1Map.has(str1.slice(i,i+2))
        ? str1Map.set(str1.slice(i,i+2),str1Map.get(str1.slice(i,i+2))+1)
        : str1Map.set(str1.slice(i,i+2),1);
    }    
  }
  for(let i = 0 ; i < str2.length-1;i++){
    if(/^[a-zA-Z]*$/.test(str2.slice(i,i+2))){
      str2Map.has(str2.slice(i,i+2))
        ? str2Map.set(str2.slice(i,i+2),str2Map.get(str2.slice(i,i+2))+1)
        : str2Map.set(str2.slice(i,i+2),1);
    }
  }

  const set = new Set([...str1Map.keys(),...str2Map.keys()]);
  let n = 0 ;
  let u = 0 ;
  for(const s of set){
    if(str1Map.has(s) && str2Map.has(s)){
      n+=Math.min(str1Map.get(s),str2Map.get(s));
    }
    u+=Math.max(str1Map.has(s) ? str1Map.get(s):0,str2Map.has(s)?str2Map.get(s):0);
  }
  
  if(u === 0 ){
    return 65536;
  }
  return Math.floor(n*65536/u);
}
console.log(solution("aa1+aa2","AAAA12"));
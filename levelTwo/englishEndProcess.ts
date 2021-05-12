function solution(n, words) {
  const map = new Map();
  for(const [v,i] of words.entries()){
      if(!map.has(i%3)){
          map.set(i%3,[])
      }else{
          if(map.get(i%3).indexOf(v)>-1) return [i%3===0?3:i%3,i];
       map.set(i%3,[...map.get(i%3),v])   
      }
  }

  return [0,0];
}



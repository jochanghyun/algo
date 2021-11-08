
export const solution = (key:number[][],lock:number[][]):boolean => {
  const answer = lock.map((line)=>line.map(number=>number===1?0:1));
  let answerString = "";
  if(key.length>answer.length){
    const target = key.length - answer.length;
    //checkReducable()
    const tempAnswer = answer.map(item=>{
      for(let i = 0 ; i< target ; i++){
        item.push(0);
      }
      return item;
    })
    const zeroArr= new Array(key.length).fill(0);;
    for(let i = 0 ; i< target ; i++){
      tempAnswer.push(zeroArr);
    }
  }else{
    const reducable = checkReducable(answer,answer.length-key.length)
    console.log(reducable)
  }
  
  const map = new Map<string,{key:number[][],oneCnt:number}>();
  
  const oneCnt = answer.reduce(
    (oneCnt, line) => oneCnt + line.filter((item) => item).length,
    0
  );
  const oneCntofKey = key.reduce(
    (oneCnt, line) => oneCnt + line.filter((item) => item).length,
    0
  )
  if(oneCntofKey<oneCnt) return false;

  for (const keyobject of fs(
    {
      key,
      oneCnt: oneCntofKey,
    },
    answer.toString(),
    map,
    oneCnt
  )) {
    return true;
  }

  return false;
}

const goleft = (key:number[][],oneCnt:number) => {
  const temp = new Array(key.length).fill([])
  for(let i = 0 ; i<key.length ; i ++) {
    temp[i] = [...key[i].slice(1),0]
  }
  return {
    key:temp,
    oneCnt:oneCnt-key.reduce((oneCnt,line)=>oneCnt+=line[0]?1:0,0)
  };
}
const goright = (key:number[][],oneCnt:number) => {
  const temp = new Array(key.length).fill([]);
  for(let i = 0 ; i <key.length ; i++){
    temp[i] = [0,...key[i].slice(0,key[i].length-1)]
  }
  return {
    key:temp,
    oneCnt:oneCnt-key.reduce((oneCnt,line)=>oneCnt+=line[line.length-1]?1:0,0)
  };
}
const gotop = (key:number[][],oneCnt:number) => {
  return {
    key:[...key.slice(1),new Array(key[0].length).fill(0)],
    oneCnt: oneCnt - key[0].filter((item) => item).length,
  };
}
const gobot = (key: number[][], oneCnt: number) => {
  return {
    key: [new Array(key[0].length).fill(0), ...key.slice(0, key.length - 1)],
    oneCnt: oneCnt - key[key.length-1].filter((item) => item).length,
  };
};
const gorotate = (key:number[][],oneCnt:number) => {
  const temp:number[][] = [];
  for(let i = 0 ; i< key.length ; i ++){
    const line:number[] = [];
    for(let j = 0 ; j < key[i].length ; j ++){
      line.push(key[key[j].length-j-1][i])
    }
    temp.push(line) ;
  }
  return {
    key:temp,
    oneCnt
  };
}
function* fs(keyobject:{
  key:number[][],
  oneCnt:number
},answerString:string,map:Map<string,{key:number[][],oneCnt:number}>,oneCnt:number):IterableIterator<{key:number[][],oneCnt:number}>{
  const keyString = keyobject.key.toString();
  if(keyobject.oneCnt<oneCnt) return;

  if(map.has(keyString)) {
    return
  }
  map.set(keyString,keyobject);  
  if(keyobject.oneCnt===oneCnt){
    yield keyobject
    return;
  }
  const rotates = gorotate(keyobject.key,keyobject.oneCnt);
  for(const rotate of fs(rotates,answerString,map,oneCnt)){
    yield rotate;
  }
  const lefts = goleft(keyobject.key,keyobject.oneCnt);
  // if(lefts.oneCnt===oneCnt) map.set(lefts.key.toString(),lefts);
  if(lefts.oneCnt>=oneCnt){
    for(const left of fs(lefts,answerString,map,oneCnt)){
      yield left;
    }
  }
  const rights = goright(keyobject.key,keyobject.oneCnt);
  if(rights.oneCnt===oneCnt) map.set(rights.key.toString(),rights);
  if(rights.oneCnt>=oneCnt){
    for(const right of fs(rights,answerString,map,oneCnt)){
      yield right;
    }
  }
  const tops = gotop(keyobject.key,keyobject.oneCnt);
  // set.add(tops.key.toString())
  // if(tops.oneCnt===oneCnt) map.set(tops.key.toString(),tops);
  if(tops.oneCnt>=oneCnt){
    for(const top of fs(tops,answerString,map,oneCnt)){
      yield top;
    }
  }
  const bots = gobot(keyobject.key,keyobject.oneCnt);
  //set.add(bots.key.toString())
  // if(bots.oneCnt===oneCnt) map.set(bots.key.toString(),bots);
  if(bots.oneCnt>=oneCnt){
    for(const bot of fs(bots,answerString,map,oneCnt)){
      yield bot;
    }
  }  
}

const checkReducable = (arr:number[][],targetN:number) => {
  const yArr:number[] = [];
  for(let i = 0 ; i < targetN ; i ++){
    for(const item of [...arr[arr.length-1-i],...arr[i]]){
      if(item){
        return false;
      }
    }
    for(let j = 0 ; j < targetN ; j++){
      yArr.push(arr[i][j],arr[i][arr.length-j])
    }
  }
  for(const item of yArr){
    if(item){
      return false;
    }
  }
  
  return arr
    .map((item, index) => item.slice(targetN, item.length - targetN))
    .filter((item, index,arr) => index>=targetN && index < arr.length-targetN);
}


//const a= solution([[0, 0,0,0], [0,0,1, 0], [0,0,1, 0], [0,0,1, 0]],	[[1, 1, 1], [1, 1, 0], [1, 0, 1]])//	true

const a= solution([[0, 0], [0,0]],	[[1, 1, 1], [1, 0, 1], [1, 1, 1]])//	true

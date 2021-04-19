export default function solution(board:Array<Array<number>>,moves:Array<number>){
  let answer = 0;
  const temp = new Array();
  for(const line of moves){
    for(const horizontal of board){
      if(horizontal[line-1]===0)continue;
      const picked = horizontal[line-1];
      horizontal[line-1]=0;
      if(temp[temp.length-1]===picked){
        temp.pop();
        answer+=2;
      }else{
        temp.push(picked);
      }
      break;
    }
  }
  return answer;
}


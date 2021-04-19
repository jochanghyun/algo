export default function solution(new_id:string) {
  let answer = '';
  answer=new_id.toLocaleLowerCase();
  
  answer=answer.replace(/[^a-z|0-9|.|_|-]/g,'');
  
  answer=answer.replace(/[.]{1,}/g,'.');
  if(answer[0]===".") answer=answer.slice(1,answer.length)
  if(answer[answer.length-1]===".") answer=answer.slice(0,answer.length-1);
  if(!answer) answer = "a";
  if(answer.length>=16) answer=answer.slice(0,15);
  if(answer[answer.length-1]===".") answer=answer.slice(0,answer.length-1);
  if(answer.length<=2) {
    while(answer.length!==3){
      answer+=answer[answer.length-1];
    }
  }
    return answer;
}
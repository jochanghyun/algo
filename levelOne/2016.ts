export default function solution(a,b){
  
  const date = new Date(2016,a-1,b+1);
  const arr = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  return arr[date.getUTCDay()];
}
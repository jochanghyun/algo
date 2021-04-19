export default function solution(s:string){

  return s.replace(/p/ig,"").length === s.replace(/y/ig,"").length;
}
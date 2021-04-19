export default function solution(n:number) {
  return parseInt(n.toString(3).split("").reverse().join(""),3);
}
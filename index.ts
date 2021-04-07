import MyClass from './greedy/nineBoat';

function solution(number:Array<number>,k:number){
  const large = new MyClass(number,k);
  
  return large.init();
}



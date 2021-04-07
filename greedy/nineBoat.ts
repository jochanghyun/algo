export default class NineBoat{
  people: Array<number>;
  limit: number;
  answer: number;
  constructor(people:Array<number>,limit:number){
    this.people = people;
    this.limit = limit;
    this.answer = 0;
  }
  
  

  init():number{
    this.people.sort((a,b)=>a-b);
    
    while(this.people.length!==0){
      let x = this.people.length-1;
      if(this.people[0]+this.people[x]>this.limit){
        this.answer++;
        this.people.pop();
      }else{
        this.answer++;
        this.people.shift();
        this.people.pop();
      }
    }
    return this.answer;
  }
}
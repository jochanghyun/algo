export default class largestNumber {
  number: string;
  k: number;
  
  result: string;
  breakPoint: number;
  constructor(number: string, k: number) {
    this.number = number;
    this.k = k;
    this.result = ''
    this.breakPoint = this.number.length-k;
  }
  
  getOne() {
    while(true){
      if(this.breakPoint<0) return;
      if(this.result.length===this.breakPoint) return;
      let max = "0";
      let maxIdx = 0;
      
      
      for(let i = 0; 
        this.breakPoint-this.result.length<this.number.length-i+1
        && i<this.number.length;
        i++){
        if(max < this.number[i]){
          max = this.number[i];
          maxIdx = i;
        }
      }
      this.k--;
      this.number = this.number.slice(maxIdx+1,this.number.length+1);
      this.result+=max;
    }

  }

}

function solution(number,k){
  const large = new largestNumber(number,k);
  large.getOne();
  return large.result;
}

// console.log(large.result);
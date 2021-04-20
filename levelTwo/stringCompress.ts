export default function stringCompress(s:string){
  let min = s.length;
  for(let i =1 ; i<=s.length/2; i++){
    let arr = new Array<string>();
    for(let j = 0; j<s.length ; j+=i){
      arr.push(s.slice(j,j+i));
    }
    let result = new Array<string>();
    let resultNum = new Array<number>();
    while(arr.length!==0){
      const item = arr.shift();
      if(result[result.length-1]===item){
        resultNum[result.length-1] = resultNum[result.length-1]?resultNum[result.length-1]+1:1;
      }else{
        result.push(item);
        resultNum[result.length-1]=1
      }
    }
    resultNum.forEach((item,index,arr)=>{
      if(item>1){
        result[index] = `${result[index]}${arr[index]}`;
      }
    })
    min = Math.min(result.join('').length , min);
  }
  return min;
}
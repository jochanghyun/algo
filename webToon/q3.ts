export default function solution(block:number,board:number[][]):number {
  const arrs = board.map((_)=>{return{black:_.reduce((sum,item)=>sum+item,0),arr:_}})
  switch(block){
    
    case 0:
      const arr0 = arrs.filter(_=>_.black===3).filter((_,i,a)=>{
        if(a[i+1]) return a[i].arr.join('')===a[i+1].arr.join('')
        
      });
      return arr0.length+1;
    case 1:
      const arr1 = arrs.filter(_=>_.black===1)
      return arr1.length===0? 0 :1;
    case 2:
      const arr2 = arrs.filter((_,i,a)=>{
        if(!a[i+1]) return false
        if(_.black===2){
          return true
          if(a[i+1].black===3){
            if(parseInt(a[i].arr.join(''))-parseInt(a[i+1].arr.join(''))<=100){
              return true
            }
          }
        }
      })
      return arr2.length+1
    case 4:
      break;
  }
}

console.log(solution(2	,[[1,0,0,0],[1,0,0,1],[1,1,0,1],[1,1,0,1]]));
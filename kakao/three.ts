function solution(n:number, k:number, cmd:string[]) {

  let state:any[] = []; 
  const deletedStateArr:any[] = [];
  let pointer = k;
  for(let i = 0 ; i < n ; i++){
    state.push(i);
  }
  for(const item of cmd){
    const c = item.split(" ");
    switch(c[0]){
      case "D":
        pointer+=parseInt(c[1]);
        break;
      case "U":
        pointer-=parseInt(c[1]);
        break;
      case "Z":
        const a = deletedStateArr.pop();
        state = [...state.slice(0,a.index),a.value,...state.slice(a.index,state.length)]
        break;
      case "C":
        deletedStateArr.push({value:state[pointer],index:pointer});
        state.splice(pointer,1);
        break;
      default:
        break;
    }
  }
  for(let i = 0 ; i < n ; i++){
    
  }
  
  return 
}

//console.log(solution(8,2,	["D 2","C","U 3","C","D 4","C","U 2","Z","Z"]));
console.log(solution(8,2,["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"]));
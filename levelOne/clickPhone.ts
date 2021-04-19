export default function solution(numbers:Array<number>,hand:"left"|"right"){
  let position = {right:10,left:12}
  numbers = numbers.map((item)=>{
    if(item===0){
      return 11;
    }else{
      return item;
    }
  });
  const process = [];
  numbers.forEach((item,index)=>{
    console.log(position);
    switch(item%3){
      case 1:
        process.push("L");
        position.left=item;
        break;
      case 0:
        process.push("R");
        position.right=item;
        break;
      case 2:
        const h = getDistance(position,item);
        if(h==="E"){
          if(hand==="left"){
            process.push("L");
            position.left=item;  
          }else{
            process.push("R");
            position.right=item;  
          }
        }else if(h==="R"){
          process.push("R");
          position.right=item;
        }else if(h==="L"){
          process.push("L");
          position.left=item;
        }
        break;
    }
  });
  return process.join('');
}

function getDistance(position,target){
  const rightD = 
    (position.right%3!==target%3?1:0)
    +Math.floor((Math.abs(position.right-target)+1)/3)
  const leftD = 
    (position.left%3!==target%3?1:0)
    +Math.floor((Math.abs(position.left-target)+1)/3)
  
    
  return rightD===leftD? "E" : rightD>leftD ? "L":"R";
}
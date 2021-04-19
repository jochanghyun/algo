export default function noRepeat(arr:Array<number>){
  const result = arr.filter((item,index,arr)=>{
    return item!==arr[index-1];
  }
  );

  return result;
}
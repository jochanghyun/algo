export const solution = (routes: [number,number][]) => {
  
  routes = routes.sort(([startA,endA],[startB,endB])=>endA-endB);
  const cameras:number[] = [routes[0][1]];
  for(const [start,end] of routes){
    if(cameras[cameras.length-1]<start){
      cameras.push(end);
    }
  }
  return cameras.length
};
solution([
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
]); // 2

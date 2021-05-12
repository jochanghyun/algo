export function solution(places: Array<string[]>) {
  const result = [];
  for (const place of places) {
    const arr = place.map((item) => item.split(""));
    result.push(checkIsValid(arr));
  }
  const arr = places[1].map((item) => item.split(""));

  return result;
}

function checkIsValid(arr:any) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] === "P") {
        if (i > 1) {
          if (arr[i - 2][j] === "P") {
            if (arr[i - 1][j] !== "X") {
              //console.log(i,j);
              return 0;
            }
          }
        }
        if (i > 0 && j > 0) {
          if (arr[i - 1][j - 1] === "P") {
            if (arr[i][j - 1] !== "X" || arr[i - 1][j] !== "X") {
              //console.log(i,j);
              return 0;
            }
          }
        }
        if (i > 0 && j < 4) {
          if (arr[i - 1][j + 1] === "P") {
            if (arr[i][j + 1] !== "X" || arr[i - 1][j] !== "X") {
              //console.log(i,j);
              return 0;
            }
          }
        }
        if (i > 0) {
          if (arr[i - 1][j] === "P") {
            //console.log(i,j);
            return 0;
          }
        }
        if (i < 3) {
          if (arr[i + 2][j] === "P") {
            if (arr[i + 1][j] !== "X") {
              
              return 0;
            }
          }
        }
        if (i < 4 && j > 0) {
          if (arr[i + 1][j - 1] === "P") {
            if (arr[i + 1][j] !== "X" || arr[i][j - 1] !== "X") {
              //console.log(`${i},${j}`);
              return 0;
            }
          }
        }
        if (i < 4 && j < 4) {
          if (arr[i + 1][j + 1] === "P") {
            if (arr[i][j + 1] !== "X" || arr[i + 1][j] !== "X") {
              //console.log(`${i},${j}`);
              return 0;
            }
          }
        }
        if (i < 4) {
          if (arr[i + 1][j] === "P") {
            //console.log(`${i},${j}`);
            return 0;
          }
        }
        if(j>0){
          if(arr[i][j-1]==="P") return 0;
        }
        if(j<4){
          if(arr[i][j+1]==="P") return 0;
        }
        if(j>1){
          if(arr[i][j-2]==="P"){
            if(arr[i][j-1]!=="X") return 0;
          }
        }
        if(j<3){
          if(arr[i][j+2]==="P"){
            if(arr[i][j+1]!=="X") return 0;
          }
        }
      }
    }
  }
  return 1;
}

solution([
  ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
  ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
  ["PXOPX", "OXOXP", "OXPXX", "OXXXP", "POOXX"],
  ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
  ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
]);

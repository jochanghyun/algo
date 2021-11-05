export const solution = (
  n: number,
  t: number,
  m: number,
  timetable: string[]
): string => {
  const timetableNum = timetable
    .reduce<number[]>((timetableNum, item) => {
      const [hour, minute] = item.split(":");
      const numberTime = parseInt(hour) * 60 + parseInt(minute);
      if (numberTime <= (n - 1) * t + 540) {
        timetableNum.push(numberTime);
      }
      return timetableNum;
    }, [])
    .sort((a, b) => a - b);
  
  const reservationData = timetableNum.reduce<{
    reservation: number[][];
    time: number;
    reservationMap: Map<number, number[]>;
  }>(
    ({ reservation, time, reservationMap }, item, index) => {
      if (reservation[reservation.length - 1].length < m) {
        if (item <= time) {
          reservation[reservation.length - 1].push(item);
          reservationMap.set(time,reservation[reservation.length-1]);
          return { reservation, time , reservationMap};
        }
      }
      while (item > time) {
        time += t;
        if (item <= time) {
          reservation.push([item]);
        } else {
          reservation.push([]);
        }
      }
      reservationMap.set(time,reservation[reservation.length-1]);
      return { reservation, time, reservationMap };
    },
    {
      reservation: [[]],
      time: 540,
      reservationMap: new Map<number, number[]>(),
    }
  );
  const reservationEntries = Array.from(reservationData.reservationMap);
  if(!reservationEntries.length){

    return numberToStringTime(540+t*(n-1));
  }
  const [lastTime,lastList] = reservationEntries[reservationEntries.length-1]
  if(timetableNum.length < n*m){
    return numberToStringTime(lastList[lastList.length-1]-1 <= 540 ? 540:lastList[lastList.length-1]-1);
  }else{
    return numberToStringTime(lastList[lastList.length-1]-1);
  }
  
};

const numberToStringTime = (timeNumber:number) => {
  const minutes = timeNumber % 60;
  const hours = (timeNumber - minutes)/60
  return `${hours<10?`0${hours}`:`${hours}`}:${minutes<10?`0${minutes}`:`${minutes}`}`
}

const e = solution(1,	1,	5,	["08:00", "08:01", "08:02", "08:03"])
// const a = solution(10, 10, 2, ["09:10", "09:09", "08:00", "23:59"]); // "09:09"

// const b = solution(2, 1, 2, ["09:00", "09:00", "09:00", "09:00"]);          // "08:59"
const c =solution(1, 1, 5, ["00:01", "00:01", "00:01", "00:01", "00:01"]); // "00:00"
// const d = solution(10, 60, 45, [
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
//   "23:59",
// ]); //"18:00

// d
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
    .sort((a, b) => a - b)
    .slice(0, n * m);
  const reservationMapInit = () => {
    const map = new Map<number, number[]>();
    for (let i = 540; i <= 540 + n * (t - 1); i += t) {
      map.set(i, []);
    }
    return map;
  };

  const reservationData = timetableNum.reduce<{
    reservation: number[][];
    time: number;
    reservationMap: Map<number, number[]>;
  }>(
    ({ reservation, time, reservationMap }, item, index) => {
      if (reservation[reservation.length - 1].length < m) {
        if (item <= time) {
          reservation[reservation.length - 1].push(item);
          reservationMap.set(time, reservation[reservation.length - 1]);
          return { reservation, time, reservationMap };
        }
      }
      while (true) {
        time += t;
        if (time > 540 + t * (n - 1))
          return { reservation, time, reservationMap };
        if (item <= time) {
          reservation.push([item]);
        } else {
          reservation.push([]);
        }

        if (item <= time) break;
      }
      reservationMap.set(time, reservation[reservation.length - 1]);
      return { reservation, time, reservationMap };
    },
    {
      reservation: [[]],
      time: 540,
      reservationMap: reservationMapInit(),
    }
  );

  const reservationEntries = Array.from(reservationData.reservationMap);

  if (reservationEntries.length < n) {
    return numberToStringTime(540 + t * (n - 1));
  } else {
    const [lastTime, lastList] =
      reservationEntries[reservationEntries.length - 1];
    if (lastList.length < m) {
      return numberToStringTime(540 + t * (n - 1));
    }

    return numberToStringTime(lastList[lastList.length - 1] - 1);
  }
};

const numberToStringTime = (timeNumber: number) => {
  const minutes = timeNumber % 60;
  const hours = (timeNumber - minutes) / 60;
  return `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }`;
};

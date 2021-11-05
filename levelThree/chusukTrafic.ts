export const solution = (input: string[]): number => {
  let maxLength = 0;
  let processArr:{endTime:number,startTime:number}[] = [];
  const startEndArr = input.map((item) => {
    const [day, endTime, handleTime] = item.split(" ");
    const [hh, mm, ss, ms] = endTime.split(/[:.]/);
    const endDate = new Date(day);
    endDate.setUTCHours(parseInt(hh));
    endDate.setUTCMinutes(parseInt(mm));
    endDate.setUTCSeconds(parseInt(ss));
    endDate.setUTCMilliseconds(parseInt(ms));

    const startDate = new Date(
      endDate.getTime() -
        parseFloat(handleTime.slice(0, handleTime.length - 1)) * 1000 +
        1
    );
    return {
      endTime: endDate.getTime(),
      startTime: startDate.getTime(),
    };
  }).sort((a,b)=>a.startTime-b.startTime);
  
  for(const target of startEndArr){
    processArr = processArr.filter((item)=>item.endTime+1000>=target.startTime)
    processArr.push(target);
    maxLength = Math.max(processArr.length,maxLength)
  }
  
  return maxLength;
};

solution([
  "2016-09-15 20:59:57.421 0.351s",
  "2016-09-15 20:59:58.233 1.181s",
  "2016-09-15 20:59:58.299 0.8s",
  "2016-09-15 20:59:58.688 1.041s",
  "2016-09-15 20:59:59.591 1.412s",
  "2016-09-15 21:00:00.464 1.466s",
  "2016-09-15 21:00:00.741 1.581s",
  "2016-09-15 21:00:00.748 2.31s",
  "2016-09-15 21:00:00.966 0.381s",
  "2016-09-15 21:00:02.066 2.62s",
]);
solution(["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"])


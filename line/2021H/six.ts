export const solution = (
  records: string[],
  k: number,
  endDate: string
): string[] => {
  const purchaseMap = new Map<string,number>();
  const repurChageMap = new Map<string,{total:number,repurchage:number,totalMember:number}>();
  const startDate = setStartDate(endDate);
  const filtered = records.map((item)=>{
    const [date,member,product] = item.split(' ');
    return {
      date,member,product
    }
  }).filter((item)=>{
    const date = new Date(item.date);
    return date >= new Date(startDate) && date <= new Date(endDate);
  })
  if(filtered.length===0) return ["no result"]
  for(const {date,member,product} of filtered){
    purchaseMap.has(`${member}/${product}`)
      ? purchaseMap.set(
          `${member}/${product}`,
          purchaseMap.get(`${member}/${product}`) + 1
        )
      : purchaseMap.set(`${member}/${product}`, 1);
  }
  for(const [key,value] of Array.from(purchaseMap)){
    const pid = key.split('/')[1];
    if(value===1){
      repurChageMap.has(pid)
      ? repurChageMap.set(pid,{
        repurchage:repurChageMap.get(pid).repurchage,
        total:repurChageMap.get(pid).total+value-1,
        totalMember:repurChageMap.get(pid).totalMember+1
      })
      : repurChageMap.set(pid,{
        repurchage:0,
        total:value,
        totalMember:1
      })
    }else{
      repurChageMap.has(pid)
      ? repurChageMap.set(pid,{
        repurchage:repurChageMap.get(pid).repurchage+1,
        total:repurChageMap.get(pid).total+value-1,
        totalMember:repurChageMap.get(pid).totalMember+1
      })
      : repurChageMap.set(pid,{
        repurchage:1,
        total:value,
        totalMember:1
      })
    }
  }
  
  
  return Array.from(repurChageMap).map(([key,value])=>({
    ...value,
    pid:key
  })).sort((a,b)=>{
    const rateA = a.repurchage/a.totalMember;
    const rateB = b.repurchage/b.totalMember;
    if(rateA===rateB){
      if(a.total===b.total){
        return parseInt(a.pid.replace('pid',''))-parseInt(b.pid.replace('pid',''));
      }else{
        return b.total-a.total;
      }
    }else{
      return rateB-rateA;
    }
  }).map(item=>item.pid);
};

const setStartDate = (date: string): string => {
  let [year, month, day] = date.split("-");
  let cnt = 9;
  while (cnt) {
    switch (true) {
      case parseInt(day) === 1 && parseInt(month) === 1:
        year = (parseInt(year) - 1).toString();
        month = "12";
        day = "30";
        cnt--;
        break;
      case parseInt(day) === 1:
        month = (parseInt(month) - 1).toString();
        day = "30";
        cnt--;
        break;
      default:
        day = (parseInt(day) - 1).toString();
        cnt--;
        break;
    }
  }
  return `${year}-${month.length===1?`0${month}`:month}-${day.length===1?`0${day}`:day}`;
};

// solution(
//   [
//     "2020-02-02 uid1 pid1",
//     "2020-02-26 uid1 pid1",
//     "2020-02-26 uid2 pid1",
//     "2020-02-27 uid3 pid2",
//     "2020-02-28 uid4 pid2",
//     "2020-02-29 uid3 pid3",
//     "2020-03-01 uid4 pid3",
//     "2020-03-03 uid1 pid1",
//     "2020-03-04 uid2 pid1",
//     "2020-03-05 uid3 pid2",
//     "2020-03-05 uid3 pid3",
//     "2020-03-05 uid3 pid3",
//     "2020-03-06 uid1 pid4",
//   ],
//   10,
//   "2020-03-05"
// ); //["pid1", "pid3", "pid2"]
// solution(
//   [
//     "2020-02-02 uid141 pid141",
//     "2020-02-03 uid141 pid32",
//     "2020-02-04 uid32 pid32",
//     "2020-02-05 uid32 pid141",
//   ],
//   10,
//   "2020-02-05"
// ); //["pid32", "pid141"]
// solution(["2020-01-01 uid1000 pid5000"], 10, "2020-01-11"); //["no result"]

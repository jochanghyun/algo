export const solution = (
  members: string[],
  referral: string[],
  sellers: string[],
  ammount: number[]
):number[] => {

  const memberMap = new Map<string,memberDataType>();
  const giveMap =new Map<string,boolean>();
  for(let i = 0 ; i < members.length ; i++){
    memberMap.set(members[i],{childrens:new Map(),parent:referral[i],sales:0});
    const value = memberMap.get(referral[i])
    if(value){
      value.childrens.set(members[i],true);  
      memberMap.set(referral[i],{childrens:value.childrens,parent:value.parent,sales:value.sales})
    }
  }
  for(let i = 0; i<sellers.length ; i++){
    const value = memberMap.get(sellers[i])
    if(value){
      memberMap.set(sellers[i],{childrens:value.childrens,parent:value.parent,sales:ammount[i]*100})
    }
  }
  
  for(const seller of sellers){
    let key = seller;
    let target = memberMap.get(seller);
    let parent = memberMap.get(target!.parent);
    let sales10p = Math.floor(target!.sales * 0.1);
    
    while(true){
      if(!parent) {
        break;
      } 
      target!.sales -= sales10p;
      parent!.sales += sales10p;
      sales10p = Math.floor(sales10p/10);
      parent.childrens.delete(key);
      target!.parent = ''
      if(sales10p===0 && target!.sales===0) break;
      if(parent.childrens.size !==0) break;
      key = target!.parent
      target = parent;
      parent = memberMap.get(target!.parent);
    }
  }
  return Array.from(memberMap).map(([key,{childrens,parent,sales}])=>{
    if(parent==="-"){
      const sales10p = Math.floor(sales*0.1);
      return sales-sales10p
    }else{
      return sales
    }
  })
};

type memberDataType = {
  parent:string;
  sales:number;
  childrens:Map<string,boolean>;
}

// const a = solution(
//   ["john", "mary", "edward", "sam",     "emily", "jaimie", "tod", "young"],
//   ["-"    , "-",   "mary",    "edward", "mary", "mary", "jaimie", "edward"],
//   ["young", "john", "tod", "emily", "mary"],
//   [12,        4,      2,    5,          10]
// ); //	[360, 958, 108, 0, 450, 18, 180, 1080]
// console.log(a)



const b = solution(
  ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
  ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
  ["sam", "emily", "jaimie", "edward"], 
  [2, 3, 5, 4])
console.log(b)
//[0, 110, 378, 180, 270, 450, 0, 0]
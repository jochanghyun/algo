export const solution = (nicks: string[], emails: string[]):number => {
  const users:User[] = nicks.map((item,index)=>({nick:item,email:emails[index]}));
  let result = nicks.length;
  for(const a of Array.from(combination<User>(users,2,[]))){
    if(isSameUser(a[0],a[1])){
      result--
    }
  }
  
  return result;
};

function* combination<T>(array:T[],n:number,selected:T[]):IterableIterator<T[]>{
  if(selected.length === n) yield selected;
  for(let i = 0; i < array.length ; i++){
    for(const a of Array.from(combination<T>([...array.slice(i+1)],2,[...selected,array[i]]))){
      yield a
    }
  }
}

const isSameUser = (userA:User,userB:User):boolean => {
  if(userA.nick.length - userB.nick.length >2) return false
  const target = userA.nick.length < userB.nick.length ? userA.nick:userB.nick
  const current = userA.nick.length < userB.nick.length ? userB.nick:userA.nick
  for(const a of replaceAndCheck(current,target)){
    if(a){
      return true
    }
  }

  const useraAccount = getAccount(userA.email);
  const userbAccount = getAccount(userB.email);
  const emailTarget = useraAccount < userbAccount ? useraAccount:userbAccount
  const emailCurrent = useraAccount < userbAccount ? userbAccount:useraAccount
  
  for(const a of replaceAndCheck(emailCurrent,emailTarget)){
    if(a){
      return true
    }
  }

  return false
}

function* replaceAndCheck(current:string,target:string){
  if(current===target) {
    yield current
  };
  if(current.length===target.length) return;
  const currentArr = current.split('');
  for(let i = 0 ; i < current.length ; i++){
    for(const a of replaceAndCheck([...currentArr.slice(i+1)].join(''),target)){
      if(a){
        yield a
        return
      }
    }
  }
}

const getAccount = (email:string)=>{
  return email.split('@')[0]
}

type User = {
  nick:string;
  email:string;
}

solution(
  [
    "imhero111",
    "moneyman",
    "hero111",
    "imher1111",
    "hro111",
    "mmoneyman",
    "moneymannnn",
  ],
  [
    "superman5@abcd.com",
    "batman432@korea.co.kr",
    "superman@abcd.com",
    "supertman5@abcd.com",
    "superman@erty.net",
    "batman42@korea.co.kr",
    "batman432@usa.com",
  ]
); //3
solution(
  ["99police", "99poli44"],
  ["687ufq687@aaa.xx.yyy", "87ufq687@aaa.xx.yyy"]
); //2
solution(
  ["99polico", "99policd"],
  ["687ufq687@aaa.xx.yyy", "587ufq687@aaa.xx.yyy"]
); //2

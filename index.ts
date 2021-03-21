class CliValidator{
  ruleMap : Map<string,string>;

  constructor(){
    this.ruleMap = new Map();
    
  }

  init = (
    program: string,
    flagRules: Array<string>,
    commands: Array<string>,
  ): Array<boolean> => {
    this.cliRuleParsor(flagRules);
    const resultArr : Array<boolean> =[];
    for(const command of commands){
      let isValid: boolean = true;
      const commandMap = this.commandParsor(command);
      
      commandMap.forEach((value,key)=>{
        if(key[0] === '-'){
          isValid = isValid&&this.checkArgsValid(key,value);
        }else{
          isValid = isValid&&value===program;
        }
      });

      resultArr.push(isValid);
    }

    return resultArr;
  }
  
  cliRuleParsor(flagRules: Array<string>):void{
    const aliasMap = new Map();
    flagRules.map((item) => {
      const arr = item.split(' ');
      if (arr.length === 3){
        aliasMap.set(arr[0],arr[2])
      }else if (arr.length === 2){
        this.ruleMap.set(arr[0],arr[1]);
      }
    });
    
    aliasMap.forEach((value,key)=>{
      this.ruleMap.set(key,this.ruleMap.get(value));
    });
  }
  commandParsor(command:string):Map<string,string>{
    const commandMap = new Map();
    const commandArray = command.split(' ');
    commandMap.set('program',commandArray[0]);
    commandArray.shift();

    let key = '';
    
    while(commandArray.length!==0){
      
      if(commandArray[0].indexOf('-')===0){
        key = commandArray.shift();
        commandMap.set(key,'');
      }else{
        commandMap.set(key,commandMap.get(key)===''? `${commandArray.shift()}`
          :`${commandMap.get(key)} ${commandArray.shift()}`);
      }
    }
    return commandMap;
  }
  checkArgsValid(flag:string, args:string):boolean{
    let result = true;
    switch(this.ruleMap.get(flag)){
      case "NUMBER":
        result = args.indexOf(' ')===-1 && /^[0-9]+$/.test(args);
        break;
      case "NUMBERS":
        result = /^[0-9]+$/.test(args);
        break;
      case "STRING":
        result = args.indexOf(' ')===-1 && /^[a-zA-Z]+$/.test(args);
        break;
      case "STRINGS":
        result = /^[a-zA-Z]+$/.test(args);
        break;
      case "NULL":
        result = args.length===0
        break;
    }
    return result;
  }
}

  


const answer1 = new CliValidator().init(
  'line',
  ['-send STRING', '-a ALIAS -amount', '-amount NUMBERS', '-e NULL'],
  ["line -send dd -e -amount"]
);




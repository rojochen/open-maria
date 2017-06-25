//load schedule method
const LINEBot = require('line-messaging');

const lineService = require("./line-service");
var sendLineMessage = function(builder){
        if(global.users === null || global.users === undefined){
            throw "Users is undefined";
        }
        global.users.forEach(function(item,key,mapObj){
            lineService.get().push(key,builder);
        });
};
const tasks = {
    
    alertTakeMedicine:()=>{
        //send alert message
        console.log("take medicine",new Date());
        try{
            let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 9:00需要為王奶奶準備吃藥");
            sendLineMessage(textMessageBuilder);
        }catch(e){
            console.error(e);
        }
        
    },
    alertStandUp:()=>{
         //send alert message
        console.log("stand up",new Date());
        try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 10:00 需要為王奶奶翻身");
            sendLineMessage(textMessageBuilder);
        }catch(e){
            console.error(e);
        }
         

    },
    askChangingdiaper:()=>{
        console.log("chang diaper",new Date());
        try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("請問王奶奶是否更換尿布了呢");
            sendLineMessage(textMessageBuilder);

        }catch(e){
            console.error(e);
        }

    },
    alertEatingLunch:()=>{
         //send alert message
        console.log("eat lunch",new Date());
         try{
            let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 12:00需要為王奶奶進食，需要流質的食物");
            sendLineMessage(textMessageBuilder);

        }catch(e){
            console.error(e);
        }
 
    },
    aksLunchState:()=>{
        console.log("lunch state",new Date());
        try{
            let textMessageBuilder = new LINEBot.TextMessageBuilder("今天王奶奶吃的量有(1. 全吃完  2. 沒吃完但多於1/2 3. 只吃少於1/2)");
            sendLineMessage(textMessageBuilder);
        }catch(e){
            console.error(e);
        }
    }
}
module.exports = tasks;

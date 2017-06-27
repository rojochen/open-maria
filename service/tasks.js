//load schedule method
const LINEBot = require('line-messaging');
const lineService = require("./line-service");
var sendLineMessage = function(builder,title,isText){
        if(global.users === null || global.users === undefined){
            throw "Users is undefined";
        }
        console.log('send line message' );
        var list = [] ;
        //var template = new LINEBot.TemplateMessageBuilder(title, builder);
        var template ;
        if(isText===true)
        {
            template = builder;
        }else{
            template= new LINEBot.TemplateMessageBuilder('提示視窗', builder);
        }

         global.users.forEach(function(item,key,mapObj){
            console.log("send to "+ key);
            //list.push(lineService.get().pushTextMessage(key,builder));
            lineService.get().pushMessage(key,template).catch(function(e){
                 console.log(e)
            });
            /*
            lineService.get().pushMessage(key,template).catch(function(e){
                console.log(e)
            });;
            */
        });
        
        //list.push(lineService.get().pushTextMessage("U14cb82b8d9421da693926a9b8f7152dc",builder));
};
const tasks = {
    
    alertTakeMedicine:()=>{
        //send alert message
        console.log("take medicine",new Date());
        //try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 9:00需要為王奶奶準備吃藥");
        sendLineMessage(textMessageBuilder,"提醒!!",true);
      //  }catch(e){
        //    console.error(e);
       // }
        
    },
    alertStandUp:()=>{
         //send alert message
        console.log("stand up",new Date());
        //try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 10:00 需要為王奶奶翻身");
        //sendLineMessage("提醒您 10:00 需要為王奶奶翻身");
        
        sendLineMessage(textMessageBuilder,"提醒!!",true);

        //}catch(e){
        //    console.error(e);
        //}
         

    },
    askChangingdiaper:()=>{
        console.log("chang diaper",new Date());
       // try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("請問王奶奶是否更換尿布了呢");
        let confirm = new LINEBot.ConfirmTemplateBuilder();
            confirm.setMessage('請問王奶奶是否更換尿布了呢');
            confirm.setPositiveAction('是', '已經換了');
            confirm.setNegativeAction('還沒', '還沒');
         
        sendLineMessage(confirm,"提醒!!");
       // }catch(e){
        //    console.error(e);
       // }

    },
    alertEatingLunch:()=>{
         //send alert message
        console.log("eat lunch",new Date());
        // try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 12:00需要為王奶奶進食，需要流質的食物");
        sendLineMessage(textMessageBuilder,"提醒!!" ,true);
        //}catch(e){
        //    console.error(e);
        //}
 
    },
    aksLunchState:()=>{
        console.log("lunch state",new Date());
        //try{
        let textMessageBuilder = new LINEBot.TextMessageBuilder("今天王奶奶吃的量有(1. 全吃完  2. 沒吃完但多於1/2 3. 只吃少於1/2)");
        let buttons = new LINEBot.ButtonTemplateBuilder();
        buttons.setTitle('回報');
        buttons.setMessage('今天王奶奶吃的量有');
        // label, data/url, type
        buttons.addAction('1.全都吃', 'action=buy&itemid=123', LINEBot.Action.POSTBACK);
        buttons.addAction('2.沒吃完但多於1/2', 'action=buy&itemid=123', LINEBot.Action.POSTBACK);
        buttons.addAction('3.沒吃', 'http://example.com/page/123', LINEBot.Action.POSTBACK);
        sendLineMessage(buttons,"回報!!");
        //}catch(e){
        //    console.error(e);
        //}
    }
}
module.exports = tasks;

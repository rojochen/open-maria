'use strict'
var app = require('express')();
var server = require('http').Server(app);
const LINEBot = require('line-messaging');
var taskService = require('./service/task-service.js');
var lineService = require('./service/line-service.js');
var bot = lineService.create(server)


//Cron工作排程
//actions();

const logger = (req,res,next)=>{
  console.log(new Date(),req.method,req.url);
  next();
};
const headerProcess = (req,res,next) => {
  res.header("Content-Type", "text/html; charset=utf-8");
  next();
}
//middleware
app.use(headerProcess);
app.use(lineService.get().webhook('/webhook'));
app.use(logger);
global.users = new Map();
//add routes
app.get('/',function(request, response){ 
    response.end('你好！');
});
//event binding
    //    let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 10:00 需要為王奶奶翻身");
// var confirm = new LINEBot.ConfirmTemplateBuilder();
// confirm.setMessage('Are you sure?');
// confirm.setPositiveAction('OK', 'ok');
// confirm.setNegativeAction('Cancel', 'cannel');
// bot.pushMessage("U14cb82b8d9421da693926a9b8f7152dc",confirm);

var column1 = new LINEBot.CarouselColumnTemplateBuilder();
column1.setTitle('今天王奶吃的量')
       .setMessage('回報用餐情況')
       .addAction('1.全都吃', '', LINEBot.Action.POSTBACK)
       .addAction('2.沒吃完但多於1/2', '', LINEBot.Action.POSTBACK)
       .addAction('3.沒吃完但多於1/3', '', LINEBot.Action.URI);

var column2 = new LINEBot.CarouselColumnTemplateBuilder();
column2.setTitle('this is item 2')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item2.jpg')
       .addAction('Buy', 'action=buy&itemid=222', LINEBot.Action.POSTBACK)
       .addAction('Add to cart', 'action=buy&itemid=222', LINEBot.Action.POSTBACK)
       .addAction('View detail', 'http://example.com/page/222', LINEBot.Action.URI);

var column3 = new LINEBot.CarouselColumnTemplateBuilder();
column3.setTitle('this is item 3')
       .setMessage('description')
       .setThumbnail('https://example.com/bot/images/item3.jpg')
       .addAction('Buy', 'action=buy&itemid=333', LINEBot.Action.MESSAGE)
       .addAction('Add to cart', 'action=buy&itemid=333', LINEBot.Action.MESSAGE)
       .addAction('View detail', 'http://example.com/page/333', LINEBot.Action.MESSAGE);
var buttons = new LINEBot.ButtonTemplateBuilder();
buttons.setTitle('回報');
buttons.setMessage('今天王奶奶吃的量有');
 

// label, data/url, type
buttons.addAction('1.全都吃', 'action=buy&itemid=123', LINEBot.Action.POSTBACK);
buttons.addAction('2.沒吃完但多於1/2', 'action=buy&itemid=123', LINEBot.Action.POSTBACK);
buttons.addAction('3.沒吃', 'http://example.com/page/123', LINEBot.Action.POSTBACK);
var carousel = new LINEBot.CarouselTemplateBuilder([column1]);

 
        let confirm = new LINEBot.ConfirmTemplateBuilder();
            confirm.setMessage('請問王奶奶是否更換尿布了呢');
            confirm.setPositiveAction('是', '已經換了');
            confirm.setNegativeAction('還沒', '還沒');
        var template = new LINEBot.TemplateMessageBuilder('提示視窗', confirm);


//         let textMessageBuilder = new LINEBot.TextMessageBuilder("提醒您 10:00 需要為王奶奶翻身");
 
bot.pushMessage("U14cb82b8d9421da693926a9b8f7152dc",template).catch(function(e){
  console.log(e)
});;

bot.on(LINEBot.Events.FOLLOW,(replyToken,source)=>{
  console.log(source.getUserId);
  //save user id;
  let userId = source.getUserId();
  global.users.set(userId,source);
  bot.pushTextMessage(userId,"歡迎試一試");
});
bot.on(LINEBot.Events.UNFOLLOW,(replyToken,source)=>{
  console.log(source.getUserId);
  //save user id;
  let userId = source.getUserId();
  global.users[userId] = null;
    
});
bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
  // add code below.
  console.log(message);
  console.log(message.getUserId());
  console.log(message.getMessageType());
  let userId = message.getUserId();
  bot.replyTextMessage(replyToken, 'hello WORLD!').then(function(data) {
  // add your code when success.
    console.log(data.getType());
    bot.pushTextMessage(userId, '很高興你跟我說話');
    /** 
    console.log(data.getUserId());
    console.log(data.getGroupId());
    */
 
  }).catch(function(error) {
    // add your code when error.
  });
});

server.listen(3003,()=>{
  console.log('server start!')
  taskService.init();
});
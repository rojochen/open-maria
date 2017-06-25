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
app.use(bot.webhook('/webhook'));
app.use(logger);
global.users = new Map();
//add routes
app.get('/',function(request, response){ 
    response.end('你好！');
});
//event binding
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
    console.log("HEELO WORLD");
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
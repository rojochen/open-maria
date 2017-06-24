'use strict'
var app = require('express')();
var server = require('http').Server(app);
var token = require('./token.json'); // no need to add the .json extension
var LINEBot = require('line-messaging');

var bot = LINEBot.create({
  channelID: token.channelID,
  channelSecret: token.accessToken,
  channelToken: token.channelSecret
}, server);
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

//add routes
app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
    response.end('你好！'); //作出回應
});
//event binding
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
});
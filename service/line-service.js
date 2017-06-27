var LINEBot = require('line-messaging');
const token = require('./token.js');
global._bot = null;

const lineService = {
    create:  (server) =>{
        if(server===null || server===undefined){
            throw "express server is null or undefined";
        }else{
            if(!global._bot){
                global._bot = LINEBot.create({
                    channelID: token.channelID,
                    channelSecret: token.accessToken,
                    channelToken: token.channelSecret
                }, server);
            }
        }
        return global._bot;
        
    },
    get: () => {
        if(global._bot===null){
            throw "please create LINE connect";
        }
        return global._bot;
    }
};
module.exports = lineService;
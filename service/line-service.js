var LINEBot = require('line-messaging');
const token = require('./token.json'); // no need to add the .json extension
global._bot = null;

const lineService = {
    create:  (server) =>{
        if(server===null || server===undefined){
            throw "express server is null or undefined";
        }else{
            if(!global.bot){
                global.bot = LINEBot.create({
                    channelID: token.channelID,
                    channelSecret: token.accessToken,
                    channelToken: token.channelSecret
                }, server);
            }
        }
        return global.bot;
        
    },
    get: () => {
        if(global._bot===null){
            throw "please create LINE connect";
        }
        return global._bot;
    }
};
module.exports = lineService;
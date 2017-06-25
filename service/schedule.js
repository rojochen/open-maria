var nodeSchedule = require('node-schedule');
var tasks = require('./tasks.js')
nodeSchedule.scheduleJob('5 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
}); 
const Schedule = {
    list:[],
    add:function(cronJobTime,name,action){
       var j = nodeSchedule.scheduleJob(cronJobTime,  tasks[action]); 
       // console.log(j);
        //this.list.push({name:name,time:cronJobTime,jobObject:j});
    },
    cancel:function(index){
        //this.list[index].jobObject();
    },
    query:function(){
        //umimplement
    }

};
module.exports = Schedule;
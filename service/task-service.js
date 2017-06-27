//load jobs list
//load tasks 
//add schedule
var jobs = require("../config/jobs.json");
var schedule = require("./schedule.js");


module.exports = {
    name:"hello",
    init:function(){
         if(jobs){
            jobs.forEach((job,index)=>{
                schedule.add(job.time,job.name,job.action)
            }, this);
        }
    }
}
 
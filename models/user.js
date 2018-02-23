var User = require("../schema/user");
module.exports= {
    getList:function(params,callback){
        User.find(params).populate("role").exec(function(err,list){
            callback(err,list);
        });
    }
}
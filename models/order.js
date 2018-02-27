var Order = require("../schema/order");
module.exports= {
    getList:function(params,callback){
        Order.find(params).populate("price").populate('user').exec(function(err,list){
            callback(err,list);
        });
    }
}
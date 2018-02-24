var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var orderSchema = new mongoose.Schema({
    goTime:String,
    peopleNum:Number,
    price:[{
        type:Schema.Types.ObjectId,
        ref:"Price"
    }],
    user:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    phone:Number,
    address:String,
    createdAt: {type: Date, default: Date.now },
    updatedAt:Date,
    isDeleted:{type:Boolean,default:false}
});

var Order = mongoose.model("Order",orderSchema);

module.exports = Order;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    name:String,
    paddword:String,
    role:[{
        type:Schema.Types.ObjectId,
        ref:"Role"
    }],
    createdAt: {type: Date, default: Date.now },
    updatedAt:Date,
    isDeleted:{type:Number,default:0}
})

var User = mongoose.model("User",userSchema);

module.exports = User;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
    name:String,
    createdAt: {type: Date, default: Date.now },
    updatedAt:Date,
    isDeleted:{type:Boolean,default:false}
})

var Role = mongoose.model("Role",orderSchema);

module.exports = Role;
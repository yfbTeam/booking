var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
    name:String,
    createdAt: {type: Date, default: Date.now },
    updatedAt:Date,
    isDeleted:{type:Boolean,default:false}
})

var Role = mongoose.model("Role",orderSchema);
new Role({_id:'5a9123efa43cec2690b0ad05',name: '管理员' });
module.exports = Role;
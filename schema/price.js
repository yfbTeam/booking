var mongoose = require('mongoose');

var priceSchema = new mongoose.Schema({
    price:Number,
    createdAt: {type: Date, default: Date.now },
    updatedAt:Date,
    isDeleted:{type:Boolean,default:false}
})

var Price = mongoose.model("Price",priceSchema);

module.exports = Price;
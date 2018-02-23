var mongoose = require('mongoose');

var priceSchema = new mongoose.Schema({
    price:Number,
    createdAt: {type: Date, default: Date.now },
    updatedAt:Date,
    isDeleted:{type:Number,default:0}
})

var Price = mongoose.model("Price",priceSchema);

module.exports = Price;
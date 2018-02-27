var express = require('express');
var router = express.Router();
var Price = require('../schema/price');
var model = require('../models/index')

router.get('/',function(req,res,next){

        model.getList(Price,{isDeleted:false},function (err,list) {
            if(err){
                res.send(err.message);
                return;
            }
            res.send(list);
        })

})
router.post('/',function(req,res,next){
    model.addModal(Price,req.body,function(err,doc){
        if(err) {
            res.send(err.message);
            return;
        }
        res.send(doc);
    })
})
router.put('/:id',function(req,res,next){
    console.log(req.params.id)
    var data = Object.assign({},req.body,{updatedAt:new Date()});
    model.editModal(Price,{_id:req.params.id},data,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send(doc);
    })
})
module.exports = router;
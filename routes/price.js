var express = require('express');
var router = express.Router();
var Price = require('../schema/price');
var model = require('../models/index')

router.get('/',function(req,res,next){
    router.get('/',function(req,res,next){
        model.getList(Price,{isDeleted:0},function (err,list) {
            if(err){
                res.send(err.message);
                return;
            }
            res.send(list);
        })
    })
})
router.put('/:id',function(req,res,next){
    var data = Object.assign({},req.body,{updatedAt:new Date()});
    model.editModal(Price,{_id:req.params.id},data,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('edit success!');
    })
})
module.exports = router;
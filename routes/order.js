var express = require('express');
var router = express.Router();
var Order = require('../schema/order');
var orderModel = require('../models/order')
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
    orderModel.getList({isDeleted:0},function (err,list) {
        if(err){
            res.send(err.message);
            return;
        }
        res.send(list);
    })
});
router.post('/',function(req,res,next){
    model.addModal(Order,req.body,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('add success!');
    })
})
router.get('/:id',function(req,res,next){
    model.getOne(Order,{_id:req.params.id},function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send(doc);
    })
})
router.put('/:id',function(req,res,next){
    var data = Object.assign({},req.body,{updatedAt:new Date()});
    model.editModal(User,{_id:req.params.id},data,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('edit success!');
    })
})
router.delete("/:id",function(req,res,next){
    model.editModal(Order,{_id:req.params.id},{
        isDelete:1
    },function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('delete success!');
    })
})
module.exports = router;

var express = require('express');
var moment  = require('moment')
var router = express.Router();
var Order = require('../schema/order');
var orderModel = require('../models/order')
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
    orderModel.getList({isDeleted:false},function (err,list) {
        if(err){
            res.send(err.message);
            return;
        }
        //console.log(moment(list[0]).goTime.format('YYYY-MM-DD'))
        res.send(list);
    })
});
router.post('/',function(req,res,next){
    model.addModal(Order,req.body,function(err,doc){
        console.log(doc)
        if(err){
            res.send(err.message);
            return;
        }
        res.send(doc);
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
    model.editModal(Order,{_id:req.params.id},data,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('edit success!');
    })
})
router.delete("/:id",function(req,res,next){
    model.editModal(Order,{_id:req.params.id},{
        isDeleted:true
    },function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send("delete success!");
    })
})
module.exports = router;

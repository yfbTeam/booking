var express = require('express');
var moment  = require('moment');
var router = express.Router();
var Order = require('../schema/order');
var User = require('../schema/user')
var orderModel = require('../models/order')
var model = require('../models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
    model.getOne(User,{_id:req.param("userId")},function(err,list){
        var roleId = list.role;
        if(roleId=='5a9123efa43cec2690b0ad05'){
            console.log(1)
            body ={isDeleted:false};
        }else{
            body = {user:req.param("userId"),isDeleted:false}
        }
        orderModel.getList(body,function(err,list){
            if(err){
                res.send(err.message);
                return;
            }
            res.send(list);
        })
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

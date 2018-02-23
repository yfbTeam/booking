var express = require('express');
var router = express.Router();
var Role = require('../schema/role');
var model = require('../models/index')

router.get('/',function(req,res,next){
    model.getList(Role,{isDeleted:0},function (err,list) {
        if(err){
            res.send(err.message);
            return;
        }
        console.log(list[0].createdAt.toLocaleString())
        res.send(list);
    })
})
router.post('/',function(req,res,next){
    model.addModal(Role,req.body,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('add success!');
    })
})
router.get('/:id',function(req,res,next){
    model.getOne(Role,{_id:req.params.id},function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send(doc);
    })
})
router.put('/:id',function(req,res,next){
    var data = Object.assign({},req.body,{updatedAt:new Date()});
    model.editModal(Role,{_id:req.params.id},data,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send('edit success!');
    })
})
router.delete("/:id",function(req,res,next){
    model.editModal(Role,{_id:req.params.id},{
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
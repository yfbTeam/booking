var express = require('express');
var pinyin = require('pinyin');
var router = express.Router();
var User = require('../schema/user');
var userModel = require('../models/user')
var model = require('../models/index');
var crypto = require('crypto');
//login
router.post('/login',function(req,res,next){
    console.log(req.body)
    var userName = req.body.name;
    var userPwd = req.body.password;
    var md5 = crypto.createHash("md5");
    var newPas = md5.update(userPwd).digest("hex");
    User.findOne({nickName:userName,password:newPas,isDeleted:false},function(err,doc){
      if(err){
        res.send(err.message);
        return
      }
      res.cookie("nickName",doc.nickName,{
        path:'/',
        maxAge:1000*60*60
      });
    res.cookie("name",doc.name,{
        path:'/',
        maxAge:1000*60*60
    });
    res.cookie("roleId",doc.role,{
        path:'/',
        maxAge:1000*60*60
    });
    res.cookie('userId',doc._id,{
        path:'/',
        maxAge:1000*60*60
    })
      res.send({
          nickName:doc.nickName,
          name:doc.name,
          roleId:doc.role,
          userId:doc._id
      });
    })
})
//register
router.post('/register',function(req,res,next){
    var userName = req.body.userName,userPwd = req.body.userPwd;
    var md5 = crypto.createHash("md5");
    var newPas = md5.update(userPwd).digest("hex");
    User.findOne({
        name:userName
    },function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        if(doc){
            res.json({
                status:'1',
                msg:'用户已存在',
                result:''
            });
        }else{
            User.create({
                name:userName,
                password:newPas
            },function(err,doc2){
                if(err){
                    res.send(err.message);
                    return;
                }
                res.cookie("nickName",doc.nickName,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.cookie("name",doc.name,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.cookie("roleId",doc.role,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.cookie('userId',doc._id,{
                    path:'/',
                    maxAge:1000*60*60
                })
                res.send({
                    nickName:doc.nickName,
                    name:doc.name,
                    roleId:doc.role,
                    userId:doc._id
                });
            })
        }
    })

})
//登出接口
router.post("/logout", function (req,res,next) {
    res.cookie("nickName",'',{
        path:'/',
        maxAge:1000*60*60
    });
    res.cookie("name",'',{
        path:'/',
        maxAge:1000*60*60
    });
    res.cookie("roleId",'',{
        path:'/',
        maxAge:1000*60*60
    });
    res.cookie('userId','',{
        path:'/',
        maxAge:1000*60*60
    })
    res.json({
        status:"0",
        msg:'',
        result:''
    })
});
// 检查登录状态cookies
router.get("/checkLogin", function (req,res,next) {
    if(req.cookies.nickName){
        res.json({
            status:'0',
            msg:'',
            result:req.cookies.nickName || ''
        });
    }else if(req.cookies.name){
        res.json({
            status:'1',
            msg:'',
            result:req.cookies.name || ''
        });
    }else if(req.cookies.roleId){
        res.json({
            status:'1',
            msg:'',
            result:req.cookies.roleId || ''
        });
    }else if(req.cookies.userId){
        res.json({
            status:'1',
            msg:'',
            result:req.cookies.userId || ''
        });
    }else{
        res.json({
            status:'2',
            msg:'未登录',
            result:''
        });
    }
});
/* GET users listing. */
router.get('/', function(req, res, next) {
    userModel.getList({isDeleted:false},function (err,list) {
        if(err){
          res.send(err.message);
          return;
        }
        res.send(list);
    })
});
router.post('/',function(req,res,next){
    var md5 = crypto.createHash("md5");
    req.body.password = md5.update(req.body.password).digest("hex");
    var nickName = pinyin(req.body.name,{style:pinyin.STYLE_NORMAL}).join(',').replace(/\,+/,'');
    var body = Object.assign({},req.body,{nickName:nickName});
    model.addModal(User,body,function(err,doc){
        if(err){
            res.send(err.message);
            return;
        }
        res.send(doc);
    })
})
router.get('/:id',function(req,res,next){
    model.getOne(User,{_id:req.params.id},function(err,doc){
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
    model.editModal(User,{_id:req.params.id},{
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

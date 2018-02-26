var express = require('express');
var router = express.Router();
var User = require('../schema/user');
var userModel = require('../models/user')
var model = require('../models/index');
var crypto = require('crypto');
//login
router.post('/login',function(req,res,next){
    var userName = req.body.userName;
    var userPwd = req.body.userPwd;
    var md5 = crypto.createHash("md5");
    var newPas = md5.update(userPwd).digest("hex");
    User.findOne({name:userName,password:newPas},function(err,doc){
      if(err){
        res.send(err.message);
        return
      }
      res.cookie("roleName",doc.role,{
          path:'/',
          maxAge:1000*60*60
      });
      res.cookie("userName",doc.name,{
          path:'/',
          maxAge:1000*60*60
      });
      res.json({
          result:{
              userName:doc.name,
              roleName:doc.role
          }
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
                res.cookie("roleName",doc2.role,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.cookie("userName",doc2.name,{
                    path:'/',
                    maxAge:1000*60*60
                });
                res.json({
                    result:{
                        userName:doc2.name,
                        roleName:doc2.role
                    }
                });
            })
        }
    })

})
//登出接口
router.post("/logout", function (req,res,next) {
    res.cookie("roleName","",{
        path:"/",
        maxAge:-1
    });
    res.cookie("userName","",{
        path:"/",
        maxAge:-1
    });
    res.json({
        status:"0",
        msg:'',
        result:''
    })
});
// 检查登录状态cookies
router.get("/checkLogin", function (req,res,next) {
    if(req.cookies.userName){
        res.json({
            status:'0',
            msg:'',
            result:req.cookies.userName || ''
        });
    }else if(req.cookies.roleName){
        res.json({
            status:'1',
            msg:'',
            result:req.cookies.roleName || ''
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
    model.addModal(User,req.body,function(err,doc){
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

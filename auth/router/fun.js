var express=require('express');
var auth=require('./auth');
var schema=require('../schema/sch');
var textSchema=require('../schema/textSchema');
var path=require('path');
router=express.Router();

router.get('/logout',(req,res)=>{     
    req.session.destroy();
    res.send({
        err:false
    });
});
router.post('/signup',auth.verify,async (req,res)=>{
    if(!(req.body.name&&req.body.password&&req.body.email)){
        return res.send({
            err:true,
            result:"all feilds should be filled"
        });
    }
    let data=await schema.findOne({email:req.body.email});
    if(data){
        return res.send({
            err:true,
            result:"email already exist"
        });
    }
    else{
        let a=await schema.create(req.body);
        req.session._id=a._id;
        req.session.user=a.name;
       // console.log("data saved successfully");
        res.send({
            err:false
        });
    }
});
router.post('/login',auth.verify,async (req,res)=>{
    if(!(req.body.password&&req.body.email)){
        return res.send({
            err:true,
            result:"all feilds should be filled"
        });
    }
    let data =await schema.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(data){
        req.session._id=data._id;
        req.session.user=data.name;
        res.send({
            err:false
        });
    }
    else{
        res.send({
            err:true,
            result:"email or password is incorrect"
        });
    }
});
router.get('/blog',async (req,res)=>{
    let data=await textSchema.find({}).sort({_id:-1});
    if(data.length>0){
        res.send(data);
    }
    else{
        res.send({
            err:true,
            result:"no blogs yet"
        });
    }
});
router.get('/check',(req,res)=>{
    //console.log(req.session._id)
    if(req.session._id){
        res.send(true)
    }
    else{
        res.send(false);
    }
});
router.post('/create',async (req,res)=>{
    req.body.name=req.session.user;
    req.body.userid=req.session._id;
    //console.log(req.body);
    let data=await textSchema.create(req.body);
    res.send(data);
});
router.get('/userDetail',(req,res)=>{
    res.send(req.session);
});
router.get('/home',auth.check,(req,res)=>{
    res.sendFile(path.join(__dirname+'/../public/indx.html'));
});
router.delete('/del',async (req,res)=>{
    let d=await textSchema.deleteOne(req.body);
    res.send(d);
});
module.exports=router;
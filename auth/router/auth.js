var path=require('path')
function verify(req,res,next){
    if(req.session._id){
        res.redirect('/home');
    }
    else{
        next();
    }
}
function check(req,res,next){
    if(req.session._id){
        next();
    }
    else{
        res.sendFile(path.join(__dirname+'/../public/login.html'));
    }
}

module.exports.verify=verify;
module.exports.check=check;
var mongoose=require('mongoose');
var schema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
module.exports=mongoose.model('login',schema);
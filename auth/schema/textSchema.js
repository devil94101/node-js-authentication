var mongoose=require('mongoose');
var schema=new mongoose.Schema({
    text:String,
    userid:String,
    name:String,
    createdAt:{
        type:String
    }
});
module.exports=mongoose.model('blog',schema);
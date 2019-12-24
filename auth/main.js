var express=require('express');
var bodyParser=require('body-parser');
//var cookieParser=require('cookie-parser');
var session=require('express-session');
var mongoose=require('mongoose');
var router=require('./router/fun');
mongoose.connect('mongodb://localhost:27017/learn',{
    useNewUrlParser:true,
    useUnifiedTopology: true 
});
app=express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
//app.use(cookieParser());
app.use(session({
    name:"deepak",
    secret:"kuch bhi",
    resave: false,
    saveUninitialized: false
    }));
app.use(express.static(__dirname+'/public'));
app.use('/',router);

app.get('/',(req,res)=>{
   // console.log(req.session);
    if(req.session._id){
        res.redirect('/home');
    }
    else{
        console.log(req.session._id);
        res.sendFile(__dirname+'/public/login.html');
    }
});
app.listen(3000,()=>{
    console.log("listening....");
});
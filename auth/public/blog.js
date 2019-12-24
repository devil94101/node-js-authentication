$(document).ready(async function(){
    let data=await $.ajax({
        type:'GET',
        url:'/blog'
    });
    let use=await $.ajax({
        type:'GET',
        url:'/userDetail'
    });
    $('.user').html(use.user);
    //console.log(data);
    if(data.err){
        $('.blogs').append(`<p>${data.result}</p><hr>`);
    }
    else{
        var index=5;
        for(let i=0;i<5;i++){
            if(data.length==i){
                break;
            }
            if(data[i].userid==use._id){
                let v=$(`<div><p>${data[i].text}</p> <p>Created By- ${data[i].name}  At ${data[i].createdAt} </p><button class="delete">Delete</button></div><hr>`);
                $('.blogs').append(v);
                v.data('id',data[i]._id);
            }
            else
                $('.blogs').append(`<div><p>${data[i].text}</p> <p>Created By- ${data[i].name}  At ${data[i].createdAt}</p></div><hr>`);
        }
        if(data.length>=6){
            $('.next').toggleClass('hidd');
        }
    }
    $('.next').on('click',async function(){
        let x=index;
        $('.blogs').html('');
        index+=5;
        for(let i=x;i<x+5;i++){
            if(data.length==i){
                break;
            }
            if(data[i].userid==use._id){
                let v=$(`<div><p>${data[i].text}</p> <p>Created By- ${data[i].name}  At ${data[i].createdAt} </p><button class="delete">Delete</button></div><hr>`);
                $('.blogs').append(v);
                v.data(id,data[i]._id);
            }
            else
                $('.blogs').append(`<div><p>${data[i].text}</p> <p>Created By- ${data[i].name}  At ${data[i].createdAt}</p></div><hr>`);
        }
        if(index>=data.length){
            $(this).toggleClass('hidd');
        }
    });
    $('.logout').on('click',function(e){
        e.preventDefault();
        $.ajax({
            type:'GET',
            url:'/logout',
        });
        document.location.href='login.html';
    });
    $('.create_blog').on('click',async function(e){
        e.preventDefault();
        let res=await $.ajax({
            type:'GET',
            url:'/check'
        });
        if(res){
            document.location.href='createblog.html';
        }
        else{
            document.location.href='login.html';
        }
    });
    $('.delete').on('click',async function(){
        let id=$(this).parent().data('id');
        let d=await $.ajax({
            type:"DELETE",
            url:'/del',
            data:{_id:id}
        });
        location.reload();
    });
});
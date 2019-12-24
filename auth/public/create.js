$(document).ready(function(){
    user();
    $('.createblog').on('click',async function(){
        let val=$('.textblog').val();
        console.log(val);
        let d=new Date();
        let y=`${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`; 
        let data=await $.ajax({
            type:'POST',
            url:'/create',
            data:{
                text:val,
                createdAt:y
            }
        });
        //console.log(data);
        document.location.href='indx.html';
    });
});
async function user(){
    let use=await $.ajax({
        type:'GET',
        url:'/userDetail'
    });
    $('.user').html(use.user);
}
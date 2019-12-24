async function check(){
    let res=await $.ajax({
        type:'GET',
        url:'/check'
    });

    if(!res){
        document.location.href='login.html';
    
    }   
}
check();
$(document).ready(function(){
    $('.home').on('click',function(){
        document.location.href='indx.html';
    });
})
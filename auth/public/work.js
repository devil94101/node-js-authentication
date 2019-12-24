$(document).ready(function(){
    $('.login').on('submit',async function(e){
        e.preventDefault();
        let c=await form($(this),'/login');
        //console.log(c);
        if(c.err){
            alert(c.result);
        }
        else{
            window.location.href='indx.html';
            //console.log(c);
        }

    });
    $('.signup').on('submit',async function(e){
       e.preventDefault();
       let c=await form($(this),'/signup');
        if(c.err){
            alert(c.result);
        }
        else{
            window.location.href='indx.html';
        }
    });
});
async function form(ele,url){
    let item=ele.serializeArray();
        let data={};
        for(i of item){
            data[i.name]=i.value;
        }
        let c=await $.ajax({
            type:'POST',
            url:url,
            data:data
        });
        console.log(c);
        return c;
}
function search(){
    var name=$("#booksearch").val();
    alert(name);
    if(name !=""){
        window.location.href="/bookconsumer/search?name="+name;
    }else{
        window.location.href="/bookconsumer/queryBook";
    }
};
function toShoppingCart(user){
    alert(user);
    if(user==null){
        layer.open({
            type:0,
            title:"系统提示",
            content:"登录有就能有辆车了，现在要去登录吗?",
            btn:["现在就去","给朕退下"],
            btn1:function(){
                //点击现在就去时去登陆页面
                window.location.href="/customerconsumer/dologin";
            }
        });
    }else{
        alert("true");
        window.location.href="/orderconsumer/toShoppingCart";
    }
};
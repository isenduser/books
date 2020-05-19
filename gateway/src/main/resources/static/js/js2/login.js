$(function(){
    //记住我时
    /*$.ajax({
        type:"post",
        url:"/customer/getCookieCustomer",
        success:function (result) {
            if (result.code === 200){
                $("#phoneNumber").val(result.data.phoneNumber);//填充手机号
                $("#password").val(result.data.password);//填充密码
            }
        }
    });*/
	$("#content_wrapper .login-box").css("left","0");

    //13是回车键对应的数字
    $("body").keydown(function () {
        if (window.event.keyCode == 13){
            customerLogin();
        }
    });
});



//登录
function customerLogin(){

    var phoneNumber=$("#phoneNumber").val();
    var password=$("#password").val();
    if(phoneNumber== ""|| password == ""){
        $("#errormessage").css("display","block");
        $("#errormessage em").text("请输入正确的用户名和密码");
        return false;
    }
    //var phoneRegExp=/0?(13|14|15|18|17)[0-9]{9}/;
    var pwRegExp=/[0-9a-zA-Z.]{6,}/;
    if(!pwRegExp.test(password)){
        $("#errormessage").css("display","block");
        $("#errormessage em").text("请输入正确的用户名或密码");
        return false;
    }
    //判断记住我是否被选中
    var flag = $("#rememberMe:checked").length;
    if (flag == 0){
        flag = false;
    }else{
        flag = true;
    }
    $.ajax({
        type:"post",
        url:"/customerconsumer/login",
        data:{
             cname:phoneNumber,
             cpassword:password
         },
        success:function (data) {
            alert(data);
            if (data=="false"){
                //TODO 颤抖
                $("#errormessage").css("display","block");
                $("#errormessage em").text(result.message);
            } else{
                window.location.href="/bookconsumer/queryBook";
            }

        }

    });


}

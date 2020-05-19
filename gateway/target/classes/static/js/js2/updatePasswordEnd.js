

var passwordFlag=false;
var passwordFlag2=false;
var password;
$(function(){
    $("#content_wrapper .login-box").css("top","80px");


    var password2;
    $("#password").bind("input propertychange",function () {
        password = $("#password").val();
        if (password.length < 6 || password.length>30){
            $("#errormessage").css("display","block");
            $("#errormessage em").text("密码为6至30位的字母数字或常用符号!");
            passwordFlag = false;
        }else{
            $("#errormessage").css("display","none");
            passwordFlag = true;
        }
    });
    $("#password2").bind("input propertychange",function () {
        password2 = $("#password2").val();
        if (password != password2){
            $("#errormessage").css("display","block");
            $("#errormessage em").text("两次输入的密码不一致!");
            passwordFlag2 = false;
        }else{
            $("#errormessage").css("display","none");
            passwordFlag2 = true;
        }
    });

});


function updatePasswordEnd() {
    if (!passwordFlag || !passwordFlag2){
        $("#errormessage").css("display","block");
        $("#errormessage em").text("两次输入的密码不一致!");
        return false;
    }
    //如果是直接进入这个页面，手机号肯定为空。则不能修改密码
    if (phoneNumber == ""){
       return false;
    }
    //修改密码
    $.ajax({
        type:"post",
        url:"/customer/updatePasswordEnd",
        data:{
            phoneNumber:phoneNumber,
            password:password
        },
        success:function (result) {
          if (result.code === 200){
              layer.msg(result.message, {icon: 1,time:1500});
          }
        }
    });
}
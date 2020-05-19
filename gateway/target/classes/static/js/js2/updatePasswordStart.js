$(function(){

    var phoneNumberFlag = false;
    var idNumberFlag    = false;

    $("#content_wrapper .login-box").css("top","80px");

    //创建验证码
    createCode();
    $("#yangzhengmatext + span").click(function () {
        createCode();
    });

    $("#phoneNumber").change(function () {
        var phoneNumber = $("#phoneNumber").val();
        var phoneRegExp = /(13|14|15|18|17)[0-9]{9}/;
        if ("" == phoneNumber || !phoneRegExp.test(phoneNumber)){
            $("#errormessage").css("display","block");
            $("#errormessage em").text("您输入的手机号格式不正确！");
            return false;
        }
        //验证是否正确
        $.ajax({
            type:"post",
            url:"/customer/checkPhone",
            data:{phoneNumber:phoneNumber},
            success:function (result) {
                if (result.code === 200){
                    phoneNumberFlag = true;
                    $("#errormessage").css("display","none");
                    //图片正确
                } else{
                    phoneNumberFlag = false;
                    $("#errormessage").css("display","block");
                    $("#errormessage em").text("您输入的手机号不正确！");
                    //图片错误
                }
            }
        });
    });
    //身份证号验证是否正确
    $("#idNumber").change(function () {
        var idNumber = $("#idNumber").val();
        var idNumberRegExp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (idNumber == "" || !idNumberRegExp.test(idNumber)){
            $("#errormessage").css("display","block");
            $("#errormessage em").text("您输入的身份证号格式不正确！");
            return false;
        }
        $.ajax({
            type:"post",
            url:"/customer/checkIdNumber",
            data:{idNumber:idNumber},
            success:function (result) {
                if (result.code === 200){
                    idNumberFlag = true;
                    //图片正确
                    $("#errormessage").css("display","none");
                } else{
                    idNumberFlag = false;
                    //图片错误
                    $("#errormessage").css("display","block");
                    $("#errormessage em").text("您输入的身份证号不正确！");
                }
            }
        });
    });

});
var code="";
function createCode(){ //创建验证码函数
    code = "";
    var codeLength =5;//验证码的长度
    var selectChar =[0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H'
        ,'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    //所有候选组成验证码的字符，当然也可以用中文的
    for(var i=0;i<codeLength;i++) {
        var charIndex =Math.floor(Math.random()*36);
        code +=selectChar[charIndex];
    }
    $("#yangzhengmatext + span").text(code);     // 显示
}


//找回密码
function updatePasswordStart(){
    var phoneNumber=$("#phoneNumber").val();
    var idNumber = $("#idNumber").val();
    var yanzhengmainput=$("#yangzhengmatext").val();
    var yanzhengmaspan=$("#yangzhengmatext + span").text();

    //验证手机号
    if(phoneNumber == ""){
        $("#errormessage").css("display","block");
        $("#errormessage em").text("请先输入正确的手机号！");
        return false;
    }else{
        var phoneNumberRegExp=/(13|14|15|18|17)[0-9]{9}/;
        if(!phoneNumberRegExp.test(phoneNumber)){
            $("#errormessage").css("display","block");
            $("#errormessage em").text("您输入的手机号格式不正确！");
            return false;
        }
    }
    //验证身份证号
    if(idNumber==""){
        $("#errormessage").css("display","block");
        $("#errormessage em").text("请先输入正确的身份证号！");
        return false;
    }else{
        var idNumberRegExp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if(!idNumberRegExp.test(idNumber)){
            $("#errormessage").css("display","block");
            $("#errormessage em").text("您输入的身份证号格式不正确！");
            return false;
        }
    }
    //验证验证码
    if(yanzhengmainput!=yanzhengmaspan){
        $("#errormessage").css("display","block");
        $("#errormessage em").text("请先输入正确的验证码吧！");
        return false;
    }
    //ajax验证手机号和身份证号
    $.ajax({
        type:"post",
        url:"/customer/checkByPhoneNumberAndIdNumber",
        data:{phoneNumber:phoneNumber,idNumber:idNumber},
        success:function(result){
            if(result.code === 400){
                //TODO 颤抖
                $("#errormessage").css("display","block");
                $("#errormessage em").text("该手机号或身份证号不存在！");
            }else{
                location.href="/frontSkip/toUpdatePasswordEnd?isStart=true";
            }
        }
    });
}
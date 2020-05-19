window.onload=function(){
	var box=document.querySelector("#content_wrapper .login-box");
	box.style.marginLeft="402px";

	//更多资料显示与隐藏
	var gengduo=document.querySelector(".gengduoziliao");
	var selectShow=document.getElementById("selectShow");
	gengduo.onclick=function(){
		if(selectShow.style.display=="none"){
			selectShow.style.display="block";
			gengduo.innerHTML="收起资料";
		}
		else if(selectShow.style.display=="block"){
			selectShow.style.display="none";
			gengduo.innerHTML="更多资料";
		}
	};

//js创建验证码
	var code="";
	function createCode(){ //创建验证码函数
		code = "";
		var codeLength =5;//验证码的长度
		var selectChar = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H'
			,'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		//所有候选组成验证码的字符，当然也可以用中文的
		for(var i=0;i<codeLength;i++){
			var charIndex =Math.floor(Math.random()*36);
			code +=selectChar[charIndex];
		}
		$("#yangzhengmatext + span").text(code);     // 显示
	}

	/*调用函数*/
	createCode();
	/*切换验证码*/
	$("#yangzhengmatext + span").click(function(){
		createCode();
	});
};
var flag;
function findName(){
	var name=$("#phoneNumber").val();
	$.getJSON("/customerconsumer/queryName","cname="+name,function(data){
		if(data==false){
			flag=false;
			layer.msg("用户名已经存在了，请重新输入！");
			return false;
		}else{
			flag=true;
			layer.msg("用户名可以使用！");
        }

	})
};
//customer注册
function customerRegister(){
	alert("regist");
	if(!flag){
		$("#errormessage").css("display","block");
		$("#errormessage em").text("请先输入未被注册的用户名！");
		return false;
	}
	var phoneNumber=$("#phoneNumber").val();
	var password1=$("#password1").val();
	var password2=$("#password2").val();
	var realName=$("#realName").val();
	var gender=$(":radio:checked").val();
	var address=$("#address").val();
	var tel=$("#tel").val();
	var yanzhengma=$("#yangzhengmatext").val();
	//验证手机号
	if(tel == ""){
		$("#errormessage").css("display","block");
		$("#errormessage em").text("请先输入正确的手机号！");
		return false;
	}else{
		var phoneNumberRegExp=/0?(13|14|15|18|17)[0-9]{9}/;
		if(!phoneNumberRegExp.test(tel)){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("请先输入正确的手机号格式！");
			return false;
		}
	}
	//验证密码
	if(password1==""){
		$("#errormessage").css("display","block");
		$("#errormessage em").text("请先输入正确的密码！");
		return false;
	}else{
		var passwordRegExp=/[0-9a-zA-Z.]{6,}/;
		if(!passwordRegExp.test(password1)){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("密码要求为6位以上的字数数字和任意字符！");
			return false;
		}
	}
	//确认密码
	if(password2==""){
		$("#errormessage").css("display","block");
		$("#errormessage em").text("请确认密码！");
		return false;
	}else{
		if(password1!=password2){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("两次密码输入不一样！");
			return false;
		}
	}

	/*--------一下都是非必须填写的-----------*/
	//验证姓名
	if(realName==""){
		$("#errormessage").css("display","block");
		$("#errormessage em").text("请填写你的名字！");
		return false;
	}
	if (realName != ""){
		var nameRegExp=/^([\u4e00-\u9fa5]){2,7}$/;
		if(!nameRegExp.test(realName)){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("你的名字中存在不合法的字符！");
			return false;
		}
	}



	//验证性别
	if (realName != ""){
		if(gender==""){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("请先选择性别！");
			return false;
		}
	}

	//验证地址
	if (realName != "" || gender != ""){
		if(address==""){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("请先输入您的真实地址！");
			return false;
		}else{
			var addressRegExp=/^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]{6,}$/;
			if(!addressRegExp.test(address)){
				$("#errormessage").css("display","block");
				$("#errormessage em").text("确定您的地址对吗？");
				return false;
			}
		}
	}

	//验证验证码是否正确
	if(yanzhengma==""){
		$("#errormessage").css("display","block");
		$("#errormessage em").text("请先输入正确的验证码！");
		return false;
	}else{
		var yanzhengmatxt=$("#yangzhengmatext + span").text();
		if(yanzhengma!=yanzhengmatxt){
			$("#errormessage").css("display","block");
			$("#errormessage em").text("验证码区分大小写哦！");
			return false;
		}
	}

	$("#zhuceform").submit();

}
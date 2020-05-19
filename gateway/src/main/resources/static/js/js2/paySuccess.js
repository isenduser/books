$(function(){

	/*此时的nodenumb是jQuery对象*/
	var nodenumb=$(".contentRight > p > span");
	var numb=$(".contentRight > p > span").text();
	setInterval(function(){
		numb-=1;
		nodenumb.text(numb);
		if(numb<=0){
			window.location.href="/bookconsumer/queryBook";
		}
	},1000);
});

function toShoppingCart(user) {
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
}
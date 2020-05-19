
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



var customerId;
$(function(){
	//js构建购物车
	 $.ajax({
	   type:"GET",
	   url:"/orderconsumer/getCartBook",
	   data:{customerId:customerId},
	   success:function(result){
	      buildShoppingCart(result);
	   }
	 });


	/*全选和全不选*/
	$("#checkAll").click(function(){
		/*全选的状态应该和每一个checkItem的状态一样*/
		$(".checkItem").prop("checked",$(this).prop("checked"));

		/*全选获取总书数和总价格*/
		/*当我全选点击时，获取所有被选中的checkItem，
		 * 遍历该数组，获取当前checkItem下的bookNumb，变量循环相加，最后赋值给总书数。
		 * 遍历该数组，获取当前checkItem下的zongjiage，变量循环相加，最后赋值给总价格。*/
		var checkItems=$(".checkItem:checked");
		var contentBookNumb=0;
		$.each(checkItems, function(index,object) {
			var bookNumbtxt=$(this).parent().nextAll(".wuxiang").find(".shuliang").find("input").val();
			var bookNumbshuzi=parseInt(bookNumbtxt);
			   contentBookNumb+=bookNumbshuzi;
		});
		$("#bookNumb").text(contentBookNumb);

		var contentZongJiaGe=0;
		$.each(checkItems, function() {
			var xiaojitxt=$(this).parent().nextAll(".wuxiang").find(".xiaoji").find("span").text();
			var xiaojishuzi=parseInt(xiaojitxt);
				contentZongJiaGe+=xiaojishuzi;
		});
		$("#zongjiage").text("￥"+contentZongJiaGe.toFixed(2));

	});

	/*此处必须为document绑定事件，（因为checkItem是服务器响应有异步加载的，如果直接给checkItem绑定，可能会因为还没有这个元素，导致绑定失效。
	   因为document代表整个页面会一直存在，所以不会失效。）*/
	$(document).on("click",".checkItem",function(e){
		/*全选的状态应该和当checkItem的长度等于checkItem被选中的长度一致*/
		var flag=$(".checkItem").length==$(".checkItem:checked").length;
		$("#checkAll").prop("checked",flag);

		//单击每一个checkItem时确定总书数和总价格
		//总书数量赋值
		var contentBookNumb=0;
		var $checkItems = $(".checkItem:checked");
		$.each($checkItems,function (index,object) {
			var bookNumbtxt=$(this).parent().nextAll(".wuxiang").find(".shuliang").find("input").val();
			var bookNumbshuzi=parseInt(bookNumbtxt);
			contentBookNumb+=bookNumbshuzi;
		})
		$("#bookNumb").text(contentBookNumb);
		//总价格赋值
		var contentZongJiaGe=0;
		$.each($checkItems, function() {
			var xiaojitxt=$(this).parent().nextAll(".wuxiang").find(".xiaoji").find("span").text();
			var xiaojishuzi=parseInt(xiaojitxt);
			contentZongJiaGe+=xiaojishuzi;
		});
		$("#zongjiage").text("￥"+contentZongJiaGe.toFixed(2));

        //如果提供了事件对象，则这是一个非IE浏览器
        if ( e && e.stopPropagation ){
            e.stopPropagation();
        }
        else{
            //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
	});
    //作用和上面一样
    $(document).on("click","#cartContent > .cartItem",function(e){
        //点击cartItem，选中或者取消选中复选框 注意事件冒泡
        var flag = $(this).find(".checkItem").prop("checked");
        $(this).find(".checkItem").prop("checked",!flag);

        /*全选的状态应该和当checkItem的长度等于checkItem被选中的长度一致*/
        var flag2=$(".checkItem").length==$(".checkItem:checked").length;
        $("#checkAll").prop("checked",flag2);

        //单击每一个checkItem时确定总书数和总价格
        //总书数量赋值
        var contentBookNumb=0;
        var $checkItems = $(".checkItem:checked");
        $.each($checkItems,function (index,object) {
            var bookNumbtxt=$(this).parent().nextAll(".wuxiang").find(".shuliang").find("input").val();
            var bookNumbshuzi=parseInt(bookNumbtxt);
            contentBookNumb+=bookNumbshuzi;
        })
        $("#bookNumb").text(contentBookNumb);
        //总价格赋值
        var contentZongJiaGe=0;
        $.each($checkItems, function() {
            var xiaojitxt=$(this).parent().nextAll(".wuxiang").find(".xiaoji").find("span").text();
            var xiaojishuzi=parseInt(xiaojitxt);
            contentZongJiaGe+=xiaojishuzi;
        });
        $("#zongjiage").text("￥"+contentZongJiaGe.toFixed(2));

        //取消事件冒泡
        if ( e && e.stopPropagation ){
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        } else{
            //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
    });


	function clickleft(){
		/*鼠标移入小于等于0时，不可被选中*/
		$(document).on("mouseover",".aleft",function(){
			var shuliang=$(this).siblings(":text").val();
			if(shuliang<=0){
					$(this).css("cursor","not-allowed");
				}else{
					$(this).css("cursor","pointer");
				}
		});
			//当删除后就找不到aleft元素了，所以要给document绑定事件
		$(document).on("click",".aleft",function(e){
			 var shuliang=$(this).siblings(":text").val();
				if(shuliang<=0){
					//shuliang=1;
					$(this).css("disabled","disabled");
					$(this).css("cursor","not-allowed");
				}else{
					$(this).css("cursor","pointer");
					shuliang--;
					//数量赋值
					$(this).siblings(":text").val(shuliang);
					/*小计赋值*/
					var danjia=$(this).parent().prevAll().find("span").text();
					var xiaoji=$(this).parent().nextAll(".xiaoji").find("span").text();
					xiaoji=danjia * shuliang;
					xiaoji=xiaoji.toFixed(2);
					$(this).parent().nextAll(".xiaoji").find("span").text(xiaoji);

					/*总数量和总价格赋值,必须是在当前项被选中的情况下*/
					var $checkItem=$(this).parent().parent().prevAll(".checkbox").find("input");
					if($checkItem[0].checked==true){
						var checkItems=$(".checkItem:checked");
						/*书的数量的减*/
						var bookNumb=$("#bookNumb").text();
						bookNumb--;
						if(bookNumb<=0){
							$(this).css("disabled","disabled");
							$(this).css("cursor","not-allowed");
						}else{
							$(this).css("cursor","pointer");
						}
						$("#bookNumb").text(bookNumb);

						var content=0;
						$.each(checkItems, function(index,object) {
							var numbtxt=$(object).parent().nextAll(".wuxiang").find(".xiaoji").find("span").text();
							/*将获取的字符转换成数字*/
							var numb=parseInt(numbtxt);
							content+=numb;
						});
						$("#zongjiage").text("￥"+content.toFixed(2));
					}
				}

            //如果提供了事件对象，则这是一个非IE浏览器
            if ( e && e.stopPropagation ){
                //因此它支持W3C的stopPropagation()方法
                e.stopPropagation();
            }
            else{
                //否则，我们需要使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
            }
			 });
	}
	clickleft();

	function clickright(){
	   $(document).on("click",".aright",function(e){
			var strshuliang=$(this).siblings(":text").val();
			//一定要转化成数字在比较，否则无效。
			shuliang=parseInt(strshuliang);
			var strkucun=$(this).parent().nextAll(".kucun").find("span").text();
			kucun=parseInt(strkucun);
			if(shuliang>=kucun){
			   layer.msg("库存不足了哦！",{icon: 5});
			   return false;
			}
			shuliang++;
			$(this).siblings(":text").val(shuliang);
			/*小计赋值*/
			var danjia=$(this).parent().prevAll().find("span").text();
			var xiaoji=$(this).parent().nextAll(".xiaoji").find("span").text();
				xiaoji=danjia * shuliang;
				xiaoji=xiaoji.toFixed(2);
			$(this).parent().nextAll(".xiaoji").find("span").text(xiaoji);
			 /*总价格赋值,必须是在当前项被选中的情况下*/
			var $checkItem=$(this).parent().parent().prevAll(".checkbox").find("input");
			if($checkItem[0].checked){
				var checkItems=$(".checkItem:checked");
				/*书的数量的加*/
				var bookNumb=$("#bookNumb").text();
					bookNumb++;
				$("#bookNumb").text(bookNumb);

				var content=0;
				$.each(checkItems, function(index,object) {
				   var numbtxt=$(object).parent().nextAll(".wuxiang").find(".xiaoji").find("span").text();
				   /*将获取的字符转换成数字*/
				   var numb=parseInt(numbtxt);
				   content+=numb;
				});
				$("#zongjiage").text("￥"+content.toFixed(2));
			}
           //如果提供了事件对象，则这是一个非IE浏览器
           if ( e && e.stopPropagation ){
               //因此它支持W3C的stopPropagation()方法
               e.stopPropagation();
           }
           else{
               //否则，我们需要使用IE的方式来取消事件冒泡
               window.event.cancelBubble = true;
           }
	   });
	}
	clickright();

	//删除单个书
	//删除书后会出现获取不到书的情况，此时需要给document绑定click事件
	$(document).on("click",".caozuo > a",function(e){
		var bookname=$(this).parents(".wuxiang").prevAll(".goodsItem").find(".bookInfo").find("a").text();
		var bookNo=$(this).parents(".wuxiang").prevAll(".goodsItem").find(".bookInfo").find("p > span").text();
		layer.confirm("真的要删除【"+bookname+"】这本书吗？", {
			btn: ["残忍删除","我在想想"]
			  },
		   //确定之后跟的函数
		  function() {
			 $.ajax({
				type:"GET",
				url:"/orderconsumer/deleteByBookNo",
				data:{customerId:customerId,bid:bookNo},
				success:function(result){
                    buildShoppingCart(result);
				  }
				});
			 layer.msg("删除成功！", {
				  icon: 1,
				  time: 1500  //设置消失的时间
			   });
		   },
		 //取消之后跟的函数，必须要有
		 function(){});

        //取消事件冒泡
        if ( e && e.stopPropagation ){
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        } else{
            //否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
	});
});


//构建购物车
function buildShoppingCart(result){
	$("#cartContent").empty();
	if(result.length<=10){
		for(var i=0;i<result.length;i++){
			$("<div class='cartItem'></div>").append("<div class='checkbox'><input type='checkbox' class='checkItem'/></div>")
				.append("<div class='goodsItem'>" +
					"<img src='"+result[i].books.picPath+"'/>" +
					"<div class='bookInfo'>" +
					"<a href='#'>"+result[i].books.bname+"</a>" +
					"<p>编号：<span>"+result[i].books.bid+"</span></p>" +
					"</div>" +
					"</div>")
				.append("<div class='wuxiang'>" +
					"<div class='danjia'>" +
					"￥<span>"+result[i].books.price.toFixed(2)+"</span>" +
					"</div>"+
					"<div class='shuliang'>"+
					"<a href='javascript:;' class='aleft'>-</a>"+
					"<input type='text' value='"+result[i].ordercount+"' disabled='disabled'/>"+
					"<a href='javascript:;' class='aright'>+</a>"+
					"</div>"+
					"<div class='kucun'>"+
					"<span>"+result[i].books.bookNum+"</span>&nbsp;本" +
					"</div>"+
					"<div class='xiaoji'>"+
					"￥<span>"+result[i].books.price.toFixed(2)+"</span>"+
					"</div>"+
					"<div class='caozuo''>"+
					"<a href='javascript:;' class='btn btn-danger'>删除</a>"+
					"</div>"+
					"</div>")
				.appendTo("#cartContent");
		}
	}
	//构建的时候，如果cartItem多于5个，就加滚动条，否则就height:auto
	if($("#cartContent > .cartItem").length>5){
		$("#cartContent").css("height","600px");
	}else{
		$("#cartContent").css("height","auto");
	}
	//如果小于等于0，就显示提示信息，并将bookNumb和zongjiage置为0
	if($("#cartContent > .cartItem").length<=0){
		$("<div id='cartInfo'></div>").append("<div>您的购物车空空如也！<a href='/bookconsumer/queryBook'>我要去购物</a></div>")
			.appendTo("#cartContent");
		$("#bookNumb").text("0");
		$("#zongjiage").text("￥0.00");
	}
	//删完之后，根据购物车中的书的信息，(因为删完之后就取消了所有的checked,所以直接为0就行了。)
	$("#bookNumb").text("0");
	$("#zongjiage").text("￥0.00");

	//修改小计
	$.each($(".xiaoji"),function(index,object){
		var danjia=$(this).prevAll(".danjia").find("span").text();
		var shuliang=$(this).prevAll(".shuliang").find("input").val();
		$(this).find("span").text((danjia * shuliang).toFixed(2));
	});
}

//删除多个书
function deleteChecked() {
	var checkItemCheckeds=$(".checkItem:checked").length;
	if(checkItemCheckeds<=0){
		layer.msg("先选中才能删除哦!",{icon: 5});
		return false;
	}
	var booknames="";
	var bookNos="";
	$.each($(".checkItem:checked"),function(index,object){
		var bookname=$(this).parent().nextAll(".goodsItem").find(".bookInfo").find("a").text()+",";
		booknames+=bookname;
	});
	$.each($(".checkItem:checked"),function(index,object){
		var bookNo=$(this).parent().nextAll(".goodsItem").find(".bookInfo").find("p > span").text()+",";
		bookNos+=bookNo;
	});
	//把最后那个逗号去掉
	booknames=booknames.substring(0,booknames.length-1);
	bookNos=bookNos.substring(0,bookNos.length-1);

	layer.confirm("真的要删除【"+booknames+"】这些书吗？", {
			btn: ["残忍删除","我再想想"]
		},function(){
			//发送ajax请求删除选中的
			$.ajax({
				url:"/orderconsumer/deleteByBookNos",
				data:{customerId:customerId,bookNos:bookNos},
				success:function(result){
                    buildShoppingCart(result);
				}
			});
			layer.msg("删除成功！", {
				icon: 1,
				time: 1500  //设置消失的时间
			});
		},
		function(){});
}

//清空购物车
function cleanCart() {
	if($("#cartContent > .cartItem").length<=0){
		layer.msg("没看到没有了么，还要删，你是个智障吗?");
		return false;
	}
	layer.confirm("真的要清空购物车吗？", {
			btn: ["真的","我再想想"]
		},
		function(){
			layer.confirm("再次确认要清空购物车吗？", {
					btn: ["确定清空","不清空了"]
				},
				function(){
					$.ajax({
						url:"/orderconsumer/cleanCart",
						data:{customerId:customerId},
						success:function(result){
                            if(result=="true"){
								$("<div id='cartInfo'></div>").append("<div>您的购物车空空如也！<a href='/bookconsumer/queryBook'>我要去购物</a></div>")
									.appendTo("#cartContent");
								$("#bookNumb").text("0");
								$("#zongjiage").text("￥0.00");
							}
						}
					});
					layer.msg("成功清空购物车!", {
						icon: 1,
						time: 1500  //设置消失的时间
					});
				},
				function(){});
			//第二次确认结束
		},
		function(){});
}

//去结算
function toPayPage() {
    var isgo = true;
    //先看是否有被选中
	var checkItemCheckeds=$(".checkItem:checked").length;
	if(checkItemCheckeds<=0){
		layer.msg("先选中才能结算哦!",{icon: 5});
		return false;
	}
	//如果被选中的那一项的数量小于等于0或者数量大于库存，不行
	$.each($(".checkItem:checked"),function () {
	    var wuxiang = $(this).parent().nextAll(".wuxiang");
        var shuliang = wuxiang.find(".shuliang").find("input").val();
        var bookStock =wuxiang.find(".kucun").find("span").text();
        if (shuliang <=0 || shuliang > bookStock){
            layer.msg("请选择正确的商品数量!",{icon: 5});
            isgo = false;
            //结束循环
            return false;
        }
    });
	if (isgo == false){
	   return false;
	}

	var zongjiage=$("#zongjiage").text();
	zongjiage=zongjiage.substring(1,zongjiage.length);
	//获取bookbianhao的集合和修改后的booknumber的集合
	var bookNos="";
	var booknumbers="";
	$.each($(".checkItem:checked"),function(){
		var bookNo=$(this).parent().nextAll(".goodsItem").find(".bookInfo").find("p > span").text()+",";
		bookNos+=bookNo;
	});
	$.each($(".checkItem:checked"),function(){
		var booknumber=$(this).parent().nextAll(".wuxiang").find(".shuliang").find("input").val()+",";
		booknumbers+=booknumber;
	});
	bookNos=bookNos.substring(0,bookNos.length-1);
	booknumbers=booknumbers.substring(0,booknumbers.length-1);
	$.ajax({
		url:"/orderconsumer/toPay",
		data:{customerId:customerId,bookNos:bookNos,bookNumbers:booknumbers},
		success:function(result){
			if(result=="true"){
				window.location.href="/orderconsumer/toPayPage";
			}
		}
	});
}
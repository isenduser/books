function queryByTid(tid,pageNo){
	$("#tid").val(tid);
	$("#pageNo").val(pageNo);
	//var pageNo=$("#pageNo").val();
 	$.getJSON("/bookconsumer/queryByType","tid="+tid+"&pageNo="+pageNo,function(data){

 		var html="";
 		for(var i=0;i<data.list.length;i++){
 			html+=("<li><a href='/bookconsumer/showBookDetails?bid="+data.list[i].bid+"'><img src="+data.list[i].picPath+" title='"+data.list[i].bname+"'/></a>" +
				"<a href='/bookconsumer/showBookDetails?bid="+data.list[i].bid+"' class='jianjie' title='"+data.list[i].bname+"'>"+data.list[i].bname+"</a>" +
				"<h4>￥"+data.list[i].price+"</h4></li>");
		}
		$("#firstUl").html(html);
 		var html1="当前页数：第<span>"+data.page.pageNo+"</span>页\n" +
			"/共<span>"+data.page.pageCount+"</span>页\n" +
			" <li class='current'><a href=\"javascript:jump(1)\">首页</a></li>\n" +
			" <li><a href='javascript:jump("+(data.page.pageNo-1)+");'>上一页</a></li>\n" +
			" <li><a href='javascript:jump("+(data.page.pageNo+1)+");'>下一页</a></li>\n" +
			" <li><a href='javascript:jump("+data.page.pageCount+");'>末页</a></li>\n" ;
 		$("#page").html(html1);
	})
};
function jump(pageNo){
	if(pageNo<0){
		return false;
	}
	$("#pageNo").val(pageNo);
	var tid=$("#tid").val();
	queryByTid(tid,pageNo);
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


$(function() {

		//点击回顶部，隐藏右侧导航栏
		$("#HuiDingBu").click(function () {
			$("#right_nav").css("display","none");
		});

    //layui加载轮播图模块
    layui.use('carousel', function() {
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#test1',
            height: '410px',
            width: '100%', //设置容器宽度
            arrow: 'hover', //始终显示箭头
            anim: 'fade', //切换动画方式
            indicator:'none'//指示器不显示
        });
    });


	//获取book的数据构建新书排行榜
	$.ajax({
	   url:"/bookconsumer/getNewBookList",
	   success:function(result){
	   		buildNewBookList(result);
	   }
	});
	//构建新书列表
	function buildNewBookList(result){
		for(var i=0;i<result.length;i++){
			$("<li></li>").append("<p><span>0"+(i+1)+"</span><img src="+result[i].picPath+" "+
				"title='"+result[i].bname+"'/><a href='/bookconsumer/showBookDetails?bid="+result[i].bid+"' title='"+result[i].bname+"'>"+result[i].bname+"<br/><span title='' >￥"+result[i].price.toFixed(2)+"</span></a></p>")
				.appendTo("#newBookList");
			if(i<3){
				$("#newBookList >li > p > span").attr("class","hongse");
			}
		}
		$("#newBookList >li:nth-child(10) > p > span").text("10");
		$("#newBookList").append("<li><a href='javascript:;' class='list_bottom'>查看完整榜单>>></a></li>");


	}

	/*从这里开始滚动滑轮获取数据*/
	
	//右侧导航栏
	$("#right_nav").hide();
    //获取好处推荐四个字的偏移量
    var goodBook = $("#goodBook").offset().top;
	/*//获取到编程语言四个字的偏移量
	var programming = $("#bc").offset().top;
	//获取操作系统四个字的偏移量
	var os = $("#cz").offset().top;
	//获取数据库四个字的偏移量
	var dataBase = $("#sj").offset().top;
	//获取办公软件四个字的偏移量
	var office = $("#bg").offset().top;
	//获取图形处理/多媒体四个字的偏移量
	var tuxing = $("#tx").offset().top;*/
	//当前窗口可视区域的宽度
	var windowHeight = $(window).outerHeight();

	var goodBookFlag = true;
	/*var programmingFlag = true;
	var osFlag = true;
	var dataBaseFlag = true;
	var officeFlag = true;
	var tuxingFlag = true;*/
	//滚动到某个位置时加载数据，且只加载一次
	$(window).scroll(function() {
		var this_scrollTop = $(this).scrollTop();
		//this_scrollTop +=windowHeight/2;
		if (this_scrollTop > goodBook){
			if (goodBookFlag){
				goodBookFlag = false;
				//获取book的数据构建左右动
				$.ajax({
					async:false,
					url:"/bookconsumer/getGood",
					success:function(data){
						buildLeftAndRightBook(data);
					}
				});
				console.log("getLeftAndRightBook");
			}
		}
	});

	
	/*tab栏*/
	var nodeA=document.querySelectorAll(".talleft_header_a");
	var divs=document.querySelectorAll("#talleft_content div");
	for(var i=0;i<nodeA.length;i++){
		nodeA[i].index=i;//用于关联下面的div
		nodeA[i].onclick=function(){
			for(var j=0;j<nodeA.length;j++){
				nodeA[j].style.color="black";
			}
			this.style.color="#ca1524";
			for(var k=0;k<divs.length;k++){
				divs[k].style.display="none";
			}
			divs[this.index].style.display="block";
			
			if(this.index==0){
			   $.ajax({
	               type:"GET",
	               url:"/book/getTabBook",
	               data:{"bookKind":1},
		           success:function(result){
					   if (result.code == 400){
                           layer.msg(result.message, {icon: 2});//x号
					   }else{
						   gouJianTabBianCheng(result.data);
					   }
		          }
	           });
			}else if(this.index==1){
			       $.ajax({
			          url:"/book/getTabBook",
			          data:{"bookKind":3},
			          success:function(result){
						  if (result.code == 400){
						      layer.msg(result.message, {icon: 2});//x号
						  }else{
							  gouJianTabSystem(result.data);
						  }
			          }
			       });
			}else if(this.index==2){
			        $.ajax({
			          url:"/book/getTabBook",
			          data:{"bookKind":2},
			          success:function(result){
						  if (result.code == 400){
                              layer.msg(result.message, {icon: 2});//x号
						  }else{
							  gouJianTabDatabase(result.data);
						  }
			          }
			       });
			}else if(this.index==3){
			       $.ajax({
			          url:"/book/getTabBook",
			          data:{"bookKind":4},
			          success:function(result){
						  if (result.code == 400){
                              layer.msg(result.message, {icon: 2});//x号
						  }else{
							  gouJianTabOffice(result.data);
						  }
			          }
			       });
			}else if(this.index==4){
			      $.ajax({
			          url:"/book/getTabBook",
			          data:{"bookKind":5},
			          success:function(result){
						  if (result.code == 400){
                              layer.msg(result.message, {icon: 2});//x号
						  }else{
							  gouJianTabPs(result.data);
						  }
			          }
			       });
			}
		}
	}
    //tabbiancheng的构建
    function gouJianTabBianCheng(result){
        $("div[class='biancheng'] > ul[class='firstUl']").empty();
        for(var i=0;i<5;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='biancheng'] > ul[class='firstUl']");
        }

        $("div[class='biancheng'] > ul[class='secondeUl']").empty();
        for(var i=5;i<10;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='biancheng'] > ul[class='secondeUl']");
        }
        $("#talleft_content .biancheng img").addClass("anim-opacity");
    }

    function gouJianTabSystem(result){
        $("div[class='system'] > ul[class='firstUl']").empty();
        for(var i=0;i<5;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='system'] > ul[class='firstUl']");
        }

        $("div[class='system'] > ul[class='secondeUl']").empty();
        for(var i=5;i<10;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='system'] > ul[class='secondeUl']");
        }
		$("#talleft_content .system img").addClass("anim-opacity");
    }

    function gouJianTabDatabase(result){
        $("div[class='database'] > ul[class='firstUl']").empty();
        for(var i=0;i<5;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='database'] > ul[class='firstUl']");
        }

        $("div[class='database'] > ul[class='secondeUl']").empty();
        for(var i=5;i<10;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='database'] > ul[class='secondeUl']");
        }
		$("#talleft_content .database img").addClass("anim-opacity");
    }

    function gouJianTabOffice(result){
        $("div[class='office'] > ul[class='firstUl']").empty();
        for(var i=0;i<5;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='office'] > ul[class='firstUl']");
        }

        $("div[class='office'] > ul[class='secondeUl']").empty();
        for(var i=5;i<10;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='office'] > ul[class='secondeUl']");
        }
		$("#talleft_content .office img").addClass("anim-opacity");
    }

    function gouJianTabPs(result){
        $("div[class='ps'] > ul[class='firstUl']").empty();
        for(var i=0;i<5;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='ps'] > ul[class='firstUl']");
        }

        $("div[class='ps'] > ul[class='secondeUl']").empty();
        for(var i=5;i<10;i++){
            $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'><img src="+result[i].bookImgUrl+" title='"+result[i].bookName+"'/></a>" +
                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>")
                .appendTo("div[class='ps'] > ul[class='secondeUl']");
        }
		$("#talleft_content .ps img").addClass("anim-opacity");
    }


    //构建左右动
    function buildLeftAndRightBook(result){
        for(var i=0;i<result.length;i++){
            $("<li></li>").append("<a href='/bookconsumer/showBookDetails?bid="+result[i].bid+"'><img src='"+result[i].picPath+"'/></a>")
                .appendTo("#LeftAndRight > ul");
        }
        $("#LeftAndRight img").addClass("anim-opacity");

        /*左右动*/
        var bloackAs=document.querySelectorAll("#LeftAndRight > a");
        var blockUL=document.querySelector("#LeftAndRight > ul");
        var lis=document.querySelectorAll("#LeftAndRight > ul > li");
        blockUL.style.width= (205) * lis.length+"px";
        var pianyiliang=0;
        for(var i=0;i<bloackAs.length;i++){
            bloackAs[i].index=i;
            bloackAs[i].onclick=function(){
                if(this.index==0){
                    pianyiliang-=205;
                    if(pianyiliang>=-1025){
                        blockUL.style.left=pianyiliang+"px";
                    }else{
                        pianyiliang=-1025;
                    }
                }
                if(this.index==1){
                    pianyiliang+=205;
                    if(pianyiliang<=0){
                        blockUL.style.left=pianyiliang+"px";
                    }else{
                        pianyiliang=0;
                    }
                }
            }
        }
    }


	//构建纯展示的book

function  goujianShowBianchengBook(result){
        for(var i=0;i<6;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .biancheng ul[class='firstUl']");
        }
        for(var i=6;i<12;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .biancheng ul[class='secondeUl']");
        }
        $("#showBook .biancheng img").addClass("anim-opacity");
}

function  goujianShowSystemBook(result){
        for(var i=0;i<6;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .system ul[class='firstUl']");
        }
        for(var i=6;i<12;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .system ul[class='secondeUl']");
        }
	$("#showBook .system img").addClass("anim-opacity");
}

function  goujianShowDatabaseBook(result){
        for(var i=0;i<6;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .database ul[class='firstUl']");
        }
        for(var i=6;i<12;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .database ul[class='secondeUl']");
        }
        $("#showBook .database img").addClass("anim-opacity");
}

function  goujianShowOfficeBook(result){
        for(var i=0;i<6;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .office ul[class='firstUl']");
        }
        for(var i=6;i<12;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .office ul[class='secondeUl']");
        }
	$("#showBook .office img").addClass("anim-opacity");
}

function  goujianShowPsBook(result){
        for(var i=0;i<6;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .ps ul[class='firstUl']");
        }
        for(var i=6;i<12;i++){
          $("<li></li>").append("<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"'>" +
          		                " <img src="+result[i].bookImgUrl+" />" +
          		                "<a href='/book/showBookDetails?bookNo="+result[i].bookNo+"' class='jianjie' title='"+result[i].bookName+"'>"+result[i].bookName+"</a>" +
          		                "<h4>￥"+result[i].bookPrice.toFixed(2)+"</h4>" +
          		                "</a>").appendTo("#showBook .ps ul[class='secondeUl']");
        }
	$("#showBook .ps img").addClass("anim-opacity");
}
	
});


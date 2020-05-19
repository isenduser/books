

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

}

var customerId;
var bookstock;
var booknumber;
$(function(){

    //构建猜你喜欢
    $.ajax({
        type:"get",
        url:"/bookconsumer/getNewBookList",
        success:function(result){
            goujianGuessLikeBook(result);
        }
    });
    function goujianGuessLikeBook(result){
        for(var i=0;i<5;i++){
            $("<div class='list'></div>").append("<img src='"+result[i].picPath+"' title='"+result[i].bname+"'/>")
                .append("<div class='miaoshu'>"+
                    "<a href='/bookconsumer/showBookDetails?bid="+result[i].bid+"' title='"+result[i].bname+"'>"+result[i].bname+"</a>"+
                    "<span>￥"+result[i].price.toFixed(2)+"</span>"+
                    "</div>")
                .insertAfter("#guessyoulike > h2");
        }
    }

        //初始化总价格
        initializeTotalPrice();
});

function initializeTotalPrice(){
    var $nodezongjine=$("#zongjiage");
    var danjia=$(".price-p-y > p > span[class='price']").text();
    $nodezongjine.text(danjia);
}

function jianMouseOver(){
    var $jian = $("#jian");
    var shuliang=$(".buy_num > input").val();
    if(shuliang<=1){
        /*显示上的禁用状态*/
        $jian.css("cursor","not-allowed");
    }else{
        $jian.css("cursor","pointer");
    }
}

function jianClick() {
    var $jian = $("#jian");
    var $nodeshuliang=$(".buy_num > input");
    var $nodezongjine=$("#zongjiage");
    var danjia = $(".price-p-y > p > span[class='price']").text();
    var shuliang=$nodeshuliang.val();
    shuliang--;
    if(shuliang<1){
        $jian.prop("disabled","disabled");
        $jian.css("cursor","not-allowed");
        $nodeshuliang.val(1);
        return false;
    }else{
        $jian.css("cursor","pointer");
    }
    danjia=danjia.replace("￥","");
    var zongjine=shuliang * danjia;
    $nodeshuliang.val(shuliang);
    $nodezongjine.text("￥"+zongjine.toFixed(2));
}

function jiaClick() {
    var $nodeshuliang=$(".buy_num > input");
    var $nodezongjine=$("#zongjiage");
    var bookStock=$("#bookStock").text();
    var danjia = $(".price-p-y > p > span[class='price']").text();
    var shuliang=$nodeshuliang.val();
    danjia=danjia.replace("￥","");
    shuliang++;
    if(shuliang >bookStock ){
        shuliang=bookStock;
        layer.msg('库存不足了!',{icon: 5});
        return false;
    }
    var zongjine=shuliang * danjia;
    $nodeshuliang.val(shuliang);
    $nodezongjine.text("￥"+zongjine.toFixed(2));
}






//添加购物车操作
function addToCart(user) {

    var strbooknumber=$("#booknumber").val();
    booknumber=parseInt(strbooknumber);
    var strbookstock=$("#bookStock").text();
    bookstock=parseInt(strbookstock);
    alert(booknumber);
    if(booknumber > bookstock){
        layer.msg("你选的书太多了，库存不足！",{icon:5});
        $("#jia").css("cursor","not-allowed").attr("disabled","disabled");
        return false;
    }else{
        $("#jia").css("cursor","pointer").attr("disabled","");
    }

    var bookNo=$("#bid").val();
    //先检查是否登录了
    alert(user);
    if(user==null){
        layer.open({
            type:0,
            title:"系统提示",
            content:"检测到您还没有登录，现在要去登录吗?",
            btn:["现在就去","给朕退下"],
            btn1:function(){
                //点击现在就去时去登陆页面
                window.location.href="/customerconsumer/dologin";
            }
        });
    }else{
        customerId = user;
        checkCartBookNumber();
    }
}

//登录了之后，检查购物车中当前用户书的记录数，如果大于10本，就不能添加进购物车
function checkCartBookNumber() {
    $.ajax({
        url:"/orderconsumer/getCartBookrows",
        data:{"cid":customerId},
        success:function(result){
            if(result == "false"){
                layer.msg("您的购物车已经满了，先清理完购物车才能添加哦！",{icon: 0});
            }else{
                addToCart2();
            }
        }
    });
}

function addToCart2() {
    //弹出购买成功的提示框//layer的自定义弹框
    layer.open({
        type: 1,
        title: false,//没有title
        area:['450px','200px'],
        closeBtn: 1,
        shadeClose: false,//没有遮罩
        skin: 'yourclass',
        content: '<div id="layer_content">'
        +'<div class="duihao"></div>'
        +'<div class="info">'
        + '<div class="info1">添加成功！当前图书购买数量共：<span>xxx</span>本</div>'
        + '<div class="info2">消息：本次成功放入购物车 <span>xxx</span>本</div>'
        + '<div class="info3">购物车共<span id="cartbookNumber">xxx</span>本书，合计：<span id="zongBookPrice">xxx</span>元。</div>'
        + '<a  href="/orderconsumer/toShoppingCart" class="info4"></a>'
        +'</div>'
        +'</div>'
    });

    var bookNo = $("#bid").val();
    var bookPrice=$("#zongjiage").text();
    var price=bookPrice.substring(1,bookPrice.length);
    //添加到购物车，并查询购物车的信息显示在页面上
    $.ajax({
        //async:false,
        url:"/orderconsumer/addToShop",
        data:{bid:bookNo,ordercount:booknumber,sprice:price},
        success:function(result){
            //var allCartBook = result.allCartBook;//购物车书
            var cartBookNumber = 0;//购物车中书的所有数
            var zongCartBookPrice=0;
            for(var i=0;i<result.length;i++){
                var xiaoji=result[i].sprice;
                var bookNumber=result[i].ordercount;
                zongCartBookPrice+=xiaoji;
                cartBookNumber+=bookNumber;
            }
            $("#layer_content > .info > .info1 > span").text(booknumber);
            $("#layer_content > .info > .info2 > span").text(booknumber);
            // $("#layer_content > .info  #bookKind").text(bookKinds.length);
            $("#layer_content > .info  #cartbookNumber").text(cartBookNumber);
            $("#layer_content > .info  #zongBookPrice").text(zongCartBookPrice.toFixed(2));

            //数据库中库存修改后，修改页面上的库存
            var bookStock=$("#bookStock").text();
            bookStock-=booknumber;
            $("#bookStock").text(bookStock);
        }
    });
}


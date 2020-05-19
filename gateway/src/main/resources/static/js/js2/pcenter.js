$(function () {
//若登录了，改变页头的customer信息
    $.ajax({
        type:"get",
        url:"/customer/getCustomer",
        success:function (result) {
            var customer = result.data;
            if (result.code === 200){
                var $headerLeft = $("#header-left");
                $headerLeft.css("line-height","40px");
                $headerLeft.css("font-size","13px");
                $headerLeft.css("color","#666");
                if (customer.realName == null || customer.realName == ""){
                    $("#header-left").html("<span style='font:400 14px 微软雅黑;color: red;'>尊敬的客户："+customer.phoneNumber+"用户,请尽快完善个人信息!</span> &nbsp;"
                        +"<a href='/customer/logout'>[退出]</a>"
                    );
                }else if (customer.gender === 1){
                    $("#header-left").html("欢迎您的到来：<span style='font:600 14px 微软雅黑; color:red;'>"+customer.realName+"</span> &nbsp;先生"
                        +"<a href='/customer/logout'>[退出]</a>"
                    );
                }else{
                    $("#header-left").html("欢迎您的到来：<span style='font:600 14px 微软雅黑; color:red;'>"+customer.realName+"</span> &nbsp;女士"
                        +"<a href='/customer/logout'>[退出]</a>"
                    );
                }
            }else {
                //如果没有登录，就跳转到登录页面
                window.location.href="/frontSkip/toLogin";
            }
        }
    });

    getCustomerInfo();

});

function toShoppingCart(){
    $.ajax({
        type:"GET",
        url:"/book/beforeToShoppingCart",
        success:function(result){
            if(result.code == 400){
                layer.open({
                    type:0,
                    title:"系统提示",
                    content:"登录有就能有辆车了，现在要去登录吗?",
                    btn:["现在就去","给朕退下"],
                    btn1:function(){
                        //点击现在就去时去登陆页面
                        window.location.href="/frontSkip/toLogin";
                    }
                });
            }else{
                window.location.href="/frontSkip/toShoppingCart";
            }
        }
    });
}

/**
 * 个人中心中用户的一些信息
 */
function getCustomerInfo() {
    $.ajax({
        type:"get",
        url:"/customer/getCustomerInfo",
        success:function (result) {
            if (result.code == 200){
                $("#headImg").attr("src",result.data.headImgUrl);
                $("#displayUsername").attr("title",result.data.nickName);
                $("#displayUsername").text(result.data.nickName);
                $("#newestLoginTime").text(result.data.newestLoginTime)
            }
        }
    });
}

//修改头像
function updateHeadImg(){
    //a点击时让文件输入框点击
    $("#headImgInput").click();

    //注意：不能将下面的函数放到这个函数体中执行，
    // 否则每点击一次，都会多给#headImgInput节点绑定一个事件，
    // 结果就是点击一次，确执行多次（吃过亏，注意）
}
//文件输入框改变时获取文件内容
$("#headImgInput").change(function () {
    //文件内容
    var headImgFile = $(this)[0].files[0];
    if (headImgFile.size == 0){
        alert("请先选择头像!");
        return false;
    }

    var formData = new FormData();
    //必须要通过formData来构造键值对，否则对应不起来与后台
    formData.set("uploadHeadImg",headImgFile);

    //ajax上传头像
    $.ajax({
        async:false,
        type:"post",
        url:"/customer/uploadHeadImg",
        data:formData,//文件内容
        cache:false,//不缓存
        processData: false,// 不处理数据
        contentType: false, // 不设置内容类型
        success:function (result) {
            if (result.code == 200){
                $("#headImg").attr("src",result.data);
            }else{
                alert(result.message);
            }
        }
    });

    console.log(formData);

});



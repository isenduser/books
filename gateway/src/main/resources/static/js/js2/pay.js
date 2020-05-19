
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
var payMethod="未选择";
var orders = null;
$(function(){
    /*layui中加载layer模块*/
    layui.use('layer', function(){
        var layer = layui.layer;
    });

    /*选择支付方式*/
    var imgs=$(".payimg > img");
    var bs=$(".payimg > b");
    for(var i=0;i<imgs.length;i++){
        /*第一个img和第一个b需要有一个东西让他们同步起来*/
        imgs[i].index=i;
        imgs[i].onclick=function(){
            for(var j=0;j<imgs.length;j++){
                imgs[j].style.border="none";
            }
            for(var k=0;k<bs.length;k++){
                bs[k].style.display="none";
            }
            imgs[this.index].style.border="2px solid #e4393c";
            bs[this.index].style.display="block";
        }
    }

    /*编辑收货人信息*/
    $("#bianji").click(function(){
        layer.open({
            type: 2,
            title: '编辑收货人信息',
            shadeClose: false,
            shade: 0.4,
            area: ['800px', '500px'],
            content: '/orderconsumer/toPayEdit'
        });

    });
    /*编辑收货人信息结束*/

    //获取订单和总价格
    $.ajax({
        type:"get",
        url:"/orderconsumer/getOrder",
        success:function (result) {
                //赋值orders
                orders = result.orders;
                var totalMoney = result.totalPrice;
                //转换成数值类型
                totalMoney = parseFloat(totalMoney);
                for(var i=0;i<orders.length;i++){
                    $("<li class='li1'></li>")
                        .append("<img src='"+orders[i].books.picPath+"'/>")
                        .append("<span title='"+orders[i].books.bname+"'>"+orders[i].books.bname+"</span>")
                        .append("<div class='price'>￥"+orders[i].dprice.toFixed(2)+"</div>")
                        .append("<div class='shuliang' title='购买的数量'>"+orders[i].amount+"</div>")
                        .append("<div class='youhuo'>有货</div>")
                        .appendTo("#orderInfo");
                }
                $("#zongjiage").text("￥"+totalMoney.toFixed(2));

                //多于2个时出现滚动条
                if($("#orderInfo > .li1").length>2){
                    $("#orderInfo").css("height","160px");
                }else{
                    $("#orderInfo").css("height","auto");
                }


        }
    });

});

//检查订单
function checkAccount() {
    //检查信息是否完善
    var cName =$(".wrapp > .customerName").text();
    var cAddress =$("#innerp > .customerAddress").text();
    var cPhone = $("#innerp > .customerPhone").text();
    /*
    * 在js中能作为if判断条件的有4种
    * 1、布尔:true/false
    * 2、null和undefined
    * 3、空串""
    * 4、0和NaN
    *
    * null、undefined、""、0就相当于false,可以直接取反来简化代码和提高性能
    * */
   /* if (!cName || !cAddress || !cPhone){
        layer.alert("请先完善个人信息!",{title:"系统提示"});
        return false;
    }*/
    var totalMoney=$("#zongjiage").text();
    if (!totalMoney){
        layer.msg("总金额不能为空!",{icon:5,anim:6});
        return false;
    }
    totalMoney=totalMoney.substring(1,totalMoney.length);
    //检查是否选择支付方式

    $.each($(".payimg > img"),function(index,object){
        if($(this).css("border")=="2px solid rgb(228, 57, 60)"){
            payMethod=index; //index为0或1
        }
    });
    if(payMethod=="未选择"){
        layer.msg("请先选择支付方式!",{icon:5,anim:6});
        return false;
    }

   submitOrder();
}

//提交订单
function submitOrder() {
    var totalMoney=$("#zongjiage").text();
    var strBookNos = "";
    for (var i=0;i<orders.length;i++){
        strBookNos +=orders[i].bookNo+",";
    }
    //去掉最后一个逗号
    strBookNos = strBookNos.substring(0,strBookNos.length-1);
    //去掉开头的符号
    totalMoney = totalMoney.replace("￥","");

    $.ajax({
        type:"post",
        url:"/orderconsumer/submitOrder",
        data:{payMethod:payMethod},
        success:function(result){
            //===代表类型和内容都相等
            if(result.msg=="error"){
                layer.alert("提交订单失败！！！", {title:"系统提示",shade:false});
            }else{
                var orderId=result.orderId;
                var totalprice=result.totalprice;
                window.location.href="/orderconsumer/alipay?orderId="+orderId+"&totalprice="+totalprice;
            }
        }
    });
}


function editCustomerInfo() {
    $.ajax({
        type:"get",
        url:"/customer/getCustomer",
        data:{pay:"pay"},
        success:function (result) {
            var customer = result.data;
            $("input[name=realName]").val(customer.realName);
            //设置单选按钮被选中的值
            $("input[name=gender][value="+customer.gender+"]").prop("checked","checked");
            $("input[name=age]").val(customer.age);
            $("input[name=address]").val(customer.province+customer.city+customer.region+customer.detailAddress);
            $("input[name=profession]").val(customer.profession);
        }
    });


}



//完善customer信息
function perfectInfo() {
    var realName = $("input[name=name]").val();
    var gender = $("input[name=sex]:checked").val();
    // var age = $("input[name=age]").val();
    var address = $("input[name=address]").val();
    //var profession = $("input[name=profession]").val();

    //非 "" 校验
    var flag = true;
    console.log(realName,gender,age,address,profession);
    $.each($("#perfectForm input"),function () {
        if (!$(this).val()){ // ==> if($(this).val == null || $(this).val == "")
            flag = false;
            return;
        }
    });
    if (!flag){
        layer.msg('必填项不能为空!', {icon: 5});
        return false;
    }

    /*var numberRegExp = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
    if (!numberRegExp.test(age)){
        layer.msg('年龄格式不对!', {icon: 5});
       return false;
    }
    if (age <0 || age > 200){
        layer.msg('年龄格式不对!', {icon: 5});
        return false;
    }*/

    $.ajax({
        async:false,
        type:"post",
        url:"/customer/perfectCustomerInfo",
        data:{
            realName:realName,
            gender:gender,
            age:age,
            address:address,
            profession:profession
        },
        success:function (result) {
            if (result.code === 200){
                //设置该layer持续时间和执行完毕后执行的函数
               layer.msg("保存成功!",{time:1000,icon:1},function () {
                   var index = parent.layer.getFrameIndex(window.name);
                   parent.layer.close(index);//关闭当前页
                   window.parent.location.reload();//刷新父页面
               });
            }else{
                if (result == "redirect"){
                   window.location.href="/frontSkip/toLogin";
                   return false;
                }
                layer.msg("输入的数据有误!",{icon:5,anim:6});
            }
        }

    });

}

//自定义让当前js程序睡眠的方法，单位毫秒
function sleep(n) {
    var start = new Date().getTime();
    //  console.log('休眠前：' + start);
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
}
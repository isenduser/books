//声明一个webSocket全局变量
var webSocket;
var sessionId;//当前用户的sessionID
var nickName="";//当前用户的昵称
var fromCustomerId = 0;//发送方的customerId
var currChatList = [0];//左侧聊天列表的toCustomerId数组

$(function () {
    getCurrentCustomer();
    reloadGroupChat();
    //getOnlineCustomerList();

    //判断浏览器是否支持WebSocket
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
        return false;
    }
    //刷新页面时如果webSocket对象为null才重新建立连接
    webSocket = new WebSocket("ws://localhost:8081/webChatServer");


    //连接建立成功回调函数
    webSocket.onopen = function(event) {
        console.log("连接建立成功");
        //客户端主动发送数据
        //socket.send("这是来自客户端的消息");
    };

    //服务器端推送消息的回调函数
    webSocket.onmessage = function (event) {
        var message = event.data;
        //json字符串-》js对象
        message = JSON.parse(message);
        switch (message.type){
            case 0:
                var chatInfoAll = message.data;
                //console.log(chatInfoAll);
                var $chatWindowAll = $("#centerDiv").find(".chatWindow[sessionId='']");
                //如果当前客户端是发送者，就在右边显示，否则就在左边显示
                if (chatInfoAll.fromSessionId == sessionId){
                    appendRightDiv(chatInfoAll,$chatWindowAll.find(".showInfo"));
                }else {
                    appendLeftDiv(chatInfoAll,$chatWindowAll.find(".showInfo"));
                }
                break;
            case 1:
                var chatInfo = message.data;
                //如果是当前是发送者，就找到接收者的窗口，消息显示在右边
                if (chatInfo.fromSessionId == sessionId){
                    var toSessionId = chatInfo.toSessionId;
                    //找到目标chatWindow
                    var $chatWindow = $("#centerDiv").find(".chatWindow[sessionId="+toSessionId+"]");
                    appendRightDiv(chatInfo,$chatWindow.find(".showInfo"));
                }else {
                    //如果当前是接收者，就找到发送者的窗口，消息显示在左边
                    var fromSessionId = chatInfo.fromSessionId;
                    //找到目标chatWindow
                    var $chatWindow = $("#centerDiv").find(".chatWindow[sessionId="+fromSessionId+"]");
                    appendLeftDiv(chatInfo,$chatWindow.find(".showInfo"));
                }
                break;
            case 2:
                var chatInfoSystem = message.data;
                var $chatWindowAll = $("#centerDiv").find(".chatWindow[sessionId='']");
                if (chatInfoSystem.isClose == 0){
                    //显示加入群聊信息
                    appendSystemDiv(chatInfoSystem,$chatWindowAll.find(".showInfo"));
                }else {
                    //显示退出群聊信息
                    appendSystemDiv2(chatInfoSystem,$chatWindowAll.find(".showInfo"));
                }

                break;
            case 3:
                sessionId = message.data;
                console.log("sessionId:"+sessionId);
                break;
            case 4:
                var customerList = message.data;
                buildCustomerList(customerList);
                break;
            default:
                layer.msg("未知消息类型!");

        }


    };







    //连接关闭回调
    webSocket.onclose = function() {
        console.log("webSocket连接已关闭");
    };
    //连接错误回调
    webSocket.onerror = function() {
        console.log("webSocket连接失败");
    };


    //双击在线列表后，新增聊天列表和聊天窗口。因为user这个Div是动态生成的，所以要动态绑定
    $(document).on("dblclick","#onlineList .user",function () {
        //声明一个变量保存当前jQuery对象
        var that = $(this);
        var sessionId = that.attr("sessionId");
        var toCustomerId = that.attr("toCustomerId");
        var nickName = that.find("div:eq(1) > p:eq(0)").text();
        var spanList = $(".chatList > a > span");
        //遍历已有的列表值，如果有了就不添加，否则就添加
        var flag = 0;
        for (var i = 0; i < spanList.length; i++) {
            if (spanList.eq(i).text() == nickName){
                flag = 1;
                break;
            }
        }
        if (flag == 0){
            $.each($(".chatList a"),function () {
                $(this).removeClass("active");
            });
            //向数组中添加元素
            currChatList.push(toCustomerId);
            //添加聊天列表
            $(".chatList").append("<a class='list-group-item active' toCustomerId='"+toCustomerId+"'>与<span>"+nickName+"</span>的聊天<span onclick='closeChatWindow()'>x</span></a>");
            //添加聊天窗口
            $.each($("#centerDiv .chatWindow"),function () {
               $(this).css("display","none");
            });
            var $showInfoContainer = $("<div class='showInfoContainer'></div>")
                .append("<div class='title'><span>"+nickName+"</span></div>")
                .append("<div class='showInfo'></div>");
            var $sendContainer = $("<div class='sendContainer'></div>")
                .append("<div class='toolsBar'></div>")
                .append("<textarea class='form-control sendInfoArea' placeholder='在这里输入你想发送的消息...'></textarea>")
                .append("<div class='closeOrSend'><button class='btn btn-warning'>关闭</button>&nbsp;<button class='btn btn-success' onclick='sendInfo()'>发送</button></div>");
            var $chatWindow = $("<div class='chatWindow' sessionId='"+sessionId+"' toCustomerId='"+toCustomerId+"'></div>").append($showInfoContainer[0]).append($sendContainer[0]);
            $("#centerDiv").append($chatWindow[0]);
            //查询当前聊天窗口的聊天信息
            $.ajax({
                type:"get",
                url:"/webChat/getChatInfoListByFromAndToId",
                data:{fromCustomerId:fromCustomerId,toCustomerId:toCustomerId},
                success:function (result) {
                    if (result.code == 200){
                        var chatInfoList = result.data;
                        for (var i = 0; i < chatInfoList.length; i++) {
                            if (chatInfoList[i].fromCustomerId == fromCustomerId){
                                appendRightDiv(chatInfoList[i],$chatWindow.find(".showInfo"));
                            }else{
                                appendLeftDiv(chatInfoList[i],$chatWindow.find(".showInfo"));
                            }
                        }
                    }else {
                        layer.msg("暂时还没有聊天记录哦!");
                    }
                }
            });

        }
    });

    //点击聊天列表，控制聊天窗口的显示与隐藏
    $(document).on("click",".chatList a",function () {
        var that = $(this);
        //获取到a的索引
        var aIndex = that.index();
        $.each($("#centerDiv .chatWindow"),function () {
            $(this).css("display","none");
        });
        $("#centerDiv .chatWindow:eq("+aIndex+")").css("display","block");
        $.each($(".chatList a"),function () {
           $(this).removeClass("active");
        });
        that.addClass("active");
    });


    //回车发送消息
    $(document).on("keydown",".sendInfoArea",function () {
        if (event.keyCode == 13){
            sendInfo();
            return false;
        }
    });


});


/**
 *浏览器关闭或刷新关闭当前webSocket连接
 */
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isFireFox = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
var isIE = userAgent.indexOf("compatible") > -1
    && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器


var beginTime = 0;//开始时间
var differTime = 0;//时间差
window.onunload = function (){
    differTime = new Date().getTime() - beginTime;
    if(differTime <= 6) {
        console.log("浏览器关闭,webSocket连接关闭");
        deleteSessionAndUpdateStatus();
        //主动关闭连接
        webSocket.close();
    }else{
        console.log("浏览器刷新,webSocket重新建立连接");
        webSocket.close();
    }

};
window.onbeforeunload = function (){
    beginTime = new Date().getTime();
    if (isFireFox || isIE || isEdge){
        //if (event.clientX > document.body.clientWidth && event.clientY < 0 || event.altKey){
            deleteSessionAndUpdateStatus();
            webSocket.close();
        //}
    }

};

/**
 * 删除session并且用户状态变成离线
 */
function deleteSessionAndUpdateStatus() {
    $.ajax({
        async:false,
        type: "get",
        url:"/customer/updateCustomerOnlineStatus",
        cache: false,
        success: function(result){
            if (result.code == 200){
                console.log(result.message);
            }else{
                console.log(result.message);
            }

        }
    });
}



/**
 * 添加右边聊天信息的div
 */
function appendRightDiv(chatInfo,showInfo) {
    var $p = $("<p class='infoTitle'></p>").append("<span>"+chatInfo.time+"</span>").append("&nbsp;").append("<span class='nickName'>"+chatInfo.fromNickName+"</span>");
    $("<div class='infoUnit right'></div>")
        .append($p)
        .append("<div class='infoContent'>"+chatInfo.content+"</div>")
        .appendTo(showInfo);
    //添加一个空div用于清除浮动
    $(".showInfo").append("<div class='clear'></div>");
    //将滚动条拉到最低
    showInfo[0].scrollTop = 999999;
}

/**
 * 添加左边聊天信息的div
 */
function appendLeftDiv(chatInfo,showInfo) {
    var $p = $("<p class='infoTitle'></p>").append("<b class='nickName'>"+chatInfo.fromNickName+"</b>").append("&nbsp;").append("<span>"+chatInfo.time+"</span>");
    $("<div class='infoUnit left'></div>")
        .append($p)
        .append("<div class='infoContent'>"+chatInfo.content+"</div>")
        .appendTo(showInfo);
    //添加一个空div用于清除浮动
    $(".showInfo").append("<div class='clear'></div>");
    showInfo[0].scrollTop = 999999;
}

/**
 * 加入,系统消息的div
 */
function appendSystemDiv(chatInfo,showInfo) {
    $("<div class='systemDiv'></div>")
        .append("<p>"+getStrTime()+" 系统消息：</p>")
        .append("<p><span>"+chatInfo.nickName+"</span>加入群聊，当前共<span>"+chatInfo.customerCounts+"</span>人</p>")
        .appendTo(showInfo);
    //添加一个空div用于清除浮动
    $(".showInfo").append("<div class='clear'></div>");
    showInfo[0].scrollTop = 999999;
}
/**
 * 退出,系统消息的div
 */
function appendSystemDiv2(chatInfo,showInfo) {
    $("<div class='systemDiv'></div>")
        .append("<p>"+getStrTime()+" 系统消息：</p>")
        .append("<p><span>"+chatInfo.nickName+"</span>退出群聊，当前共<span>"+chatInfo.customerCounts+"</span>人</p>")
        .appendTo(showInfo);
    //添加一个空div用于清除浮动
    $(".showInfo").append("<div class='clear'></div>");
    showInfo[0].scrollTop = 999999;
}

/**
 * 获取当前时间 2019-02-02 14:06:08
 * @returns {string}
 */
function getStrTime() {
    function add_0(num) {
        if (num < 10) {
            num = '0' + num
        }
        return num;
    }
    var myDate = new Date();
    return myDate.getFullYear() + '-' + add_0(myDate.getMonth() + 1) + '-' + add_0(myDate.getDate()) + ' ' + add_0(myDate.getHours()) + ':' + add_0(myDate.getMinutes()) + ':' + add_0(myDate.getSeconds());
}

/**
 * 点击发送按钮发送消息
 */
function sendInfo() {
    var e = event || window.event;
    //event中获取当前dom对象
    var that = e.target;
    //接收方的id
    var toCustomerId = $(that).parents(".chatWindow").attr("toCustomerId");
    //接收方的sessionId
    var targetSessionId = $(that).parents(".chatWindow").attr("sessionId");
    var targetNickName = $(that).parents(".chatWindow").find(".title > span").text();
    var content = $(that).parents(".sendContainer").find("textarea").val();
    if (!content){
       layer.msg("不能发送空消息哦!");
       return false;
    }
    var info = {"fromSessionId":sessionId,"fromNickName":nickName,"toSessionId":targetSessionId,"toNickName":targetNickName,"content":content,"time":getStrTime()};
    var jsonInfo = JSON.stringify(info);
    //发送消息给服务器端
    webSocket.send(jsonInfo);
    //保存到数据库
    var persistenceInfo = {"fromCustomerId":fromCustomerId,"toCustomerId":toCustomerId,"fromSessionId":sessionId,"fromNickName":nickName,"toSessionId":targetSessionId,"toNickName":targetNickName,"content":content,"time":""};
    var jsonPersistenceInfo = JSON.stringify(persistenceInfo);
    $.ajax({
        type:"post",
        url:"/webChat/saveChatInfo",
        data:jsonPersistenceInfo,
        contentType:"application/json",//注意json格式的数据
        success:function (result) {
            if (result.code != 200){
               layer.msg("消息持久化出现一点问题!");
            }
        }
    });
    //清空文本域的值
    $(that).parents(".sendContainer").find("textarea").val("");
}

/**
 * 获取到当前登录用户的信息
 */
function getCurrentCustomer() {
    $.ajax({
        async:false,
        type:"get",
        url:"/customer/getCustomer",
        success:function (result) {
            if (result.code === 200) {
                var customer = result.data;
                nickName = customer.nickName;
                fromCustomerId = customer.id;
                $("#userInfo img").attr("src",customer.headImgUrl);
                $("#userInfo p > span:eq(0)").text(nickName);
                $("#userInfo p > span:eq(1)").text(customer.age);
                $("#userInfo p > span:eq(2)").text(customer.gender==1?"男":"女");
            }
        }

    });
}

/**
 * 初始化在线用户列表
 */
function getOnlineCustomerList() {
    $.ajax({
        type:"get",
        url:"/customer/getOnlineCustomerList",
        success:function (result) {
            if (result.code == 200) {
                var customers = result.data;
                buildCustomerList(customers);
            }
        }

    });
}

/**
 * 构建在线用户列表
 * @param customers
 */
function buildCustomerList(customers) {
    //先清空再重新构建
    $("#onlineList > .userList").empty();
    for (var i = 0; i < customers.length; i++) {
        $("<div class='user list-group-item' sessionId='"+customers[i].webChatSessionId+"' toCustomerId='"+customers[i].id+"'></div>")
            .append("<div class='headerImg'><img src='"+customers[i].headImgUrl+"' alt='"+customers[i].realName+"'></div>")
            .append("<div class='nickNameAndStatus'><p>"+customers[i].nickName+"</p><p>"+(customers[i].onlineStatus==1?"在线":"离线")+"</p></div>")
            .appendTo("#onlineList > .userList");
    }
}

/**
 * 重新加载群聊
 */
function reloadGroupChat() {
    $.ajax({
        type:"get",
        url:"/webChat/getChatInfoListByFromAndToId",
        data:{fromCustomerId:0,toCustomerId:0},
        success:function (result) {
            if (result.code == 200) {
                var chatInfoList = result.data;
                for (var i = 0; i < chatInfoList.length; i++) {
                    if (chatInfoList[i].fromCustomerId == fromCustomerId){
                        appendRightDiv(chatInfoList[i],$(".chatWindow[toCustomerId=0]").find(".showInfo"));
                    }else{
                        appendLeftDiv(chatInfoList[i],$(".chatWindow[toCustomerId=0]").find(".showInfo"));
                    }
                }
                $(".chatWindow[toCustomerId=0] .showInfo")[0].scrollTop = 999999;
            }
        }
    });
}

/**
 * 关闭聊天窗口
 */
function closeChatWindow(){
    var event = event || window.event;
    var that = event.target;
    var toCustomerId = $(that).parent("a").attr("toCustomerId");
    /**
     * 思路：如果删除的是最后一个，就删除最后一个并显示上一个。
     *       如果删除的不是最后一个，就直接删除当前点击的。
     */

    if (toCustomerId == currChatList[currChatList.length - 1]){
        //移除一个聊天
        $(that).parent("a").remove();
        //根据toCustomerId的值找到对应的chatWindow删掉
        $("#centerDiv > .chatWindow[toCustomerId="+toCustomerId+"]").remove();
        //显示上一个
        $(".chatList > a[toCustomerId="+currChatList[currChatList.length - 2]+"]").addClass("active");
        $("#centerDiv > .chatWindow[toCustomerId="+currChatList[currChatList.length - 2]+"]").css("display","block");
    }else {
        //移除一个聊天
        $(that).parent("a").remove();
        //根据toCustomerId的值找到对应的chatWindow删掉
        $("#centerDiv > .chatWindow[toCustomerId="+toCustomerId+"]").remove();
    }
    //从数组中删除该元素
    var index = currChatList.indexOf(toCustomerId);
    currChatList.splice(index,1);

}
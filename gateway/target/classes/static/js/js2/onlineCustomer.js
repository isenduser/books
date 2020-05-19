
//先获取一下
statisticsOnline();
//实时更新
webSocketFun("ws://localhost:8081/webSocketServer");

//实时更新数据
function webSocketFun(webSocketServerUrl) {

    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else{
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //"ws://localhost:9000/webSocketServer/"+cid
        var socket = new WebSocket(webSocketServerUrl);

        //连接建立成功回调函数
        socket.onopen = function() {
            console.log("连接建立成功");
            //客户端主动发送数据
            //socket.send("这是来自客户端的消息");
        };
        //获取后端推送的数据
        socket.onmessage = function(msg) {
            console.log("后台推送过来的消息为："+msg.data);
            var countArray = msg.data.split(",");
            $("#header-center span:eq(0)").text(countArray[0]);
            $("#header-center span:eq(1)").text(countArray[1]);

        };
        //连接关闭回调
        socket.onclose = function() {
            console.log("Socket已关闭");
        };
        //连接错误回调
        socket.onerror = function() {
            alert("Socket发生了错误");
        }

        //Socket.close();客户端主动关闭连接的方法，可以在关闭浏览器或退出时触发
    }

}

//刷新时统计在线人数
function statisticsOnline() {

    $.ajax({
        async:false,
        type:"get",
        url:"/customer/statisticsOnlineCustomer",
        success:function (result) {
            if (result.code == 200){
                var countMap = result.data;
                $("#header-center span:eq(0)").text(countMap.totalCustomer);
                $("#header-center span:eq(1)").text(countMap.onlineCustomer);
            }else{
                console.log("获取统计在线人数数据失败!");
            }
        }
    });
}
/*
//ajax轮询
setInterval(function () {
    statisticsOnline()
},5000);*/

/**
 * 浏览器刷新或关闭时触发的事件,目前只支持chrome
 * 页面关闭时先执行onbeforeunload，然后onunload
 * 页面刷新时先执行onbeforeunload，然后onunload，最后onload
 * @type {number}
 */
var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isFireFox = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
var isIE = userAgent.indexOf("compatible") > -1
    && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器


var beginTime = 0;//执行onbeforeunload的开始时间
var differTime = 0;//时间差
window.onunload = function (){
    differTime = new Date().getTime() - beginTime;
    if(differTime <= 6) {//6为浏览器刷新的时间
        console.log("浏览器关闭");
        deleteSessionAndUpdateStatus();
    }else{
        console.log("浏览器刷新")
    }

};
window.onbeforeunload = function (){
    beginTime = new Date().getTime();
    if (isFireFox || isIE || isEdge){
       //if (event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){
           deleteSessionAndUpdateStatus();
       //}
    }
};

/**
 * 删除session并且用户状态变成离线
 */
function deleteSessionAndUpdateStatus() {
    $.ajax({
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




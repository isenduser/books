$(function () {


    load();


});


var prefix="/loginReport";

function load() {
    $('#loginReportTable')
        .bootstrapTable(
            {
                method : 'get', // 服务器数据的请求方式 get or post
                url : prefix + "/getLoginReportPage", // 服务器数据的加载地址
                iconSize : 'outline',
                toolbar : '#exampleToolbar',
                striped : true, // 设置为true会有隔行变色效果
                dataType : "json", // 服务器返回的数据类型
                pagination : true, // 设置为true会在底部显示分页条
                pageList: [10],        //可供选择的每页的行数（*）
                singleSelect : false, // 设置为true将禁止多选
                contentType : "application/x-www-form-urlencoded",
                pageSize : 10, // 如果设置了分页，每页数据条数
                pageNumber : 1, // 如果设置了分页，首页页码
                showColumns : false, // 是否显示内容下拉框（选择显示的列）
                sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
                queryParamsType : "",
                //设置为limit则会发送符合RESTFull格式的参数
                queryParams : function(params) {
                    return {
                        //说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
                        pageNumber : params.pageNumber,
                        pageSize : params.pageSize
                    };
                },
                responseHandler : function(res){
                    console.log(res);
                    return {
                        "total": res.data.total,//总数
                        "rows": res.data.records //数据
                    };
                },
                columns : [
                    {
                        field : 'id',
                        title : '行号',
                        align:'center',
                        formatter:function (value,row,index) {
                            return index + 1;
                        }
                    },
                    {
                        field : 'customerName',
                        title : '用户名',
                        align:'center'
                    },
                    {
                        field : 'phoneNumber',
                        title : '手机号',
                        align:'center',
                        formatter:function (value,row,index) {
                            return value;
                        }
                    },
                    {
                        field : 'loginType',
                        title : '操作',
                        align:'center',
                        formatter:function (value,row,index) {
                            if (value == 1){
                               return "登录";
                            }else{
                               return "登出";
                            }
                        }
                    },
                    {
                        field : 'createTime',
                        title : '时间',
                        align:'center'
                    },
                    {
                        field : 'loginIp',
                        title : '设备ip',
                        align:'center'
                    },
                    {
                        field : 'browser',
                        title : '浏览器',
                        align:'center'
                    },
                    {
                        field : 'os',
                        title : '操作系统',
                        align:'center'
                    }]
            });
}

function reLoad() {
    $('#loginReportTable').bootstrapTable('refresh');
}
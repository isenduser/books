$(function () {


    load();


});


var prefix="/order";

function load() {
    $('#orderTable')
        .bootstrapTable(
            {
                method : 'get', // 服务器数据的请求方式 get or post
                url : prefix + "/getOrdersByCustomerId", // 服务器数据的加载地址
                //	showRefresh : true,
                //	showToggle : true,
                //	showColumns : true,
                iconSize : 'outline',
                toolbar : '#exampleToolbar',
                striped : true, // 设置为true会有隔行变色效果
                dataType : "json", // 服务器返回的数据类型
                pagination : true, // 设置为true会在底部显示分页条
                pageList: [10],        //可供选择的每页的行数（*）
                singleSelect : false, // 设置为true将禁止多选
                contentType : "application/x-www-form-urlencoded",
                // //发送到服务器的数据编码类型
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
                        pageSize : params.pageSize,
                        bookName:$("#bookName").val()
                    };
                },
                // //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
                // queryParamsType = 'limit' ,返回参数必须包含
                // limit, offset, search, sort, order 否则, 需要包含:
                // pageSize, pageNumber, searchText, sortName,
                // sortOrder.
                // 返回false将会终止请求
                responseHandler : function(res){
                    console.log(res);
                    return {
                        "total": res.data.total,//总数
                        "rows": res.data.records //数据
                    };
                },
                columns : [
                    {
                        field : 'orderNo',
                        title : '订单编号',
                        align:'center'
                    },
                    {
                        field : 'customerName',
                        title : '用户名',
                        align:'center'
                    },
                    {
                        field : 'bookName',
                        title : '书名',
                        align:'center',
                        formatter:function (value,row,index) {
                            return "<a href='#' onclick='toBookDetail(\""+row.bookNo+"\")'>"+value+"</a>";
                        }
                    },
                    {
                        field : 'bookImgUrl',
                        title : '图片',
                        align:'center',
                        formatter:function (value,row,index) {
                            return "<img src='"+value+"' title='"+row.bookName+"' width='40px' height='40px'>";
                        }
                    },
                    {
                        field : 'bookPrice',
                        title : '总价格',
                        align:'center',
                        formatter:function (value,row,index) {
                            return (value * row.bookNumber).toFixed(2) +"元";
                        }
                    },
                    {
                        field : 'payStatus',
                        title : '支付状态',
                        align:'center',
                        formatter:function (value) {
                            if (value == 1){
                                value = "已支付";
                                return "<span style='color:green;font-weight: bold'>"+value+"</span>";
                            }else {
                                value = "未支付";
                                return "<span style='color:red;font-weight: bold'>"+value+"</span>";
                            }
                        }
                    },
                    {
                        field : 'createTime',
                        title : '创建时间',
                        align:'center'
                    }
                    /*{
                        title : '操作',
                        field : 'id',
                        align : 'center',
                        formatter : function(value, row, index) {
                            var e = '<a class="btn btn-primary btn-sm editt" href="#" title="修改" onclick="edit(\''
                                + row.id
                                + '\')"><i class="fa fa-edit"></i></a> ';
                            var d = '<a class="btn btn-warning btn-sm" href="#" title="锁定"  onclick="locking(\''
                                + row.id
                                + '\')"><i class="glyphicon glyphicon-lock"></i></a> ';
                            return e + d ;
                        }
                    }*/ ]
            });
}

function reLoad() {
    $('#orderTable').bootstrapTable('refresh');
}

//去书的详情页
function toBookDetail(bookNo) {
    //去父页面进行跳转
    window.parent.location.href="/book/showBookDetails?bookNo="+bookNo;
}
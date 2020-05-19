package com.cssl.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 订单类
 */
@Data
public class Orders {
    private Integer oid;//主键
    private String orderId;//生成的订单编号
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;//下单日期
    private Integer ocount;//总订购数量
    private String message;//留言
    private String paymethod;//支付方式
    private String rname;//收货人姓名
    private String raddress;//收货人地址
    private String rphone;//收货人电话
    private Double totalprice;//订单总价
    private Customer customer;//客户
    private List<OrderDetail> list;//详细订单
    private String status;//订单状态，默认0未支付，1已支付


}

package com.cssl.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * 详细订单类
 */
@Data
public class OrderDetail implements Serializable {
    private Integer odid;//主键
    private Integer oid;//订单编号
    private Integer amount;//订购数量
    private Double dprice;//总价
    private Books books;//图书


}

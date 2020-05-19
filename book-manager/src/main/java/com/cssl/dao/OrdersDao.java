package com.cssl.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;

import java.util.List;

public interface OrdersDao extends BaseMapper<Orders> {
    public List<Orders> queryOrders(Integer page, Integer limit);
    public int updateOrder(String orderId,String status);
    public List<OrderDetail> queryOrderDetails(Integer oid);
}

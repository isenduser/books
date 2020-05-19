package com.cssl.dao;

import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;

import java.util.List;

public interface OrdersDao {
    public int insertOrders(Orders orders);
    public int insertOrderDetail(OrderDetail orderDetail);
    public List<Orders> queryOrders(Integer cid,Integer page,Integer limit);
    public int queryOrdersCount(Integer cid);
    public List<OrderDetail> queryOrderDetail(Integer oid);
    public int updateStatus(String oid);
    public int shouhuo(Integer oid);
}

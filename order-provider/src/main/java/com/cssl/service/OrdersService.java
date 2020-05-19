package com.cssl.service;

import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;

import java.util.List;

public interface OrdersService {
    public int insertOrders(Orders orders);
    public List<Orders> queryOrders(Integer cid,Integer page,Integer limit);
    public int queryOrdersCount(Integer cid);
    public List<OrderDetail> queryOrderDetail(Integer oid);
    public int updateStatus(String oid);
    public int shouhuo(Integer oid);
}

package com.cssl.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;

import java.util.List;

public interface OrdersService extends IService<Orders> {
    public List<Orders> queryOrders(Integer page,Integer limit);
    public Integer queryCount();
    public int updateOrder(String orderId,String status);
    public List<OrderDetail> queryOrderDetails(Integer oid);
}

package com.cssl.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cssl.dao.OrdersDao;
import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;
import com.cssl.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class OrdersServiceImpl extends ServiceImpl<OrdersDao, Orders> implements OrdersService {
    @Autowired
    private OrdersDao ordersDao;
    @Override
    public List<Orders> queryOrders(Integer page, Integer limit) {
        return ordersDao.queryOrders(page, limit);
    }

    @Override
    public Integer queryCount() {
        return ordersDao.selectCount(new QueryWrapper<>());
    }

    @Override
    public int updateOrder(String orderId, String status) {
        return ordersDao.updateOrder(orderId, status);
    }

    @Override
    public List<OrderDetail> queryOrderDetails(Integer oid) {
        return ordersDao.queryOrderDetails(oid);
    }
}

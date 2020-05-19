package com.cssl.service.impl;

import com.cssl.dao.OrdersDao;
import com.cssl.dao.ShopDao;
import com.cssl.message.IMessageOrderService;
import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;
import com.cssl.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private OrdersDao ordersDao;
    @Autowired
    private ShopDao shopDao;
    @Override
    public int insertOrders(Orders orders) {
        List<OrderDetail> list=orders.getList();
        int count=ordersDao.insertOrders(orders);//下订单
        List<Integer> shopNos=new ArrayList<>();//购物车中的书编号集合
        for (OrderDetail orderDetail:list) {
            shopNos.add(orderDetail.getBooks().getBid());
            orderDetail.setOid(orders.getOid());
            ordersDao.insertOrderDetail(orderDetail);//插入详细订单信息
        }
        shopDao.deleteByBookNos(orders.getCustomer().getCid(),shopNos);//将已下订单的书从购物车中删除
        return count;
    }

    @Override
    public List<Orders> queryOrders(Integer cid,Integer page,Integer limit) {
        return ordersDao.queryOrders(cid,page,limit);
    }

    @Override
    public int queryOrdersCount(Integer cid) {
        return ordersDao.queryOrdersCount(cid);
    }

    @Override
    public List<OrderDetail> queryOrderDetail(Integer oid) {
        return ordersDao.queryOrderDetail(oid);
    }

    @Override
    public int updateStatus(String oid) {
        return ordersDao.updateStatus(oid);
    }

    @Override
    public int shouhuo(Integer oid) {
        return ordersDao.shouhuo(oid);
    }
}

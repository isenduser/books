package com.cssl.controller;

import com.cssl.message.IMessageOrderService;
import com.cssl.pojo.Books;
import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;
import com.cssl.pojo.Shop;
import com.cssl.service.OrdersService;
import com.cssl.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orderprovider")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private IMessageOrderService messageOrderService;

    /**
     * 添加购物车
     *
     * @param shop
     * @return
     */
    @RequestMapping("/addShop")
    public List<Shop> add(@RequestBody Shop shop) {
        List<Shop> list = new ArrayList<>();
        if (shopService.add(shop) > 0) {
            list = shopService.queryAllShop(shop.getCid());
        }
        return list;
    }

    /**
     * 获取购物车数量
     *
     * @param cid
     * @return
     */
    @RequestMapping("/getCartBookrows")
    public Integer getCartBookrows(Integer cid) {
        return shopService.queryBookCount(cid);
    }

    /**
     * 获取购物车信息
     */
    @RequestMapping("/getCartBook")
    public List<Shop> getCartBook(Integer cid) {
        return shopService.queryAllShop(cid);
    }

    /**
     * 清空购物车
     */
    @RequestMapping("/cleanCart")
    public int cleanCart(Integer cid) {
        return shopService.deleteShop(cid);
    }

    /**
     * 删除单本书
     */
    @RequestMapping("/deleteByBookNo")
    public String deleteByBookNo(Integer cid, Integer bid) {
        if (shopService.deleteByBookNo(cid, bid) > 0)
            return "true";
        return "false";
    }

    /**
     * 删除多本书
     */
    @RequestMapping("/deleteByBookNos")
    public String deleteByBookNos(Integer cid, @RequestParam List<Integer> list) {
        if (shopService.deleteByBookNos(cid, list) > 0)
            return "true";
        return "false";
    }

    /**
     * 提交订单
     */
    @RequestMapping("/submitOrder")
    public String submitOrder(@RequestBody Orders orders) {
        if (ordersService.insertOrders(orders) > 0) {
            messageOrderService.sendToBook(orders.getList());
            return "true";
        }
        return "false";
    }

    /**
     * 查询用户下的订单
     */
    @RequestMapping("/queryOrders")
    public List<Orders> queryOrders(Integer cid, Integer page, Integer limit) {
        return ordersService.queryOrders(cid, page, limit);
    }

    /**
     * 查询用户订单下的记录数
     */
    @RequestMapping("/queryOrdersCount")
    public int queryOrdersCount(Integer cid) {
        return ordersService.queryOrdersCount(cid);
    }

    /**
     * 查询订单编号对应的详细订单信息
     */
    @RequestMapping("/queryOrderDetail")
    public List<OrderDetail> queryOrderDetail(Integer oid) {
        return ordersService.queryOrderDetail(oid);
    }

    /**
     * 修改订单状态
     */
    @RequestMapping("/updateOrdersStatus")
    public int updateOrdersStatus(String oid) {
        return ordersService.updateStatus(oid);
    }

    /**
     * 确认收货
     */
    @RequestMapping("/shouhuo")
    public int shouhuo(Integer oid) {
        return ordersService.shouhuo(oid);
    }
}

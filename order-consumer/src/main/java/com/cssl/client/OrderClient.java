package com.cssl.client;

import com.cssl.pojo.OrderDetail;
import com.cssl.pojo.Orders;
import com.cssl.pojo.Shop;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@FeignClient(name="order-provider")
public interface OrderClient {
    @RequestMapping("/orderprovider/addShop")
    public List<Shop> addShop(Shop shop);
    @RequestMapping("/orderprovider/getCartBookrows")
    public Integer getCartBookrows(@RequestParam Integer cid);
    @RequestMapping("/orderprovider/getCartBook")
    public List<Shop> getCartBook(@RequestParam Integer cid);
    @RequestMapping("/orderprovider/cleanCart")
    public int cleanCart(@RequestParam Integer cid);
    @RequestMapping("/orderprovider/deleteByBookNo")
    public String deleteByBookNo(@RequestParam Integer cid,@RequestParam Integer bid);
    @RequestMapping("/orderprovider/deleteByBookNos")
    public String deleteByBookNos(@RequestParam Integer cid,@RequestParam List<Integer> list);
    @RequestMapping("/orderprovider/submitOrder")
    public String submitOrder(Orders orders);
    @RequestMapping("/orderprovider/queryOrders")
    public List<Orders> queryOrders(@RequestParam Integer cid,@RequestParam Integer page,@RequestParam Integer limit);
    @RequestMapping("/orderprovider/queryOrdersCount")
    public int queryOrdersCount(@RequestParam Integer cid);
    @RequestMapping("/orderprovider/queryOrderDetail")
    public List<OrderDetail> queryOrderDetail(@RequestParam Integer oid);
    @RequestMapping("/orderprovider/updateOrdersStatus")
    public int updateOrdersStatus(@RequestParam String oid);
    @RequestMapping("/orderprovider/shouhuo")
    public int shouhuo(@RequestParam Integer oid);
}

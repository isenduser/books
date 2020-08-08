package com.cssl.controller;

import com.cssl.client.BookClient;
import com.cssl.client.OrderClient;
import com.cssl.pojo.*;
import com.cssl.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping("/orderconsumer")
@Controller
public class OrderController {
    @Autowired
    private OrderClient orderClient;
    @Autowired
    private RedisUtil redisUtil;
    @Autowired
    private BookClient bookClient;


    @RequestMapping("/toShoppingCart")
    public String toShoppingCart() {
        return "shoppingCart";
    }

    /**
     * 添加到购物车的操作
     *
     * @param shop
     * @param session
     * @return
     */
    @RequestMapping("/addToShop")
    @ResponseBody
    public List<Shop> addToShop(Shop shop, HttpSession session) {
        Customer customer = (Customer) session.getAttribute("user");
        shop.setCid(customer.getCid());
        System.out.println(customer.getCid());
        return orderClient.addShop(shop);
    }

    /**
     * 判断购物车的数量有没有超过10
     *
     * @param cid
     * @return
     */
    @RequestMapping("/getCartBookrows")
    @ResponseBody
    public String getCartBookrows(Integer cid) {
        Integer count = orderClient.getCartBookrows(cid);
        if (count > 10) {
            return "false";
        }
        return "true";
    }

    /**
     * 获取购物车的所有商品信息
     */
    @RequestMapping("/getCartBook")
    @ResponseBody
    public List<Shop> getCartBook(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("user");
        Integer cid = customer.getCid();
        return orderClient.getCartBook(cid);
    }

    /**
     * 清空用户购物车
     */
    @RequestMapping("/cleanCart")
    @ResponseBody
    public String cleanCart(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("user");
        Integer cid = customer.getCid();
        int count = orderClient.cleanCart(cid);
        if (count > 0) {
            return "true";
        }
        return "false";
    }

    /**
     * 删除单本书
     */
    @RequestMapping("/deleteByBookNo")
    @ResponseBody
    public List<Shop> deleteByBookNo(HttpSession session, Integer bid) {
        Customer customer = (Customer) session.getAttribute("user");
        Integer cid = customer.getCid();
        orderClient.deleteByBookNo(cid, bid);
        return orderClient.getCartBook(cid);
    }

    /**
     * 删除多本书
     *
     * @param bookNos
     * @param session
     * @return
     */
    @RequestMapping("/deleteByBookNos")
    @ResponseBody
    public List<Shop> deleteByBookNos(String bookNos, HttpSession session) {
        Customer customer = (Customer) session.getAttribute("user");
        Integer cid = customer.getCid();
        String[] bidNos = bookNos.split(",");
        Integer[] bidNo = new Integer[bidNos.length];
        for (int i = 0; i < bidNos.length; i++) {
            bidNo[i] = Integer.parseInt(bidNos[i]);
        }
        ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(bidNo));
        orderClient.deleteByBookNos(cid, list);
        return orderClient.getCartBook(cid);
    }

    /**
     * 点击去结算,保存订单详细图书信息到redis
     */
    @RequestMapping("/toPay")
    @ResponseBody
    public String toPay(HttpSession session, String bookNos, String bookNumbers) {
        Customer customer = (Customer) session.getAttribute("user");
        Integer cid = customer.getCid();
        String[] booknos = bookNos.split(",");
        String[] booknumbers = bookNumbers.split(",");
        List<OrderDetail> list = new ArrayList<>();
        for (int i = 0; i < booknos.length; i++) {
            Integer number = Integer.parseInt(booknumbers[i]);
            Integer bid = Integer.parseInt(booknos[i]);
            OrderDetail orderDetail = new OrderDetail();
            Books books = bookClient.queryById(bid);
            orderDetail.setAmount(number);
            orderDetail.setBooks(books);
            Double price = (Double) books.getPrice() * number;
            orderDetail.setDprice(price);
            list.add(orderDetail);
        }
        redisUtil.setObj("user_" + cid, list);
        return "true";

    }

    /**
     * 跳转到pay页面
     *
     * @return
     */
    @RequestMapping("/toPayPage")
    public String toPayPage() {
        return "pay";
    }

    /**
     * 获得存在redis里面的订单详情
     */
    @RequestMapping("/getOrder")
    @ResponseBody
    public Map<String, Object> getOrder(HttpSession session) {
        Customer customer = (Customer) session.getAttribute("user");
        List<OrderDetail> list = (ArrayList) redisUtil.getObj("user_" + customer.getCid());
        Double totalPrice = 0d;
        for (OrderDetail orderDetail : list) {
            totalPrice += orderDetail.getDprice();
        }
        System.out.println("总价格。。。" + totalPrice);
        Map<String, Object> map = new HashMap<>();
        map.put("totalPrice", totalPrice);//总价格
        map.put("orders", list);//订单详情集合
        return map;
    }

    /**
     * 提交订单
     */
    @RequestMapping("/submitOrder")
    @ResponseBody
    public Map<String, Object> submitOrder(HttpSession session, String payMethod) {
        Map<String, Object> map = new HashMap<>();
        Customer customer = (Customer) session.getAttribute("user");
        List<OrderDetail> list = (ArrayList) redisUtil.getObj("user_" + customer.getCid());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddhhmmss");
        String orderId = "Dy" + dateFormat.format(new Date());
        Orders orders = new Orders();
        orders.setCustomer(customer);
        orders.setOrderId(orderId);
        orders.setList(list);
        orders.setStatus("未支付");
        orders.setPaymethod(payMethod);//0微信，1支付宝
        orders.setOrderDate(new Date());
        Double totalPrice = 0d;//总价
        Integer count = 0;//总数量
        for (OrderDetail orderDetail : list) {
            totalPrice += orderDetail.getDprice();
            count += orderDetail.getAmount();
        }
        if (totalPrice < 60) {
            totalPrice += 5;//小于60元加5元邮费
        }
        orders.setOcount(count);//总数量
        orders.setTotalprice(totalPrice);//订单总价
        if (orderClient.submitOrder(orders).equals("true")) {
            redisUtil.delObj("user_" + customer.getCid());//将保存在redis里面的详细订单信息删除
            map.put("msg", "success");
            map.put("orderId", orders.getOrderId());
            map.put("totalprice", orders.getTotalprice());
            return map;
        }
        map.put("msg", "error");
        return map;
    }

    /**
     * 跳转到订单成功页面
     */
    @RequestMapping("/toPaySuccess")
    public String toPaySuccess() {
        return "paySuccess";
    }

    /**
     * 跳转到我的订单页面
     */
    @RequestMapping("/tomyOrder")
    public String tomyOrder() {
        return "myOrder";
    }

    /**
     * 获取用户下的订单
     */
    @RequestMapping("/getOrders")
    @ResponseBody
    public Map<String, Object> getOrders(HttpSession session, Integer page, Integer limit) {
        //Customer customer=(Customer) session.getAttribute("user");
        //Integer cid=customer.getCid();
        List<Orders> list = orderClient.queryOrders(1, (page - 1) * limit, limit);
        int count = orderClient.queryOrdersCount(1);
        Map<String, Object> map = new HashMap<>();
        map.put("data", list);
        map.put("code", 0);
        map.put("count", count);
        map.put("msg", "查询成功");
        return map;
    }

    /**
     * 根据订单编号获取订单下的详细订单信息
     */
    @RequestMapping("/queryOrderDetail")
    @ResponseBody
    public List<OrderDetail> queryOrderDetail(Integer oid) {
        return orderClient.queryOrderDetail(oid);
    }

    /**
     * 确认收货
     */
    @RequestMapping("/shouhuo")
    @ResponseBody
    public boolean shouhuo(Integer oid) {
        if (orderClient.shouhuo(oid) > 0) {
            return true;
        }
        return false;
    }
}

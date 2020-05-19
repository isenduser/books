package com.cssl.controller;


import com.cssl.pojo.*;
import com.cssl.qiniu.Qiniu;
import com.cssl.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BooksService booksService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private TypeService typeService;

    @RequestMapping("/queryBooks")
    @ResponseBody
    public Map<String,Object> queryBooks(Integer page,Integer limit){

        Map<String,Object> map=new HashMap<>();
        List<Books> list=booksService.queryBooks((page-1)*limit,limit);
        Integer count=booksService.queryCount();
        map.put("data",list);
        map.put("count",count);
        map.put("msg","查询成功");
        map.put("code",0);
        return map;
    }

    /**
     * 查询所有客户
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping("/queryCustomer")
    @ResponseBody
    public Map<String,Object> queryCustomer(Integer page,Integer limit){
        Map<String,Object> map=new HashMap<>();
        List<Customer> list=customerService.queryCustomer((page-1)*limit, limit);
        Integer count=customerService.queryCount();
        map.put("data",list);
        map.put("count",count);
        map.put("msg","查询成功");
        map.put("code",0);
        return map;
    }

    /**
     * 查询所有订单
     */
    @RequestMapping("/queryOrders")
    @ResponseBody
    public Map<String,Object> queryOrders(Integer page,Integer limit){
        Map<String,Object> map=new HashMap<>();
        List<Orders> list=ordersService.queryOrders((page-1)*limit, limit);
        Integer count=ordersService.queryCount();
        map.put("data",list);
        map.put("count",count);
        map.put("msg","查询成功");
        map.put("code",0);
        return map;
    }
    /**
     * 图书修改
     */
    @RequestMapping("/bookupdate")
    @ResponseBody
    public String bookupdate( Books books){
        System.out.println(books.toString());
        int count=booksService.updateBook(books);
        return "success";
    }

    /**
     * 客户修改
     */
    @RequestMapping("/customerupdate")
    @ResponseBody
    public String customerupdate(Customer customer){
        System.out.println(customer.toString());
        int count=customerService.updateCustomer(customer);
        return "success";
    }

    /**
     * 新增客户
     */
    @RequestMapping("customerinsert")
    @ResponseBody
    public String customerInsert(Customer customer){
        System.out.println(customer.toString());
        customer.setRegtime(new Date());
        int count=customerService.insertCustomer(customer);
        return "success";
    }

    /**
     * 拿到所有的图书类型
     */
    @RequestMapping("/getType")
    @ResponseBody
    public List<Type> getType(){
        List<Type> type=typeService.queryAllType();
        return type;
    }

    /**
     * 新增图书
     */
    @RequestMapping("/bookinsert")
    @ResponseBody
    public String bookinsert(Books books) {
        System.out.println(books.toString());
        booksService.addBooks(books);
        return "success";
    }

    /**
     * 上传图片
     */
    @RequestMapping("/upload")
    @ResponseBody
    public Map<String, Object> upload(MultipartFile file) throws IOException {
        System.out.println("up:"+file);
        byte[] imgBytes = file.getBytes();
        String imgUrl = Qiniu.upLoadImage(imgBytes);
        System.out.println("imgUrl:"+imgUrl);
        Map<String,Object> map=new HashMap<>();
        map.put("data",imgUrl);
        map.put("code",0);
        map.put("msg","mag");
        return map;

    }

    /**
     * 删除客户
     */
    @RequestMapping("/customerDelete")
    @ResponseBody
    public String customerDelete(@RequestBody  Customer customer){
        System.out.println(customer.toString());
        customerService.deleteCustomerById(customer.getCid());
        return "success";
    }

    /**
     * 删除图书
     */
    @RequestMapping("/bookDelete")
    @ResponseBody
    public String bookDelete(@RequestBody Books books){
        System.out.println(books.toString());
        booksService.deleteBooksById(books.getBid());
        return "success";
    }

    /**
     * 修改订单状态
     */
    @RequestMapping("/orderupdate")
    public String orderupdate(String orderId){
        String status="已发货";
        int count=ordersService.updateOrder(orderId,status);
        return "orderList";
    }


    /**
     * 查看订单详情
     */
    @RequestMapping("/queryOrderDetails")
    @ResponseBody
    public List<OrderDetail> queryOrderDetails(Integer oid){
        return ordersService.queryOrderDetails(oid);
    }
}

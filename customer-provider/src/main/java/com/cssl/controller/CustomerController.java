package com.cssl.controller;

import com.cssl.pojo.Customer;
import com.cssl.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customerprovider")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    /**
     * 登录的方法
     *
     * @param cname
     * @param cpassword
     * @return
     */
    @RequestMapping("/login")
    public Customer login(String cname, String cpassword) {
        System.out.println("login");
        return customerService.queryByUsernameAndPassword(cname, cpassword);
    }

    /**
     * 查询用户名是否存在的方法
     *
     * @param cname
     * @return
     */
    @RequestMapping("/queryName")
    public boolean queryName(String cname) {
        Customer customer = customerService.queryByName(cname);
        System.out.println("customer" + customer);
        if (customer == null) {
            System.out.println("true");
            return true;
        }
        return false;
    }

    @RequestMapping("/regist")
    public String regist(@RequestBody Customer customer) {
        if (customerService.insert(customer) > 0) {
            return "true";
        }
        return "false";
    }
}

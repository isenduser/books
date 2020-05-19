package com.cssl.controller;

import com.cssl.client.CustomerClient;
import com.cssl.pojo.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/customerconsumer")
public class CustomerController {
    @Autowired
    private CustomerClient client;
    @RequestMapping("/dologin")
    public String dologin(){
        return "login";
    }

    @RequestMapping("/login")
    @ResponseBody
    public String login(String cname, String cpassword, HttpSession session){
        System.out.println("cname"+cname);
        Customer customer=client.login(cname,cpassword);
        if(customer==null){
            return "false";
        }
        session.setAttribute("user",customer);
        return "true";
    }

    @RequestMapping("/queryName")
    @ResponseBody
    public boolean queryName(String cname){
        return client.queryName(cname);
    }

    @RequestMapping("/toRegister")
    public String toRegister(){
        return "register";
    }

    @RequestMapping("/regist")
    public String regist(Customer customer){
        String flag=client.regist(customer);
        if(flag.equals("true")){
            return "login";
        }
        return "register";
    }
    @RequestMapping("/logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "login";
    }
}

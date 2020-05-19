package com.cssl.controller;

import com.cssl.pojo.Users;
import com.cssl.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/book")
public class SystemController {
    @Autowired
    private UsersService usersService;

    /**
     * 登录
     */
    @RequestMapping("/login")
    public String login(String username, String password, HttpSession session){
        Users users=usersService.queryByUsernameAndPassword(username, password);
        if(users==null){
            return "redirect:/login.html";
        }
        session.setAttribute("users",users);
        System.out.println(users.toString());
        return "index";
    }
    /**
     * 跳转到首页
     * @return
     */
    @RequestMapping("/index")
    public String index(){
        return "index";
    }

    /**
     * 加载welcome 页面
     * @return
     */
    @RequestMapping("/bookList")
    public String welcome(){
        return "bookList";
    }


    /**
     * 加载customerList页面
     */
    @RequestMapping("/customerList")
    public String customerList(){
        return "customerList";
    }

    /**
     * 加载orderList页面
     */
    @RequestMapping("/orderList")
    public String orderList(){
        return "orderList";
    }
    /**
     * bookModify
     */
    @RequestMapping("/bookModify")
    public String bookModify(){
        return "bookModify";
    }

    /**
     * customerModify
     */
    @RequestMapping("/customerModify")
    public String customerModify(){
        return "customerModify";
    }

    /**
     * customerAdd
     */
    @RequestMapping("/customerAdd")
    public String customerAdd(){
        return "customerAdd";
    }

    @RequestMapping("/bookAdd")
    public String bookAdd(){
        return "bookAdd";
    }

}

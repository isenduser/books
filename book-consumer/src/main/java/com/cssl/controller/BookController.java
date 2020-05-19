package com.cssl.controller;

import com.cssl.client.BookClient;
import com.cssl.pojo.Books;
import com.cssl.pojo.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/bookconsumer")
public class BookController {
    @Autowired
    private BookClient client;

    /**
     * 首页展示
     * @param model
     * @return
     */
    @RequestMapping("/queryBook")
    public String queryBook(Model model){
        List<Type> list=client.queryBook();
        HashMap maps= new HashMap<String,Object>();
        maps.put("pageIndex",0);
        maps.put("pageSize",5);
        Map<String,Object> map=client.queryByType(maps);
        System.out.println(".........");
        model.addAttribute("list",list);
        model.addAttribute("map",map);
        return "homePage";
    }

    /**
     * 根据类型查询
     * @param map
     * @return
     */
    @RequestMapping("/queryByType")
    @ResponseBody
    public Map<String,Object> queryByType(@RequestParam Map<String,Object> map){
        return client.queryByType(map);
    }

    /**
     * 查看书籍详情
     * @param bid
     * @param model
     * @return
     */
    @RequestMapping("/showBookDetails")
    public String queryById(Integer bid,Model model){
        Books books=client.queryById(bid);
        if(null==books){
            return "error";
        }
        model.addAttribute("book",books);
        return "bookDetails";
    }

    /**
     * 获取好书推荐
     * @return
     */
    @RequestMapping("/getGood")
    @ResponseBody
    public List<Books> getGood(){
        return client.getGood();
    }

    /**
     * 获取新书推荐
     */
    @RequestMapping("/getNewBookList")
    @ResponseBody
    public List<Books> getNewsBookList(){
        return client.getNewBookList();
    }

    /**
     * 搜索框
     */
    @RequestMapping("/search")
    public String search(String name,Model model){
        System.out.println("search........"+name);
        List<Books> list=client.searchByName(name);
        model.addAttribute("list",list);
        model.addAttribute("name",name);
        return "search";
    }
}

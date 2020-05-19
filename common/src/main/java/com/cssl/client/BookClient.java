package com.cssl.client;

import com.cssl.pojo.Books;
import com.cssl.pojo.Type;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@FeignClient(name="book-provider")
public interface BookClient {
    @RequestMapping("/bookprovider/queryBook")
    public List<Type> queryBook();
    @RequestMapping("/bookprovider/queryByType")
    public Map<String,Object> queryByType(@RequestParam Map<String, Object> map);
    @RequestMapping("/bookprovider/queryById")
    public Books queryById(@RequestParam Integer bid);
    @RequestMapping("/bookprovider/getGood")
    public List<Books> getGood();
    @RequestMapping("/bookprovider/getNewBookList")
    public List<Books> getNewBookList();
    /*@RequestMapping("/bookprovider/solrsearch")
    public List<Books> search(@RequestParam String name);*/
    @RequestMapping("/bookprovider/searchByName")
    public List<Books> searchByName(@RequestParam String name);
}

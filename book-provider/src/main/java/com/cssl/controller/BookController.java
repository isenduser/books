package com.cssl.controller;

import com.cssl.pojo.Books;
import com.cssl.pojo.Type;
import com.cssl.service.BookService;
import com.cssl.util.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookprovider")
public class BookController {
    @Autowired
    private BookService service;

    /*@Resource
    private SolrTemplate solrTemplate;*/

    /*@PostConstruct
    public void init(){
        List<Books> list=service.queryAllBooks();
        this.solrTemplate.saveBeans("books",list);
        this.solrTemplate.commit("books");
        System.out.println("solr..init..");
    }*/
    @RequestMapping("/queryBook")
    public List<Type> queryBook(){
        return service.queryAll();
    }
    @RequestMapping("/queryByType")
    public Map<String,Object> queryByType(@RequestParam Map<String,Object> map){
        String pageNo=(String) map.get("pageNo");
        if(pageNo==null){
            pageNo="1";

        }
        Integer pageSize=10;
        Integer pageIndex=Integer.parseInt(pageNo);
        map.put("pageIndex",(pageIndex-1)*pageSize);
        int count=service.queryCount(map);
        Page page=new Page();
        page.setPageNo(pageIndex);
        page.setSize(pageSize);
        page.setCount(count);
        map.put("pageSize",pageSize);
        List<Books> list=service.queryByType(map);
        Map<String,Object> map1=new HashMap<>();
        map1.put("list",list);
        map1.put("page",page);
        return map1;
    }
    @RequestMapping("/queryById")
    public Books queryById(Integer bid){
        return service.queryById(bid);
    }
    @RequestMapping("/getGood")
    public List<Books> getGood(){
        return service.getGood();
    }
    @RequestMapping("/getNewBookList")
    public List<Books> getNewBookList(){
        return service.getNewBooks();
    }
   /* @RequestMapping("/solrsearch")
    public List<Books> solrsearch(String name){
        Query query = new SimpleQuery("*:*");
        //条件 模糊查询  is等值查询
        Criteria cri = new Criteria("bname").contains(name);
        //cri = cri.and("empno").between(1,24);
        query.addCriteria(cri);
        //分页，默认1-10条
        //query.setOffset(0L);
        //query.setRows(3);
        //排序
        query.addSort(Sort.by(Sort.Direction.DESC,"bid"));

        ScoredPage<Books> page =solrTemplate.queryForPage("books",query,Books.class);
       *//* for (Books e : page.getContent()){
            System.out.println(e.getEmpno()+"\t"+e.getEname());
        }*//*
        System.out.println("总记录："+page.getTotalElements());
        System.out.println("总页数："+page.getTotalPages());
        return page.getContent();
    }*/
    @RequestMapping("/searchByName")
    public List<Books> searchByName(String name){
        return service.searchByName(name);
    }
}

package com.cssl.service;

import com.cssl.pojo.Books;
import com.cssl.pojo.Type;

import java.util.List;
import java.util.Map;

public interface BookService {
    public List<Type> queryAll();
    public List<Books> queryByType(Map<String,Object> map);
    public int queryCount(Map<String,Object> map);
    public Books queryById(Integer bid);
    public List<Books> getGood();
    public List<Books> getNewBooks();
    public List<Books>  queryAllBooks();
    public List<Books> searchByName(String name);
}

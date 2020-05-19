package com.cssl.service.impl;

import com.cssl.dao.BookDao;
import com.cssl.pojo.Books;
import com.cssl.pojo.Type;
import com.cssl.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public List<Type> queryAll() {
        return bookDao.queryAll();
    }

    @Override
    public List<Books> queryByType(Map<String, Object> map) {
        return bookDao.queryByType(map);
    }

    @Override
    public int queryCount(Map<String, Object> map) {
        return bookDao.queryCount(map);
    }

    @Override
    public Books queryById(Integer bid) {
        return bookDao.queryById(bid);
    }

    @Override
    public List<Books> getGood() {
        return bookDao.getGood();
    }

    @Override
    public List<Books> getNewBooks() {
        return bookDao.getNewBooks();
    }

    @Override
    public List<Books> queryAllBooks() {
        return bookDao.queryAllBooks();
    }

    @Override
    public List<Books> searchByName(String name) {
        String bname="%"+name+"%";
        return bookDao.searchByName(bname);
    }


}

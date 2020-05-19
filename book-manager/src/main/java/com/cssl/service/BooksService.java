package com.cssl.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cssl.pojo.Books;

import java.util.List;

public interface BooksService extends IService<Books> {
    public List<Books> queryBooks(Integer page, Integer limit);
    public Integer queryCount();
    public int updateBook(Books books);
    public int addBooks(Books books);
    public int deleteBooksById(Integer bid);
}

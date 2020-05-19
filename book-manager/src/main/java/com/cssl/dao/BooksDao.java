package com.cssl.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.cssl.pojo.Books;

import java.util.List;

public interface BooksDao extends BaseMapper<Books> {
    public List<Books> queryBooks(Integer page,Integer limit);
    public int updateBook(Books books);
    public int addBooks(Books books);
    public int deleteBooks(Integer bid);
}

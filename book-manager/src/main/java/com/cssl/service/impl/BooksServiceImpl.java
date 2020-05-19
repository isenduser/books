package com.cssl.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cssl.dao.BooksDao;
import com.cssl.pojo.Books;
import com.cssl.service.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BooksServiceImpl extends ServiceImpl<BooksDao, Books> implements BooksService {
    @Autowired
    private BooksDao booksDao;

    @Override
    public List<Books> queryBooks(Integer page, Integer limit) {

        return booksDao.queryBooks(page,limit);
    }

    @Override
    public Integer queryCount() {
        return booksDao.selectCount(new QueryWrapper<>());
    }

    @Override
    public int updateBook(Books books) {
        return booksDao.updateBook(books);
    }

    @Override
    public int addBooks(Books books) {
        return booksDao.addBooks(books);
    }

    @Override
    public int deleteBooksById(Integer bid) {
        return booksDao.deleteBooks(bid);
    }
}

package com.cssl.dao;

import com.cssl.pojo.Books;
import com.cssl.pojo.Shop;

import java.util.List;

public interface ShopDao {
    public int insert(Shop shop);
    public Shop queryBid(Integer bid,Integer cid);
    public int updateByBid(Shop shop);
    //查询当前用户购物车下书的数量
    public int queryBookCount(Integer cid);
    //查询当前用户购物车中的所有书
    public List<Books> queryAllBook(Integer cid);

    public List<Shop> queryAllShop(Integer cid);

    public int deleteShop(Integer cid);

    public int deleteByBookNo(Integer cid,Integer bid);

    public int deleteByBookNos(Integer cid,List<Integer> list);
}

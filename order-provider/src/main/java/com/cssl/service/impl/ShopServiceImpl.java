package com.cssl.service.impl;

import com.cssl.dao.ShopDao;
import com.cssl.pojo.Books;
import com.cssl.pojo.Shop;
import com.cssl.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ShopServiceImpl implements ShopService {
    @Autowired
    private ShopDao shopDao;

    @Override
    public int add(Shop shop) {
        Shop shop1 = shopDao.queryBid(shop.getBid(), shop.getCid());
        if (shop1 == null) {
            return shopDao.insert(shop);
        }
        return shopDao.updateByBid(shop);
    }

    @Override
    public int queryBookCount(Integer cid) {
        return shopDao.queryBookCount(cid);
    }

    @Override
    public List<Books> queryAllBook(Integer cid) {
        return shopDao.queryAllBook(cid);
    }

    @Override
    public List<Shop> queryAllShop(Integer cid) {
        return shopDao.queryAllShop(cid);
    }

    @Override
    public int deleteShop(Integer cid) {
        return shopDao.deleteShop(cid);
    }

    @Override
    public int deleteByBookNo(Integer cid, Integer bid) {
        return shopDao.deleteByBookNo(cid, bid);
    }

    @Override
    public int deleteByBookNos(Integer cid, List<Integer> bids) {
        return shopDao.deleteByBookNos(cid, bids);
    }
}

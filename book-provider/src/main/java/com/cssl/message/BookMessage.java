package com.cssl.message;

import com.cssl.dao.BookDao;
import com.cssl.pojo.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookMessage {
    @Autowired
    private BookDao bookDao;

    @JmsListener(destination = "book")
    public void receive(List<OrderDetail> list) {
        for (OrderDetail orderDetail : list) {
            Integer bid = orderDetail.getBooks().getBid();
            Integer count = orderDetail.getAmount();
            bookDao.updateBookNum(bid, count);
        }
        System.out.println("修改库存成功");
    }
}

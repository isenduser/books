package com.cssl.message;

import com.cssl.pojo.OrderDetail;

import java.util.List;

public interface IMessageOrderService {
    public void sendToBook(List<OrderDetail> list);

}

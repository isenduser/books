package com.cssl.message;

import com.cssl.pojo.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageOrderServiceImpl implements IMessageOrderService {
    @Autowired
    private JmsMessagingTemplate jmsTemplate;

    @Override
    public void sendToBook(List<OrderDetail> list) {
        this.jmsTemplate.convertAndSend("book", list);
    }
}

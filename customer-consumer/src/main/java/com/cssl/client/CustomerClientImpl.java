package com.cssl.client;

import com.cssl.pojo.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerClientImpl implements CustomerClient {
    @Override
    public Customer login(String cname, String cpassword) {
        return null;
    }

    @Override
    public boolean queryName(String cname) {
        return false;
    }

    @Override
    public String regist(Customer customer) {
        return null;
    }
}

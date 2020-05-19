package com.cssl.service;

import com.cssl.pojo.Customer;

public interface CustomerService {
    public Customer queryByName(String cname);

    public Customer queryByUsernameAndPassword(String cname,String cpassword);
    public int insert(Customer customer);
}

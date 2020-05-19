package com.cssl.dao;

import com.cssl.pojo.Customer;

public interface CustomerDao {
    public Customer queryByName(String cname);

    public int insert(Customer customer);
}

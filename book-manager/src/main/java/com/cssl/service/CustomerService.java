package com.cssl.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cssl.pojo.Customer;

import java.util.List;

public interface CustomerService extends IService<Customer> {
    public List<Customer> queryCustomer(Integer page,Integer limit);
    public Integer queryCount();
    public int updateCustomer(Customer customer);
    public int insertCustomer(Customer customer);
    public int deleteCustomerById(Integer cid);
}

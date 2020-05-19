package com.cssl.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cssl.pojo.Books;
import com.cssl.pojo.Customer;

import java.util.List;

public interface CustomerDao extends BaseMapper<Customer> {
    public List<Customer> queryCustomer(Integer page,Integer limit);
    public int updateCustomer(Customer customer);
    public int insertCustomer(Customer customer);
    public int deleteCustomer(Integer cid);
}

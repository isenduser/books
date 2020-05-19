package com.cssl.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cssl.dao.CustomerDao;
import com.cssl.pojo.Customer;
import com.cssl.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class CustomerServiceImpl extends ServiceImpl<CustomerDao, Customer> implements CustomerService {
    @Autowired
    private CustomerDao customerDao;

    @Override
    public List<Customer> queryCustomer(Integer page, Integer limit) {
        return customerDao.queryCustomer(page,limit);
    }

    @Override
    public Integer queryCount() {

        return customerDao.selectCount(new QueryWrapper<>());
    }

    @Override
    public int updateCustomer(Customer customer) {
        return customerDao.updateCustomer(customer);
    }

    @Override
    public int insertCustomer(Customer customer) {
        return customerDao.insertCustomer(customer);
    }

    @Override
    public int deleteCustomerById(Integer cid) {
        return customerDao.deleteCustomer(cid);
    }

}

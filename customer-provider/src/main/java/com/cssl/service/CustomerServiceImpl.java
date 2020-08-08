package com.cssl.service;

import com.cssl.dao.CustomerDao;
import com.cssl.pojo.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerDao customerDao;

    @Override
    public Customer queryByName(String cname) {
        return customerDao.queryByName(cname);
    }

    @Override
    public Customer queryByUsernameAndPassword(String cname, String cpassword) {
        Customer customer = null;
        Customer c1 = customerDao.queryByName(cname);
        if (c1 != null) {
            if (c1.getCpassword().equals(cpassword)) {
                return c1;
            }
        }
        return customer;
    }

    @Override
    public int insert(Customer customer) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        dateFormat.format(date);
        customer.setRegtime(date);
        return customerDao.insert(customer);
    }
}

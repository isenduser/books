package com.cssl.client;

import com.cssl.pojo.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name="customer-provider",fallback=CustomerClientImpl.class)
public interface CustomerClient {
    @RequestMapping("/customerprovider/login")
    public Customer login(@RequestParam String cname,@RequestParam String cpassword);
    @RequestMapping("/customerprovider/queryName")
    public boolean queryName(@RequestParam String cname);
    @RequestMapping("/customerprovider/regist")
    public String regist(Customer customer);
}

package com.cssl.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cssl.pojo.Users;

public interface UsersService extends IService<Users> {
    public Users queryByUsernameAndPassword(String username,String password);
}

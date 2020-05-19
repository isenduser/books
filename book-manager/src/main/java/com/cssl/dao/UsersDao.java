package com.cssl.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cssl.pojo.Users;

public interface UsersDao extends BaseMapper<Users> {
    public Users queryByUsernameAndPassword(String username,String password);
}

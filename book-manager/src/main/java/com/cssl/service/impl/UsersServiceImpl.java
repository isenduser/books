package com.cssl.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cssl.dao.UsersDao;
import com.cssl.pojo.Users;
import com.cssl.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UsersServiceImpl extends ServiceImpl<UsersDao, Users> implements UsersService {
    @Autowired
    private UsersDao usersDao;


    @Override
    public Users queryByUsernameAndPassword(String username, String password) {
        return usersDao.queryByUsernameAndPassword(username, password);
    }
}

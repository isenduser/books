package com.cssl.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cssl.dao.TypeDao;
import com.cssl.pojo.Type;

import java.util.List;

public interface TypeService extends IService<Type>{
    public List<Type> queryAllType();
}

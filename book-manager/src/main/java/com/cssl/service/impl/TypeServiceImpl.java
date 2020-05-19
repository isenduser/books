package com.cssl.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cssl.dao.TypeDao;
import com.cssl.pojo.Type;
import com.cssl.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class TypeServiceImpl extends ServiceImpl<TypeDao, Type> implements TypeService {

    @Autowired
    private TypeDao typeDao;
    @Override
    public List<Type> queryAllType() {
        return typeDao.queryAllType();
    }
}

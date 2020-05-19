package com.cssl.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cssl.pojo.Type;

import java.util.List;

public interface TypeDao extends BaseMapper<Type> {
    public List<Type> queryAllType();
}

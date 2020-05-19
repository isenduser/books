package com.cssl.pojo;

import lombok.Data;

/**
 * 临时购物车实体类
 */
@Data
public class Shop {
    private Integer ordercount;//订购数量
    private Double sprice;//总价

    private Integer bid;//图书
    private Integer cid;//客户

    private Books books;


}

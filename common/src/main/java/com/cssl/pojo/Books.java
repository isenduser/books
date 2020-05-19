package com.cssl.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 图书实体类
 */
@Data
public class Books implements Serializable {
    private String id;
    private Integer bid;
    private String bname;//图书名字
    private String bcontent;//图书简介
    private Double bookPrice;//订购单价
    private Double price;//销售单价
    private String author;//作者
    private String publishName;//出版社名称
    private Integer dealmount;//销量
    private Integer bookNum;//图书库存数
    private String picPath;//图片路径
    private Double discount;//折扣
    private Type type;//分类
    private Date publishDate;//出版时间

}

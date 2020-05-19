package com.cssl.pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
public class Books {
    @TableId
    private Integer bid;
    private String bname;//图书名字
    private String bcontent;//图书简介
    @TableField("bookPrice")
    private Double bookPrice;//订购单价
    private Double price;//销售单价
    private String author;//作者
    @TableField("publishName")
    private String publishName;//出版社名称
    private Integer dealmount;//销量
    @TableField("bookNum")
    private Integer bookNum;//图书库存数
    @TableField("picPath")
    private String picPath;//图片路径
    @TableField(exist = false)
    private Type type;//分类
    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date publishDate;//出版时间
}

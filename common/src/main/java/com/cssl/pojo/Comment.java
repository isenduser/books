package com.cssl.pojo;

import lombok.Data;

import java.util.Date;

/**
 * 实体类评论类
 */
@Data
public class Comment {
    private Integer commentid;
    private String commentcontent;//评论内容
    private Date commentdate;//评论时间
    private Books books;//评论图书
    private Customer customer;//评论人

}

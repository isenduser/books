package com.cssl.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 实体类客户用户表
 */
@Data
public class Customer implements Serializable {
    private Integer cid;
    private String cname;//用户名
    private String cpassword;//密码
    private int sex;//性别,0女，1男
    private String tel;//电话
    private Date regtime;//注册时间
    private String name;//真实姓名
    private String address;//地址


}

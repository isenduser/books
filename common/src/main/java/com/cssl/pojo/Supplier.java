package com.cssl.pojo;

import lombok.Data;

/**
 * 实体类供应商
 */
@Data
public class Supplier {
    private Integer sid;
    private String sname;//供应商名称
    private String person;//联系人
    private String address;//地址
    private String phone;//联系人号码


}

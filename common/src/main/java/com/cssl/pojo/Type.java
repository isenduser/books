package com.cssl.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 图书类型实体类
 */
@Data
public class Type  implements Serializable {
    private Integer tid;
    private String tname;//图书类型名
    private List<Books> list;


}

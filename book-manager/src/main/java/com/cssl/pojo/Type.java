package com.cssl.pojo;

import lombok.Data;

import java.util.List;
@Data
public class Type {
    private Integer tid;
    private String tname;//图书类型名
    private List<Books> list;
}

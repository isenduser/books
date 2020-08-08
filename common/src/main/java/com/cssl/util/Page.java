package com.cssl.util;

//页面分类工具类
public class Page {
    private int pageNo = 1;//当前页码
    private int count;//总数据数
    private int size;//页面容量
    private int pageCount;//页面总数

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        if (count % size == 0) {
            pageCount = count / size;
        } else {
            pageCount = count / size + 1;
        }
        this.count = count;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

}


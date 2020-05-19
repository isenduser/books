package com.cssl.dto;

public class Result {
    //200代表成功，400代表失败
    private Integer code;//状态码

    private String status;//状态码对应的信息

    private String message;//返回的提示信息

    private Object data; //返回的数据 这个可以改成Map,方法的入参变成可变参数，内部循环添加


    public static Result success(String message) {
        Result result = new Result(200,"处理成功！", message);
        return result;
    }
    public static Result success(String message, Object data) {
        Result result = new Result(200,"处理成功！", message, data);
        return result;
    }

    public static Result fail(String message) {
        Result result = new Result(400,"处理失败！", message);
        return result;
    }
    public static Result fail(String message, Object data) {
        Result result = new Result(400,"处理失败！", message, data);
        return result;
    }

    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }


    private Result(Integer code, String status, String message, Object data) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }
    private Result(Integer code, String status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }

    private Result() {
    }

    @Override
    public String toString() {
        return "Result [code=" + code + ", status=" + status + ", message=" + message
                + ", data=" + data + "]";
    }
}

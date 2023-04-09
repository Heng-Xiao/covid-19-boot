package com.xiao.covids.util;

/**
 * @author xiao
 * @Description:
 * @create 2022-06-11 19:11
 */
public class Res {

//    protected final static Res OK = new Res( HttpStatus.OK.value(),"成功","");

    private Integer code;
    private String msg;
    private String message;
    /**
     * 返回正常信息时，将数据放入该字段
     */
    private Object content;

    /**
     * 成功响应并需要返回数据时，使用该构造方法
     * @param data
     */
    protected Res(Object data) {
        this.code = 200;
        this.msg = "成功";
        this.message = "success";
        this.content = data;
    }

    Res(Integer code,String msg, String message){
        this.msg = msg;
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public String getMessage() {
        return message;
    }

    public Object getContent() {
        return content;
    }

}

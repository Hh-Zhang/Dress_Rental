package com.dress_rental.util;

import java.util.Collection;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2019/9/22
 * @Description:com.teacher_evaluation.demo.util
 */
public class Result {

    private int code;//状态码（0成功，失败其他）
    private String msg;//错误提示
    private int count;//总数（分页）
    private Object data;//返回实体对象的集合

    /**
     * 用于不需要返回数据的请求，成功时返回这个
     * @return
     */
    public Result success() {
        this.code=0;
        return this;
    }

    /**
     * 用于需要返回数据的请求，成功时返回这个
     * @param data
     * @return
     */
    public Result success(Object data) {
        this.code=0;
        this.data = data;
        return this;
    }

    /**
     * 用于需要返回请求的提示
     * @param msg
     * @return
     */
    public Result success(String msg) {
        this.code=0;
        this.msg = msg;
        return this;
    }

    /**
     * 用于不需要返回数据，但是请求出现错误或者失败的情况，返回这个
     * @return
     */
    public Result failure() {
        return this;
    }

    /**
     * 用于需要返回数据，但是请求失败的情况返回这个，
     * 比如参数错误导致的500错误，请求数据为空等
     * @param code
     * @param message
     * @return
     */
    public Result failure(int code, String message) {
        this.code=code;
        this.msg=message;
        return this;
    }
/**
 * 分页处理
 */


    /**
     * 用于分页查询时放入页数信息
     * @param count
     */
    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "Result{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", count=" + count +
                ", data=" + data +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code){
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg){
        this.msg = msg;
    }

    public int getCount() {
        return count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data){
        this.data = data;
    }

    public Result(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Result() {
    }
}

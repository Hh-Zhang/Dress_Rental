package com.dress_rental.entities;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/1/14
 * @Description:com.dress_rental.entities
 */
public class User {
    private Integer Id;
    private Integer idd;
    private String username;
    private String realname;
    private String password;
    private String sex;
    private String phonenum;
    private String photo;
    private String type;
    private String status;
    private String receiveAdd;
    private String addTime;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getIdd() {
        return idd;
    }

    public void setIdd(Integer idd) {
        this.idd = idd;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPhonenum() {
        return phonenum;
    }

    public void setPhonenum(String phonenum) {
        this.phonenum = phonenum;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReceiveAdd() {
        return receiveAdd;
    }

    public void setReceiveAdd(String receiveAdd) {
        this.receiveAdd = receiveAdd;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    @Override
    public String toString() {
        return "User{" +
                "Id=" + Id +
                ", idd=" + idd +
                ", username='" + username + '\'' +
                ", realname='" + realname + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", phonenum='" + phonenum + '\'' +
                ", photo='" + photo + '\'' +
                ", type='" + type + '\'' +
                ", status='" + status + '\'' +
                ", receiveAdd='" + receiveAdd + '\'' +
                ", addTime='" + addTime + '\'' +
                '}';
    }
}

package com.dress_rental.entities;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/12
 * @Description:com.dress_rental.entities
 */
public class ShopCart {
    private Integer idd;
    private  Integer Id;
    private  Integer userId;
    private  Integer weddingId;
    private  String weddingName;
    private  String weddingStyle;
    private  double weddingDeposit;
    private  double weddingPrice;
    private  Integer rentalDays;

    public Integer getIdd() {
        return idd;
    }

    public void setIdd(Integer idd) {
        this.idd = idd;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getWeddingId() {
        return weddingId;
    }

    public void setWeddingId(Integer weddingId) {
        this.weddingId = weddingId;
    }

    public String getWeddingName() {
        return weddingName;
    }

    public void setWeddingName(String weddingName) {
        this.weddingName = weddingName;
    }

    public String getWeddingStyle() {
        return weddingStyle;
    }

    public void setWeddingStyle(String weddingStyle) {
        this.weddingStyle = weddingStyle;
    }

    public double getWeddingDeposit() {
        return weddingDeposit;
    }

    public void setWeddingDeposit(double weddingDeposit) {
        this.weddingDeposit = weddingDeposit;
    }

    public double getWeddingPrice() {
        return weddingPrice;
    }

    public void setWeddingPrice(double weddingPrice) {
        this.weddingPrice = weddingPrice;
    }

    public Integer getRentalDays() {
        return rentalDays;
    }

    public void setRentalDays(Integer rentalDays) {
        this.rentalDays = rentalDays;
    }
}

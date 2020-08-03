package com.dress_rental.entities;

public class Wedding {
    private  Integer Id;

    private String weddingName;

    private String weddingPicture;

    private String weddingStyle;

    private String weddingPrice;

    private String weddingDeposit;

    private String rentalStatus;
    
    private String promotion;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getWeddingName() {
        return weddingName;
    }

    public void setWeddingName(String weddingName) {
        this.weddingName = weddingName;
    }

    public String getWeddingPicture() {
        return weddingPicture;
    }

    public void setWeddingPicture(String weddingPicture) {
        this.weddingPicture = weddingPicture;
    }

    public String getWeddingStyle() {
        return weddingStyle;
    }

    public void setWeddingStyle(String weddingStyle) {
        this.weddingStyle = weddingStyle;
    }

    public String getWeddingPrice() {
        return weddingPrice;
    }

    public void setWeddingPrice(String weddingPrice) {
        this.weddingPrice = weddingPrice;
    }

    public String getWeddingDeposit() {
        return weddingDeposit;
    }

    public void setWeddingDeposit(String weddingDeposit) {
        this.weddingDeposit = weddingDeposit;
    }

    public String getRentalStatus() {
        return rentalStatus;
    }

    public void setRentalStatus(String rentalStatus) {
        this.rentalStatus = rentalStatus;
    }

    public String getPromotion() {
        return promotion;
    }

    public void setPromotion(String promotion) {
        this.promotion = promotion;
    }
}
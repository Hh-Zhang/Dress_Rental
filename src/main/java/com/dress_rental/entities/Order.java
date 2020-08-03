package com.dress_rental.entities;

import java.util.Date;

public class Order {
    private Integer Id;

    private String orderNo;

    private Date orderDate;

    private Integer userId;

	private Integer weddingId;

    private Integer dealStatus;
    
    private Integer returnStatus;
    
    private Integer logisticsStatus;
    
    private String username;
    
    private String receiveAdd;
    
    private String weddingName;
    
    private String weddingAdd;
    
    private String weddingStyle;
    
    private String weddingPrice;

    private String weddingDeposit;

    private Integer rentalDays;

    private String topri;

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
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

	public Integer getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(Integer dealStatus) {
		this.dealStatus = dealStatus;
	}

	public Integer getReturnStatus() {
		return returnStatus;
	}

	public void setReturnStatus(Integer returnStatus) {
		this.returnStatus = returnStatus;
	}

	public Integer getLogisticsStatus() {
		return logisticsStatus;
	}

	public void setLogisticsStatus(Integer logisticsStatus) {
		this.logisticsStatus = logisticsStatus;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getReceiveAdd() {
		return receiveAdd;
	}

	public void setReceiveAdd(String receiveAdd) {
		this.receiveAdd = receiveAdd;
	}

	public String getWeddingName() {
		return weddingName;
	}

	public void setWeddingName(String weddingName) {
		this.weddingName = weddingName;
	}

	public String getWeddingAdd() {
		return weddingAdd;
	}

	public void setWeddingAdd(String weddingAdd) {
		this.weddingAdd = weddingAdd;
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

	public Integer getRentalDays() {
		return rentalDays;
	}

	public void setRentalDays(Integer rentalDays) {
		this.rentalDays = rentalDays;
	}

	public String getTopri() {
		return topri;
	}

	public void setTopri(String topri) {
		this.topri = topri;
	}
}
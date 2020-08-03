package com.dress_rental.entities;

import java.util.Date;

public class ReturnWedding {
    private Integer iid;

    private String retexpressNum;

    private Date returnDate;

    private Integer userId;
    
	private Integer orderId;

	private  Integer weddingId;
	
	private String orderNo;
	
	private Integer idd;

	public Integer getIid() {
		return iid;
	}

	public void setIid(Integer iid) {
		this.iid = iid;
	}

	public String getRetexpressNum() {
		return retexpressNum;
	}

	public void setRetexpressNum(String retexpressNum) {
		this.retexpressNum = retexpressNum;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getWeddingId() {
		return weddingId;
	}

	public void setWeddingId(Integer weddingId) {
		this.weddingId = weddingId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getIdd() {
		return idd;
	}

	public void setIdd(Integer idd) {
		this.idd = idd;
	}
}
package com.dress_rental.service;

import com.dress_rental.entities.Order;
import com.dress_rental.entities.User;

import java.util.List;
import java.util.Map;

public interface OrderService {

	int addOrder(Order or);

	Order findOrder(String id);

	List<Map<String, Object>> qrylistOrder(Map<String,Object> map);

	List<Map<String, Object>> qrylistUserOrder(String id);

	List<Map<String, Object>> qryUserOrderDetail(String id);

	List<Map<String, Object>> qryUnsendOrder(String id,String logisticsStatus);

	List<Map<String, Object>> qryUngainOrder(String id,String logisticsStatus);

	List<Map<String, Object>> qrygainOrder(String id,String logisticsStatus);

	List<Map<String, Object>> qryUnreturnOrder(String id,String logisticsStatus,String returnStatus);

	Integer editOrder(Order order);


	Integer confReturn(String id);

	Integer confGain(String id);

	Integer removeBackOrderInfoByIds(String id);
}
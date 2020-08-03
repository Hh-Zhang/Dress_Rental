package com.dress_rental.dao;

import com.dress_rental.entities.Order;
import com.dress_rental.entities.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface OrderDao {

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

	Integer removeBackOrderInfoByIds(String[] id);
}
package com.dress_rental.service.impl;

import com.dress_rental.dao.OrderDao;
import com.dress_rental.entities.Order;
import com.dress_rental.entities.User;
import com.dress_rental.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/2/17
 * @Description:com.dress_rental.service.impl
 */
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;
    @Override
    public int addOrder(Order or) {
        return orderDao.addOrder(or);
    }

    @Override
    public Order findOrder(String id) {
        return orderDao.findOrder(id);
    }

    @Override
    public List<Map<String, Object>> qrylistOrder(Map<String,Object> map) {
        return orderDao.qrylistOrder(map);
    }

    @Override
    public List<Map<String, Object>> qrylistUserOrder(String id) {
        return orderDao.qrylistUserOrder(id);
    }

    @Override
    public List<Map<String, Object>> qryUserOrderDetail(String id) {
        return orderDao.qryUserOrderDetail(id);
    }

    @Override
    public List<Map<String, Object>> qryUnsendOrder(String id,String logisticsStatus) {
        return orderDao.qryUnsendOrder(id,logisticsStatus);
    }

    @Override
    public List<Map<String, Object>> qryUngainOrder(String id, String logisticsStatus) {
        return orderDao.qryUngainOrder(id,logisticsStatus);
    }

    @Override
    public List<Map<String, Object>> qrygainOrder(String id, String logisticsStatus) {
        return orderDao.qrygainOrder(id,logisticsStatus);
    }

    @Override
    public List<Map<String, Object>> qryUnreturnOrder(String id,String logisticsStatus, String returnStatus) {
        return orderDao.qryUnreturnOrder(id,logisticsStatus,returnStatus);
    }

    @Override
    public Integer editOrder(Order order) {
        return orderDao.editOrder(order);
    }

    @Override
    public Integer confReturn(String id) {
        return orderDao.confReturn(id);
    }

    @Override
    public Integer confGain(String id) {
        return orderDao.confGain(id);
    }

    @Override
    public Integer removeBackOrderInfoByIds(String id) {
        return orderDao.removeBackOrderInfoByIds(id.split(","));
    }
}

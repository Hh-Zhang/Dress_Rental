package com.dress_rental.service.impl;

import com.dress_rental.dao.WeddingDao;
import com.dress_rental.entities.Wedding;
import com.dress_rental.service.WeddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/2/14
 * @Description:com.dress_rental.service.impl
 */
@Service
public class WeddingServiceImpl implements WeddingService {
    @Autowired
    private WeddingDao weddingDao;

    @Override
    public List<Map<String, Object>> qrylistWedding(Map<String, Object> map) {
        return weddingDao.qrylistWedding(map);
    }

    @Override
    public List<Wedding> qrypreWedding(String weddingStyle,String id) {
        return weddingDao.qrypreWedding(weddingStyle,id);
    }

    @Override
    public List<Map<String, Object>> qrylistFaddish(Map<String, Object> map) {
        System.out.println(map.get("rentalStatus"));
        return weddingDao.qrylistFaddish(map);
    }

    @Override
    public int addWeddingInfo(Wedding we) {
        return weddingDao.addWeddingInfo(we);
    }

    @Override
    public Integer editWeddingInfo(Wedding wed) {
        return weddingDao.editWeddingInfo(wed);
    }

    @Override
    public int removeWeddingInfoByIds(List<Integer> list) {
        return weddingDao.removeWeddingInfoByIds(list);
    }

    @Override
    public List<Wedding> qrylistLease(Wedding wed) {
        return weddingDao.qrylistLease(wed);
    }

    @Override
    public int editpromInfo(Wedding wed) {
        return weddingDao.editpromInfo(wed);
    }

    @Override
    public int deletepromInfo(String Id) {
        return weddingDao.deletepromInfoByIds(Id.split(","));
    }
}

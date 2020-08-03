package com.dress_rental.service;

import com.dress_rental.entities.Wedding;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/2/14
 * @Description:com.dress_rental.service
 */

public interface WeddingService {
    List<Map<String, Object>> qrylistWedding(Map<String, Object> map);
    List<Wedding> qrypreWedding(String weddingStyle,String id);
    List<Map<String, Object>> qrylistFaddish(Map<String, Object> map);

    int addWeddingInfo(Wedding we);

    Integer editWeddingInfo(Wedding wed);

    int removeWeddingInfoByIds(List<Integer> list);

    List<Wedding> qrylistLease(Wedding wed);
     int editpromInfo(Wedding wed);

     int deletepromInfo(String Id);
}

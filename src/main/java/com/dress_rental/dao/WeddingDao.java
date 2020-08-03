package com.dress_rental.dao;

import com.dress_rental.entities.Wedding;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface WeddingDao {

	List<Map<String, Object>> qrylistWedding(Map<String, Object> map);
	List<Wedding> qrypreWedding(String weddingStyle,String id);
	
	List<Map<String, Object>> qrylistFaddish(Map<String, Object> map);

	int addWeddingInfo(Wedding we);

	Integer editWeddingInfo(Wedding wed);

	int removeWeddingInfoByIds(List<Integer> list);

	List<Wedding> qrylistLease(Wedding wed);

	int editpromInfo(Wedding wed);

	int deletepromInfoByIds( String[] Id);

}
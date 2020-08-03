package com.dress_rental.dao;

import com.dress_rental.entities.ReturnWedding;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReturnWeddingDao {

	List<Map<String, Object>> qrylistbakwedding(Map<String,Object> map);

	Integer upBackwedding(ReturnWedding wed);

	int addBackwedding(ReturnWedding wed);

	int removeBackWeddingInfoByIds(List<Integer> list);
}
package com.dress_rental.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/26
 * @Description:com.dress_rental.dao
 */
@Mapper
public interface ReportDao {
    List<Map<String,Object>> qryReportList(Map<String,Object> map);
}

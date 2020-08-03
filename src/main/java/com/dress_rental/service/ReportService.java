package com.dress_rental.service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/26
 * @Description:com.dress_rental.service
 */
public interface ReportService {
    List<Map<String,Object>> qryReportList(Map<String,Object> map);
}

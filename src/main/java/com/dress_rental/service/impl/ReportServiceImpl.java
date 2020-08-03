package com.dress_rental.service.impl;

import com.dress_rental.dao.ReportDao;
import com.dress_rental.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/26
 * @Description:com.dress_rental.service.impl
 */
@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportDao reportDao;
    @Override
    public List<Map<String, Object>> qryReportList(Map<String,Object> map) {
        return reportDao.qryReportList(map);
    }
}

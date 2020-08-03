package com.dress_rental.controller;

import com.dress_rental.service.ReportService;
import com.dress_rental.util.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/26
 * @Description:com.dress_rental.controller
 */
@Controller
public class ReportController {
    @Autowired
    private ReportService reportService;

    @RequestMapping("/qryReportList")
    @ResponseBody
    public String qryReportList(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                @RequestParam(value = "limit", defaultValue = "15", required = false) Integer limit,String year, String month){
       System.out.println(limit);
        Map<String,Object> map=new HashMap<String,Object>();
        PageHelper.startPage(page,limit);
        map.put("year",year);
        map.put("month",month);
        PageInfo pageInfo=new PageInfo<>(reportService.qryReportList(map));
        JSONArray jsonArray=JSONArray.fromObject(pageInfo.getList());
        return jsonArray.toString();
}
    }

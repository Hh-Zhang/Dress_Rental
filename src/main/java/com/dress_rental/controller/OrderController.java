package com.dress_rental.controller;


import com.dress_rental.entities.Order;
import com.dress_rental.entities.User;
import com.dress_rental.service.OrderService;
import com.dress_rental.util.RandomUtil;
import com.dress_rental.util.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class OrderController {
//	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired
	private OrderService orderService;

// 提交订单，生成订单
    @RequestMapping("/addOrder")
	@ResponseBody
    public  int addOrder( Order or){
    	or.setOrderNo(RandomUtil.getRandomFileName());
        return orderService.addOrder(or);

    }



// 返回后台订单列表
	@RequestMapping(value = "/qrylistOrder")
	@ResponseBody
	public Result qrylistOrder(int page,int limit,String weddingName,String orderNo,String logisticsStatus) {
		Map<String,Object> map=new HashMap<String,Object>();
		PageHelper.startPage(page,limit);
		map.put("page",page);
		map.put("limit",limit);
		map.put("weddingName",weddingName);
		map.put("orderNo",orderNo);
		map.put("logisticsStatus",logisticsStatus);
		PageInfo pageInfo= new PageInfo<>(orderService.qrylistOrder(map));
		Result result=new Result();
		if(pageInfo != null) {
			result.setCode(0);
			result.setCount((int)pageInfo.getTotal());
			result.setData(pageInfo.getList());
			result.setMsg("获取订单成功！");
		}else {
			result.failure(-1, "获取订单异常");
		}
		return result;

	}

//	查询个人订单
	@RequestMapping("/qryMyUserOrder")
	@ResponseBody
	public String qrylistUserOrder(String id) {
		System.out.println("个人订单接口");
		System.out.println(id);
		List<Map<String, Object>> mapData = orderService.qrylistUserOrder(id);
		JSONArray jsonArray=JSONArray.fromObject(mapData);
		return jsonArray.toString();

	}
	//	查询个人订单详情
	@RequestMapping("/qryUserOrderDetail")
	@ResponseBody
	public String qryUserOrderDetail(String id) {
		List<Map<String, Object>> mapData = orderService.qryUserOrderDetail(id);
		JSONArray jsonArray=JSONArray.fromObject(mapData);
		return jsonArray.toString();

	}
	// 未发货订单查询
	@RequestMapping("/qryUnsendOrder")
	@ResponseBody
	public String qryUnsendOrder(String id,String logisticsStatus) {
		List<Map<String, Object>> mapData = orderService.qryUnsendOrder(id,logisticsStatus);
		JSONArray jsonArray=JSONArray.fromObject(mapData);
		return jsonArray.toString();

	}
	//未收货订单查询
	@RequestMapping("/qryUngainOrder")
	@ResponseBody
	public String qryUngainOrder(String id,String logisticsStatus) {
		List<Map<String, Object>> mapData = orderService.qryUngainOrder(id,logisticsStatus);
		JSONArray jsonArray=JSONArray.fromObject(mapData);
		return jsonArray.toString();
	}
	//已签收订单查询
	@RequestMapping("/qrygainOrder")
	@ResponseBody
	public String qrygainOrder(String id,String logisticsStatus) {
		List<Map<String, Object>> mapData = orderService.qrygainOrder(id,logisticsStatus);
		JSONArray jsonArray=JSONArray.fromObject(mapData);
		return jsonArray.toString();
	}
	//未归还订单查询
	@RequestMapping("/qryUnreturnOrder")
	@ResponseBody
	public String qryUnreturnOrder(String id,String logisticsStatus,String returnStatus) {
		List<Map<String, Object>> mapData = orderService.qryUnreturnOrder(id,logisticsStatus,returnStatus);
		JSONArray jsonArray=JSONArray.fromObject(mapData);
		return jsonArray.toString();
	}
    // 确认归还
    @RequestMapping("/confReturn")
    @ResponseBody
    public  Integer confReturn(String id){
        return orderService.confReturn(id);
    }

    // 确认收货
    @RequestMapping("/confGain")
    @ResponseBody
    public  Integer upOrderb(String id){
        return orderService.confGain(id);
    }
//处理订单，开始发货
    @RequestMapping("/editOrder")
    @ResponseBody
       public  Integer editOrder(Order order){
           return orderService.editOrder(order);
       }

//后台删除一条，批量删
	@RequestMapping("/delOrderInfo")
	@ResponseBody
	public Integer removeBackOrderInfoByIds(String id){
		return orderService.removeBackOrderInfoByIds(id);
	}
}

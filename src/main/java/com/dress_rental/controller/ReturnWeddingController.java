package com.dress_rental.controller;


import com.dress_rental.entities.ReturnWedding;
import com.dress_rental.service.ReturnWeddingService;
import com.dress_rental.util.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ReturnWeddingController {
//	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired
	private ReturnWeddingService returnWeddingService;
	/**
	 * 返回归还信息列表
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/qryreturnwedList")
	@ResponseBody
	public Result qrylistBackWedding(int page,int limit,String username, String retexpressNum) {
		System.out.println("查询婚纱归还接口");
		Map<String,Object> map=new HashMap<String,Object>();
		PageHelper.startPage(page,limit);
		map.put("page",page);
		map.put("limit",limit);
		map.put("username",username);
		map.put("retexpressNum",retexpressNum);
		PageInfo pageInfo= new PageInfo<>(returnWeddingService.qrylistbakwedding(map));
		Result result=new Result();
		if(pageInfo != null) {
			result.setCode(0);
			result.setCount((int)pageInfo.getTotal());
			result.setData(pageInfo.getList());
			result.setMsg("获取婚纱归还信息成功！");
		}else {
			result.failure(-1, "获取婚纱归还信息异常");
		}
		return result;

	}
    /**
	 *添加归还信息
	 */
    @RequestMapping("/addBackwedding")
       public  String addBackwedding(ReturnWedding wed){
    	int a = returnWeddingService.addBackwedding(wed);
        if(a>0){
            return "forward:/upOrderl?id="+wed.getOrderId()+"";
        }
        return "error";   
       }
    /**
   	 *修改归还信息
   	 */
    @RequestMapping("/upBackwedding")
    @ResponseBody
       public  int upBackwedding(ReturnWedding wed){
    	return returnWeddingService.upBackwedding(wed);

       }
    /**
     *删除归还资料
     */
     @RequestMapping("/delretwedInfo")
 	 @ResponseBody
    	public Map<String, Object> deleteBackWeddingInfo(String ids) {
    		Map<String, Object> map = new HashMap<String, Object>();
    		if (ids == null || ids.equals("")) {
    			map.put("success", 0);
    			map.put("msg", "无可删除功能");
    			return map;
    		} else {
    			String[] arr = ids.split(",");
    			List<Integer> list = new ArrayList<Integer>();
    			for (int i = 0; i < arr.length; i++) {
    				String item = arr[i];
    				if (item != null && !item.equals(""))
    					list.add(Integer.parseInt(item));
    			}
    			int result = returnWeddingService.removeBackWeddingInfoByIds(list);
    			map.put("success", result);
    			map.put("msg", "删除成功");
    			return map;
    		}
    	}
}

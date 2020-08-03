package com.dress_rental.controller;

import com.dress_rental.entities.User;
import com.dress_rental.entities.Wedding;
import com.dress_rental.service.WeddingService;
import com.dress_rental.util.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.logging.Logger;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/2/14
 * @Description:com.dress_rental.controller
 */
@Controller
public class WeddingController{
//    private Logger logger = Logger.getLogger(String.valueOf(this.getClass()));
    @Autowired
    private WeddingService weddingService;
    /**
     * 返回后台婚纱信息列表

     * @return
     * @throws IOException
     */
    @RequestMapping("/qrylistWedding")
    @ResponseBody
    public Result qrylistWedding(int page,int limit,String weddingName,String weddingStyle,String state) {
        System.out.println("婚纱列表接口");
        Map<String,Object> map=new HashMap<String,Object>();
        PageHelper.startPage(page,limit);
        map.put("page",page);
        map.put("limit",limit);
        map.put("weddingName",weddingName);
        map.put("weddingStyle",weddingStyle);
        map.put("state",state);
        PageInfo pageInfo= new PageInfo<>(weddingService.qrylistWedding(map));
        Result result=new Result();
        if(pageInfo != null) {
            result.setCode(0);
            result.setCount((int)pageInfo.getTotal());
            result.setData(pageInfo.getList());
            result.setMsg("获取婚纱信息成功！");
        }else {
            result.failure(-1, "获取婚纱信息异常");
        }
          return result;

    }
    /**
     *添加婚纱资料
     */
    @PostMapping ("/addWeddingInfo")
    @ResponseBody
    public  Result addWeddingSuccess(@RequestBody Wedding we){
        System.out.println(we.getWeddingName());
        int a = weddingService.addWeddingInfo(we);
        if(a>0){
            return new Result().success("添加成功");
        }else {
            return new Result().failure(-1, "添加失败");
        }

    }
    /**
     *修改婚纱信息
     */
    @RequestMapping("/editWeddingInfo")
    @ResponseBody
    public  Integer editWeddingSuccess(Wedding wed){
        System.out.println("编辑婚纱接口");
        return weddingService.editWeddingInfo(wed);
    }
    /**
     *删除婚纱资料
     */
    @RequestMapping("/deleteWeddingInfo")
    @ResponseBody
    public Map<String, Object> deleteWeddingInfo(String ids) {
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
            int result = weddingService.removeWeddingInfoByIds(list);
            map.put("success", result);
            map.put("msg", "删除成功");
            return map;
        }
    }
    /**
     * 1.前台获取所有婚纱列表
     * 2.前台查看某一款详情
     */
    @RequestMapping("/qrypreWedding")
    @ResponseBody
    public String qrypreWedding(String weddingStyle,String id){
        System.out.println("获取前台全部婚纱接口");
//        System.out.println(id);
//        PageHelper.startPage(page,limit);
        Result result=new Result();
        List<Wedding> WData=weddingService.qrypreWedding(weddingStyle,id);
//          PageInfo pageInfo=new PageInfo<>(WData);
        JSONArray jsonArray=JSONArray.fromObject(WData);
        return jsonArray.toString();
    }
    /**
     * 返回后台爆款推荐列表
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/qrybackpromlist")
    @ResponseBody
    public Result qrylistFaddish(int page, int limit, String weddingName, String weddingStyle, String rentalStatus) {
        System.out.println("爆款推荐后台接口");
        Map<String,Object> map=new HashMap<String,Object>();
        PageHelper.startPage(page,limit);
        map.put("page",page);
        map.put("limit",limit);
        map.put("weddingName",weddingName);
        map.put("weddingStyle",weddingStyle);
        map.put("rentalStatus",rentalStatus);
        PageInfo pageInfo= new PageInfo<>(weddingService.qrylistFaddish(map));
        Result result=new Result();
        if(pageInfo != null) {
            result.setCode(0);
            result.setCount((int)pageInfo.getTotal());
            result.setData(pageInfo.getList());
            result.setMsg("获取婚纱信息成功！");
        }else {
            result.failure(-1, "获取婚纱信息异常");
        }
        return result;
    }
    @RequestMapping("/editpromInfo")
    @ResponseBody
    public int editpromInfo(Wedding wed){
        return weddingService.editpromInfo(wed);
    }
    @RequestMapping("/deletepromInfo")
    @ResponseBody
    public int deletepromInfo(String Id){
        return  weddingService.deletepromInfo(Id);
    }

    /**
     * 返回前台爆款婚纱信息列表
     * @param
     * @param
     * @return
     * @throws IOException
     */
   @RequestMapping("/qryprepromotion")
    @ResponseBody
    public  String qrylistLease(Wedding wed,Model model){
       System.out.println("前台爆款接口");
       Result result=new Result();
        List<Wedding> mapData = weddingService.qrylistLease(wed);
       JSONArray json=JSONArray.fromObject(mapData);
       result.setData(mapData);
       return json.toString();
    }

    /**
     *上传婚纱图片
     */
    @RequestMapping("/addWeddingPhoto")
    @ResponseBody
    public  String addWeddingPhoto(@RequestParam("file") MultipartFile file, @ModelAttribute User ui, HttpServletRequest request) throws IllegalStateException, IOException{
        File path = new File(ResourceUtils.getURL("classpath:").getPath());
        File uploadpath=new File(path.getAbsolutePath(),"static/images/uploadWedding/");
        System.out.println(uploadpath);
         System.out.println("上传图片接口");
        String oldFileName = file.getOriginalFilename();
        System.out.println(oldFileName);
//        String path = request.getSession().getServletContext().getRealPath("/WEB-INF/static/images/uploadWedding/");
//				getServletContext().getRealPath("/uploadWedding/");
//        System.out.println("++++++++++++"+path);
//        String fileName = changeName(oldName);
        String newFilename = oldFileName.substring(oldFileName.lastIndexOf("\\")+1);
        String rappendix = "images/uploadWedding/" + newFilename;
        String uploadFile = uploadpath + "/" + newFilename;
        System.out.println(uploadFile);
        File file1 = new File(uploadFile);
        file.transferTo(file1);
        String str = "{\"code\": 0,\"msg\": \"\",\"data\": {\"src\":\"" + rappendix + "\"}}";
        System.out.println(str);
       return str;
    }

    public static String changeName(String oldName){
        Random r = new Random();
        Date d = new Date();
        String newName = oldName.substring(oldName.indexOf('.'));
        newName = r.nextInt(99999999) + d.getTime() + newName;
        return newName;
    }


    /**
     * 返回爆款推荐列表
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    /*@RequestMapping(value = "/qrylistUserFaddish", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String qrylistUserFaddish(Wedding wed) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("result", false);
        map.put("msg", "系统异常,获取婚纱信息失败!");
        try {
            List<Map<String, Object>> mapData = weddingService.qrylistFaddish(wed);
            if(mapData != null){
                map.put("data", mapData);
                map.put("code", 0);
                map.put("count", mapData.size());
                map.put("msg", "获取婚纱信息成功！");
            }
        } catch (Exception e) {
            logger.error("获取婚纱信息异常",e);
        }
        return ObjectHelper.objectToJson(map);
    }*/
}

package com.dress_rental.controller;

import com.dress_rental.entities.User;
import com.dress_rental.service.UserService;
import com.dress_rental.util.MD5Utils;
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
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * @version 1.0
 * @Author:hh
 * @Date:2019/11/11
 * @Description:com.dress_rental.controller
 */
@Controller
public class UserController {
@Autowired
private UserService userService;
    // 访问主页
    @RequestMapping("/main")
    public String logining(){
        return "index";
    }
    @RequestMapping("/main1")
    public String logining1(){
        return "indexone";
    }
   // 跳转登录页面
    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login";
    }
    //    跳转注册页面
    @RequestMapping("/toRegister")
    public String toRegister(){
        return "register";
    }

    //进行注册
    @RequestMapping(value = "/Register",method = RequestMethod.POST)
    @ResponseBody
    public Result addCustomer(User user){
        user.setPassword(MD5Utils.md5(user.getPassword()));
        System.out.println(user.getPassword());
        int i=userService.addCustomer(user);
        if(i>0){
            return new Result().success("注册成功") ;
        }
        return new Result().failure(-1,"注册失败");

    }
    //进行登录
    @RequestMapping("/Login")
    @ResponseBody
    public String verify(HttpServletRequest request, User user){
        Result result=new Result();
        HttpSession session=request.getSession();
         User user1 =userService.verifyCustomer(user);
         session.setAttribute("user",user1);
       /* session.setAttribute("userid",user1.getId());
        session.setAttribute("username", user1.getUsername());
        session.setAttribute("realname",user1.getRealname());
        session.setAttribute("userphoto",user1.getPhoto());
        session.setAttribute("phonenum",user1.getPhonenum());
        session.setAttribute("receiveAdd",user1.getReceiveAdd());*/
        JSONArray jsonArray=JSONArray.fromObject(user1);
        return jsonArray.toString();
         /*if (user1 !=null&& user1.getType().equals("1")){
             session.setAttribute("userid",user1.getId());
             session.setAttribute("username", user1.getUsername());
             session.setAttribute("realname",user1.getRealname());
             session.setAttribute("userphoto",user1.getPhoto());
             session.setAttribute("phonenum",user1.getPhonenum());
             session.setAttribute("receiveAdd",user1.getReceiveAdd());
             return new Result().setMsg("");
             *//*result.setData(user1);
             result.setMsg("登录成功");
             return result;*//*

         }else {
             session.setAttribute("username", user1.getUsername());
             session.setAttribute("userphoto",user1.getPhoto());
             return "back/index";
            *//* result.setData(user1);
             return result;*//*
         }*/

    }
    @RequestMapping("/getname")
    @ResponseBody
    public String getname(HttpServletRequest request){
        System.out.println("用户姓名接口");
        User user=(User) request.getSession().getAttribute("user");
        JSONArray jsonArray=JSONArray.fromObject(user);
        return jsonArray.toString();
    }
//    退出登录
    @RequestMapping("/exit")
    @ResponseBody
    public Result logout(HttpServletRequest request, HttpServletResponse response){
        System.out.println("退出登录");
        request.getSession().invalidate();
        return new Result().success("清除成功");
    }

    //管理员登录测试
    @RequestMapping("/adminLogin")
    public String userLogin(){
        return "back/index";
    }
    //跳转到个人资料页
    @RequestMapping("/toSelfmaterial")
    public String toselfmaterial(){
        return "个人资料";
    }
    //用户列表
    @RequestMapping("/selectAllUsers")
    @ResponseBody
        public Result selectAllUsers(int page,int limit,String username,String realname,String phonenum){
        Map<String,Object> map=new HashMap<String,Object>();
        map.put("username",username);
        map.put("realname",realname);
        map.put("phonenum",phonenum);
        map.put("page",page);
        map.put("limit",limit);
        PageInfo<User> pageInfo=new PageInfo<>(userService.selectAllUsers(map));
        Result result=new Result();
        result.setCode(0);
        result.setCount((int)pageInfo.getTotal());
        result.setData(pageInfo.getList());
        result.setMsg("成功");
        return result;

    }
//    客户端查询用户资料
    @RequestMapping("getselfinfor")
    @ResponseBody
    public String qryperuser(String id){
        System.out.println("用户信息接口");
        User preinfor=userService.qryperuser(id);
        System.out.println(preinfor.getUsername());
        JSONArray jsonArray=JSONArray.fromObject(preinfor);
        return jsonArray.toString();
    }
/*分页*/
/*
* 添加用户头像
* */
@RequestMapping("/addUserPhoto")
@ResponseBody
public  String addUserPhoto(@RequestParam("file") MultipartFile file, @ModelAttribute User ui, HttpServletRequest request) throws IllegalStateException, IOException {
    File path = new File(ResourceUtils.getURL("classpath:").getPath());
    File uploadpath=new File(path.getAbsolutePath(),"static/images/uploadWedding/");
    System.out.println("上传图片接口");
    String oldFileName = file.getOriginalFilename();
    System.out.println(oldFileName);
    String newFilename = oldFileName.substring(oldFileName.lastIndexOf("\\")+1);
    System.out.println(newFilename);
    String rappendix = "images/uploadWedding/" + newFilename;
    String uploadFile = uploadpath + "/" + newFilename;
    System.out.println(uploadFile);
    File file1 = new File(uploadFile);
    file.transferTo(file1);
    String str = "{\"code\": 0,\"msg\": \"\",\"data\": {\"src\":\"" + rappendix + "\"}}";
    return str;
}

    //添加用户

    @PostMapping ("/addUser")
    @ResponseBody
    public Result addUser( @RequestBody User user){
       int i= userService.addUser(user);
       if(i>0){
      return new Result().success("添加成功");
       }else {
           return new Result().failure(-1, "添加失败");
       }
    }
    /*
    * 编辑用户*/
    @RequestMapping("/editUsers")
    @ResponseBody
    public Integer editUserInfo(User user){
        return userService.editUserInfo(user);
    }

    @PostMapping("/deleteUsersById")
    @ResponseBody
    //批量删除
    public Result deleteUsersById(String id) {
        int i = userService.deleteUsersById(id);
        Result result = new Result();
        result.setCode(0);
        if (i > 0) {
           return result.success("删除成功");
        } else {
           return result.failure(-1, "删除失败");
        }
    }


}

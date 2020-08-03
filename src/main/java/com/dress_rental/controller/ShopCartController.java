package com.dress_rental.controller;

import com.dress_rental.entities.ShopCart;
import com.dress_rental.service.ShopCartService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/12
 * @Description:com.dress_rental.controller
 */
@Controller
public class ShopCartController {
    @Autowired
    private ShopCartService shopCartService;

    @RequestMapping("/qryshopcartList")
    @ResponseBody
    public String qryshopcartList(String id){
        List<Map<String, Object>> shopcartData= shopCartService.qryshopcartList(id);
        JSONArray jsonArray=JSONArray.fromObject(shopcartData);
        return  jsonArray.toString();

    }
    @RequestMapping("/addtoShopCart")
    @ResponseBody public Integer addtoShopCart(ShopCart shopCart){
        System.out.println(shopCart.getUserId());
        return shopCartService.addtoShopCart(shopCart);
    }

}

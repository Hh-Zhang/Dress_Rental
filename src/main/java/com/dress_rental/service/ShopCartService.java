package com.dress_rental.service;

import com.dress_rental.entities.ShopCart;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/12
 * @Description:com.dress_rental.service
 */
public interface ShopCartService {
    List<Map<String,Object>> qryshopcartList(String id);

    Integer addtoShopCart(ShopCart shopCart);
}

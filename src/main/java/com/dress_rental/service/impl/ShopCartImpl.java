package com.dress_rental.service.impl;

import com.dress_rental.dao.ShopCartDao;
import com.dress_rental.entities.ShopCart;
import com.dress_rental.service.ShopCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/3/12
 * @Description:com.dress_rental.service.impl
 */
@Service
public class ShopCartImpl implements ShopCartService {
    @Autowired
    private ShopCartDao shopCartDao;
    @Override
    public List<Map<String, Object>> qryshopcartList(String id) {
        return shopCartDao.qryshopcartList(id);
    }

    @Override
    public Integer addtoShopCart(ShopCart shopCart) {
        return shopCartDao.addtoShopCart(shopCart);
    }
}

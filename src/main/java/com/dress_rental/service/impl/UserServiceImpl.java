package com.dress_rental.service.impl;

import com.dress_rental.dao.UserDao;
import com.dress_rental.entities.User;
import com.dress_rental.service.UserService;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/1/14
 * @Description:com.dress_rental.service.impl
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public int addCustomer(User user) {
        System.out.println(user.getUsername());
        return userDao.addCustomer(user);
    }

    @Override
    public User verifyCustomer(User user) {
        return userDao.verifyCustomer(user);
    }

    @Override
    public List<User> selectAllUsers(Map<String, Object> map) {
        PageHelper.startPage(Integer.parseInt(String.valueOf(map.get("page"))),Integer.parseInt(String.valueOf(map.get("limit"))));
        return userDao.selectAllUsers(map);
    }

    @Override
    public User qryperuser(String id) {
        return userDao.qryperuser(id);
    }

    @Override
    public int addUser(User user) {
        return userDao.addUser(user);
    }

    @Override
    public int editUserInfo(User user) {
        return userDao.editUserInfo(user);
    }

    @Override
    public int deleteUsersById(String id) {
        return userDao.deleteUsersById(id.split(","));
    }
}

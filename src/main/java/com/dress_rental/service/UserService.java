package com.dress_rental.service;

import com.dress_rental.entities.User;
import java.util.List;
import java.util.Map;


/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/1/14
 * @Description:com.dress_rental.service
 */
public interface UserService {
    int addCustomer(User user);
    User verifyCustomer(User user);
    List<User> selectAllUsers(Map<String, Object> map);
    User qryperuser(String id);
    int addUser(User user);
    int editUserInfo(User user);
    int deleteUsersById(String id);
}

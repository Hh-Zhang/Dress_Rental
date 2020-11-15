package com.dress_rental.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @version 1.0
 * @Author:hh
 * @Date:2020/10/24
 * @Description:com.dress_rental.util
 */
public class MD5Utils{
    public static String md5(String plainText) {
        byte[] secretBytes = null;
        try {
            //先通过MessageDigest把目标内容转换为字节数组
            secretBytes = MessageDigest.getInstance("md5").digest(
                    plainText.getBytes());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("找不到md5算法");
        }
        //把字节数组变为字符串
        String md5code = new BigInteger(1, secretBytes).toString(16);
        for (int i = 0; i < 32 - md5code.length(); i++) {
            md5code = "0" + md5code;
        }
        return md5code;
    }
}
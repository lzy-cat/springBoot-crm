package com.mage.crm.service;

import com.mage.crm.mapper.UserMapper;
import com.mage.crm.model.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class UserService {
    @Resource
    private UserMapper userMapper;
    public List<User> queryUserAll() {
       List<User> userList = userMapper.queryUserAll();
       return userList;
    }

    public void updateTrueName(Integer userId, String trueName) {
        userMapper.updateTrueName(userId,trueName);
        //用于检测aop切面是否成功
        //int a=1/0;
    }
}

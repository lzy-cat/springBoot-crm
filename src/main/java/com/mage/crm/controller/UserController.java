package com.mage.crm.controller;

import com.mage.crm.model.User;
import com.mage.crm.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("user")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping("queryUserAll")
    @ResponseBody
    public List<User> queryUserAll(){
        List<User> userList = userService.queryUserAll();
        return userList;
    }
    @RequestMapping("updateTrueName")
    @ResponseBody
    public String updateTrueName(Integer userId,String trueName){
        userService.updateTrueName(userId,trueName);
        return "success";
    }
}

package com.mage.crm.controller;

import com.mage.crm.base.BaseController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Slf4j
public class IndexController extends BaseController {
   /* @RequestMapping("")
    @ResponseBody
    public String index(String name,String password){
        log.info("门面日志打印成功！指给类添加一个log属性方便打印日志");
        log.info("姓名：{};密码：{}",name,password);
        return "index";
    }*/
    @RequestMapping("index")
    public String index(){
        return "index";
    }
}

package com.mage.crm.model;

import com.mage.crm.base.BaseVo;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class User extends BaseVo {
    private String id;
    private String userName;
    private String userPwd;
    private String trueName;
    private String phone;
    private String email;

}

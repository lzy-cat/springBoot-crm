package com.mage.crm.mapper;

import com.mage.crm.model.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

import java.util.List;

public interface UserMapper {
    @Select("select id,user_name,user_pwd,true_name,email,phone,is_valid,create_date,update_date" +
            " from t_user where is_valid=1")
    List<User> queryUserAll();
    @Update("update t_user set true_name=#{trueName} where id=#{userId}")
    void updateTrueName(@Param("userId") Integer userId, @Param("trueName") String trueName);
}

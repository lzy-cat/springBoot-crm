package com.mage.crm.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
@Getter
@Setter
@ToString
public class Student implements Serializable {

    private Integer id;
    private String name;
    private Integer age;
}

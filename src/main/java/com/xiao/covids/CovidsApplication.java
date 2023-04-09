package com.xiao.covids;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("com.xiao.covids.mapper")
public class CovidsApplication {

    public static void main(String[] args) {

        SpringApplication.run(CovidsApplication.class, args);

    }

}

package com.xiao.covids.controller;


import com.xiao.covids.entity.NewsValue;
import com.xiao.covids.entity.QqNews;
import com.xiao.covids.service.NewsValueService;
import com.xiao.covids.service.QqNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author vicente
 * @since 2022-07-26
 */
@RestController
@RequestMapping("/qq-news")
public class QqNewsController {
    @Autowired
    private QqNewsService qqNewsService;

    @RequestMapping("/list")
    public List<QqNews> getQqNewsList(){
        List<QqNews> qqNewsList = qqNewsService.list();
        return qqNewsList;

    }
}

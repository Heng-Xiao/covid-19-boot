package com.xiao.covids.controller;



import com.xiao.covids.entity.NewsValue;
import com.xiao.covids.service.NewsValueService;
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
 * @since 2022-06-05
 */
@RestController
@RequestMapping("/news-value")
public class NewsValueController {
    @Autowired
    private NewsValueService newsValueService;

    @RequestMapping("/list")
    public List<NewsValue> getNewsValueDayList(){
        List<NewsValue> newsValuesList = newsValueService.list();
        return newsValuesList;

    }
}

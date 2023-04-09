package com.xiao.covids.controller;


import com.xiao.covids.entity.AreaTheday;
import com.xiao.covids.service.AreaThedayService;
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
 * @since 2022-06-02
 */
@RestController
@RequestMapping("/area-theday")
public class AreaThedayController {

    @Autowired
    private AreaThedayService areaThedayService;

    @RequestMapping("/list")
    public List<AreaTheday> getAreaTheDayList(){
        List<AreaTheday> areaThedayList = areaThedayService.list();
        return areaThedayList;

    }
}

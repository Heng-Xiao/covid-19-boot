package com.xiao.covids.controller;


import com.xiao.covids.entity.ChinaTwomonths;
import com.xiao.covids.service.ChinaTwomonthsService;
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
@RequestMapping("/china-twomonths")
public class ChinaTwomonthsController {

    @Autowired
    private ChinaTwomonthsService chinaTwomonthsService;

    @RequestMapping("/list")
    public List<ChinaTwomonths> getChinaTwoMonthsList() {
        List<ChinaTwomonths> chinaTwomonthsList = chinaTwomonthsService.list();
        return chinaTwomonthsList;
    }
}

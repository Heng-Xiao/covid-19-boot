package com.xiao.covids.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.xiao.covids.entity.ChinaTwomonthsAdd;

import com.xiao.covids.service.ChinaTwomonthsAddService;
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
 * @since 2022-05-31
 */
@RestController
@RequestMapping("/china-twomonths-add")
public class ChinaTwomonthsAddController {

    @Autowired
    private ChinaTwomonthsAddService chinaTwomonthsAddService;

    @RequestMapping("/list")
    public List<ChinaTwomonthsAdd> getChinaTwoMonthsAddList() {
        List<ChinaTwomonthsAdd> chinaTwomonthsAddList = chinaTwomonthsAddService.list();
        return chinaTwomonthsAddList;
    }



}

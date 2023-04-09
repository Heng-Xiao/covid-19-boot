package com.xiao.covids.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xiao.covids.entity.AreaHistoryConfirm;

import com.xiao.covids.entity.ChinaTotal;
import com.xiao.covids.service.AreaHistoryConfirmService;

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
 * @since 2022-06-04
 */
@RestController
@RequestMapping("/area-history-confirm")
public class AreaHistoryConfirmController {

    @Autowired
    private AreaHistoryConfirmService areaHistoryConfirmService;

    @RequestMapping("/list")
    public List<AreaHistoryConfirm> getAreaHistoryConfirmList(){
        LambdaQueryWrapper<AreaHistoryConfirm> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.last("ORDER BY yeardate DESC limit 365");
        List<AreaHistoryConfirm> areaHistoryConfirmList = areaHistoryConfirmService.list(queryWrapper);
        return areaHistoryConfirmList;

    }
}

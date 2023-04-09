package com.xiao.covids.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xiao.covids.entity.RiskAreas;
import com.xiao.covids.entity.User;
import com.xiao.covids.service.RiskAreasService;
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
 * @since 2022-09-06
 */
@RestController
@RequestMapping("/risk-areas")
public class RiskAreasController {
    @Autowired
    private RiskAreasService riskAreasService;

    @RequestMapping("/list")
    public List<RiskAreas> getRiskAreasServiceList(){

        List<RiskAreas> riskAreasList = riskAreasService.list();

        return riskAreasList;

    }
}

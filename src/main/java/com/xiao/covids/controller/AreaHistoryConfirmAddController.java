package com.xiao.covids.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.xiao.covids.entity.AreaHistoryConfirm;
import com.xiao.covids.entity.AreaHistoryConfirmAdd;
import com.xiao.covids.service.AreaHistoryConfirmAddService;
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
 * @since 2022-06-05
 */
@RestController
@RequestMapping("/area-history-confirm-add")
public class AreaHistoryConfirmAddController {


    @Autowired
    private AreaHistoryConfirmAddService areaHistoryConfirmAddService;

    @RequestMapping("/list")
    public List<AreaHistoryConfirmAdd> getAreaHistoryConfirmAddList(){
        LambdaQueryWrapper<AreaHistoryConfirmAdd> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.last("ORDER BY yeardate DESC limit 60");
        List<AreaHistoryConfirmAdd> areaHistoryConfirmAddList = areaHistoryConfirmAddService.list(queryWrapper);
        return areaHistoryConfirmAddList;

    }
}

package com.xiao.covids.controller;


import com.xiao.covids.entity.AreaWithVariousData;
import com.xiao.covids.service.AreaWithVariousDataService;
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
@RequestMapping("/area-with-various-data")
public class AreaWithVariousDataController {

    @Autowired
    private AreaWithVariousDataService areaWithVariousDataService;

    @RequestMapping("/list")
    public List<AreaWithVariousData> areaWithVariousDataList(){
        List<AreaWithVariousData> areaWithVariousDataList = areaWithVariousDataService.list();
        return areaWithVariousDataList;

    }
}

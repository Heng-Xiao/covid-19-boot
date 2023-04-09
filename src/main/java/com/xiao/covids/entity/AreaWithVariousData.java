package com.xiao.covids.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author vicente
 * @since 2022-06-02
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AreaWithVariousData extends Model<AreaWithVariousData> {

    private static final long serialVersionUID = 1L;

    /**
     * 省份名
     */
    private String areaname;

    /**
     * 城镇化率
     */
    private Double cityrate;

    /**
     * 国内生产总值
     */
    private Double gdp;

    /**
     * 每千人卫生技术人员
     */
    private Double doctor;

    /**
     * 在校学生人数
     */
    private int students;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}

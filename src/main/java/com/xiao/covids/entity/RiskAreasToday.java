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
 * @since 2022-09-06
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class RiskAreasToday extends Model<RiskAreasToday> {

    private static final long serialVersionUID = 1L;

    private String areasName;

    private String areasDegree;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}

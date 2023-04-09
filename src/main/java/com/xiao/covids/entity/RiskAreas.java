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
 * @since 2022-05-30
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class RiskAreas extends Model<RiskAreas> {

    private static final long serialVersionUID = 1L;

    private String areasName;

    private String areasDegree;

    private String address;

    private String geo;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}

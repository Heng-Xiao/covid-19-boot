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
 * @since 2022-06-05
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class NewsValue extends Model<NewsValue> {

    private static final long serialVersionUID = 1L;

    private String name;

    private Double value;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}

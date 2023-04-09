package com.xiao.covids.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableField;
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
public class AreaTheday extends Model<AreaTheday> {

    private static final long serialVersionUID = 1L;

    private String area;

    private String confirmed;

    private String died;

    private String crued;

    @TableField("confirmedRelative")
    private String confirmedRelative;

    @TableField("curConfirm")
    private String curConfirm;

    @TableField("curedRelative")
    private String curedRelative;

    @TableField("asymptomaticRelative")
    private String asymptomaticRelative;

    private String asymptomatic;

    @TableField("nativeRelative")
    private String nativeRelative;


    @Override
    protected Serializable pkVal() {
        return null;
    }

}
